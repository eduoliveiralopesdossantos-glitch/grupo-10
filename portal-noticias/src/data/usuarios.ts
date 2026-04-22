import { Usuario } from "../types";
export const usuarios: Usuario[] = [
  { id: 1, nome: "Ana Ferreira", email: "ana@leitor.com", perfil: "LEITOR", bio: "Apaixonada por notícias e boa leitura.", cidadeId: 1, ativo: true, criadoEm: "2024-01-10" },
  { id: 2, nome: "Bruno Lima", email: "bruno@leitor.com", perfil: "LEITOR", bio: "Curioso por natureza.", cidadeId: 4, ativo: true, criadoEm: "2024-02-15" },
  { id: 3, nome: "Carla Souza", email: "carla@leitor.com", perfil: "LEITOR", bio: "Professora e leitora assídua.", cidadeId: 6, ativo: true, criadoEm: "2024-02-20" },
  { id: 4, nome: "Diego Matos", email: "diego@leitor.com", perfil: "LEITOR", cidadeId: 10, ativo: false, criadoEm: "2024-03-01" },
  { id: 5, nome: "Eduarda Nunes", email: "edu@leitor.com", perfil: "LEITOR", bio: "Fã de cultura e arte.", cidadeId: 11, ativo: true, criadoEm: "2024-03-12" },
  { id: 6, nome: "Fábio Alves", email: "fabio@autor.com", perfil: "AUTOR", bio: "Jornalista freelancer com 5 anos de experiência em política e economia.", cidadeId: 1, ativo: true, criadoEm: "2023-11-05" },
  { id: 7, nome: "Gabriela Costa", email: "gabi@autor.com", perfil: "AUTOR", bio: "Repórter especializada em tecnologia e inovação.", cidadeId: 4, ativo: true, criadoEm: "2023-12-01" },
  { id: 8, nome: "Henrique Rocha", email: "henrique@autor.com", perfil: "AUTOR", bio: "Esportista e cronista esportivo.", cidadeId: 13, ativo: true, criadoEm: "2024-01-20" },
  { id: 9, nome: "Isabela Martins", email: "isa@autor.com", perfil: "AUTOR", bio: "Correspondente internacional.", cidadeId: 10, ativo: true, criadoEm: "2024-02-08" },
  { id: 10, nome: "João Pedro Silva", email: "jp@autor.com", perfil: "AUTOR", bio: "Cobertura de meio ambiente e sustentabilidade.", cidadeId: 8, ativo: false, criadoEm: "2024-02-28" },
  { id: 11, nome: "Karine Oliveira", email: "karine@editor.com", perfil: "EDITOR", bio: "Editora sênior com 10 anos de redação.", cidadeId: 1, ativo: true, criadoEm: "2023-06-15" },
  { id: 12, nome: "Leonardo Borges", email: "leo@editor.com", perfil: "EDITOR", bio: "Editor de conteúdo digital.", cidadeId: 4, ativo: true, criadoEm: "2023-08-20" },
  { id: 13, nome: "Mariana Fonseca", email: "mari@editor.com", perfil: "EDITOR", bio: "Chefe de edição do caderno de cultura.", cidadeId: 11, ativo: true, criadoEm: "2023-09-10" },
  { id: 14, nome: "Nelson Cardoso", email: "nelson@admin.com", perfil: "SUPERADMIN", bio: "Administrador do sistema.", cidadeId: 1, ativo: true, criadoEm: "2023-01-01" },
  { id: 15, nome: "Olivia Teixeira", email: "olivia@admin.com", perfil: "SUPERADMIN", bio: "Co-administradora e gestora de conteúdo.", cidadeId: 10, ativo: true, criadoEm: "2023-01-15" },
];
