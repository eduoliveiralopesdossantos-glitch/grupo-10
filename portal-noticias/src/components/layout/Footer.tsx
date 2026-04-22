import { Link } from "react-router";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">📰 Portal<strong>BR</strong></div>
          <p>O portal de notícias mais completo do Brasil. Informação de qualidade para todos.</p>
        </div>
        <div className="footer-links">
          <h4>Seções</h4>
          <Link to="/busca/tag/politica">Política</Link>
          <Link to="/busca/tag/esportes">Esportes</Link>
          <Link to="/busca/tag/tecnologia">Tecnologia</Link>
          <Link to="/busca/tag/economia">Economia</Link>
          <Link to="/busca/tag/saude">Saúde</Link>
        </div>
        <div className="footer-links">
          <h4>Portal</h4>
          <Link to="/cadastro">Criar Conta</Link>
          <Link to="/login">Entrar</Link>
          <Link to="/">Sobre</Link>
          <Link to="/">Contato</Link>
          <Link to="/">Termos de Uso</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">© 2025 PortalBR — Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}
