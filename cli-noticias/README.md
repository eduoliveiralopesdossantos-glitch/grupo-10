# CLI Notícias — TypeScript + Drizzle ORM + SQLite

## Tecnologias
- **Linguagem:** TypeScript
- **Interface:** CLI (linha de comando)
- **Banco de dados:** SQLite (via sql.js)
- **ORM:** Drizzle ORM

## Instalação

```bash
npm install
```

## Executar

```bash
npm start
```

## Menu Principal

```
0 - Cadastrar notícia
1 - Exibir todas as notícias (mais recentes primeiro)
2 - Exibir todas as notícias (mais antigas primeiro)
3 - Exibir notícias de um estado específico
4 - Exibir todas as notícias agrupadas por estado
5 - Cadastrar UF
6 - Cadastrar cidade
7 - Sair
```

## Estrutura do Banco

```
uf      (id, nome, sigla)
cidade  (id, nome, uf_id)
noticia (id, titulo, texto, cidade_id, data_criacao)
```

> O campo `data_criacao` é preenchido automaticamente no momento da inserção.
