import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const uf = sqliteTable('uf', {
  id:    integer('id').primaryKey({ autoIncrement: true }),
  nome:  text('nome').notNull(),
  sigla: text('sigla').notNull(),
});

export const cidade = sqliteTable('cidade', {
  id:    integer('id').primaryKey({ autoIncrement: true }),
  nome:  text('nome').notNull(),
  uf_id: integer('uf_id').notNull().references(() => uf.id),
});

export const noticia = sqliteTable('noticia', {
  id:           integer('id').primaryKey({ autoIncrement: true }),
  titulo:       text('titulo').notNull(),
  texto:        text('texto').notNull(),
  cidade_id:    integer('cidade_id').notNull().references(() => cidade.id),
  data_criacao: text('data_criacao').default(sql`(datetime('now','localtime'))`),
});
