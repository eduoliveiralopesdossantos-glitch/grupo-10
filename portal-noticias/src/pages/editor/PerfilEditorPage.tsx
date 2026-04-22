import { useState } from "react";
import Header from "../../components/layout/Header";
import EditorSidebar from "../../components/layout/EditorSidebar";
import { Button, InputField, TextArea, SelectField } from "../../components/ui";
import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import "../leitor/Leitor.css";
import "./Editor.css";

const user = usuarios.find(u => u.perfil === "EDITOR")!;

export default function PerfilEditorPage() {
  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState(user.nome);
  const [bio, setBio] = useState(user.bio || "");
  const cidade = cidades.find(c => c.id === user.cidadeId);
  const uf = ufs.find(u => u.id === cidade?.ufId);

  return (
    <div className="page-wrapper">
      <Header />
      <div className="editor-layout">
        <EditorSidebar />
        <main className="editor-main">
          <div className="perfil-card">
            <div className="perfil-header-section">
              <div className="avatar avatar-xl">{nome.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}</div>
              <div className="perfil-info">
                {editing ? <InputField value={nome} onChange={e => setNome(e.target.value)} /> : <h1 className="perfil-nome">{nome}</h1>}
                <p className="perfil-email">{user.email}</p>
                <p className="perfil-local">📍 {cidade?.nome}, {uf?.sigla}</p>
              </div>
            </div>
            {editing ? (
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <TextArea label="Bio" value={bio} onChange={e => setBio(e.target.value)} rows={3} />
                <SelectField label="UF" options={[{ value: "", label: "Selecione" }, ...ufs.map(u => ({ value: u.id, label: u.sigla + " — " + u.nome }))]} />
                <div style={{ display: "flex", gap: 12 }}>
                  <Button variant="primary" onClick={() => setEditing(false)}>Salvar</Button>
                  <Button variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 16 }}>
                <p className="perfil-bio">{bio || "Sem bio."}</p>
                <Button variant="outline" size="sm" style={{ marginTop: 16 }} onClick={() => setEditing(true)}>✏️ Editar Perfil</Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
