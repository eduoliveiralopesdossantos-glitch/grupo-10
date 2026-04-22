import "./ui.css";

// ── Button ──────────────────────────────────────────────
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}
export function Button({ variant = "primary", size = "md", fullWidth, className = "", children, ...rest }: BtnProps) {
  return (
    <button className={`btn btn-${variant} btn-${size} ${fullWidth ? "btn-full" : ""} ${className}`} {...rest}>
      {children}
    </button>
  );
}

// ── InputField ──────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function InputField({ label, error, className = "", id, ...rest }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={`field ${className}`}>
      {label && <label className="field-label" htmlFor={inputId}>{label}</label>}
      <input id={inputId} className={`field-input ${error ? "field-error" : ""}`} {...rest} />
      {error && <span className="field-msg">{error}</span>}
    </div>
  );
}

// ── SelectField ─────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string | number; label: string }[];
}
export function SelectField({ label, options, className = "", id, ...rest }: SelectProps) {
  const selId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={`field ${className}`}>
      {label && <label className="field-label" htmlFor={selId}>{label}</label>}
      <select id={selId} className="field-input" {...rest}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ── TextArea ─────────────────────────────────────────────
interface TAProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
export function TextArea({ label, className = "", id, ...rest }: TAProps) {
  const taId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={`field ${className}`}>
      {label && <label className="field-label" htmlFor={taId}>{label}</label>}
      <textarea id={taId} className="field-input field-textarea" {...rest} />
    </div>
  );
}

// ── TagBadge ─────────────────────────────────────────────
interface TagBadgeProps { nome: string; slug?: string; cor?: string; onClick?: () => void; size?: "sm" | "md" | "lg"; }
export function TagBadge({ nome, cor = "#6c757d", onClick, size = "md" }: TagBadgeProps) {
  return (
    <span
      className={`tag-badge tag-badge-${size} ${onClick ? "tag-badge-click" : ""}`}
      style={{ background: cor + "20", color: cor, border: `1px solid ${cor}40` }}
      onClick={onClick}
    >
      {nome}
    </span>
  );
}

// ── StatusBadge ──────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PUBLICADA: "badge-success", RASCUNHO: "badge-warning", REVISAO: "badge-info",
    APROVADO: "badge-success", PENDENTE: "badge-warning", REJEITADO: "badge-danger",
    ATIVO: "badge-success", INATIVO: "badge-danger",
  };
  const labels: Record<string, string> = {
    PUBLICADA: "Publicada", RASCUNHO: "Rascunho", REVISAO: "Em Revisão",
    APROVADO: "Aprovado", PENDENTE: "Pendente", REJEITADO: "Rejeitado",
    ATIVO: "Ativo", INATIVO: "Inativo",
  };
  return <span className={`badge ${map[status] || "badge-gray"}`}>{labels[status] || status}</span>;
}

// ── NoticiaCard ──────────────────────────────────────────
import { useNavigate } from "react-router";
import type { Noticia, Tag, Usuario } from "../../types";

interface CardProps { noticia: Noticia; tags: Tag[]; autor?: Usuario; }
export function NoticiaCard({ noticia, tags, autor }: CardProps) {
  const nav = useNavigate();
  const noticiaTag = tags.filter(t => noticia.tags.includes(t.id));
  return (
    <article className="noticia-card" onClick={() => nav(`/noticia/${noticia.id}`)}>
      <div className="card-img-wrap">
        <img src={noticia.imagemCapa} alt={noticia.titulo} className="card-img" loading="lazy" />
        {noticiaTag[0] && <TagBadge nome={noticiaTag[0].nome} cor={noticiaTag[0].cor} size="sm" />}
      </div>
      <div className="card-body">
        <h3 className="card-title">{noticia.titulo}</h3>
        <p className="card-sub">{noticia.subtitulo}</p>
        <div className="card-meta">
          {autor && <span className="card-author">✍️ {autor.nome}</span>}
          <span className="card-date">📅 {new Date(noticia.criadoEm).toLocaleDateString("pt-BR")}</span>
          <span className="card-views">👁 {noticia.visualizacoes.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}

// ── ComentarioItem ───────────────────────────────────────
import type { Comentario } from "../../types";

interface CIProps { comentario: Comentario; autor?: Usuario; onAprovar?: () => void; onRejeitar?: () => void; onExcluir?: () => void; }
export function ComentarioItem({ comentario, autor, onAprovar, onRejeitar, onExcluir }: CIProps) {
  const initials = autor?.nome.split(" ").map(n => n[0]).slice(0,2).join("") || "?";
  return (
    <div className="comentario-item">
      <div className="avatar" style={{background:"var(--primary)"}}>{initials}</div>
      <div className="comentario-body">
        <div className="comentario-header">
          <strong>{autor?.nome || "Usuário"}</strong>
          <span className="comentario-date">{new Date(comentario.criadoEm).toLocaleDateString("pt-BR")}</span>
          <StatusBadge status={comentario.status} />
        </div>
        <p className="comentario-text">{comentario.texto}</p>
        {(onAprovar || onRejeitar || onExcluir) && (
          <div className="comentario-actions">
            {onAprovar && <button className="action-btn publish" onClick={onAprovar}>✓ Aprovar</button>}
            {onRejeitar && <button className="action-btn unpublish" onClick={onRejeitar}>✗ Rejeitar</button>}
            {onExcluir && <button className="action-btn delete" onClick={onExcluir}>🗑 Excluir</button>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SearchBar ────────────────────────────────────────────
interface SBProps { value: string; onChange: (v: string) => void; placeholder?: string; }
export function SearchBar({ value, onChange, placeholder = "Buscar..." }: SBProps) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="search-input" />
    </div>
  );
}
