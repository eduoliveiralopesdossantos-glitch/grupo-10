import { drizzle } from 'drizzle-orm/sql-js';
import initSqlJs from 'sql.js';
import * as fs from 'fs';
import * as path from 'path';
import * as schema from './schema';

const DB_PATH = path.resolve('./noticias.db');

let dbInstance: ReturnType<typeof drizzle> | null = null;
let sqlJsDb: any = null;

export async function getDb() {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    sqlJsDb = new SQL.Database(fileBuffer);
  } else {
    sqlJsDb = new SQL.Database();
  }

  dbInstance = drizzle(sqlJsDb, { schema });

  // Criar tabelas
  sqlJsDb.run(`
    CREATE TABLE IF NOT EXISTS uf (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      nome  TEXT NOT NULL,
      sigla TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cidade (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      nome  TEXT NOT NULL,
      uf_id INTEGER NOT NULL REFERENCES uf(id)
    );
    CREATE TABLE IF NOT EXISTS noticia (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo       TEXT NOT NULL,
      texto        TEXT NOT NULL,
      cidade_id    INTEGER NOT NULL REFERENCES cidade(id),
      data_criacao TEXT DEFAULT (datetime('now','localtime'))
    );
  `);

  saveDb();
  return dbInstance;
}

export function saveDb() {
  if (sqlJsDb) {
    const data = sqlJsDb.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  }
}

export function getRawDb() {
  return sqlJsDb;
}
