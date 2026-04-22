import { useParams, Link, useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { NoticiaCard, TagBadge } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { tags } from "../../data/tags";
import { usuarios } from "../../data/usuarios";

export default function BuscaPorTagPage() {
  const { slug } = useParams<{ slug: string }>();
  const nav = useNavigate();
  const tag = tags.find(t => t.slug === slug);
  const lista = noticias.filter(n => n.status === "PUBLICADA" && tag && n.tags.includes(tag.id));

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/">Tags</Link><span>/</span><strong>{tag?.nome || slug}</strong></div>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:8}}>
            <h1 className="page-title" style={{marginBottom:0}}>
              {tag ? <TagBadge nome={tag.nome} cor={tag.cor} size="lg" /> : slug}
            </h1>
          </div>
          <p className="page-subtitle">{lista.length} notícia{lista.length !== 1?"s":""} encontrada{lista.length !== 1?"s":""}</p>
          <div className="grid-3">
            {lista.map(n => <NoticiaCard key={n.id} noticia={n} tags={tags} autor={usuarios.find(u=>u.id===n.autorId)} />)}
          </div>
          {lista.length === 0 && <div className="empty-state"><h3>Nenhuma notícia encontrada para esta tag</h3></div>}
          <hr className="section-divider" />
          <h3 style={{fontFamily:"var(--font-condensed)",textTransform:"uppercase",letterSpacing:1,fontSize:13,color:"var(--gray-600)",marginBottom:12}}>Tags Relacionadas</h3>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {tags.filter(t => t.slug !== slug).map(t =>
              <TagBadge key={t.id} nome={t.nome} cor={t.cor} size="md" onClick={() => nav(`/busca/tag/${t.slug}`)} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
