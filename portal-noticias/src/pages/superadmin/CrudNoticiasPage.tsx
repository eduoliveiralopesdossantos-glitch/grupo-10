import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { SearchBar, SelectField, StatusBadge } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { ufs } from "../../data/ufs";
import "./Admin.css";

export default function CrudNoticiasPage() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [ufFiltro, setUfFiltro] = useState("");

  const lista = noticias
    .filter(n => !search || n.titulo.toLowerCase().includes(search.toLowerCase()))
    .filter(n => !statusFiltro || n.status === statusFiltro);

  return (
    <div className="page-wrapper">
      <Header />
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          <div className="admin-page-header">
            <h1 className="page-title">Notícias</h1>
          </div>
          <div className="filter-bar">
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar por título..." />
            <SelectField label="" options={[{ value: "", label: "Todos status" }, { value: "PUBLICADA", label: "Publicadas" }, { value: "RASCUNHO", label: "Rascunhos" }, { value: "REVISAO", label: "Em Revisão" }]} value={statusFiltro} onChange={e => setStatusFiltro(e.target.value)} style={{ minWidth: 160 }} />
            <SelectField label="" options={[{ value: "", label: "Todas UFs" }, ...ufs.map(u => ({ value: u.sigla, label: u.sigla }))]} value={ufFiltro} onChange={e => setUfFiltro(e.target.value)} style={{ minWidth: 120 }} />
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>ID</th><th>Título</th><th>Autor</th><th>Status</th><th>Data</th><th>Views</th><th>Ações</th></tr></thead>
              <tbody>
                {lista.map(n => (
                  <tr key={n.id}>
                    <td style={{ color: "var(--gray-400)", fontSize: 12 }}>#{n.id}</td>
                    <td style={{ fontWeight: 600, maxWidth: 220 }}>{n.titulo.slice(0, 50)}{n.titulo.length > 50 ? "…" : ""}</td>
                    <td style={{ fontSize: 13 }}>{usuarios.find(u => u.id === n.autorId)?.nome}</td>
                    <td><StatusBadge status={n.status} /></td>
                    <td style={{ fontSize: 13 }}>{new Date(n.criadoEm).toLocaleDateString("pt-BR")}</td>
                    <td style={{ fontSize: 13 }}>{n.visualizacoes.toLocaleString()}</td>
                    <td>
                      <button className="action-btn view" onClick={() => nav("/noticia/" + n.id)}>👁</button>
                      <button className="action-btn edit" onClick={() => nav("/admin/noticias/" + n.id + "/editar")}>✏️</button>
                      <button className="action-btn publish" onClick={() => nav("/editor/publicar/" + n.id)}>{n.status === "PUBLICADA" ? "↓" : "📢"}</button>
                      <button className="action-btn delete" onClick={() => confirm("Excluir?")}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
