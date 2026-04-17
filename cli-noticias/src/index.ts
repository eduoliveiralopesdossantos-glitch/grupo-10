import * as readline from 'readline';
import { getRawDb, getDb, saveDb } from './db';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string): Promise<string> => new Promise(r => rl.question(q, r));

// ─── UTILITÁRIOS ────────────────────────────────────────────────────────────

function limpar() { console.clear(); }

function cabecalho(titulo: string) {
  console.log('\n' + '='.repeat(50));
  console.log(`  ${titulo}`);
  console.log('='.repeat(50));
}

// ─── MENU PRINCIPAL ─────────────────────────────────────────────────────────

async function menuPrincipal() {
  while (true) {
    limpar();
    cabecalho('SISTEMA DE NOTÍCIAS');
    console.log('0 - Cadastrar notícia');
    console.log('1 - Exibir todas as notícias (mais recentes primeiro)');
    console.log('2 - Exibir todas as notícias (mais antigas primeiro)');
    console.log('3 - Exibir notícias de um estado específico');
    console.log('4 - Exibir todas as notícias agrupadas por estado');
    console.log('5 - Cadastrar UF');
    console.log('6 - Cadastrar cidade');
    console.log('7 - Sair');
    console.log('='.repeat(50));

    const op = (await ask('Escolha uma opção: ')).trim();

    switch (op) {
      case '0': await cadastrarNoticia(); break;
      case '1': await listarNoticias('DESC'); break;
      case '2': await listarNoticias('ASC'); break;
      case '3': await noticiasPorEstado(); break;
      case '4': await noticiasAgrupadasPorEstado(); break;
      case '5': await cadastrarUF(); break;
      case '6': await cadastrarCidade(); break;
      case '7':
        console.log('\nAté logo!');
        rl.close();
        process.exit(0);
      default:
        console.log('Opção inválida!');
        await ask('Pressione Enter para continuar...');
    }
  }
}

// ─── OPÇÃO 0: CADASTRAR NOTÍCIA ─────────────────────────────────────────────

async function cadastrarNoticia() {
  limpar();
  cabecalho('CADASTRAR NOTÍCIA');
  const db = getRawDb();

  // Buscar cidades com UF
  const cidades = db.exec(`
    SELECT c.id, c.nome, u.sigla
    FROM cidade c
    JOIN uf u ON u.id = c.uf_id
    ORDER BY u.sigla, c.nome
  `);

  if (!cidades.length || !cidades[0].values.length) {
    console.log('Nenhuma cidade cadastrada. Cadastre uma cidade primeiro.');
    await ask('Pressione Enter para voltar...');
    return;
  }

  console.log('\nCidades disponíveis:');
  const rows = cidades[0].values;
  rows.forEach((r: any[], i: number) => {
    console.log(`${i + 1} - ${r[1]} (${r[2]})`);
  });
  console.log('(z) Voltar');

  const selCidade = (await ask('\nEscolha a cidade: ')).trim();
  if (selCidade.toLowerCase() === 'z') return;

  const idxCidade = parseInt(selCidade) - 1;
  if (isNaN(idxCidade) || idxCidade < 0 || idxCidade >= rows.length) {
    console.log('Cidade inválida!');
    await ask('Pressione Enter...');
    return;
  }

  const cidadeId = rows[idxCidade][0];

  const titulo = (await ask('Título: ')).trim();
  const texto  = (await ask('Texto: ')).trim();

  if (!titulo || !texto) {
    console.log('Título e texto são obrigatórios!');
    await ask('Pressione Enter...');
    return;
  }

  db.run(
    `INSERT INTO noticia (titulo, texto, cidade_id) VALUES (?, ?, ?)`,
    [titulo, texto, cidadeId]
  );
  saveDb();
  console.log('\n✅ Notícia cadastrada com sucesso!');
  await ask('Pressione Enter para continuar...');
}

// ─── OPÇÕES 1 E 2: LISTAR NOTÍCIAS ──────────────────────────────────────────

