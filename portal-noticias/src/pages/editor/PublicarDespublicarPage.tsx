import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import Header from "../../components/layout/Header";
import EditorSidebar from "../../components/layout/EditorSidebar";
import { Button, StatusBadge, TagBadge } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { tags } from "../../data/tags";
import "./Editor.css";

export default function PublicarDespublicarPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const noticia = noticias.find(n => n.id === Number(id));
  const [confirm, setConfirm] = useState(false);

  if (!noticia) return <div className="page-wrapper"><Header /><main className="main-content"><div className="container"><div className="empty-state"><h3>Notícia não encontrada</h3></div></div></main></div>;

  const autor = usuarios.find(u => u.id === noticia.autorId);
  const noticiasTags = tags.filter(t => noticia.tags.includes(t.id));
  const isPub = noticia.status === "PUBLICADA";

  return (
    <div className="page-wrapper">
      <Header />
      <div className="editor-layout">
        <EditorSidebar />
        <main className="editor-main">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h1 className="page-title">{isPub ? "Despublicar" : "Publicar"} Notícia</h1>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <StatusBadge status={noticia.status} />
              <span style={{ fontSize: 14, color: "var(--gray-500)" }}>Autor: {autor?.nome}</span>
            </div>
          </div>
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--gray-200)", marginBottom: 24 }}>
            <img src={noticia.imagemCapa} alt={noticia.titulo} style={{ width: "100%", height: 280, objectFit: "cover" }} />
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>{noticiasTags.map(t => <TagBadge key={t.id} nome={t.nome} cor={t.cor} size="sm" />)}</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--primary)", marginBottom: 8 }}>{noticia.titulo}</h2>
              <p style={{ color: "var(--gray-600)", marginBottom: 20 }}>{noticia.subtitulo}</p>
              <p style={{ lineHeight: 1.8, color: "var(--gray-700)" }}>{noticia.conteudo}</p>
            </div>
          </div>
          {confirm ? (
            <div className="alert alert-warning" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Confirma a ação de <strong>{isPub ? "despublicar" : "publicar"}</strong> esta notícia?</span>
              <div style={{ display: "flex", gap: 12 }}>
                <Button variant={isPub ? "danger" : "success"} onClick={() => nav("/editor/painel")}>{isPub ? "Sim, Despublicar" : "Sim, Publicar"}</Button>
                <Button variant="ghost" onClick={() => setConfirm(false)}>Cancelar</Button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant={isPub ? "danger" : "success"} size="lg" onClick={() => setConfirm(true)}>{isPub ? "Despublicar" : "Publicar"} Notícia</Button>
              <Button variant="ghost" size="lg" onClick={() => nav("/editor/painel")}>Voltar ao Painel</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
