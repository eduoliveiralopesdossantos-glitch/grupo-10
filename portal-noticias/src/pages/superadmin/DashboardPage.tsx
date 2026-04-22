import { useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { StatusBadge, ComentarioItem } from "../../components/ui";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { comentarios } from "../../data/comentarios";
import { tags } from "../../data/tags";
import "./Admin.css";

export default function DashboardPage() {
  const nav = useNavigate();
  const publicadas = noticias.filter(n => n.status === "PUBLICADA");
  const rascunhos = noticias.filter(n => n.status === "RASCUNHO");
  const revisao = noticias.filter(n => n.status === "REVISAO");
  const pendentes = comentarios.filter(c => c.status === "PENDENTE");
  const autores = usuarios.filter(u => u.perfil === "AUTOR");

  const metrics = [
    { icon: "👤", val: usuarios.length, label: "Usuários", color: "#1d4ed8" },
    { icon: "✅", val: publicadas.length, label: "Publicadas", color: "var(--success)" },
    { icon: "📝", val: rascunhos.length, label: "Rascunhos", color: "var(--warning)" },
    { icon: "💬", val: comentarios.length, label: "Comentários", color: "#0891b2" },
    { icon: "🗺️", val: 27, label: "UFs", color: "#7c3aed" },
    { icon: "🏷️", val: tags.length, label: "Tags", color: "var(--accent)" },
  ];

  const tagCounts = tags.map(t => ({ tag: t, count: noticias.filter(n => n.tags.includes(t.id)).length }));
  const maxCount = Math.max(...tagCounts.map(t => t.count));

  return (
    <div className="page-wrapper">
      <Header />
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          <h1 className="page-title">Dashboard</h1>
          <div className="grid-4" style={{ marginBottom: 32 }}>
            {metrics.map(m => (
              <div key={m.label} className="metric-card" style={{ borderLeftColor: m.color }}>
                <div className="metric-icon" style={{ background: m.color + "20" }}>{m.icon}</div>
                <div className="metric-info"><div className="metric-number">{m.val}</div><div className="metric-label">{m.label}</div></div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            <div className="table-wrap" style={{ padding: 20 }}>
              <h3 style={{ fontFamily: "var(--font-condensed)", fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "var(--gray-600)", marginBottom: 16, borderBottom: "2px solid var(--accent)", paddingBottom: 8 }}>Notícias por Tag</h3>
              <div className="bar-chart">
                {tagCounts.sort((a, b) => b.count - a.count).map(({ tag, count }) => (
                  <div key={tag.id} className="bar-item">
                    <span className="bar-label">{tag.nome}</span>
                    <div className="bar-track"><div className="bar-fill" style={{ width: (count / maxCount * 100) + "%", background: tag.cor }}>{count}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="table-wrap" style={{ padding: 20 }}>
              <h3 style={{ fontFamily: "var(--font-condensed)", fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "var(--gray-600)", marginBottom: 16, borderBottom: "2px solid var(--accent)", paddingBottom: 8 }}>Notícias por Mês</h3>
              <div className="vbar-chart">
                {["Jan","Fev","Mar","Abr","Mai","Jun"].map((m, i) => (
                  <div key={m} className="vbar-item">
                    <span style={{ fontSize: 11, color: "var(--gray-500)" }}>{3 + i}</span>
                    <div className="vbar-fill" style={{ height: (30 + i * 15) + "px" }}></div>
                    <span className="vbar-label">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-condensed)", fontSize: 14, textTransform: "uppercase", letterSpacing: 1, color: "var(--gray-600)", marginBottom: 16, borderBottom: "2px solid var(--accent)", paddingBottom: 8 }}>📰 Notícias Pendentes de Revisão</h2>
              <div className="table-wrap">
                {revisao.length === 0 ? <div style={{ padding: 20, color: "var(--gray-500)", textAlign: "center" }}>Nenhuma pendente</div> : (
                  <table className="data-table">
                    <thead><tr><th>Título</th><th>Autor</th><th>Data</th><th>Ações</th></tr></thead>
                    <tbody>
                      {revisao.slice(0, 5).map(n => (
                        <tr key={n.id}>
                          <td style={{ fontWeight: 600, fontSize: 13 }}>{n.titulo.slice(0, 40)}...</td>
                          <td style={{ fontSize: 13 }}>{usuarios.find(u => u.id === n.autorId)?.nome}</td>
                          <td style={{ fontSize: 13 }}>{new Date(n.criadoEm).toLocaleDateString("pt-BR")}</td>
                          <td>
                            <button className="action-btn publish" onClick={() => nav("/editor/publicar/" + n.id)}>📢</button>
                            <button className="action-btn delete">✗</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-condensed)", fontSize: 14, textTransform: "uppercase", letterSpacing: 1, color: "var(--gray-600)", marginBottom: 16, borderBottom: "2px solid var(--accent)", paddingBottom: 8 }}>💬 Comentários para Moderar</h2>
              {pendentes.slice(0, 3).map(c => (
                <ComentarioItem key={c.id} comentario={c} autor={usuarios.find(u => u.id === c.autorId)}
                  onAprovar={() => {}} onRejeitar={() => {}} onExcluir={() => {}} />
              ))}
            </div>
          </div>

          <h2 style={{ fontFamily: "var(--font-condensed)", fontSize: 14, textTransform: "uppercase", letterSpacing: 1, color: "var(--gray-600)", marginBottom: 16, borderBottom: "2px solid var(--accent)", paddingBottom: 8 }}>👤 Últimos Usuários</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Usuário</th><th>E-mail</th><th>Perfil</th><th>Data</th></tr></thead>
              <tbody>
                {[...usuarios].sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()).slice(0, 5).map(u => (
                  <tr key={u.id}>
                    <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div className="avatar">{u.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}</div>{u.nome}</div></td>
                    <td style={{ fontSize: 13, color: "var(--gray-500)" }}>{u.email}</td>
                    <td><span className="badge badge-info">{u.perfil}</span></td>
                    <td style={{ fontSize: 13 }}>{new Date(u.criadoEm).toLocaleDateString("pt-BR")}</td>
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
