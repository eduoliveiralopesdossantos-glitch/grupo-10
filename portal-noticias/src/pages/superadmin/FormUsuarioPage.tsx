import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import Header from "../../components/layout/Header";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { Button, InputField, SelectField, TextArea } from "../../components/ui";
import { usuarios } from "../../data/usuarios";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import "./Admin.css";

export default function FormUsuarioPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const user = usuarios.find(u => u.id === Number(id));
  const [ufId, setUfId] = useState("");
  const cidsFiltradas = ufId ? cidades.filter(c => c.ufId === Number(ufId)) : [];
  const [ativo, setAtivo] = useState(user?.ativo ?? true);

  return (
    <div className="page-wrapper">
      <Header />
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main" style={{ maxWidth: 600 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h1 className="page-title">Editar Usuário</h1>
            <Button variant="ghost" onClick={() => nav("/admin/usuarios")}>← Voltar</Button>
          </div>
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", padding: 28, boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-200)", display: "flex", flexDirection: "column", gap: 16 }}>
            <InputField label="Nome" defaultValue={user?.nome} placeholder="Nome completo" />
            <InputField label="E-mail" defaultValue={user?.email} readOnly style={{ background: "var(--gray-100)" }} />
            <SelectField label="Perfil" options={[{ value: "LEITOR", label: "Leitor" }, { value: "AUTOR", label: "Autor" }, { value: "EDITOR", label: "Editor" }, { value: "SUPERADMIN", label: "SuperAdmin" }]} defaultValue={user?.perfil} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <SelectField label="UF" options={[{ value: "", label: "Selecione" }, ...ufs.map(u => ({ value: u.id, label: u.sigla + " — " + u.nome }))]} value={ufId} onChange={e => setUfId(e.target.value)} />
              <SelectField label="Cidade" options={[{ value: "", label: "Selecione a UF" }, ...cidsFiltradas.map(c => ({ value: c.id, label: c.nome }))]} />
            </div>
            <TextArea label="Bio" defaultValue={user?.bio} rows={3} />
            <label className="checkbox-label">
              <input type="checkbox" checked={ativo} onChange={e => setAtivo(e.target.checked)} />
              Usuário ativo
            </label>
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant="primary" onClick={() => nav("/admin/usuarios")}>Salvar</Button>
              <Button variant="ghost" onClick={() => nav("/admin/usuarios")}>Cancelar</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
