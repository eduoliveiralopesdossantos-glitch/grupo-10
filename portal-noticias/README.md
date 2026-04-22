# Portal de Notícias — Grupo 10

Portal de Notícias desenvolvido em React + TypeScript + React Router v7 com CSS puro.

## Tecnologias

- React 19
- TypeScript
- React Router v7
- Vite
- CSS Puro (sem frameworks de UI)

## Instalação e execução

```bash
cd portal-noticias
npm install
npm run dev
```

Acesse: http://localhost:5173

## Estrutura de pastas

```
src/
├── components/
│   ├── layout/     → Header, Footer, AdminSidebar, EditorSidebar
│   └── ui/         → Button, InputField, SelectField, TextArea, TagBadge, etc.
├── pages/
│   ├── publico/    → 7 páginas (Home, Login, Cadastro, etc.)
│   ├── leitor/     → 2 páginas
│   ├── autor/      → 5 páginas
│   ├── editor/     → 4 páginas
│   └── superadmin/ → 17 páginas
├── data/           → Mocks: ufs, cidades, tags, usuarios, noticias, comentarios
├── types/          → Interfaces TypeScript
└── App.tsx         → BrowserRouter + todas as Routes
```

## Perfis e acesso rápido

Na página de Login existem botões de acesso rápido (borda vermelha):

| Perfil | Rota inicial |
|--------|-------------|
| LEITOR | /leitor/perfil |
| AUTOR | /autor/noticias |
| EDITOR | /editor/painel |
| SUPERADMIN | /admin/dashboard |

## Rotas (35 páginas)

### Público (7)
`/` · `/login` · `/cadastro` · `/lembrar-senha` · `/busca/uf/:sigla` · `/busca/tag/:slug` · `/noticia/:id`

### Leitor (2)
`/leitor/perfil` · `/leitor/comentar/:noticiaId`

### Autor (5)
`/autor/perfil` · `/autor/noticias` · `/autor/noticias/nova` · `/autor/noticias/:id/editar` · `/autor/comentar/:noticiaId`

### Editor (4)
`/editor/painel` · `/editor/perfil` · `/editor/publicar/:id` · `/editor/noticias/:id/editar`

### SuperAdmin (17)
`/admin/dashboard` · `/admin/ufs` · `/admin/ufs/nova` · `/admin/ufs/:id/editar` · `/admin/cidades` · `/admin/cidades/nova` · `/admin/cidades/:id/editar` · `/admin/tags` · `/admin/tags/nova` · `/admin/tags/:id/editar` · `/admin/perfis` · `/admin/noticias` · `/admin/noticias/:id/editar` · `/admin/usuarios` · `/admin/usuarios/:id/editar` · `/admin/comentarios`
