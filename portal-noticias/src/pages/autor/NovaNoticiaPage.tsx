import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Button, InputField, SelectField, TextArea, TagBadge } from "../../components/ui";
import { tags } from "../../data/tags";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import "./Autor.css";

export default function NovaNoticiaPage() {
  const nav = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [ufId, setUfId] = useState("");
  const [tagsSel, setTagsSel] = useState<number[]>([]);

  const cidsFiltradas = ufId ? cidades.filter(c => c.ufId === Number(ufId)) : [];

  const toggleTag = (id: number) => {
    setTagsSel(prev => prev.includes(id) ? prev.filter(t => t !== id) : prev.length < 5 ? [...prev, id] : prev);
  };

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h1 className="page-title">Nova Notícia</h1>
            <Button variant="ghost" onClick={() => nav("/autor/noticias")}>← Voltar</Button>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <InputField label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título da notícia" />
              <InputField label="Subtítulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} placeholder="Subtítulo" />
              <div>
                <InputField label="URL da Imagem de Capa" value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="https://..." />
                {imgUrl && <img src={imgUrl} alt="preview" style={{ marginTop: 8, width: "100%", height: 160, objectFit: "cover", borderRadius: "var(--radius)" }} />}
              </div>
              <TextArea label="Conteúdo" value={conteudo} onChange={e => setConteudo(e.target.value)} rows={15} placeholder="Escreva o conteúdo da notícia..." />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <SelectField label="UF" options={[{ value: "", label: "Selecione" }, ...ufs.map(u => ({ value: u.id, label: u.sigla + " — " + u.nome }))]} value={ufId} onChange={e => setUfId(e.target.value)} />
                <SelectField label="Cidade" options={[{ value: "", label: ufId ? "Selecione" : "Selecione a UF primeiro" }, ...cidsFiltradas.map(c => ({ value: c.id, label: c.nome }))]} />
              </div>
              <div>
                <label className="field-label">Tags (máx. 5)</label>
                <div className="tags-check-list">
                  {tags.map(t => (
                    <span key={t.id} onClick={() => toggleTag(t.id)} style={{ cursor: "pointer" }}>
                      <TagBadge nome={t.nome} cor={tagsSel.includes(t.id) ? t.cor : "#adb5bd"} size="md" />
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <Button variant="ghost" onClick={() => nav("/autor/noticias")}>Salvar como Rascunho</Button>
                <Button variant="primary" onClick={() => nav("/autor/noticias")}>Enviar para Revisão</Button>
              </div>
            </div>
            <div style={{ width: 280, flexShrink: 0 }}>
              <div className="preview-card">
                <h4 className="card-section-title">Preview do Card</h4>
                {imgUrl ? <img src={imgUrl} alt="preview" className="preview-img" /> : <div style={{ width: "100%", height: 160, background: "var(--gray-200)", borderRadius: "var(--radius)", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)" }}>Imagem aparece aqui</div>}
                <p className="preview-title">{titulo || "Título da notícia"}</p>
                <p className="preview-sub">{subtitulo || "Subtítulo da notícia..."}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
