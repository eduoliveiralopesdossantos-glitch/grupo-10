import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { SearchBar, SelectField } from "../../components/ui";
import { usuarios } from "../../data/usuarios";
import "./Admin.css";

export default function CrudUsuariosPage() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [perfilFiltro, setPerfilFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");

  const lista = usuarios
    .filter(u => !search || u.nome.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    .filter(u => !perfilFiltro || u.perfil === perfilFiltro)
    .filter(u => !statusFiltro || (statusFiltro === "ATIVO" ? u.ativo : !u.ativo));

  return (
    <div className="page-wrapper">
      <Header />
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          <h1 className="page-title">Usuários</h1>
          <div className="filter-bar">
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nome ou e-mail..." />
            <SelectField label="" options={[{ value: "", label: "Todos perfis" }, { value: "LEITOR", label: "Leitor" }, { value: "AUTOR", label: "Autor" }, { value: "EDITOR", label: "Editor" }, { value: "SUPERADMIN", label: "SuperAdmin" }]} value={perfilFiltro} onChange={e => setPerfilFiltro(e.target.value)} style={{ minWidth: 160 }} />
            <SelectField label="" options={[{ value: "", label: "Todos status" }, { value: "ATIVO", label: "Ativos" }, { value: "INATIVO", label: "Inativos" }]} value={statusFiltro} onChange={e => setStatusFiltro(e.target.value)} style={{ minWidth: 140 }} />
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Usuário</th><th>E-mail</th><th>Perfil</th><th>Status</th><th>Cadastro</th><th>Ações</th></tr></thead>
              <tbody>
                {lista.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="avatar">{u.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}</div>
                        <span style={{ fontWeight: 600 }}>{u.nome}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 13, color: "var(--gray-500)" }}>{u.email}</td>
                    <td><span className="badge badge-info">{u.perfil}</span></td>
                    <td><span className={"badge " + (u.ativo ? "badge-success" : "badge-danger")}>{u.ativo ? "Ativo" : "Inativo"}</span></td>
                    <td style={{ fontSize: 13 }}>{new Date(u.criadoEm).toLocaleDateString("pt-BR")}</td>
                    <td>
                      <button className="action-btn edit" onClick={() => nav("/admin/usuarios/" + u.id + "/editar")}>✏️</button>
                      <button className="action-btn" style={{ color: u.ativo ? "var(--warning)" : "var(--success)" }}>{u.ativo ? "🚫" : "✅"}</button>
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
