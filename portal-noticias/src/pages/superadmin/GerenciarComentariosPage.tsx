import { useState } from "react";
import Header from "../../components/layout/Header";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { SearchBar, SelectField, ComentarioItem, Button } from "../../components/ui";
import { comentarios as comentariosData } from "../../data/comentarios";
import { usuarios } from "../../data/usuarios";
import { noticias } from "../../data/noticias";
import { Link } from "react-router";
import "./Admin.css";

export default function GerenciarComentariosPage() {
  const [search, setSearch] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [selecionados, setSelecionados] = useState<number[]>([]);

  const lista = comentariosData
    .filter(c => !search || c.texto.toLowerCase().includes(search.toLowerCase()))
    .filter(c => !statusFiltro || c.status === statusFiltro);

  const toggleSel = (id: number) => setSelecionados(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="page-wrapper">
      <Header />
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          <h1 className="page-title">Gerenciar Comentários</h1>
          <div className="filter-bar">
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar no texto..." />
            <SelectField label="" options={[{ value: "", label: "Todos status" }, { value: "APROVADO", label: "Aprovados" }, { value: "PENDENTE", label: "Pendentes" }]} value={statusFiltro} onChange={e => setStatusFiltro(e.target.value)} style={{ minWidth: 160 }} />
          </div>
          {selecionados.length > 0 && (
            <div style={{ display: "flex", gap: 12, marginBottom: 16, padding: 12, background: "var(--gray-100)", borderRadius: "var(--radius)" }}>
              <span style={{ fontSize: 14, color: "var(--gray-600)" }}>{selecionados.length} selecionado(s):</span>
              <Button variant="success" size="sm" onClick={() => setSelecionados([])}>✓ Aprovar Selecionados</Button>
              <Button variant="danger" size="sm" onClick={() => setSelecionados([])}>🗑 Excluir Selecionados</Button>
            </div>
          )}
          <div>
            {lista.map(c => {
              const noticia = noticias.find(n => n.id === c.noticiaId);
              return (
                <div key={c.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <input type="checkbox" checked={selecionados.includes(c.id)} onChange={() => toggleSel(c.id)} style={{ marginTop: 18 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "var(--gray-400)", marginBottom: 4 }}>
                      Em: <Link to={"/noticia/" + noticia?.id} style={{ color: "var(--accent)" }}>{noticia?.titulo}</Link>
                    </div>
                    <ComentarioItem comentario={c} autor={usuarios.find(u => u.id === c.autorId)}
                      onAprovar={() => {}} onRejeitar={() => {}} onExcluir={() => {}} />
                  </div>
                </div>
              );
            })}
            {lista.length === 0 && <div className="empty-state"><h3>Nenhum comentário encontrado</h3></div>}
          </div>
        </main>
      </div>
    </div>
  );
}
