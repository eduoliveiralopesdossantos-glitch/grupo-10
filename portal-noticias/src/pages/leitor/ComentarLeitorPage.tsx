import { useState } from "react";
import { useParams, Link } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Button } from "../../components/ui";
import { noticias } from "../../data/noticias";
import "./Leitor.css";

export default function ComentarLeitorPage() {
  const { noticiaId } = useParams<{ noticiaId: string }>();
  const [texto, setTexto] = useState("");
  const [sent, setSent] = useState(false);
  const noticia = noticias.find(n => n.id === Number(noticiaId));

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container" style={{ maxWidth: 600, margin: "0 auto" }}>
          {noticia && (
            <div className="comentar-preview">
              <img src={noticia.imagemCapa} alt={noticia.titulo} className="comentar-img" />
              <div><h3 className="comentar-titulo">{noticia.titulo}</h3><p className="comentar-sub">{noticia.subtitulo}</p></div>
            </div>
          )}
          <div className="perfil-card">
            <h2 className="card-section-title">✍️ Deixar Comentário</h2>
            {sent ? (
              <div>
                <div className="alert alert-success">✅ Comentário enviado para moderação!</div>
                <Link to={"/noticia/" + noticiaId}><Button variant="outline">← Voltar para a Notícia</Button></Link>
              </div>
            ) : (
              <>
                <textarea className="field-input field-textarea" value={texto} onChange={e => setTexto(e.target.value)} placeholder="Escreva seu comentário..." maxLength={500} rows={5} style={{ marginBottom: 8 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "var(--gray-500)" }}>{texto.length}/500</span>
                  <Button variant="primary" onClick={() => setSent(true)} disabled={texto.trim().length === 0}>Enviar Comentário</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
