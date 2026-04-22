import { useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EditorSidebar from "../../components/layout/EditorSidebar";
import { Button, StatusBadge, SearchBar } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { useState } from "react";
import "./Editor.css";

export default function PainelEditorPage() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const pendentes = noticias.filter(n => n.status === "REVISAO").filter(n => !search || n.titulo.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-wrapper">
      <Header />
      <div className="editor-layout">
        <EditorSidebar />
        <main className="editor-main">
          <h1 className="page-title">Painel do Editor</h1>
          <p className="page-subtitle">{pendentes.length} notícia(s) aguardando revisão</p>
          <div className="filter-bar"><SearchBar value={search} onChange={setSearch} placeholder="Buscar notícias..." /></div>
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-200)" }}>
            {pendentes.length === 0 ? (
              <div className="empty-state"><h3>Nenhuma notícia pendente de revisão</h3></div>
            ) : (
              <table className="data-table">
                <thead><tr><th>Título</th><th>Autor</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead>
                <tbody>
                  {pendentes.map(n => {
                    const autor = usuarios.find(u => u.id === n.autorId);
                    return (
                      <tr key={n.id}>
                        <td style={{ fontWeight: 600 }}>{n.titulo}</td>
                        <td>{autor?.nome}</td>
                        <td>{new Date(n.criadoEm).toLocaleDateString("pt-BR")}</td>
                        <td><StatusBadge status={n.status} /></td>
                        <td>
                          <button className="action-btn view" onClick={() => nav("/noticia/" + n.id)}>👁</button>
                          <button className="action-btn publish" onClick={() => nav("/editor/publicar/" + n.id)}>📢 Publicar</button>
                          <button className="action-btn edit" onClick={() => nav("/editor/noticias/" + n.id + "/editar")}>✏️</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
