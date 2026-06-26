const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',           
  host: 'localhost',          
  database: 'erp_inteligencia', 
  password: 'Kauan2011',
  port: 5432,                 
});

async function testarConexao() {
  try {
    const resultado = await pool.query('SELECT * FROM tb_marketplaces');
    console.log('---');
    console.log('✅ CONEXÃO COM O BANCO DE DADOS REALIZADA COM SUCESSO!');
    console.log('Marketplaces cadastrados no banco:', resultado.rows);
    console.log('---');
  } catch (erro) {
    console.error('❌ ERRO AO CONECTAR NO BANCO DE DADOS:', erro.message);
  } finally {
    await pool.end();
  }
}

testarConexao();