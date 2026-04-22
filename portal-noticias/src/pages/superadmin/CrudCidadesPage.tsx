import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { Button, SearchBar } from "../../components/ui";
import "./Admin.css";

export default function CrudCidadesPage() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  return (
    <div className="page-wrapper">
      <Header />
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          <div className="admin-page-header">
            <div><h1 className="page-title">Cidades</h1></div>
            <Button variant="primary" onClick={() => nav("/admin/cidades/nova")}>+ Novo(a) Cidade</Button>
          </div>
          <div className="filter-bar"><SearchBar value={search} onChange={setSearch} placeholder="Buscar..." /></div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>ID</th><th>Nome</th><th>UF</th><th>Ações</th></tr></thead>
              <tbody>
                <tr><td colSpan={99} style={{textAlign:"center",padding:"40px",color:"var(--gray-400)"}}>(dados mockados — adicione itens)</td></tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
