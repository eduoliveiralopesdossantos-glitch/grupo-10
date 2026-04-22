import { useState } from "react";
import { Link } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Button, InputField, TextArea, SelectField } from "../../components/ui";
import { usuarios } from "../../data/usuarios";
import { comentarios } from "../../data/comentarios";
import { noticias } from "../../data/noticias";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import "./Leitor.css";

const user = usuarios.find(u => u.perfil === "LEITOR")!;

export default function PerfilLeitorPage() {
  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState(user.nome);
  const [bio, setBio] = useState(user.bio || "");
  const cidade = cidades.find(c => c.id === user.cidadeId);
  const uf = ufs.find(u => u.id === cidade?.ufId);
  const meusComentarios = comentarios.filter(c => c.autorId === user.id);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="perfil-layout">
            <div className="perfil-main">
              <div className="perfil-card">
                <div className="perfil-header-section">
                  <div className="avatar avatar-xl">{nome.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}</div>
                  <div className="perfil-info">
                    {editing ? <InputField value={nome} onChange={e => setNome(e.target.value)} /> : <h1 className="perfil-nome">{nome}</h1>}
                    <p className="perfil-email">{user.email}</p>
                    <p className="perfil-local">📍 {cidade?.nome}, {uf?.sigla}</p>
                    <p className="perfil-since">Membro desde {new Date(user.criadoEm).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</p>
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
                    <p className="perfil-bio">{bio || "Sem bio cadastrada."}</p>
                    <Button variant="outline" size="sm" style={{ marginTop: 16 }} onClick={() => setEditing(true)}>✏️ Editar Perfil</Button>
                  </div>
                )}
              </div>
              <div className="perfil-card">
                <h2 className="card-section-title">💬 Meus Comentários</h2>
                {meusComentarios.length === 0
                  ? <p style={{ color: "var(--gray-500)", fontSize: 14 }}>Nenhum comentário ainda.</p>
                  : meusComentarios.map(c => {
                      const noticia = noticias.find(n => n.id === c.noticiaId);
                      return (
                        <div key={c.id} className="comentario-resumo">
                          <p className="comentario-trecho">"{c.texto.slice(0, 100)}{c.texto.length > 100 ? "…" : ""}"</p>
                          <div className="comentario-meta">Em: <Link to={"/noticia/" + noticia?.id} style={{ color: "var(--accent)" }}>{noticia?.titulo}</Link> · {new Date(c.criadoEm).toLocaleDateString("pt-BR")}</div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
