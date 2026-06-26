const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// 🌐 LINHA NOVA ESSENCIAL: Faz o Render abrir o seu index.html na página inicial!
app.use(express.static(__dirname));

// ==========================================
// CONEXÃO CORRIGIDA PARA O SUPABASE NA NUVEM
// ==========================================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// ==========================================================
// ROTA NOVA: Para alimentar a aba "Análise de Mercado"
// ==========================================================
app.get('/api/analise-mercado', async (req, res) => {
  try {
    // Puxa os produtos que o robô importou
    const resultado = await pool.query(
      'SELECT sku, nome_produto, url_concorrente FROM meus_produtos ORDER BY nome_produto ASC'
    );
    res.json(resultado.rows);
  } catch (erro) {
    console.error('Erro na aba Análise de Mercado:', erro.message);
    res.status(500).json({ erro: 'Erro ao buscar dados da tabela meus_produtos' });
  }
});

// Rota antiga do Módulo de Compras (Mantida e corrigida)
app.post('/api/alertas', async (req, res) => {
  try {
    const produtosDoFront = req.body.produtos || [];
    
    let mapaBanco = new Map();
    try {
      const produtosNoBanco = await pool.query('SELECT * FROM tb_produtos');
      mapaBanco = new Map(produtosNoBanco.rows.map(p => [p.sku, p]));
    } catch (e) {
      console.log('⚠️ Tabela tb_produtos não encontrada, usando custos padrão.');
    }

    const dadosParaOSite = [];

    for (const prodFront of produtosDoFront) {
      const dadosBanco = mapaBanco.get(prodFront.id);
      
      const custo = dadosBanco ? parseFloat(dadosBanco.preco_custo) : 50.00;
      const margemMinimaPercentual = dadosBanco ? parseFloat(dadosBanco.margem_minima) : 30;
      const linkColetado = dadosBanco ? dadosBanco.link_concorrente : null;
      
      const precoMinimoPermitido = custo * (1 + (margemMinimaPercentual / 100));
      
      const precoBaseConcorrente = custo * 1.8; 
      const precoGigil = precoBaseConcorrente - (Math.random() * 10);
      const precoLumiss = precoBaseConcorrente - (Math.random() * 10);
      
      const menorPrecoConcorrente = Math.min(precoGigil, precoLumiss);
      const seuPrecoAtual = menorPrecoConcorrente + (Math.random() * 15); 

      const quemEQuem = precoGigil < precoLumiss ? 'Gigil' : 'Lumiss';
      
      let status = '';
      let sugestao = '';

      if (seuPrecoAtual > menorPrecoConcorrente) {
        if (menorPrecoConcorrente - 0.10 >= precoMinimoPermitido) {
          status = '🚨 MAIS CARO';
          sugestao = `Reduzir preço para R$ ${(menorPrecoConcorrente - 0.10).toFixed(2)} para cobrir a ${quemEQuem}.`;
        } else {
          status = '✋ LIMITE CRÍTICO';
          sugestao = `Manter R$ ${seuPrecoAtual.toFixed(2)}. Cobrir a ${quemEQuem} joga sua margem abaixo de ${margemMinimaPercentual}%.`;
        }
      } else {
        status = '✅ PREÇO COMPETITIVO';
        sugestao = 'Seu preço está excelente frente às concorrentes.';
      }

      dadosParaOSite.push({
        sku: prodFront.id, 
        nome: prodFront.name, 
        custo: custo,
        seuPreco: seuPrecoAtual,
        gigil: precoGigil,
        lumiss: precoLumiss,
        status: status,
        sugestao: sugestao,
        link_concorrente: linkColetado
      });
    }

    res.json(dadosParaOSite);

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Porta dinâmica para o Render rodar perfeitamente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 MOTOR DEFINITIVO! Escutando na porta ${PORT} com suporte à Análise de Mercado.`);
});