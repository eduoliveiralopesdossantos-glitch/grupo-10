import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Button, InputField } from "../../components/ui";
import "./AuthPages.css";

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content auth-bg">
        <div className="auth-card">
          <div className="auth-logo">📰 Portal<strong>BR</strong></div>
          <h2 className="auth-title">Entrar na sua conta</h2>

          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <InputField label="E-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" />
            <InputField label="Senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="••••••••" />
            <label className="checkbox-label">
              <input type="checkbox" checked={lembrar} onChange={e=>setLembrar(e.target.checked)} />
              Lembrar-me
            </label>
            <Button variant="primary" size="lg" fullWidth onClick={() => nav("/leitor/perfil")}>Entrar</Button>
            <div style={{textAlign:"center",fontSize:14,color:"var(--gray-600)"}}>
              <Link to="/lembrar-senha" style={{color:"var(--accent)"}}>Esqueci minha senha</Link>
              &nbsp;·&nbsp;
              <Link to="/cadastro" style={{color:"var(--accent)"}}>Criar conta</Link>
            </div>
          </div>

          <div className="quick-access">
            <p className="quick-access-title">⚡ Acesso Rápido (Desenvolvimento)</p>
            <div className="quick-access-grid">
              <button className="quick-btn" onClick={() => nav("/leitor/perfil")}>LEITOR</button>
              <button className="quick-btn" onClick={() => nav("/autor/noticias")}>AUTOR</button>
              <button className="quick-btn" onClick={() => nav("/editor/painel")}>EDITOR</button>
              <button className="quick-btn" onClick={() => nav("/admin/dashboard")}>SUPERADMIN</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
