import { useNavigate } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui";

export default function NotFoundPage() {
  const nav = useNavigate();
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "6rem", marginBottom: 16 }}>404</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--primary)", marginBottom: 12 }}>Página não encontrada</h1>
          <p style={{ color: "var(--gray-500)", marginBottom: 32 }}>A página que você procura não existe ou foi removida.</p>
          <Button variant="primary" size="lg" onClick={() => nav("/")}>← Voltar ao Início</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
