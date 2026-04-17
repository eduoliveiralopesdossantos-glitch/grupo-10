import * as readline from 'readline';
import { getRawDb, getDb, saveDb } from './db';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string): Promise<string> => new Promise(r => rl.question(q, r));

async function menuPrincipal() {
  while (true) {
    console.clear();
    console.log('\n== SISTEMA DE NOTICIAS ==');
    console.log('0 - Cadastrar noticia');
    console.log('1 - Exibir todas as noticias (mais recentes primeiro)');
    console.log('2 - Exibir todas as noticias (mais antigas primeiro)');
    console.log('3 - Exibir noticias de um estado especifico');
    console.log('4 - Exibir todas as noticias agrupadas por estado');
    console.log('5 - Cadastrar UF');
    console.log('6 - Cadastrar cidade');
    console.log('7 - Sair');

    const op = (await ask('\nOpcao: ')).trim();

    if (op === '0') await cadastrarNoticia();
    else if (op === '1') await listarNoticias('DESC');
    else if (op === '2') await listarNoticias('ASC');
    else if (op === '3') await noticiasPorEstado();
    else if (op === '4') await noticiasAgrupadasPorEstado();
    else if (op === '5') await cadastrarUF();
    else if (op === '6') await cadastrarCidade();
    else if (op === '7') {
      console.log('Saindo...');
      rl.close();
      process.exit(0);
    } else {
      console.log('Opcao invalida');
      await ask('Enter para continuar...');
    }
  }
}

async function cadastrarNoticia() {
  console.clear();
  console.log('\n-- Cadastrar Noticia --');
  const db = getRawDb();

  const cidades = db.exec(`
    SELECT c.id, c.nome, u.sigla
    FROM cidade c
    JOIN uf u ON u.id = c.uf_id
    ORDER BY u.sigla, c.nome
  `);

  if (!cidades.length || !cidades[0].values.length) {
    console.log('Nenhuma cidade cadastrada.');
    await ask('Enter para voltar...');
    return;
  }

  const rows = cidades[0].values;
  rows.forEach((r: any[], i: number) => {
    console.log(`${i + 1} - ${r[1]} (${r[2]})`);
  });
  console.log('(z) Voltar');

  const selCidade = (await ask('Escolha a cidade: ')).trim();
  if (selCidade.toLowerCase() === 'z') return;

  const idxCidade = parseInt(selCidade) - 1;
  if (isNaN(idxCidade) || idxCidade < 0 || idxCidade >= rows.length) {
    console.log('Cidade invalida');
    await ask('Enter...');
    return;
  }

  const cidadeId = rows[idxCidade][0];
  const titulo = (await ask('Titulo: ')).trim();
  const texto = (await ask('Texto: ')).trim();

  if (!titulo || !texto) {
    console.log('Preencha todos os campos');
    await ask('Enter...');
    return;
  }

  db.run(`INSERT INTO noticia (titulo, texto, cidade_id) VALUES (?, ?, ?)`, [titulo, texto, cidadeId]);
  saveDb();
  console.log('Noticia cadastrada!');
  await ask('Enter para continuar...');
}

async function listarNoticias(ordem: 'ASC' | 'DESC') {
  console.clear();
  const db = getRawDb();

  const res = db.exec(`
    SELECT n.id, n.titulo, c.nome, u.sigla, n.data_criacao
    FROM noticia n
    JOIN cidade c ON c.id = n.cidade_id
    JOIN uf u ON u.id = c.uf_id
    ORDER BY n.data_criacao ${ordem}
  `);

  if (!res.length || !res[0].values.length) {
    console.log('Nenhuma noticia encontrada.');
    await ask('Enter para voltar...');
    return;
  }

  res[0].values.forEach((r: any[], i: number) => {
    console.log(`\n${i + 1}. ${r[1]}`);
    console.log(`   ${r[2]} - ${r[3]} | ${r[4]}`);
  });

  console.log(`\nTotal: ${res[0].values.length} noticia(s)`);
  await ask('\nEnter para voltar...');
}

