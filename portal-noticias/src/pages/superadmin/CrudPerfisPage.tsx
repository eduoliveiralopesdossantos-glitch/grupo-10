import Header from "../../components/layout/Header";
import AdminSidebar from "../../components/layout/AdminSidebar";
import "./Admin.css";

const perfis = [
  { nome: "LEITOR", cor: "#0891b2", desc: "Pode ler notícias, fazer comentários e gerenciar seu perfil.", perms: ["Ler notícias", "Comentar", "Editar perfil próprio"] },
  { nome: "AUTOR", cor: "#16a34a", desc: "Pode criar, editar e enviar notícias para revisão.", perms: ["Tudo do Leitor", "Criar notícias", "Editar notícias próprias"] },
  { nome: "EDITOR", cor: "#d97706", desc: "Pode publicar, despublicar e editar qualquer notícia.", perms: ["Tudo do Autor", "Publicar/Despublicar", "Editar qualquer notícia"] },
  { nome: "SUPERADMIN", cor: "var(--accent)", desc: "Acesso total ao sistema. Gerencia todos os recursos.", perms: ["Tudo do Editor", "CRUD completo", "Gerenciar usuários e comentários"] },
];

export default function CrudPerfisPage() {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          <h1 className="page-title">Perfis de Acesso</h1>
          <p className="page-subtitle">Visão geral dos perfis do sistema (somente leitura)</p>
          <div className="perfil-roles-grid">
            {perfis.map(p => (
              <div key={p.nome} className="perfil-role-card" style={{ borderTopColor: p.cor }}>
                <h3 className="perfil-role-name" style={{ color: p.cor }}>{p.nome}</h3>
                <p className="perfil-role-desc">{p.desc}</p>
                <ul style={{ paddingLeft: 16, fontSize: 13, color: "var(--gray-600)", marginBottom: 12 }}>
                  {p.perms.map(perm => <li key={perm}>{perm}</li>)}
                </ul>
                <div className="perfil-role-count" style={{ color: p.cor }}>
                  {[2, 5, 3, 2][[perfis.findIndex(x => x.nome === p.nome)]]} usuários
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
