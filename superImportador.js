const fs = require('fs');
const { Client } = require('pg');

// ==========================================
// CONFIGURAÇÃO DO SEU BANCO DE DADOS
// ==========================================
const client = new Client({
    host: 'localhost',
    database: 'domidona_monitoramento', 
    user: 'postgres',
    password: 'Kauan2011',              
    port: 5432,
});

async function iniciar() {
    try {
        await client.connect();
        console.log("🔌 Conectado ao pgAdmin com sucesso!");
    } catch (err) {
        console.log(`❌ Erro de conexão com o banco: ${err.message}`);
        return;
    }

    if (!fs.existsSync('meus_produtos.txt')) {
        console.log("❌ Arquivo meus_produtos.txt não encontrado!");
        await client.end();
        return;
    }

    const conteudo = fs.readFileSync('meus_produtos.txt', 'utf-8');
    const lines = conteudo.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    console.log(`⏳ Iniciando gravação de ${lines.length} produtos direto no banco...`);
    let gravados = 0;

    for (let linha of lines) {
        const match = linha.match(/^([0-9a-z\-]+?)(Bota|Sapatilha|Scarpin|Sandália|Tamanco|Tênis|Papete|Rasteira|Mocassim|Mary|Bolsa|Mochila|Camiseta|Camisa|Bag|Coturno|Rasteirinha|Biqueira|Biker|Social|Montaria|Texana|Slouchy|Slingback|Mani|Mala|Necessaire|Nécessaire)(.+)$/i);
        
        let skuLimpo = "";
        let nomeProduto = "";

        if (match) {
            skuLimpo = match[1].trim();
            nomeProduto = (match[2] + match[3]).trim();
        } else {
            skuLimpo = linha.substring(0, 11).trim();
            nomeProduto = linha.substring(11).trim();
        }

        if (!skuLimpo || !nomeProduto) continue;

        try {
            // Trocado de 'null' para '' para respeitar a regra de "não-nulo" da sua tabela
            await client.query(`
                INSERT INTO meus_produtos (sku, nome_produto, url_concorrente)
                VALUES ($1, $2, $3)
                ON CONFLICT (sku) DO NOTHING;
            `, [skuLimpo, nomeProduto, '']);
            
            gravados++;
            if (gravados % 50 === 0) {
                console.log(`📦 ${gravados} produtos já foram salvos no banco...`);
            }
        } catch (err) {
            console.log(`❌ Erro ao salvar o SKU ${skuLimpo}: ${err.message}`);
        }
    }

    await client.end();
    console.log(`\n🎉 Finalizado! ${gravados} produtos foram cadastrados com sucesso no seu pgAdmin!`);
}

iniciar();