async function noticiasPorEstado() {
  console.clear();
  const db = getRawDb();

  const ufs = db.exec(`SELECT id, nome, sigla FROM uf ORDER BY sigla`);
  if (!ufs.length || !ufs[0].values.length) {
    console.log('Nenhum estado cadastrado.');
    await ask('Enter para voltar...');
    return;
  }

  ufs[0].values.forEach((r: any[], i: number) => {
    console.log(`${i + 1} - ${r[2]} (${r[1]})`);
  });
  console.log('(z) Voltar');

  const selUF = (await ask('Escolha o estado: ')).trim();
  if (selUF.toLowerCase() === 'z') return;

  const idxUF = parseInt(selUF) - 1;
  if (isNaN(idxUF) || idxUF < 0 || idxUF >= ufs[0].values.length) {
    console.log('Estado invalido');
    await ask('Enter...');
    return;
  }

  const ufId = ufs[0].values[idxUF][0];
  const ufSigla = ufs[0].values[idxUF][2];

  while (true) {
    console.clear();
    console.log(`\n-- Noticias de ${ufSigla} --`);
    console.log('(a) Mais recentes primeiro');
    console.log('(b) Mais antigas primeiro');
    console.log('(z) Voltar');

    const op = (await ask('Escolha: ')).trim().toLowerCase();
    if (op === 'z') return;
    if (op !== 'a' && op !== 'b') continue;

    const ordem = op === 'a' ? 'DESC' : 'ASC';

    const res = db.exec(`
      SELECT n.titulo, c.nome, n.data_criacao
      FROM noticia n
      JOIN cidade c ON c.id = n.cidade_id
      WHERE c.uf_id = ?
      ORDER BY n.data_criacao ${ordem}
    `, [ufId]);

    console.clear();
    if (!res.length || !res[0].values.length) {
      console.log('Nenhuma noticia encontrada.');
    } else {
      res[0].values.forEach((r: any[], i: number) => {
        console.log(`${i + 1}. ${r[0]} - ${r[1]} | ${r[2]}`);
      });
    }

    await ask('\nEnter para voltar...');
    return;
  }
}

async function noticiasAgrupadasPorEstado() {
  console.clear();
  const db = getRawDb();

  const res = db.exec(`
    SELECT n.id, n.titulo, n.texto, c.nome, u.sigla
    FROM noticia n
    JOIN cidade c ON c.id = n.cidade_id
    JOIN uf u ON u.id = c.uf_id
    ORDER BY u.sigla, n.data_criacao DESC
  `);

  if (!res.length || !res[0].values.length) {
    console.log('Nenhuma noticia cadastrada.');
    await ask('\nEnter para voltar...');
    return;
  }

  const grupos: Record<string, any[]> = {};
  res[0].values.forEach((r: any[]) => {
    if (!grupos[r[4]]) grupos[r[4]] = [];
    grupos[r[4]].push(r);
  });

  const todasNoticias: any[] = [];
  let contador = 1;

  console.log('\n--- LISTA AGRUPADA POR ESTADOS ---');
  for (const sigla of Object.keys(grupos).sort()) {
    console.log(`\n# ${sigla}`);
    for (const n of grupos[sigla]) {
      console.log(`${contador} - ${n[1]} - ${n[3]}`);
      todasNoticias.push({ num: contador, titulo: n[1], texto: n[2] });
      contador++;
    }
  }

  console.log('\n(d) Detalhar noticia');
  console.log('(z) Voltar');

  const op = (await ask('\nEscolha: ')).trim().toLowerCase();
  if (op === 'z') return;

  if (op === 'd') {
    const numStr = (await ask('Informe o numero da noticia: ')).trim();
    const num = parseInt(numStr);
    const noticia = todasNoticias.find(n => n.num === num);

    if (!noticia) {
      console.log('Numero invalido');
    } else {
      console.clear();
      console.log(`\nTitulo: ${noticia.titulo}`);
      console.log(`Texto : ${noticia.texto}`);
    }
    await ask('\nEnter para voltar...');
  }
}

async function cadastrarUF() {
  console.clear();
  console.log('\n-- Cadastrar UF --');
  const db = getRawDb();

  const nome = (await ask('Nome do estado: ')).trim();
  const sigla = (await ask('Sigla: ')).trim().toUpperCase();

  if (!nome || !sigla) {
    console.log('Preencha todos os campos');
    await ask('Enter...');
    return;
  }

  db.run(`INSERT INTO uf (nome, sigla) VALUES (?, ?)`, [nome, sigla]);
  saveDb();
  console.log('UF cadastrada!');
  await ask('Enter para continuar...');
}

async function cadastrarCidade() {
  console.clear();
  console.log('\n-- Cadastrar Cidade --');
  const db = getRawDb();

  const ufs = db.exec(`SELECT id, nome, sigla FROM uf ORDER BY sigla`);
  if (!ufs.length || !ufs[0].values.length) {
    console.log('Nenhum estado cadastrado.');
    await ask('Enter para voltar...');
    return;
  }

  ufs[0].values.forEach((r: any[], i: number) => {
    console.log(`${i + 1} - ${r[2]} (${r[1]})`);
  });
  console.log('(z) Voltar');

  const selUF = (await ask('Escolha o estado: ')).trim();
  if (selUF.toLowerCase() === 'z') return;

  const idxUF = parseInt(selUF) - 1;
  if (isNaN(idxUF) || idxUF < 0 || idxUF >= ufs[0].values.length) {
    console.log('Estado invalido');
    await ask('Enter...');
    return;
  }

  const ufId = ufs[0].values[idxUF][0];
  const nome = (await ask('Nome da cidade: ')).trim();

  if (!nome) {
    console.log('Nome obrigatorio');
    await ask('Enter...');
    return;
  }

  db.run(`INSERT INTO cidade (nome, uf_id) VALUES (?, ?)`, [nome, ufId]);
  saveDb();
  console.log('Cidade cadastrada!');
  await ask('Enter para continuar...');
}

(async () => {
  await getDb();
  await menuPrincipal();
})();
