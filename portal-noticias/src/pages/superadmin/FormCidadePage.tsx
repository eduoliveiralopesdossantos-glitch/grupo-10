import { useParams, useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { Button, InputField } from "../../components/ui";
import "./Admin.css";

export default function FormCidadePage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const isEditing = !!id;
  return (
    <div className="page-wrapper">
      <Header />
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main" style={{maxWidth:600}}>
          <h1 className="page-title">{isEditing ? "Editar Cidade" : "Nova(o) Cidade"}</h1>
          <div className="perfil-card" style={{background:"white",borderRadius:"var(--radius-lg)",padding:28,boxShadow:"var(--shadow-sm)",border:"1px solid var(--gray-200)"}}>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <InputField label="Nome" placeholder="Nome" />
              <InputField label="UF" placeholder="UF" />
            </div>
            <div style={{display:"flex",gap:12,marginTop:20}}>
              <Button variant="primary" onClick={()=>nav("/admin/cidades")}>Salvar</Button>
              <Button variant="ghost" onClick={()=>nav("/admin/cidades")}>Cancelar</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
