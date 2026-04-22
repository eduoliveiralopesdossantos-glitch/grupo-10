import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Button, InputField, SelectField, TextArea } from "../../components/ui";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import "./AuthPages.css";

export default function CadastroPage() {
  const nav = useNavigate();
  const [ufId, setUfId] = useState("");
  const cidsFiltradas = ufId ? cidades.filter(c => c.ufId === Number(ufId)) : [];

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content auth-bg">
        <div className="auth-card auth-card-wide">
          <div className="auth-logo">📰 Portal<strong>BR</strong></div>
          <h2 className="auth-title">Criar Conta</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <InputField label="Nome Completo" placeholder="João Silva" style={{gridColumn:"1/-1"}} />
            <InputField label="E-mail" type="email" placeholder="seu@email.com" style={{gridColumn:"1/-1"}} />
            <InputField label="Senha" type="password" placeholder="••••••••" />
            <InputField label="Confirmar Senha" type="password" placeholder="••••••••" />
            <SelectField label="UF" options={[{value:"",label:"Selecione"}, ...ufs.map(u=>({value:u.id,label:`${u.sigla} — ${u.nome}`}))]} onChange={e=>setUfId(e.target.value)} />
            <SelectField label="Cidade" options={[{value:"",label:"Selecione a UF"}, ...cidsFiltradas.map(c=>({value:c.id,label:c.nome}))]} />
            <div style={{gridColumn:"1/-1"}}>
              <TextArea label="Bio (opcional)" placeholder="Conte um pouco sobre você..." rows={3} />
            </div>
          </div>
          <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:12}}>
            <Button variant="primary" size="lg" fullWidth onClick={() => nav("/login")}>Criar Conta</Button>
            <p style={{textAlign:"center",fontSize:14,color:"var(--gray-600)"}}>Já tem conta? <Link to="/login" style={{color:"var(--accent)"}}>Faça login</Link></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
