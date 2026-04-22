import { useState } from "react";
import { Link, NavLink } from "react-router";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-inner">
          <Link to="/" className="header-logo">
            <span className="logo-icon">📰</span>
            <span className="logo-text">Portal<strong>BR</strong></span>
          </Link>
          <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>Início</NavLink>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
            <NavLink to="/cadastro" onClick={() => setMenuOpen(false)}>Cadastro</NavLink>
          </nav>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className="header-ticker">
        <div className="container" style={{display:"flex",alignItems:"center",gap:"16px"}}>
          <span className="ticker-label">ÚLTIMAS</span>
          <span className="ticker-text">Reforma tributária aprovada &nbsp;·&nbsp; Seleção conquista Copa América &nbsp;·&nbsp; IA revoluciona diagnósticos médicos &nbsp;·&nbsp; Brasil sedia conferência climática &nbsp;·&nbsp; Reforma tributária aprovada &nbsp;·&nbsp; Seleção conquista Copa América</span>
        </div>
      </div>
    </header>
  );
}
