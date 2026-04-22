import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { TagBadge, ComentarioItem, Button } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { tags } from "../../data/tags";
import { usuarios } from "../../data/usuarios";
import { comentarios as comentariosData } from "../../data/comentarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";

export default function DetalheNoticiaPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [comentText, setComentText] = useState("");
  const [sent, setSent] = useState(false);

  const noticia = noticias.find(n => n.id === Number(id));
  if (!noticia) return (
    <div className="page-wrapper"><Header />
      <main className="main-content"><div className="container"><div className="empty-state"><h3>Notícia não encontrada</h3><Button variant="primary" onClick={() => nav("/")}>Voltar ao Início</Button></div></div></main>
      <Footer />
    </div>
  );

  const autor = usuarios.find(u => u.id === noticia.autorId);
  const cidade = cidades.find(c => c.id === noticia.cidadeId);
  const uf = ufs.find(u => u.id === cidade?.ufId);
  const noticiasTags = tags.filter(t => noticia.tags.includes(t.id));
  const comments = comentariosData.filter(c => c.noticiaId === noticia.id && c.status === "APROVADO");
  const autorNoticias = noticias.filter(n => n.autorId === noticia.autorId && n.status === "PUBLICADA" && n.id !== noticia.id).slice(0, 5);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>{noticiasTags[0]?.nome}</span><span>/</span><strong style={{maxWidth:300,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{noticia.titulo}</strong></div>
          <div style={{display:"flex",gap:32}}>
            {/* Main */}
            <article style={{flex:"0 0 68%",minWidth:0}}>
              <img src={noticia.imagemCapa} alt={noticia.titulo} style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",borderRadius:"var(--radius-lg)",marginBottom:24}} />
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
                {noticiasTags.map(t => <TagBadge key={t.id} nome={t.nome} cor={t.cor} size="md" onClick={() => nav(`/busca/tag/${t.slug}`)} />)}
              </div>
              <h1 style={{fontFamily:"var(--font-display)",fontSize:"2rem",color:"var(--primary)",marginBottom:12,lineHeight:1.2}}>{noticia.titulo}</h1>
              <h2 style={{fontSize:"1.15rem",color:"var(--gray-600)",fontWeight:400,marginBottom:20,fontFamily:"var(--font-body)"}}>{noticia.subtitulo}</h2>
              <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:28,padding:"16px 0",borderTop:"1px solid var(--gray-200)",borderBottom:"1px solid var(--gray-200)",flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div className="avatar">{autor?.nome.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
                  <div><div style={{fontWeight:600,fontSize:15,color:"var(--primary)"}}>{autor?.nome}</div><div style={{fontSize:12,color:"var(--gray-500)"}}>Autor</div></div>
                </div>
                <span style={{fontSize:13,color:"var(--gray-500)"}}>📅 {new Date(noticia.criadoEm).toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"})}</span>
                <span style={{fontSize:13,color:"var(--gray-500)"}}>👁 {noticia.visualizacoes.toLocaleString()} visualizações</span>
                <span style={{fontSize:13,color:"var(--gray-500)"}}>📍 {cidade?.nome}{uf ? `, ${uf.sigla}` : ""}</span>
              </div>
              <div style={{lineHeight:1.9,color:"var(--gray-800)",fontSize:"1.05rem"}}>
                {noticia.conteudo.split("\n").map((p,i) => p.trim() && <p key={i} style={{marginBottom:20}}>{p}</p>)}
              </div>

              {/* Comments */}
              <hr className="section-divider" />
              <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.3rem",color:"var(--primary)",marginBottom:20}}>Comentários ({comments.length})</h3>
              {comments.map(c => <ComentarioItem key={c.id} comentario={c} autor={usuarios.find(u=>u.id===c.autorId)} />)}
              {sent ? (
                <div className="alert alert-success">✅ Comentário enviado para moderação!</div>
              ) : (
                <div style={{background:"white",border:"1px solid var(--gray-200)",borderRadius:"var(--radius)",padding:20}}>
                  <h4 style={{marginBottom:12,color:"var(--primary)"}}>Deixe seu comentário</h4>
                  <textarea className="field-input field-textarea" value={comentText} onChange={e=>setComentText(e.target.value)} placeholder="Escreva seu comentário... (máx. 500 caracteres)" maxLength={500} rows={3} style={{marginBottom:8}} />
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,color:"var(--gray-500)"}}>{comentText.length}/500</span>
                    <Button variant="primary" onClick={() => setSent(true)}>Enviar Comentário</Button>
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside style={{width:"30%",flexShrink:0}}>
              {autor && (
                <div style={{background:"white",border:"1px solid var(--gray-200)",borderRadius:"var(--radius-lg)",padding:20,marginBottom:20}}>
                  <h4 style={{fontFamily:"var(--font-condensed)",fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"var(--gray-600)",marginBottom:14,borderBottom:"2px solid var(--accent)",paddingBottom:8}}>Sobre o Autor</h4>
                  <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
                    <div className="avatar avatar-lg">{autor.nome.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
                    <div><div style={{fontWeight:700,color:"var(--primary)"}}>{autor.nome}</div><div style={{fontSize:12,color:"var(--gray-500)"}}>{noticias.filter(n=>n.autorId===autor.id&&n.status==="PUBLICADA").length} matérias publicadas</div></div>
                  </div>
                  {autor.bio && <p style={{fontSize:13,color:"var(--gray-600)",lineHeight:1.6}}>{autor.bio}</p>}
                </div>
              )}
              <div style={{background:"white",border:"1px solid var(--gray-200)",borderRadius:"var(--radius-lg)",padding:20,marginBottom:20}}>
                <h4 style={{fontFamily:"var(--font-condensed)",fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"var(--gray-600)",marginBottom:14,borderBottom:"2px solid var(--accent)",paddingBottom:8}}>Notícias Recentes</h4>
                {autorNoticias.length > 0 ? autorNoticias.map(n => (
                  <Link key={n.id} to={`/noticia/${n.id}`} style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start"}}>
                    <img src={n.imagemCapa} style={{width:60,height:44,objectFit:"cover",borderRadius:4,flexShrink:0}} alt={n.titulo} />
                    <div><div style={{fontSize:13,color:"var(--primary)",fontWeight:600,lineHeight:1.3}}>{n.titulo}</div><div style={{fontSize:11,color:"var(--gray-500)",marginTop:4}}>{new Date(n.criadoEm).toLocaleDateString("pt-BR")}</div></div>
                  </Link>
                )) : <p style={{fontSize:13,color:"var(--gray-500)"}}>Sem notícias recentes.</p>}
              </div>
              <div style={{background:"white",border:"1px solid var(--gray-200)",borderRadius:"var(--radius-lg)",padding:20}}>
                <h4 style={{fontFamily:"var(--font-condensed)",fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"var(--gray-600)",marginBottom:12,borderBottom:"2px solid var(--accent)",paddingBottom:8}}>Tags Populares</h4>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {tags.map(t => <TagBadge key={t.id} nome={t.nome} cor={t.cor} size="sm" onClick={() => nav(`/busca/tag/${t.slug}`)} />)}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
