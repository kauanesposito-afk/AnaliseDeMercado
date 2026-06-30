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

// 🚀 POOL DE CONEXÃO MULTI-MODO (Usa os dados do seu projeto real 'gswtcouvgyizlykaofaw')
const pool = new Pool({
  user: 'postgres',
  host: 'db.gswtcouvgyizlykaofaw.supabase.co',
  database: 'postgres',
  password: '1256602K@uan',
  port: 6543, // Porta 6543 força o uso de IPv4 no Render, matando o erro ENETUNREACH
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000 // Aguarda até 10 segundos para não dar timeout
});

// Rota de Importação Limpa
app.get('/api/importar-limpo', async (req, res) => {
  try {
    const csvPath = path.join(__dirname, 'planilha_produtos_concorrentes.csv');
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ erro: 'O arquivo planilha_produtos_concorrentes.csv não foi encontrado no servidor.' });
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
        'INSERT INTO meus_produtos (sku, nome_produto, url_concorrente) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        [sku, nome_produto, url_concorrente]
      );
      cadastrados++;
    }

    res.json({ 
      sucesso: true, 
      mensagem: 'Sua planilha foi processada com sucesso!',
      produtos_salvos_no_supabase: cadastrados,
      produtos_limpos_ignorados: puladosLiquidacao
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno no banco de dados: ' + erro.message });
  }
});

// Rota para o Painel de Mercado
app.get('/api/analise-mercado', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT sku, nome_produto, url_concorrente FROM meus_produtos ORDER BY nome_produto ASC'
    );
    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar dados do banco de dados.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 SERVIDOR INICIADO COM SUCESSO`));