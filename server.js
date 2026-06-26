// 🌐 FORÇA O NODE A USAR IPV4 PRIMEIRO (Evita o erro ENETUNREACH do Supabase)
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ==========================================================
// CONEXÃO CORRIGIDA COM SUPORTE IPV4 EXPLICITO
// ==========================================================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL + "?sslmode=require",
  ssl: { rejectUnauthorized: false }
});

// ==========================================================
// ROTA SECRETA: Roda o filtro de liquidação e envia ao banco
// ==========================================================
app.get('/api/importar-limpo', async (req, res) => {
  try {
    const csvPath = path.join(__dirname, 'planilha_produtos_concorrentes.csv');
    
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ erro: 'Arquivo CSV não encontrado no servidor.' });
    }

    const conteudo = fs.readFileSync(csvPath, 'utf-8');
    const linhas = conteudo.split('\n');
    
    let cadastrados = 0;
    let puladosLiquidacao = 0;

    // Começa do 1 para pular o cabeçalho do CSV
    for (let i = 1; i < linhas.length; i++) {
      const linha = linhas[i].trim();
      if (!linha) continue;

      // Divide o CSV por ponto e vírgula ou vírgula
      const colunas = linha.split(';'); 
      if (colunas.length < 3) continue;

      const sku = colunas[0]?.trim();
      const nome_produto = colunas[1]?.trim();
      const url_concorrente = colunas[2]?.trim();

      // 🔍 O FILTRO PROIBIDO: Se o nome do produto tiver "LIQUIDACAO", "LIQUIDAÇÃO" ou "OUTLET", ele pula!
      if (
        nome_produto.toUpperCase().includes('LIQUIDACAO') || 
        nome_produto.toUpperCase().includes('LIQUIDAÇÃO') ||
        nome_produto.toUpperCase().includes('OUTLET')
      ) {
        puladosLiquidacao++;
        continue;
      }

      // Salva no banco de dados Supabase
      await pool.query(
        'INSERT INTO meus_produtos (sku, nome_produto, url_concorrente) VALUES ($1, $2, $3)',
        [sku, nome_produto, url_concorrente]
      );
      cadastrados++;
    }

    res.json({ 
      sucesso: true, 
      mensagem: 'Filtro executado com sucesso!',
      produtos_salvos_sem_liquidacao: cadastrados,
      produtos_barrados_na_liquidacao: puladosLiquidacao
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
});

// Rota para o painel ler os dados limpos
app.get('/api/analise-mercado', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT sku, nome_produto, url_concorrente FROM meus_produtos ORDER BY nome_produto ASC'
    );
    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar dados do banco.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 MOTOR COM FILTRO ATIVO NA PORTA ${PORT}`);
});