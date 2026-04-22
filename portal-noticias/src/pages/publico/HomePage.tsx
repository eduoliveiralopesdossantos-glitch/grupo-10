import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { NoticiaCard, TagBadge, SearchBar } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { tags } from "../../data/tags";
import { usuarios } from "../../data/usuarios";
import { ufs } from "../../data/ufs";
import "./HomePage.css";

export default function HomePage() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const published = noticias.filter(n => n.status === "PUBLICADA");
  const destaque = published[0];
  const lista = published.slice(1).filter(n =>
    !search || n.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content" style={{padding:0}}>
        {/* Hero */}
        {destaque && (
          <div className="hero" style={{backgroundImage:`url(${destaque.imagemCapa})`}}>
            <div className="hero-overlay">
              <div className="container hero-content">
                <div className="hero-tags">
                  {tags.filter(t => destaque.tags.includes(t.id)).map(t =>
                    <TagBadge key={t.id} nome={t.nome} cor="#ffffff" size="sm" />
                  )}
                </div>
                <h1 className="hero-title">{destaque.titulo}</h1>
                <p className="hero-sub">{destaque.subtitulo}</p>
                <button className="btn btn-primary btn-lg" onClick={() => nav(`/noticia/${destaque.id}`)}>Ler Matéria Completa</button>
              </div>
            </div>
          </div>
        )}

        <div className="container" style={{paddingTop:40,paddingBottom:40}}>
          {/* Filters */}
          <div className="home-filters">
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar notícias..." />
            <select className="field-input" style={{width:"auto",minWidth:180}} onChange={e => e.target.value && nav(`/busca/uf/${e.target.value}`)}>
              <option value="">Filtrar por UF</option>
              {ufs.map(u => <option key={u.id} value={u.sigla}>{u.sigla} — {u.nome}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div className="home-tags">
            {tags.map(t => <TagBadge key={t.id} nome={t.nome} cor={t.cor} size="sm" onClick={() => nav(`/busca/tag/${t.slug}`)} />)}
          </div>

          {/* Grid */}
          <div style={{display:"flex",gap:32}}>
            <div style={{flex:1}}>
              <h2 className="section-heading">Últimas Notícias</h2>
              <div className="grid-3">
                {lista.map(n => (
                  <NoticiaCard key={n.id} noticia={n} tags={tags} autor={usuarios.find(u => u.id === n.autorId)} />
                ))}
              </div>
              {lista.length === 0 && <p style={{color:"var(--gray-500)",textAlign:"center",padding:40}}>Nenhuma notícia encontrada.</p>}
            </div>

            {/* Sidebar */}
            <aside className="home-sidebar">
              <div className="sidebar-widget">
                <h3 className="widget-title">🔥 Mais Lidas</h3>
                {[...published].sort((a,b)=>b.visualizacoes-a.visualizacoes).slice(0,5).map((n,i) => (
                  <Link key={n.id} to={`/noticia/${n.id}`} className="widget-news-item">
                    <span className="widget-rank">{i+1}</span>
                    <span className="widget-news-title">{n.titulo}</span>
                  </Link>
                ))}
              </div>
              <div className="sidebar-widget">
                <h3 className="widget-title">🗺️ Por Estado</h3>
                {ufs.slice(0,8).map(u => (
                  <Link key={u.id} to={`/busca/uf/${u.sigla}`} className="widget-uf-item">{u.sigla} <span>{u.nome}</span></Link>
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
