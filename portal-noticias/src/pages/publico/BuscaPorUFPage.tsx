import { useParams, Link } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { NoticiaCard } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import { tags } from "../../data/tags";
import { usuarios } from "../../data/usuarios";

export default function BuscaPorUFPage() {
  const { sigla } = useParams<{ sigla: string }>();
  const uf = ufs.find(u => u.sigla === sigla?.toUpperCase());
  const cidsUF = cidades.filter(c => c.ufId === uf?.id).map(c => c.id);
  const lista = noticias.filter(n => n.status === "PUBLICADA" && cidsUF.includes(n.cidadeId));

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Notícias por UF</span><span>/</span><strong>{uf?.nome || sigla}</strong></div>
          <div style={{display:"flex",gap:32}}>
            <div style={{flex:1}}>
              <h1 className="page-title">{uf ? `${uf.nome} (${uf.sigla})` : `UF: ${sigla}`}</h1>
              <p className="page-subtitle">{lista.length} notícia{lista.length !== 1 ? "s" : ""} encontrada{lista.length !== 1 ? "s" : ""}</p>
              {lista.length > 0 ? (
                <div className="grid-3">
                  {lista.map(n => <NoticiaCard key={n.id} noticia={n} tags={tags} autor={usuarios.find(u=>u.id===n.autorId)} />)}
                </div>
              ) : (
                <div className="empty-state"><h3>Nenhuma notícia encontrada para esta UF</h3></div>
              )}
            </div>
            <aside style={{width:220,flexShrink:0}}>
              <div style={{background:"white",borderRadius:"var(--radius-lg)",padding:20,boxShadow:"var(--shadow-sm)"}}>
                <h3 style={{fontFamily:"var(--font-condensed)",fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"var(--primary)",marginBottom:12,borderBottom:"2px solid var(--accent)",paddingBottom:8}}>Outros Estados</h3>
                {ufs.map(u => (
                  <Link key={u.id} to={`/busca/uf/${u.sigla}`} style={{display:"block",padding:"6px 0",fontSize:14,color: u.sigla === sigla?.toUpperCase() ? "var(--accent)" : "var(--gray-700)",fontWeight: u.sigla === sigla?.toUpperCase() ? 700 : 400,borderBottom:"1px solid var(--gray-100)"}}>
                    {u.sigla} — {u.nome}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
