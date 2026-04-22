import { NavLink } from "react-router";
import "./AdminSidebar.css";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/ufs", label: "UFs", icon: "🗺️" },
  { to: "/admin/cidades", label: "Cidades", icon: "🏙️" },
  { to: "/admin/tags", label: "Tags", icon: "🏷️" },
  { to: "/admin/perfis", label: "Perfis", icon: "👥" },
  { to: "/admin/noticias", label: "Notícias", icon: "📰" },
  { to: "/admin/usuarios", label: "Usuários", icon: "👤" },
  { to: "/admin/comentarios", label: "Comentários", icon: "💬" },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <span>⚙️</span><span>SuperAdmin</span>
      </div>
      <nav className="sidebar-nav">
        {items.map(item => (
          <NavLink key={item.to} to={item.to} className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <NavLink to="/" className="sidebar-link">← Voltar ao Portal</NavLink>
      </div>
    </aside>
  );
}
