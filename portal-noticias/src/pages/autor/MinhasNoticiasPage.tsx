import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Button, SearchBar, SelectField, StatusBadge } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import "./Autor.css";

const autor = usuarios.find(u => u.perfil === "AUTOR")!;

export default function MinhasNoticiasPage() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");

  const lista = noticias.filter(n => n.autorId === autor.id)
    .filter(n => !search || n.titulo.toLowerCase().includes(search.toLowerCase()))
    .filter(n => !statusFiltro || n.status === statusFiltro);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div><h1 className="page-title">Minhas Notícias</h1><p className="page-subtitle">{lista.length} notícia(s) encontrada(s)</p></div>
            <Button variant="primary" onClick={() => nav("/autor/noticias/nova")}>+ Nova Notícia</Button>
          </div>
          <div className="filter-bar">
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar notícias..." />
            <SelectField label="" options={[{ value: "", label: "Todos status" }, { value: "PUBLICADA", label: "Publicadas" }, { value: "RASCUNHO", label: "Rascunhos" }, { value: "REVISAO", label: "Em Revisão" }]} value={statusFiltro} onChange={e => setStatusFiltro(e.target.value)} style={{ minWidth: 180 }} />
          </div>
          <div className="noticias-table-wrap">
            {lista.length === 0 ? (
              <div className="empty-state">
                <h3>Você ainda não escreveu nenhuma notícia</h3>
                <Button variant="primary" onClick={() => nav("/autor/noticias/nova")} style={{ marginTop: 16 }}>+ Nova Notícia</Button>
              </div>
            ) : (
              <table className="data-table">
                <thead><tr><th>Título</th><th>Data</th><th>Status</th><th>Visualizações</th><th>Ações</th></tr></thead>
                <tbody>
                  {lista.map(n => (
                    <tr key={n.id}>
                      <td style={{ fontWeight: 600 }}>{n.titulo}</td>
                      <td>{new Date(n.criadoEm).toLocaleDateString("pt-BR")}</td>
                      <td><StatusBadge status={n.status} /></td>
                      <td>{n.visualizacoes.toLocaleString()}</td>
                      <td>
                        <button className="action-btn view" onClick={() => nav("/noticia/" + n.id)}>👁</button>
                        <button className="action-btn edit" onClick={() => nav("/autor/noticias/" + n.id + "/editar")}>✏️</button>
                        <button className="action-btn delete" onClick={() => confirm("Excluir?")}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
