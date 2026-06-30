const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// 🔐 DESATIVA TRAVAS DE SSL DO NODE
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 🚀 CONEXÃO CIRÚRGICA: Usando o aws-1 apontado pelo seu painel!
const pool = new Pool({
  user: 'postgres.gswtcouvgyizlykaofaw',        
  host: 'aws-1-us-west-2.pooler.supabase.com', // O endereço real do seu projeto!
  database: 'postgres',
  password: '1256602K@uan',                     
  port: 6543,                                   
  ssl: { rejectUnauthorized: false }
});

// Rota de Importação Limpa
app.get('/api/importar-limpo', async (req, res) => {
  try {
    const csvPath = path.join(__dirname, 'planilha_produtos_concorrentes.csv');
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ erro: 'O arquivo planilha_produtos_concorrentes.csv não foi encontrado.' });
    }

    const conteudo = fs.readFileSync(csvPath, 'utf-8');
    const linhas = conteudo.split('\n');
    let cadastrados = 0;
    let puladosLiquidacao = 0;

    for (let i = 1; i < linhas.length; i++) {
      const linha = linhas[i].trim();
      if (!linha) continue;

      const colunas = linha.split(';'); 
      if (colunas.length < 3) continue;

      const sku = colunas[0]?.trim();
      const nome_produto = colunas[1]?.trim();
      const url_concorrente = colunas[2]?.trim();

      if (
        nome_produto.toUpperCase().includes('LIQUIDACAO') || 
        nome_produto.toUpperCase().includes('LIQUIDAÇÃO') ||
        nome_produto.toUpperCase().includes('OUTLET')
      ) {
        puladosLiquidacao++;
        continue;
      }

      await pool.query(
        'INSERT INTO meus_produtos (sku, nome_produto, url_concorrente) VALUES ($1, $2, $3)',
        [sku, nome_produto, url_concorrente]
      );
      cadastrados++;
    }

    res.json({ 
      sucesso: true, 
      mensagem: 'Filtro executado e produtos salvos com sucesso!',
      produtos_salvos: cadastrados,
      produtos_barrados: puladosLiquidacao
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
});

// Rota para o Painel Principal
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
app.listen(PORT, () => console.log(`🚀 SERVIDOR ONLINE`));