async function listarNoticias(ordem: 'ASC' | 'DESC') {
  limpar();
  const label = ordem === 'DESC' ? 'MAIS RECENTES PRIMEIRO' : 'MAIS ANTIGAS PRIMEIRO';
  cabecalho(`TODAS AS NOTÍCIAS — ${label}`);
  const db = getRawDb();

  const res = db.exec(`
    SELECT n.id, n.titulo, c.nome, u.sigla, n.data_criacao
    FROM noticia n
    JOIN cidade c ON c.id = n.cidade_id
    JOIN uf u ON u.id = c.uf_id
    ORDER BY n.data_criacao ${ordem}
  `);

  if (!res.length || !res[0].values.length) {
    console.log('Nenhuma notícia cadastrada.');
    await ask('\nPressione Enter para voltar...');
    return;
  }

  res[0].values.forEach((r: any[], i: number) => {
    console.log(`\n${i + 1}. [${r[4]}] ${r[1]}`);
    console.log(`   📍 ${r[2]} - ${r[3]}`);
  });

  console.log('\n' + '-'.repeat(50));
  console.log(`Total: ${res[0].values.length} notícia(s)`);
  await ask('\nPressione Enter para voltar...');
}

// ─── OPÇÃO 3: NOTÍCIAS DE UM ESTADO ─────────────────────────────────────────

async function noticiasPorEstado() {
  limpar();
  cabecalho('NOTÍCIAS POR ESTADO');
  const db = getRawDb();

  const ufs = db.exec(`SELECT id, nome, sigla FROM uf ORDER BY sigla`);
  if (!ufs.length || !ufs[0].values.length) {
    console.log('Nenhum estado cadastrado.');
    await ask('Pressione Enter para voltar...');
    return;
  }

  console.log('\nEstados disponíveis:');
  ufs[0].values.forEach((r: any[], i: number) => {
    console.log(`${i + 1} - ${r[2]} (${r[1]})`);
  });
  console.log('(z) Voltar');

  const selUF = (await ask('\nEscolha o estado: ')).trim();
  if (selUF.toLowerCase() === 'z') return;

  const idxUF = parseInt(selUF) - 1;
  if (isNaN(idxUF) || idxUF < 0 || idxUF >= ufs[0].values.length) {
    console.log('Estado inválido!');
    await ask('Pressione Enter...');
    return;
  }

  const ufId    = ufs[0].values[idxUF][0];
  const ufSigla = ufs[0].values[idxUF][2];

  while (true) {
    limpar();
    cabecalho(`NOTÍCIAS — ${ufSigla}`);
    console.log('(a) Ordenar por mais recentes');
    console.log('(b) Ordenar por mais antigas');
    console.log('(z) Voltar');

    const op = (await ask('\nEscolha: ')).trim().toLowerCase();
    if (op === 'z') return;

    const ordem = op === 'a' ? 'DESC' : op === 'b' ? 'ASC' : null;
    if (!ordem) continue;

    const res = db.exec(`
      SELECT n.titulo, c.nome, n.data_criacao
      FROM noticia n
      JOIN cidade c ON c.id = n.cidade_id
      WHERE c.uf_id = ?
      ORDER BY n.data_criacao ${ordem}
    `, [ufId]);

    limpar();
    cabecalho(`NOTÍCIAS — ${ufSigla}`);

    if (!res.length || !res[0].values.length) {
      console.log('Nenhuma notícia encontrada para este estado.');
    } else {
      res[0].values.forEach((r: any[], i: number) => {
        console.log(`\n${i + 1}. [${r[2]}] ${r[0]}`);
        console.log(`   📍 ${r[1]}`);
      });
      console.log(`\nTotal: ${res[0].values.length} notícia(s)`);
    }

    await ask('\nPressione Enter para voltar...');
    return;
  }
}

// ─── OPÇÃO 4: NOTÍCIAS AGRUPADAS POR ESTADO ──────────────────────────────────

