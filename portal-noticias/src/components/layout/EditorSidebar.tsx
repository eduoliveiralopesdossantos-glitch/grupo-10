import { NavLink } from "react-router";

export default function EditorSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header"><span>✏️</span><span>Editor</span></div>
      <nav className="sidebar-nav">
        <NavLink to="/editor/painel" className={({isActive})=>isActive?"sidebar-link active":"sidebar-link"}><span className="sidebar-icon">📋</span>Painel</NavLink>
        <NavLink to="/editor/perfil" className={({isActive})=>isActive?"sidebar-link active":"sidebar-link"}><span className="sidebar-icon">👤</span>Meu Perfil</NavLink>
      </nav>
      <div className="sidebar-footer"><NavLink to="/" className="sidebar-link">← Voltar ao Portal</NavLink></div>
    </aside>
  );
}
