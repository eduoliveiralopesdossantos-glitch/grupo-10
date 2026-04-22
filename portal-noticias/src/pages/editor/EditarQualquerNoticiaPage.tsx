import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import Header from "../../components/layout/Header";
import EditorSidebar from "../../components/layout/EditorSidebar";
import { Button, InputField, SelectField, TextArea, TagBadge } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { tags } from "../../data/tags";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import "./Editor.css";
import "../autor/Autor.css";

export default function EditarQualquerNoticiaPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const noticia = noticias.find(n => n.id === Number(id));
  const [titulo, setTitulo] = useState(noticia?.titulo || "");
  const [subtitulo, setSubtitulo] = useState(noticia?.subtitulo || "");
  const [imgUrl, setImgUrl] = useState(noticia?.imagemCapa || "");
  const [conteudo, setConteudo] = useState(noticia?.conteudo || "");
  const [tagsSel, setTagsSel] = useState<number[]>(noticia?.tags || []);
  const [ufId, setUfId] = useState("");

  const cidsFiltradas = ufId ? cidades.filter(c => c.ufId === Number(ufId)) : [];
  const toggleTag = (id: number) => setTagsSel(prev => prev.includes(id) ? prev.filter(t => t !== id) : prev.length < 5 ? [...prev, id] : prev);
  const autorOriginal = usuarios.find(u => u.id === noticia?.autorId);

  if (!noticia) return <div className="page-wrapper"><Header /><main className="main-content"><div className="container"><div className="empty-state"><h3>Notícia não encontrada</h3></div></div></main></div>;

  return (
    <div className="page-wrapper">
      <Header />
      <div className="editor-layout">
        <EditorSidebar />
        <main className="editor-main">
          <div className="alert alert-warning">⚠️ Você está editando uma notícia de <strong>{autorOriginal?.nome}</strong></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h1 className="page-title">Editar Qualquer Notícia</h1>
            <Button variant="ghost" onClick={() => nav("/editor/painel")}>← Voltar ao Painel</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <InputField label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
            <InputField label="Subtítulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
            <div>
              <InputField label="URL da Imagem de Capa" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
              {imgUrl && <img src={imgUrl} alt="preview" style={{ marginTop: 8, width: "100%", height: 180, objectFit: "cover", borderRadius: "var(--radius)" }} />}
            </div>
            <TextArea label="Conteúdo" value={conteudo} onChange={e => setConteudo(e.target.value)} rows={12} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <SelectField label="UF" options={[{ value: "", label: "Selecione" }, ...ufs.map(u => ({ value: u.id, label: u.sigla + " — " + u.nome }))]} value={ufId} onChange={e => setUfId(e.target.value)} />
              <SelectField label="Cidade" options={[{ value: "", label: "Selecione a UF" }, ...cidsFiltradas.map(c => ({ value: c.id, label: c.nome }))]} />
              <SelectField label="Reatribuir Autor" options={[{ value: "", label: "Manter autor original" }, ...usuarios.filter(u => u.perfil === "AUTOR").map(u => ({ value: u.id, label: u.nome }))]} />
            </div>
            <div>
              <label className="field-label">Tags (máx. 5)</label>
              <div className="tags-check-list">
                {tags.map(t => <span key={t.id} onClick={() => toggleTag(t.id)} style={{ cursor: "pointer" }}><TagBadge nome={t.nome} cor={tagsSel.includes(t.id) ? t.cor : "#adb5bd"} size="md" /></span>)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant="primary" onClick={() => nav("/editor/painel")}>Salvar Alterações</Button>
              <Button variant="ghost" onClick={() => nav("/editor/painel")}>Cancelar</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
