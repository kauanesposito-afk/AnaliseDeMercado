const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Desativa travas de segurança locais do Node para aceitar o certificado do banco
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// CONFIGURAÇÃO ABSOLUTA PARA RENDER (IPv4 forçado via Supavisor Pooler)
const pool = new Pool({
  user: 'postgres.gswtcouvgyizlykaofaw',        // Usuário + ID real do projeto
  host: 'aws-0-us-west-2.pooler.supabase.com',  // Servidor exclusivo IPv4 da AWS
  database: 'postgres',
  password: '1256602K@uan',                     // Senha pura, sem erros de leitura
  port: 6543,                                   // Porta oficial de pooling
  ssl: { rejectUnauthorized: false }
});

// Rota de Importação Limpa
app.get('/api/importar-limpo', async (req, res) => {
  try {
    const csvPath = path.join(__dirname, 'planilha_produtos_concorrentes.csv');
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ erro: 'CSV não encontrado no servidor.' });
    }

    const conteudo = fs.readFileSync(csvPath, 'utf-8');
    const linhas = conteudo.split('\n');
    let cadastrados = 0;

    // Pula o cabeçalho
    for (let i = 1; i < linhas.length; i++) {
      const linha = linhas[i].trim();
      if (!linha) continue;

      const colunas = linha.split(';'); 
      if (colunas.length < 3) continue;

      const sku = colunas[0]?.trim();
      const nome_produto = colunas[1]?.trim();
      const url_concorrente = colunas[2]?.trim();

      // Filtro de liquidação/outlet
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

// Rota do Painel
app.get('/api/analise-mercado', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT sku, nome_produto, url_concorrente FROM meus_produtos ORDER BY nome_produto ASC');
    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 SERVIDOR ONLINE`));