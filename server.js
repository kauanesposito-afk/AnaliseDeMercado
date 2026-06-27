const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// 🔐 IGNORA O ERRO DE CERTIFICADO DO SUPABASE
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// CONEXÃO DIRETA COMPLETA (Porta 6543 - Ignora erro de rede IPv6 do Render)
const pool = new Pool({
  connectionString: "postgres://postgres.yisgshgffskbshqyvskb:1256602K@uan@aws-0-us-west-2.pooler.supabase.com:6543/postgres?sslmode=require",
  ssl: { rejectUnauthorized: false }
});

// Rota de Importação Limpa (Lê o CSV, barra liquidações e joga no Supabase)
app.get('/api/importar-limpo', async (req, res) => {
  try {
    const csvPath = path.join(__dirname, 'planilha_produtos_concorrentes.csv');
    if (!fs.existsSync(csvPath)) return res.status(404).json({ erro: 'CSV não encontrado.' });

    const conteudo = fs.readFileSync(csvPath, 'utf-8');
    const linhas = conteudo.split('\n');
    let cadastrados = 0;

    for (let i = 1; i < linhas.length; i++) {
      const linha = pandas_ou_linha = linhas[i].trim();
      if (!linha) continue;

      const colunas = linha.split(';'); 
      if (colunas.length < 3) continue;

      const sku = colunas[0]?.trim();
      const nome_produto = colunas[1]?.trim();
      const url_concorrente = colunas[2]?.trim();

      // Filtro rígido de liquidação
      if (
        nome_produto.toUpperCase().includes('LIQUIDACAO') || 
        nome_produto.toUpperCase().includes('LIQUIDAÇÃO') ||
        nome_produto.toUpperCase().includes('OUTLET')
      ) continue;

      await pool.query(
        'INSERT INTO meus_produtos (sku, nome_produto, url_concorrente) VALUES ($1, $2, $3)',
        [sku, nome_produto, url_concorrente]
      );
      cadastrados++;
    }

    res.json({ sucesso: true, produtos_salvos: cadastrados });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Rota do Painel para ler os dados limpos
app.get('/api/analise-mercado', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT sku, nome_produto, url_concorrente FROM meus_produtos ORDER BY nome_produto ASC');
    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 ONLINE NA PORTA ${PORT}`));