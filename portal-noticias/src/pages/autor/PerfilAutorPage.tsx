import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Button, InputField, TextArea, SelectField } from "../../components/ui";
import { usuarios } from "../../data/usuarios";
import { noticias } from "../../data/noticias";
import { comentarios } from "../../data/comentarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import "../leitor/Leitor.css";
import "./Autor.css";

const user = usuarios.find(u => u.perfil === "AUTOR")!;

export default function PerfilAutorPage() {
  const nav = useNavigate();
  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState(user.nome);
  const [bio, setBio] = useState(user.bio || "");
  const cidade = cidades.find(c => c.id === user.cidadeId);
  const uf = ufs.find(u => u.id === cidade?.ufId);
  const minhasNoticias = noticias.filter(n => n.autorId === user.id);
  const publicadas = minhasNoticias.filter(n => n.status === "PUBLICADA");
  const rascunhos = minhasNoticias.filter(n => n.status === "RASCUNHO");
  const totalViews = publicadas.reduce((s, n) => s + n.visualizacoes, 0);
  const totalComents = comentarios.filter(c => minhasNoticias.some(n => n.id === c.noticiaId)).length;

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="stats-grid" style={{ marginBottom: 24 }}>
            {[["📰", minhasNoticias.length, "Total Notícias"], ["✅", publicadas.length, "Publicadas"], ["📝", rascunhos.length, "Rascunhos"], ["👁", totalViews.toLocaleString(), "Visualizações"], ["💬", totalComents, "Comentários"]].map(([icon, val, label]) => (
              <div key={String(label)} className="stat-card"><div className="stat-number">{icon} {val}</div><div className="stat-label">{label}</div></div>
            ))}
          </div>
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
                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  <Button variant="outline" size="sm" onClick={() => setEditing(true)}>✏️ Editar Perfil</Button>
                  <Button variant="primary" size="sm" onClick={() => nav("/autor/noticias")}>📰 Minhas Notícias</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
