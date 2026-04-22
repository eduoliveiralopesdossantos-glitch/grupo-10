import { useState } from "react";
import { Link } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Button, InputField } from "../../components/ui";
import "./AuthPages.css";

export default function LembrarSenhaPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content auth-bg">
        <div className="auth-card">
          <div className="auth-logo">🔐</div>
          <h2 className="auth-title">Recuperar Senha</h2>
          <p style={{textAlign:"center",color:"var(--gray-600)",marginBottom:24,fontSize:15}}>
            Digite seu e-mail para receber o link de redefinição.
          </p>
          {sent ? (
            <div className="alert alert-success" style={{textAlign:"center"}}>
              ✅ E-mail enviado! Verifique sua caixa de entrada.
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <InputField label="E-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" />
              <Button variant="primary" size="lg" fullWidth onClick={() => setSent(true)}>Enviar Link</Button>
            </div>
          )}
          <p style={{textAlign:"center",marginTop:20,fontSize:14}}>
            <Link to="/login" style={{color:"var(--accent)"}}>← Voltar para o Login</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
