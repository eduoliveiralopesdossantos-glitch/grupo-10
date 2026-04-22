import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Button, InputField, SelectField, TextArea, TagBadge, StatusBadge } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { tags } from "../../data/tags";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import "./Autor.css";

export default function EditarNoticiaPage() {
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

  if (!noticia) return <div className="page-wrapper"><Header /><main className="main-content"><div className="container"><div className="empty-state"><h3>Notícia não encontrada</h3></div></div></main><Footer /></div>;

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="alert alert-warning">⚠️ Você está editando: <strong>{noticia.titulo}</strong> — <StatusBadge status={noticia.status} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h1 className="page-title">Editar Notícia</h1>
            <Button variant="ghost" onClick={() => nav("/autor/noticias")}>← Cancelar</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <InputField label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
            <InputField label="Subtítulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
            <div>
              <InputField label="URL da Imagem de Capa" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
              {imgUrl && <img src={imgUrl} alt="preview" style={{ marginTop: 8, width: "100%", height: 180, objectFit: "cover", borderRadius: "var(--radius)" }} />}
            </div>
            <TextArea label="Conteúdo" value={conteudo} onChange={e => setConteudo(e.target.value)} rows={12} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <SelectField label="UF" options={[{ value: "", label: "Selecione" }, ...ufs.map(u => ({ value: u.id, label: u.sigla + " — " + u.nome }))]} value={ufId} onChange={e => setUfId(e.target.value)} />
              <SelectField label="Cidade" options={[{ value: "", label: "Selecione a UF" }, ...cidsFiltradas.map(c => ({ value: c.id, label: c.nome }))]} />
            </div>
            <div>
              <label className="field-label">Tags (máx. 5)</label>
              <div className="tags-check-list">
                {tags.map(t => <span key={t.id} onClick={() => toggleTag(t.id)} style={{ cursor: "pointer" }}><TagBadge nome={t.nome} cor={tagsSel.includes(t.id) ? t.cor : "#adb5bd"} size="md" /></span>)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant="primary" onClick={() => nav("/autor/noticias")}>Salvar Alterações</Button>
              <Button variant="ghost" onClick={() => nav("/autor/noticias")}>Cancelar</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