async function noticiasAgrupadasPorEstado() {
  limpar();
  cabecalho('LISTA AGRUPADA POR ESTADOS');
  const db = getRawDb();

  const res = db.exec(`
    SELECT n.id, n.titulo, n.texto, c.nome AS cidade, u.sigla
    FROM noticia n
    JOIN cidade c ON c.id = n.cidade_id
    JOIN uf u ON u.id = c.uf_id
    ORDER BY u.sigla, n.data_criacao DESC
  `);

  if (!res.length || !res[0].values.length) {
    console.log('Nenhuma notícia cadastrada.');
    await ask('\nPressione Enter para voltar...');
    return;
  }

  // Agrupar por UF
  const grupos: Record<string, any[]> = {};
  res[0].values.forEach((r: any[]) => {
    const sigla = r[4];
    if (!grupos[sigla]) grupos[sigla] = [];
    grupos[sigla].push(r);
  });

  // Exibir com numeração sequencial global
  const todasNoticias: any[] = [];
  let contador = 1;

  for (const sigla of Object.keys(grupos).sort()) {
    console.log(`\n# ${sigla}`);
    for (const n of grupos[sigla]) {
      console.log(`${contador} - ${n[1]} - ${n[3]}`);
      todasNoticias.push({ num: contador, titulo: n[1], texto: n[2] });
      contador++;
    }
  }

  console.log('\n' + '-'.repeat(50));
  console.log('(d) Detalhar notícia');
  console.log('(z) Voltar');

  const op = (await ask('\nEscolha: ')).trim().toLowerCase();
  if (op === 'z') return;

  if (op === 'd') {
    const numStr = (await ask('Informe o número da notícia: ')).trim();
    const num = parseInt(numStr);
    const noticia = todasNoticias.find(n => n.num === num);

    if (!noticia) {
      console.log('Número inválido!');
    } else {
      limpar();
      cabecalho('DETALHE DA NOTÍCIA');
      console.log(`\nTítulo: ${noticia.titulo}`);
      console.log(`Texto : ${noticia.texto}`);
    }
    await ask('\nPressione Enter para voltar...');
  }
}

// ─── OPÇÃO 5: CADASTRAR UF ───────────────────────────────────────────────────

async function cadastrarUF() {
  limpar();
  cabecalho('CADASTRAR UF');
  const db = getRawDb();

  const nome  = (await ask('Nome do estado: ')).trim();
  const sigla = (await ask('Sigla (ex: SP): ')).trim().toUpperCase();

  if (!nome || !sigla) {
    console.log('Nome e sigla são obrigatórios!');
    await ask('Pressione Enter...');
    return;
  }

  db.run(`INSERT INTO uf (nome, sigla) VALUES (?, ?)`, [nome, sigla]);
  saveDb();
  console.log('\n✅ UF cadastrada com sucesso!');
  await ask('Pressione Enter para continuar...');
}

// ─── OPÇÃO 6: CADASTRAR CIDADE ───────────────────────────────────────────────

async function cadastrarCidade() {
  limpar();
  cabecalho('CADASTRAR CIDADE');
  const db = getRawDb();

  const ufs = db.exec(`SELECT id, nome, sigla FROM uf ORDER BY sigla`);
  if (!ufs.length || !ufs[0].values.length) {
    console.log('Nenhum estado cadastrado. Cadastre uma UF primeiro.');
    await ask('Pressione Enter para voltar...');
    return;
  }

  console.log('\nEstados disponíveis:');
  ufs[0].values.forEach((r: any[], i: number) => {
    console.log(`${i + 1} - ${r[2]} (${r[1]})`);
  });
  console.log('(z) Voltar');

  const selUF = (await ask('\nEscolha o estado: ')).trim();
  if (selUF.toLowerCase() === 'z') return;

  const idxUF = parseInt(selUF) - 1;
  if (isNaN(idxUF) || idxUF < 0 || idxUF >= ufs[0].values.length) {
    console.log('Estado inválido!');
    await ask('Pressione Enter...');
    return;
  }

  const ufId = ufs[0].values[idxUF][0];
  const nome = (await ask('Nome da cidade: ')).trim();

  if (!nome) {
    console.log('Nome é obrigatório!');
    await ask('Pressione Enter...');
    return;
  }

  db.run(`INSERT INTO cidade (nome, uf_id) VALUES (?, ?)`, [nome, ufId]);
  saveDb();
  console.log('\n✅ Cidade cadastrada com sucesso!');
  await ask('Pressione Enter para continuar...');
}

// ─── INICIAR ─────────────────────────────────────────────────────────────────

(async () => {
  await getDb();
  await menuPrincipal();
})();
