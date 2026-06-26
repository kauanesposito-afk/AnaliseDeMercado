// CSS Automático para as abas
const style = document.createElement('style');
style.innerHTML = `
    #category-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; justify-content: center; }
    .tab-btn { padding: 10px 20px; border: 2px solid #e2e8f0; background: #f8f9fa; border-radius: 8px; cursor: pointer; font-weight: bold; color: #475569; transition: all 0.2s; }
    .tab-btn:hover { border-color: #94a3b8; }
    .tab-btn.active { background: #0f172a; color: #ffffff; border-color: #0f172a; }
`;
document.head.appendChild(style);

const adultSizes = [34, 35, 36, 37, 38, 39, 40];

// BANCO DE IMAGENS DE SUPORTE - SEUS 215 PRODUTOS COM LINKS REAIS DE IMAGEM
const catalogoImagensOficiais = {
    "179013195": "https://domidona.fbitsstatic.net/img/p/349957/bota-capa-preta-feminina-cano-alto-salto-alto-bloco-bico-fino-151909/349957-1.jpg?w=1000&h=1000&v=",
    "103004009": "https://domidona.fbitsstatic.net/img/p/337440/bota-montaria-over-the-knee-com-camurca-stretch-preta-150237/337440-2.jpg?w=1000&h=1000&v=",
    "179013711": "https://domidona.fbitsstatic.net/img/p/350849/bota-capa-marrom-feminina-cano-alto-salto-alto-bloco-bico-fino-152047/350849-1.jpg?w=1000&h=1000&v=",
    "127007195": "https://domidona.fbitsstatic.net/img/p/347516/bota-feminina-texana-western-cano-alto-bordada-bico-fino-preta-151580/347516-2.jpg?w=1000&h=1000&v=",
    "122018197": "https://domidona.fbitsstatic.net/img/p/337563/bota-feminina-slouchy-bico-fino-salto-bloco-elegante-off-white-150253/337563-1.jpg?w=1000&h=1000&v=",
    "237002710": "https://domidona.fbitsstatic.net/img/p/350035/bota-preta-feminina-cano-curto-salto-vazado-cromado-151920/350035-1.jpg?w=1000&h=1000&v=",
    "122018195": "https://domidona.fbitsstatic.net/img/p/337556/bota-feminina-slouchy-bico-fino-salto-bloco-elegante-preta-150252/337556-1.jpg?w=1000&h=1000&v=",
    "179018710": "https://domidona.fbitsstatic.net/img/p/350009/bota-social-feminina-preta-cano-curto-salto-alto-bloco-bico-fino-151916/350009-1.jpg?w=1000&h=1000&v=",
    "179018711": "https://domidona.fbitsstatic.net/img/p/350002/bota-social-feminina-marrom-cano-curto-salto-alto-bloco-bico-fino-151915/350002-1.jpg?w=1000&h=1000&v=",
    "179004710": "https://domidona.fbitsstatic.net/img/p/350891/bota-feminina-cano-curto-bico-fino-salto-grosso-confortavel-preta-152053/350891-1.jpg?w=1000&h=1000&v=",
    "225002195": "https://domidona.fbitsstatic.net/img/p/349971/bota-biker-feminina-preta-cano-alto-tratorada-com-fivelas-tendencia-151911/349971-1.jpg?w=1000&h=1000&v=",
    "118005033": "https://domidona.fbitsstatic.net/img/p/337356/sapatilha-feminina-bico-fino-animal-print-elegante-confortavel-dourado-150225/337356-2.jpg?w=1000&h=1000&v=",
    "127012195": "https://domidona.fbitsstatic.net/img/p/350029/bota-texana-feminina-western-cano-alto-bordada-bico-fino-preta-151919/350029-1.jpg?w=1000&h=1000&v=",
    "122003009": "https://domidona.fbitsstatic.net/img/p/337521/bota-salto-grosso-over-the-knee-camurca-stretch-preta-150247/337521-2.jpg?w=1000&h=1000&v=",
    "179013197": "https://domidona.fbitsstatic.net/img/p/349964/bota-capa-off-white-feminina-cano-alto-salto-alto-bloco-bico-fino-151910/349964-1.jpg?w=1000&h=1000&v=",
    "179004711": "https://domidona.fbitsstatic.net/img/p/350884/bota-feminina-cano-curto-bico-fino-salto-grosso-confortavel-marrom-152052/350884-1.jpg?w=1000&h=1000&v=",
    "179001009": "https://domidona.fbitsstatic.net/img/p/337478/bota-over-the-knee-stretch-bico-fino-salto-grosso-alto-camurca-preta-150242/337478-2.jpg?w=1000&h=1000&v=",
    "179017711": "https://domidona.fbitsstatic.net/img/p/349981/bota-social-feminina-marrom-cano-alto-bico-fino-salto-alto-bloco-151912/349981-1.jpg?w=1000&h=1000&v=",
    "179005319": "https://domidona.fbitsstatic.net/img/p/347778/bota-feminina-cano-alto-longo-animal-print-salto-alto-grosso-off-white-151616/347778-1.jpg?w=1000&h=1000&v=",
    "127012197": "https://domidona.fbitsstatic.net/img/p/350023/bota-texana-feminina-western-cano-alto-bordada-bico-fino-off-white-151918/350023-1.jpg?w=1000&h=1000&v=",
    "179001197": "https://domidona.fbitsstatic.net/img/p/347830/bota-over-the-knee-stretch-bico-fino-salto-grosso-alto-off-white-151622/347830-1.jpg?w=1000&h=1000&v=",
    "127007197": "https://domidona.fbitsstatic.net/img/p/347530/bota-feminina-texana-western-cano-alto-bordada-bico-fino-off-white-151582/347530-2.jpg?w=1000&h=1000&v=",
    "179007651": "https://domidona.fbitsstatic.net/img/p/347680/bota-feminina-cano-medio-bico-fino-tira-de-strass-elegante-preto-151604/347680-1.jpg?w=1000&h=1000&v=",
    "237003501": "https://domidona.fbitsstatic.net/img/p/350811/bota-cano-curto-salto-fino-baixo-kitten-heel-metalizado-bico-fino-preta-152042/350811-1.jpg?w=1000&h=1000&v=",
    "205016157": "https://domidona.fbitsstatic.net/img/p/346934/bota-coturno-feminina-infantil-tratorado-menina-fashion-rosa-151510/346934-1.jpg?w=1000&h=1000&v=",
    "155191009": "https://domidona.fbitsstatic.net/img/p/339750/tenis-feminino-infantil-menina-fashion-cano-alto-glitter-preto-150561/339750-9.jpg?w=1000&h=1000&v=",
    "225001195": "https://domidona.fbitsstatic.net/img/p/347324/bota-feminina-biker-cano-medio-tratorada-com-fivelas-tendencia-preta-151556/347324-1.jpg?w=1000&h=1000&v=",
    "122004009": "https://domidona.fbitsstatic.net/img/p/337549/bota-salto-grosso-over-the-knee-sintetico-napa-stretch-preta-150251/337549-1.jpg?w=1000&h=1000&v=",
    "179001195": "https://domidona.fbitsstatic.net/img/p/337433/bota-over-the-knee-stretch-bico-fino-salto-grosso-alto-napa-preta-150236/337433-2.jpg?w=1000&h=1000&v=",
    "135003198": "https://domidona.fbitsstatic.net/img/p/338912/scarpin-salto-baixo-verniz-bico-fino-nude-150451/338912-2.jpg?w=1000&h=1000&v=",
    "179001175": "https://domidona.fbitsstatic.net/img/p/337426/bota-over-the-knee-stretch-bico-fino-salto-grosso-alto-preto-verniz-150235/337426-2.jpg?w=1000&h=1000&v=",
    "120029175": "https://domidona.fbitsstatic.net/img/p/347948/scarpin-feminino-slingback-bico-fino-metalizado-salto-fino-elegante-preto-151638/347948-2.jpg?w=1000&h=1000&v=",
    "135003383": "https://domidona.fbitsstatic.net/img/p/338919/scarpin-salto-baixo-verniz-bico-fino-dourado-150452/338919-2.jpg?w=1000&h=1000&v=",
    "179007197": "https://domidona.fbitsstatic.net/img/p/347687/bota-feminina-cano-medio-bico-fino-tira-de-strass-elegante-off-white-151605/347687-1.jpg?w=1000&h=1000&v=",
    "186001175": "https://domidona.fbitsstatic.net/img/p/347509/mary-jane-feminina-elegante-salto-bloco-grosso-bico-quadrado-preta-151579/347509-1.jpg?w=1000&h=1000&v=",
    "205016009": "https://domidona.fbitsstatic.net/img/p/346943/bota-coturno-feminina-infantil-tratorado-menina-fashion-preto-151511/346943-1.jpg?w=1000&h=1000&v=",
    "179005318": "https://domidona.fbitsstatic.net/img/p/347771/bota-feminina-cano-alto-longo-animal-print-salto-alto-grosso-preta-151615/347771-1.jpg?w=1000&h=1000&v=",
    "118005041": "https://domidona.fbitsstatic.net/img/p/337349/sapatilha-feminina-bico-fino-animal-print-elegante-confortavel-nude-150224/337349-2.jpg?w=1000&h=1000&v=",
    "237002197": "https://domidona.fbitsstatic.net/img/p/350042/bota-off-white-feminina-cano-curto-salto-vazado-cromado-151921/350042-1.jpg?w=1000&h=1000&v=",
    "saquinho": "https://domidona.fbitsstatic.net/img/p/350266/bag-shoes-domidona-151948/350266-1.jpg?w=1000&h=1000&v=",
    "209001009": "https://domidona.fbitsstatic.net/img/p/336973/coturno-feminino-tratorado-com-bolsinha-na-lateral-preto-150174/336973-1.jpg?w=1000&h=1000&v=",
    "118011197": "https://domidona.fbitsstatic.net/img/p/347757/sapatilha-feminina-bico-fino-em-verniz-tira-calcanhar-fivela-off-white-151613/347757-1.jpg?w=1000&h=1000&v=",
    "169101201": "https://domidona.fbitsstatic.net/img/p/350786/tenis-infantil-menina-fashion-brilho-metalizado-casual-rosa-152039/350786-1.jpg?w=1000&h=1000&v=",
    "173011383": "https://domidona.fbitsstatic.net/img/p/338055/sandalia-feminina-salto-bloco-laco-com-textura-brilhante-moda-dourado-150323/338055-2.jpg?w=1000&h=1000&v=",
    "120029383": "https://domidona.fbitsstatic.net/img/p/347934/scarpin-feminino-slingback-bico-fino-metalizado-salto-fino-elegante-dourado-151636/347934-1.jpg?w=1000&h=1000&v=",
    "237003197": "https://domidona.fbitsstatic.net/img/p/350804/bota-cano-curto-salto-fino-baixo-kitten-heel-metalizado-bico-fino-off-white-152041/350804-4.jpg?w=1000&h=1000&v=",
    "135003001": "https://domidona.fbitsstatic.net/img/p/338926/scarpin-salto-baixo-verniz-bico-fino-off-white-150453/338926-3.jpg?w=1000&h=1000&v=",
    "169101033": "https://domidona.fbitsstatic.net/img/p/350777/tenis-infantil-menina-fashion-brilho-metalizado-casual-dourado-152038/350777-1.jpg?w=1000&h=1000&v=",
    "120026383": "https://domidona.fbitsstatic.net/img/p/347495/scarpin-feminino-bico-fino-salto-bloco-grosso-brilhante-luxo-dourado-151577/347495-1.jpg?w=1000&h=1000&v=",
    "169021368": "https://domidona.fbitsstatic.net/img/p/346952/tenis-feminino-casual-colorido-refletivo-cano-medio-estiloso-colors-151512/346952-1.jpg?w=1000&h=1000&v=",
    "120028175": "https://domidona.fbitsstatic.net/img/p/347636/scarpin-feminino-slingback-salto-alto-fino-tiras-com-fivelas-preto-151598/347636-1.jpg?w=1000&h=1000&v=",
    "120026172": "https://domidona.fbitsstatic.net/img/p/347474/scarpin-feminino-bico-fino-salto-bloco-grosso-brilhante-luxo-preto-151574/347474-8.jpg?w=1000&h=1000&v=",
    "118005009": "https://domidona.fbitsstatic.net/img/p/337342/sapatilha-feminina-bico-fino-animal-print-elegante-confortavel-preta-150223/337342-2.jpg?w=1000&h=1000&v=",
    "68088285": "https://domidona.fbitsstatic.net/img/p/340180/sandalia-feminina-infantil-saltinho-baixo-com-strass-confort-dourado-150611/340180-1.jpg?w=1000&h=1000&v=",
    "185003756": "https://domidona.fbitsstatic.net/img/p/350326/tenis-cinza-feminino-domidona-estilo-streetwear-cano-baixo-casual-151958/350326-1.jpg?w=1000&h=1000&v=",
    "155095009": "https://domidona.fbitsstatic.net/img/p/339768/tenis-menina-fashion-unicornio-casual-infantil-botinha-preto-150563/339768-9.jpg?w=1000&h=1000&v=",
    "68051009": "https://domidona.fbitsstatic.net/img/p/339795/sandalia-salto-infantil-3-tiras-laco-preto-150566/339795-1.jpg?w=1000&h=1000&v=",
    "120030195": "https://domidona.fbitsstatic.net/img/p/347969/scarpin-feminino-bico-fino-metalizado-salto-alto-agulha-elegante-preto-151641/347969-1.jpg?w=1000&h=1000&v=",
    "118006033": "https://domidona.fbitsstatic.net/img/p/337300/sapatilha-feminina-bico-fino-detalhe-laco-elegante-da-moda-dourada-150217/337300-2.jpg?w=1000&h=1000&v=",
    "116042286": "https://domidona.fbitsstatic.net/img/p/348065/sandalia-feminina-salto-fino-com-tira-em-strass-brilhante-prata-151656/348065-8.jpg?w=1000&h=1000&v=",
    "68051001": "https://domidona.fbitsstatic.net/img/p/339786/sandalia-salto-infantil-3-tiras-laco-branco-150565/339786-1.jpg?w=1000&h=1000&v=",
    "122021711": "https://domidona.fbitsstatic.net/img/p/350863/bota-marrom-feminina-domidona-cano-alto-salto-fino-taca-elegante-152049/350863-1.jpg?w=1000&h=1000&v=",
    "185003019": "https://domidona.fbitsstatic.net/img/p/350312/tenis-caramelo-feminino-domidona-estilo-streetwear-cano-baixo-casual-151956/350312-1.jpg?w=1000&h=1000&v=",
    "118006009": "https://domidona.fbitsstatic.net/img/p/337286/sapatilha-feminina-bico-fino-detalhe-laco-elegante-da-moda-preta-150215/337286-1.jpg?w=1000&h=1000&v=",
    "120026001": "https://domidona.fbitsstatic.net/img/p/347502/scarpin-feminino-bico-fino-salto-bloco-grosso-brilhante-luxo-branco-151578/347502-1.jpg?w=1000&h=1000&v=",
    "162006286": "https://domidona.fbitsstatic.net/img/p/337971/sandalia-feminina-salto-bloco-confortavel-tiras-elegantes-moda-prata-150311/337971-2.jpg?w=1000&h=1000&v=",
    "185003121": "https://domidona.fbitsstatic.net/img/p/350333/tenis-off-white-feminino-domidona-estilo-streetwear-cano-baixo-casual-151959/350333-1.jpg?w=1000&h=1000&v=",
    "147006121": "https://domidona.fbitsstatic.net/img/p/338380/sandalia-salto-medio-grosso-tiras-cruzadas-feminina-domidona-off-white-150373/338380-1.jpg?w=1000&h=1000&v=",
    "173011501": "https://domidona.fbitsstatic.net/img/p/338048/sandalia-feminina-salto-bloco-laco-com-textura-brilhante-moda-preta-150322/338048-8.jpg?w=1000&h=1000&v=",
    "173011286": "https://domidona.fbitsstatic.net/img/p/338069/sandalia-feminina-salto-bloco-laco-com-textura-brilhante-moda-prata-150325/338069-2.jpg?w=1000&h=1000&v=",
    "169012195": "https://domidona.fbitsstatic.net/img/p/339937/tenis-feminino-infantil-cano-alto-conforto-casual-tira-strass-preto-150583/339937-1.jpg?w=1000&h=1000&v=",
    "116042383": "https://domidona.fbitsstatic.net/img/p/348077/sandalia-feminina-salto-fino-com-tira-em-strass-brilhante-dourado-151658/348077-1.jpg?w=1000&h=1000&v=",
    "118017710": "https://domidona.fbitsstatic.net/img/p/350411/sapatilha-feminina-preta-slingback-bico-fino-laco-abs-metalizado-151971/350411-1.jpg?w=1000&h=1000&v=",
    "169011195": "https://domidona.fbitsstatic.net/img/p/340486/tenis-casual-feminino-cano-medio-refletivo-recortes-confortavel-preto-150645/340486-1.jpg?w=1000&h=1000&v=",
    "218005195": "https://domidona.fbitsstatic.net/img/p/346997/coturno-tratorado-feminino-chunky-com-correntes-e-fivela-preto-151517/346997-1.jpg?w=1000&h=1000&v=",
    "162006287": "https://domidona.fbitsstatic.net/img/p/337992/sandalia-feminina-salto-bloco-confortavel-tiras-elegantes-moda-cobre-150314/337992-2.jpg?w=1000&h=1000&v=",
    "169101009": "https://domidona.fbitsstatic.net/img/p/350795/tenis-infantil-menina-fashion-brilho-metalizado-casual-preto-152040/350795-4.jpg?w=1000&h=1000&v=",
    "239005033": "https://domidona.fbitsstatic.net/img/p/350347/tenis-domidona-dourado-feminino-street-urbano-cano-baixo-sola-alta-151961/350347-1.jpg?w=1000&h=1000&v=",
    "118020727": "https://domidona.fbitsstatic.net/img/p/350530/sapatilha-preta-slingback-fivela-bico-fino-laco-delicado-151988/350530-1.jpg?w=1000&h=1000&v=",
    "118017711": "https://domidona.fbitsstatic.net/img/p/350425/sapatilha-feminina-marrom-slingback-bico-fino-laco-abs-metalizado-151973/350425-1.jpg?w=1000&h=1000&v=",
    "118020726": "https://domidona.fbitsstatic.net/img/p/350523/sapatilha-bege-slingback-fivela-bico-fino-laco-delicado-151987/350523-1.jpg?w=1000&h=1000&v=",
    "204105175": "https://domidona.fbitsstatic.net/img/p/347215/coturno-feminino-infantil-tratorado-verniz-com-laco-de-strass-preto-151543/347215-1.jpg?w=1000&h=1000&v=",
    "209003121": "https://domidona.fbitsstatic.net/img/p/337029/coturno-com-bolsinha-feminino-tratorado-cano-alto-off-white-150182/337029-1.jpg?w=1000&h=1000&v=",
    "120026198": "https://domidona.fbitsstatic.net/img/p/347481/scarpin-feminino-bico-fino-salto-bloco-grosso-brilhante-luxo-nude-151575/347481-1.jpg?w=1000&h=1000&v=",
    "147006019": "https://domidona.fbitsstatic.net/img/p/338387/sandalia-salto-medio-grosso-tiras-cruzadas-feminina-domidona-caramelo-150374/338387-1.jpg?w=1000&h=1000&v=",
    "162006383": "https://domidona.fbitsstatic.net/img/p/337985/sandalia-feminina-salto-bloco-confortavel-tiras-elegantes-moda-dourado-150313/337985-2.jpg?w=1000&h=1000&v=",
    "194003286": "https://domidona.fbitsstatic.net/img/p/350754/sandalia-salto-grosso-bloco-tiras-duplas-de-strass-prata-152031/350754-1.jpg?w=1000&h=1000&v=",
    "120025172": "https://domidona.fbitsstatic.net/img/p/337113/scarpin-salto-alto-bico-fino-elegante-confortavel-preto-150192/337113-2.jpg?w=1000&h=1000&v=",
    "135003286": "https://domidona.fbitsstatic.net/img/p/338905/scarpin-salto-baixo-verniz-bico-fino-prata-150450/338905-2.jpg?w=1000&h=1000&v=",
    "118019726": "https://domidona.fbitsstatic.net/img/p/350439/sapatilha-feminina-bege-bico-fino-laco-com-aplique-oval-metalizado-151975/350439-1.jpg?w=1000&h=1000&v=",
    "127007286": "https://domidona.fbitsstatic.net/img/p/347523/bota-feminina-texana-western-cano-alto-bordada-bico-fino-prata-151581/347523-2.jpg?w=1000&h=1000&v=",
    "209003009": "https://domidona.fbitsstatic.net/img/p/337022/coturno-com-bolsinha-feminino-tratorado-cano-alto-preto-150181/337022-1.jpg?w=1000&h=1000&v=",
    "116058710": "https://domidona.fbitsstatic.net/img/p/350399/sandalia-feminina-preto-salto-alto-grosso-cromado-tiras-com-tachas-151969/350399-1.jpg?w=1000&h=1000&v=",
    "257006383": "https://domidona.fbitsstatic.net/img/p/350709/rasteirinha-slingback-dourada-flat-pedrarias-brilho-bico-quadrado-152023/350709-1.jpg?w=1000&h=1000&v=",
    "116037383": "https://domidona.fbitsstatic.net/img/p/347022/sandalia-feminina-salto-grosso-tira-strass-espiral-mola-moda-dourada-151520/347022-1.jpg?w=1000&h=1000&v=",
    "116042195": "https://domidona.fbitsstatic.net/img/p/348083/sandalia-feminina-salto-fino-com-tira-em-strass-brilhante-preta-151659/348083-1.jpg?w=1000&h=1000&v=",
    "116057019": "https://domidona.fbitsstatic.net/img/p/350381/tamanco-caramelo-de-dedo-domidona-tiras-finas-de-strass-salto-medio-fino-151966/350381-1.jpg?w=1000&h=1000&v=",
    "164001121": "https://domidona.fbitsstatic.net/img/p/337821/tamanco-feminino-plataforma-tratorado-clog-madeira-confort-domidona-off-white-150290/337821-1.jpg?w=1000&h=1000&v=",
    "195005383": "https://domidona.fbitsstatic.net/img/p/350583/sandalia-dourado-salto-alto-grosso-tiras-finas-com-abs-metalizado-152005/350583-1.jpg?w=1000&h=1000&v=",
    "204074172": "https://domidona.fbitsstatic.net/img/p/347821/coturno-tratorado-infantil-cadarco-brilhante-menina-fashion-preto-verniz-151621/347821-1.jpg?w=1000&h=1000&v=",
    "169063695": "https://domidona.fbitsstatic.net/img/p/349451/tenis-infantil-preto-casual-menina-fashion-cano-alto-151846/349451-1.jpg?w=1000&h=1000&v=",
    "185003009": "https://domidona.fbitsstatic.net/img/p/350319/tenis-preto-feminino-domidona-estilo-streetwear-cano-baixo-casual-151957/350319-1.jpg?w=1000&h=1000&v=",
    "179017710": "https://domidona.fbitsstatic.net/img/p/349995/bota-social-feminina-preta-cano-alto-bico-fino-salto-alto-bloco-151914/349995-1.jpg?w=1000&h=1000&v=",
    "239005009": "https://domidona.fbitsstatic.net/img/p/350340/tenis-domidona-preto-feminino-street-urbano-cano-baixo-sola-alta-151960/350340-1.jpg?w=1000&h=1000&v=",
    "103004197": "https://domidona.fbitsstatic.net/img/p/347910/bota-montaria-over-the-knee-com-napa-stretch-off-white-151633/347910-1.jpg?w=1000&h=1000&v=",
    "157001002": "https://domidona.fbitsstatic.net/img/p/346918/tenis-bebe-unicornio-cano-alto-rosa-151508/346918-1.jpg?w=1000&h=1000&v=",
    "169011196": "https://domidona.fbitsstatic.net/img/p/340495/tenis-casual-feminino-cano-medio-refletivo-recortes-confortavel-branco-150646/340495-1.jpg?w=1000&h=1000&v=",
    "188006383": "https://domidona.fbitsstatic.net/img/p/348683/sapatilha-feminina-estilo-boneca-abs-metalizado-dourada-151744/348683-1.jpg?w=1000&h=1000&v=",
    "204105547": "https://domidona.fbitsstatic.net/img/p/347206/coturno-feminino-infantil-tratorado-verniz-com-laco-de-strass-rosa-151542/347206-8.jpg?w=1000&h=1000&v=",
    "248001197": "https://domidona.fbitsstatic.net/img/p/350361/sandalia-feminina-off-white-salto-grosso-bloco-madeira-tira-com-tachas-151963/350361-1.jpg?w=1000&h=1000&v=",
    "147006009": "https://domidona.fbitsstatic.net/img/p/338394/sandalia-salto-medio-grosso-tiras-cruzadas-feminina-domidona-preto-150375/338394-1.jpg?w=1000&h=1000&v=",
    "164001009": "https://domidona.fbitsstatic.net/img/p/337815/tamanco-feminino-plataforma-tratorado-clog-madeira-confort-domidona-preto-150289/337815-1.jpg?w=1000&h=1000&v=",
    "205037195": "https://domidona.fbitsstatic.net/img/p/347116/coturno-feminino-infantil-tratorado-menina-tira-de-strass-preto-151532/347116-1.jpg?w=1000&h=1000&v=",
    "222005195": "https://domidona.fbitsstatic.net/img/p/347812/sandalia-sapato-feminino-mary-jane-infantil-tratorado-com-strass-preta-151620/347812-8.jpg?w=1000&h=1000&v=",
    "118019710": "https://domidona.fbitsstatic.net/img/p/350432/sapatilha-feminina-preta-bico-fino-laco-com-aplique-oval-metalizado-151974/350432-1.jpg?w=1000&h=1000&v=",
    "118019763": "https://domidona.fbitsstatic.net/img/p/350446/sapatilha-feminina-caramelo-bico-fino-laco-com-aplique-oval-metalizado-151976/350446-1.jpg?w=1000&h=1000&v=",
    "188006197": "https://domidona.fbitsstatic.net/img/p/348690/sapatilha-feminina-estilo-boneca-abs-metalizado-off-white-151745/348690-1.jpg?w=1000&h=1000&v=",
    "204109195": "https://domidona.fbitsstatic.net/img/p/347053/coturno-feminino-infantil-tratorado-cadarco-bicolor-com-laco-preto-151525/347053-1.jpg?w=1000&h=1000&v=",
    "186002195": "https://domidona.fbitsstatic.net/img/p/347664/mary-jane-salto-bloco-grosso-bico-quadrado-preta-151602/347664-1.jpg?w=1000&h=1000&v=",
    "188006651": "https://domidona.fbitsstatic.net/img/p/348697/sapatilha-feminina-estilo-boneca-abs-metalizado-preta-151746/348697-1.jpg?w=1000&h=1000&v=",
    "195005195": "https://domidona.fbitsstatic.net/img/p/350569/sandalia-preta-salto-alto-grosso-tiras-finas-com-abs-metalizado-152003/350569-4.jpg?w=1000&h=1000&v=",
    "248001195": "https://domidona.fbitsstatic.net/img/p/350368/sandalia-feminina-preta-salto-grosso-bloco-madeira-tira-com-tachas-151964/350368-1.jpg?w=1000&h=1000&v=",
    "116037286": "https://domidona.fbitsstatic.net/img/p/336947/sandalia-feminina-salto-grosso-tira-strass-espiral-mola-moda-prata-150170/336947-2.jpg?w=1000&h=1000&v=",
    "169063697": "https://domidona.fbitsstatic.net/img/p/349460/tenis-infantil-branco-casual-menina-fashion-cano-alto-151847/349460-1.jpg?w=1000&h=1000&v=",
    "116032009": "https://domidona.fbitsstatic.net/img/p/336866/sandalia-feminina-espiral-salto-fino-com-strass-brilho-domidona-preta-150158/336866-1.jpg?w=1000&h=1000&v=",
    "116032121": "https://domidona.fbitsstatic.net/img/p/336859/sandalia-feminina-espiral-salto-fino-com-strass-brilho-domidona-off-white-150157/336859-1.jpg?w=1000&h=1000&v=",
    "116037195": "https://domidona.fbitsstatic.net/img/p/336933/sandalia-feminina-salto-grosso-tira-strass-espiral-mola-moda-preto-150168/336933-2.jpg?w=1000&h=1000&v=",
    "116037197": "https://domidona.fbitsstatic.net/img/p/336940/sandalia-feminina-salto-grosso-tira-strass-espiral-mola-moda-off-white-150169/336940-2.jpg?w=1000&h=1000&v=",
    "116042197": "https://domidona.fbitsstatic.net/img/p/348071/sandalia-feminina-salto-fino-com-tira-em-strass-brilhante-off-white-151657/348071-1.jpg?w=1000&h=1000&v=",
    "116045041": "https://domidona.fbitsstatic.net/img/p/348047/sandalia-feminina-elegante-tira-unica-e-fechamento-no-tornozelo-caramelo-151653/348047-2.jpg?w=1000&h=1000&v=",
    "116045195": "https://domidona.fbitsstatic.net/img/p/348059/sandalia-feminina-elegante-tira-unica-e-fechamento-no-tornozelo-preta-151655/348059-1.jpg?w=1000&h=1000&v=",
    "116045286": "https://domidona.fbitsstatic.net/img/p/348041/sandalia-feminina-elegante-tira-unica-e-fechamento-no-tornozelo-prata-151652/348041-1.jpg?w=1000&h=1000&v=",
    "116045383": "https://domidona.fbitsstatic.net/img/p/348053/sandalia-feminina-elegante-tira-unica-e-fechamento-no-tornozelo-dourada-151654/348053-1.jpg?w=1000&h=1000&v=",
    "116056747": "https://domidona.fbitsstatic.net/img/p/350288/tamanco-feminino-preto-verniz-molhado-salto-baixo-dourado-metalizado-bico-quadrado-151952/350288-1.jpg?w=1000&h=1000&v=",
    "116056748": "https://domidona.fbitsstatic.net/img/p/350294/tamanco-feminino-off-white-verniz-molhado-salto-baixo-dourado-metalizado-bico-quadrado-151953/350294-1.jpg?w=1000&h=1000&v=",
    "116057009": "https://domidona.fbitsstatic.net/img/p/350387/tamanco-preto-de-dedo-domidona-tiras-finas-de-strass-salto-medio-fino-151967/350387-1.jpg?w=1000&h=1000&v=",
    "116057383": "https://domidona.fbitsstatic.net/img/p/350375/tamanco-dourado-de-dedo-domidona-tiras-finas-de-strass-salto-medio-fino-151965/350375-1.jpg?w=1000&h=1000&v=",
    "116058709": "https://domidona.fbitsstatic.net/img/p/350405/sandalia-feminina-marrom-salto-alto-grosso-cromado-tiras-com-tachas-151970/350405-1.jpg?w=1000&h=1000&v=",
    "116058746": "https://domidona.fbitsstatic.net/img/p/350393/sandalia-feminina-off-white-salto-alto-grosso-cromado-tiras-com-tachas-151968/350393-1.jpg?w=1000&h=1000&v=",
    "116059130": "https://domidona.fbitsstatic.net/img/p/350828/tamanco-de-dedo-domidona-bico-quadrado-salto-fino-elegante-marsala-152044/350828-2.jpg?w=1000&h=1000&v=",
    "116059231": "https://domidona.fbitsstatic.net/img/p/350835/tamanco-de-dedo-domidona-bico-quadrado-salto-fino-elegante-off-white-152045/350835-2.jpg?w=1000&h=1000&v=",
    "116059710": "https://domidona.fbitsstatic.net/img/p/350842/tamanco-de-dedo-domidona-bico-quadrado-salto-fino-elegante-preto-152046/350842-2.jpg?w=1000&h=1000&v=",
    "116059711": "https://domidona.fbitsstatic.net/img/p/350821/tamanco-de-dedo-domidona-bico-quadrado-salto-fino-elegante-marrom-152043/350821-2.jpg?w=1000&h=1000&v=",
    "116060009": "https://domidona.fbitsstatic.net/img/p/350981/tamanco-feminino-em-vinil-salto-baixo-bico-quadrado-confortavel-preto-152057/350981-1.jpg?w=1000&h=1000&v=",
    "116060019": "https://domidona.fbitsstatic.net/img/p/350985/tamanco-feminino-em-vinil-salto-baixo-bico-quadrado-confortavel-caramelo-152058/350985-1.jpg?w=1000&h=1000&v=",
    "116060791": "https://domidona.fbitsstatic.net/img/p/350989/tamanco-feminino-em-vinil-salto-baixo-bico-quadrado-confortavel-branco-152059/350989-1.jpg?w=1000&h=1000&v=",
    "118006041": "https://domidona.fbitsstatic.net/img/p/337293/sapatilha-feminina-bico-fino-detalhe-laco-elegante-da-moda-nude-150216/337293-2.jpg?w=1000&h=1000&v=",
    "118006286": "https://domidona.fbitsstatic.net/img/p/337307/sapatilha-feminina-bico-fino-detalhe-laco-elegante-da-moda-prata-150218/337307-2.jpg?w=1000&h=1000&v=",
    "118011172": "https://domidona.fbitsstatic.net/img/p/347764/sapatilha-feminina-bico-fino-em-verniz-tira-calcanhar-fivela-preto-151614/347764-1.jpg?w=1000&h=1000&v=",
    "118015125": "https://domidona.fbitsstatic.net/img/p/347877/sapatilha-feminina-slingback-bico-fino-verniz-tiras-e-fivela-marsala-151629/347877-1.jpg?w=1000&h=1000&v=",
    "118015175": "https://domidona.fbitsstatic.net/img/p/347891/sapatilha-feminina-slingback-bico-fino-verniz-tiras-e-fivela-preta-151631/347891-1.jpg?w=1000&h=1000&v=",
    "118015197": "https://domidona.fbitsstatic.net/img/p/347884/sapatilha-feminina-slingback-bico-fino-verniz-tiras-e-fivela-off-white-151630/347884-1.jpg?w=1000&h=1000&v=",
    "118017709": "https://domidona.fbitsstatic.net/img/p/350418/sapatilha-feminina-caramelo-slingback-bico-fino-laco-abs-metalizado-151972/350418-1.jpg?w=1000&h=1000&v=",
    "120025033": "https://domidona.fbitsstatic.net/img/p/337120/scarpin-salto-alto-bico-fino-elegante-confortavel-ouro-light-150193/337120-2.jpg?w=1000&h=1000&v=",
    "120025175": "https://domidona.fbitsstatic.net/img/p/347467/scarpin-salto-alto-bico-fino-elegante-confortavel-preto-verniz-151573/347467-1.jpg?w=1000&h=1000&v=",
    "120028197": "https://domidona.fbitsstatic.net/img/p/347643/scarpin-feminino-slingback-salto-alto-fino-tiras-com-fivelas-off-white-151599/347643-1.jpg?w=1000&h=1000&v=",
    "120030197": "https://domidona.fbitsstatic.net/img/p/347962/scarpin-feminino-bico-fino-metalizado-salto-alto-agulha-elegante-off-white-151640/347962-1.jpg?w=1000&h=1000&v=",
    "122020710": "https://domidona.fbitsstatic.net/img/p/350870/bota-feminina-preta-domidona-cano-alto-salto-bloco-confortavel-152050/350870-1.jpg?w=1000&h=1000&v=",
    "122020711": "https://domidona.fbitsstatic.net/img/p/350877/bota-feminina-marrom-domidona-cano-alto-salto-bloco-confortavel-152051/350877-1.jpg?w=1000&h=1000&v=",
    "122021710": "https://domidona.fbitsstatic.net/img/p/350856/bota-preta-feminina-domidona-cano-alto-salto-fino-taca-elegante-152048/350856-2.jpg?w=1000&h=1000&v=",
    "135003172": "https://domidona.fbitsstatic.net/img/p/338933/scarpin-salto-baixo-verniz-bico-fino-preto-150454/338933-2.jpg?w=1000&h=1000&v=",
    "147014195": "https://domidona.fbitsstatic.net/img/p/348529/sandalia-feminina-preta-salto-alto-tira-com-abs-metalizado-151722/348529-1.jpg?w=1000&h=1000&v=",
    "147014197": "https://domidona.fbitsstatic.net/img/p/348522/sandalia-feminina-off-white-salto-alto-tira-com-abs-metalizado-151721/348522-1.jpg?w=1000&h=1000&v=",
    "147014383": "https://domidona.fbitsstatic.net/img/p/348536/sandalia-feminina-dourada-salto-alto-tira-com-abs-metalizado-151723/348536-1.jpg?w=1000&h=1000&v=",
    "147014689": "https://domidona.fbitsstatic.net/img/p/348543/sandalia-feminina-caramelo-salto-alto-tira-com-abs-metalizado-151724/348543-1.jpg?w=1000&h=1000&v=",
    "155095001": "https://domidona.fbitsstatic.net/img/p/339759/tenis-menina-fashion-unicornio-casual-infantil-botinha-branco-150562/339759-1.jpg?w=1000&h=1000&v=",
    "155095041": "https://domidona.fbitsstatic.net/img/p/339777/tenis-menina-fashion-unicornio-casual-infantil-botinha-rosa-150564/339777-1.jpg?w=1000&h=1000&v=",
    "155201009": "https://domidona.fbitsstatic.net/img/p/338976/tenis-feminino-slip-on-x-com-elastico-calce-facil-luxo-casual-preto-150459/338976-1.jpg?w=1000&h=1000&v=",
    "157001001": "https://domidona.fbitsstatic.net/img/p/346926/tenis-bebe-unicornio-cano-alto-branco-151509/346926-1.jpg?w=1000&h=1000&v=",
    "157001009": "https://domidona.fbitsstatic.net/img/p/346910/tenis-bebe-unicornio-cano-alto-preto-151507/346910-1.jpg?w=1000&h=1000&v=",
    "162006501": "https://domidona.fbitsstatic.net/img/p/337978/sandalia-feminina-salto-bloco-confortavel-tiras-elegantes-moda-preto-150312/337978-3.jpg?w=1000&h=1000&v=",
    "169012285": "https://domidona.fbitsstatic.net/img/p/339946/tenis-feminino-infantil-cano-alto-conforto-casual-tira-strass-dourado-150584/339946-1.jpg?w=1000&h=1000&v=",
    "178003195": "https://domidona.fbitsstatic.net/img/p/347415/bota-feminina-texana-infantil-menina-cano-alto-bordada-luxo-preta-151567/347415-1.jpg?w=1000&h=1000&v=",
    "178003197": "https://domidona.fbitsstatic.net/img/p/347424/bota-feminina-texana-infantil-menina-cano-alto-bordada-luxo-off-white-151568/347424-1.jpg?w=1000&h=1000&v=",
    "178004286": "https://domidona.fbitsstatic.net/img/p/347397/bota-feminina-texana-infantil-menina-cano-alto-bordada-da-moda-prata-151565/347397-1.jpg?w=1000&h=1000&v=",
    "188003009": "https://domidona.fbitsstatic.net/img/p/348592/sapatilha-feminina-preta-slingback-bicolor-bico-quadrado-151731/348592-1.jpg?w=1000&h=1000&v=",
    "188003041": "https://domidona.fbitsstatic.net/img/p/348606/sapatilha-feminina-nude-slingback-bicolor-bico-quadrado-151733/348606-1.jpg?w=1000&h=1000&v=",
    "188003197": "https://domidona.fbitsstatic.net/img/p/348599/sapatilha-feminina-off-white-slingback-bicolor-bico-quadrado-151732/348599-1.jpg?w=1000&h=1000&v=",
    "188005197": "https://domidona.fbitsstatic.net/img/p/348711/sapatilha-feminina-off-white-tiras-cruzadas-e-tachas-metalicas-151748/348711-1.jpg?w=1000&h=1000&v=",
    "188005383": "https://domidona.fbitsstatic.net/img/p/348718/sapatilha-feminina-dourado-tiras-cruzadas-e-tachas-metalicas-151749/348718-1.jpg?w=1000&h=1000&v=",
    "188005651": "https://domidona.fbitsstatic.net/img/p/348704/sapatilha-feminina-preta-tiras-cruzadas-e-tachas-metalicas-151747/348704-1.jpg?w=1000&h=1000&v=",
    "194003197": "https://domidona.fbitsstatic.net/img/p/348753/sandalia-off-white-salto-grosso-bloco-tiras-duplas-de-strass-151754/348753-1.jpg?w=1000&h=1000&v=",
    "194003383": "https://domidona.fbitsstatic.net/img/p/348746/sandalia-dourada-salto-grosso-bloco-tiras-duplas-de-strass-151753/348746-1.jpg?w=1000&h=1000&v=",
    "194003501": "https://domidona.fbitsstatic.net/img/p/348739/sandalia-preta-salto-grosso-bloco-tiras-duplas-de-strass-151752/348739-1.jpg?w=1000&h=1000&v=",
    "195005197": "https://domidona.fbitsstatic.net/img/p/350576/sandalia-off-white-salto-alto-grosso-tiras-finas-com-abs-metalizado-152004/350576-1.jpg?w=1000&h=1000&v=",
    "204101197": "https://domidona.fbitsstatic.net/img/p/350176/coturno-feminino-infantil-tratorado-off-white-cano-alto-tachas-douradas-151938/350176-1.jpg?w=1000&h=1000&v=",
    "205037197": "https://domidona.fbitsstatic.net/img/p/347107/coturno-feminino-infantil-tratorado-menina-tira-de-strass-off-white-151531/347107-1.jpg?w=1000&h=1000&v=",
    "209001121": "https://domidona.fbitsstatic.net/img/p/336980/coturno-feminino-tratorado-com-bolsinha-na-lateral-off-white-150175/336980-1.jpg?w=1000&h=1000&v=",
    "239005121": "https://domidona.fbitsstatic.net/img/p/350354/tenis-off-white-feminino-street-urbano-cano-baixo-sola-alta-detalhes-rosa-151962/350354-1.jpg?w=1000&h=1000&v=",
    "247001009": "https://domidona.fbitsstatic.net/img/p/350467/sandalia-feminina-preta-anabela-com-tachas-salto-plataforma-madeira-151979/350467-1.jpg?w=1000&h=1000&v=",
    "247001019": "https://domidona.fbitsstatic.net/img/p/350474/sandalia-feminina-caramelo-anabela-com-tachas-salto-plataforma-madeira-151980/350474-1.jpg?w=1000&h=1000&v=",
    "257006710": "https://domidona.fbitsstatic.net/img/p/350695/rasteirinha-slingback-flat-preta-pedrarias-brilho-bico-quadrado-152021/350695-1.jpg?w=1000&h=1000&v=",
    "257006746": "https://domidona.fbitsstatic.net/img/p/350702/rasteirinha-slingback-off-white-flat-pedrarias-brilho-bico-quadrado-152022/350702-1.jpg?w=1000&h=1000&v=",
    "68051033": "https://domidona.fbitsstatic.net/img/p/339804/sandalia-salto-infantil-3-tiras-laco-ouro-light-150567/339804-1.jpg?w=1000&h=1000&v=",
    "68051041": "https://domidona.fbitsstatic.net/img/p/339813/sandalia-salto-infantil-3-tiras-laco-nude-150568/339813-1.jpg?w=1000&h=1000&v=",
    "68088172": "https://domidona.fbitsstatic.net/img/p/340162/sandalia-feminina-infantil-saltinho-baixo-com-strass-confort-preto-150609/340162-1.jpg?w=1000&h=1000&v=",
    "68088181": "https://domidona.fbitsstatic.net/img/p/340171/sandalia-feminina-infantil-saltinho-baixo-com-strass-confort-rosa-150610/340171-1.jpg?w=1000&h=1000&v=",
    "68088287": "https://domidona.fbitsstatic.net/img/p/340189/sandalia-feminina-infantil-saltinho-baixo-com-strass-confort-cobre-150612/340189-1.jpg?w=1000&h=1000&v=",
    "900001009": "https://domidona.fbitsstatic.net/img/p/350559/bolsa-feminina-preta-domidona-mini-bag-pequena-com-corrente-dourada-151993/350559-1.jpg?w=1000&h=1000&v=",
    "900001121": "https://domidona.fbitsstatic.net/img/p/350558/bolsa-feminina-off-white-domidona-mini-bag-pequena-com-corrente-dourada-151992/350558-1.jpg?w=1000&h=1000&v=",
    "900002009": "https://domidona.fbitsstatic.net/img/p/350560/bolsa-tote-bag-feminina-preta-domidona-grande-alca-dupla-detalhes-dourados-151994/350560-1.jpg?w=1000&h=1000&v=",
    "900002019": "https://domidona.fbitsstatic.net/img/p/350561/bolsa-tote-bag-feminina-caramelo-domidona-grande-alca-dupla-detalhes-dourados-151995/350561-1.jpg?w=1000&h=1000&v=",
    "900003009": "https://domidona.fbitsstatic.net/img/p/350562/bolsa-tiracolo-feminina-preta-domidona-media-retro-chic-alca-ajustavel-151996/350562-1.jpg?w=1000&h=1000&v=",
    "900003711": "https://domidona.fbitsstatic.net/img/p/350563/bolsa-tiracolo-feminina-marrom-domidona-media-retro-chic-alca-ajustavel-151997/350563-1.jpg?w=1000&h=1000&v=",
    "900004009": "https://domidona.fbitsstatic.net/img/p/350564/bolsa-feminina-preta-domidona-tiracolo-metalizada-corrente-alca-ajustavel-151998/350564-1.jpg?w=1000&h=1000&v=",
    "900004013": "https://domidona.fbitsstatic.net/img/p/350565/bolsa-feminina-dourada-domidona-tiracolo-metalizada-corrente-alca-ajustavel-151999/350565-1.jpg?w=1000&h=1000&v=",
    "900005009": "https://domidona.fbitsstatic.net/img/p/350568/mochila-feminina-domidona-preta-minimalista-grande-alcas-ajustaveis-152002/350568-1.jpg?w=1000&h=1000&v=",
    "900005019": "https://domidona.fbitsstatic.net/img/p/350567/mochila-feminina-domidona-caramelo-minimalista-grande-alcas-ajustaveis-152001/350567-1.jpg?w=1000&h=1000&v=",
    "900006009": "https://domidona.fbitsstatic.net/img/p/350566/bolsa-feminina-preta-domidona-hobo-media-detalhe-corrente-metalizada-152000/350566-1.jpg?w=1000&h=1000&v=",
    "900008286": "https://domidona.fbitsstatic.net/img/p/350762/bolsa-necessaire-prata-brilho-metalizado-feminina-media-viagem-moderna-152033/350762-1.jpg?w=1000&h=1000&v=",
    "900008383": "https://domidona.fbitsstatic.net/img/p/350764/bolsa-necessaire-dourada-brilho-metalizado-feminina-media-viagem-glamour-152035/350764-1.jpg?w=1000&h=1000&v=",
    "900008726": "https://domidona.fbitsstatic.net/img/p/350761/bolsa-necessaire-bege-trama-natural-feminina-media-viagem-toque-artesanal-152032/350761-1.jpg?w=1000&h=1000&v=",
    "900008727": "https://domidona.fbitsstatic.net/img/p/350763/bolsa-necessaire-trama-natural-feminina-media-viagem-toque-artesanal-152034/350763-1.jpg?w=1000&h=1000&v="
};

const state = {
    inputs: {},
    currentCategory: 'Todas',
    searchTerm: ''
};

let skusData = [];

const container = document.getElementById('skus-container');
const searchInput = document.getElementById('search-input');
const grandTotalEl = document.getElementById('grand-total');
let tabsContainer = document.getElementById('category-tabs');

if (!tabsContainer && searchInput) {
    tabsContainer = document.createElement('div');
    tabsContainer.id = 'category-tabs';
    searchInput.parentNode.insertBefore(tabsContainer, searchInput.nextSibling);
}

async function init() {
    if (container) {
        container.innerHTML = '<div style="text-align:center; padding:30px; color:#64748b; font-weight:600;">🔄 Carregando catálogo dinâmico de fotos do banco...</div>';
    }

    try {
        const resposta = await fetch('https://api-domidona.onrender.com/api/analise-mercado');
        const dadosBanco = await resposta.json();

        const mapaAgrupado = new Map();

      dadosBanco.forEach(item => {
            let skuLimpo = item.sku.replace(/^(DD|MF)/i, '').split('-')[0].trim();
            let skuPai = skuLimpo.substring(0, 9);

            // Se for o saquinho vindo com texto misturado, força a identificação estável
            if (item.sku.toLowerCase().includes("saquinho")) {
                skuPai = "saquinho";
            }

            if (catalogoImagensOficiais[skuPai] || skuPai === "saquinho") {
                if (!mapaAgrupado.has(skuPai)) {
                    const nomeLower = (item.nome_produto || '').toLowerCase();
                    let cat = 'Outros';
                    if (nomeLower.includes('bolsa') || nomeLower.includes('mochila') || nomeLower.includes('nécessaire') || nomeLower.includes('bag')) cat = 'Bolsas/Acessórios';
                    else if (nomeLower.includes('sapatilha')) cat = 'Sapatilhas';
                    else if (nomeLower.includes('sandália') || nomeLower.includes('sandalia')) cat = 'Sandálias';
                    else if (nomeLower.includes('scarpin')) cat = 'Scarpins';
                    else if (nomeLower.includes('tênis') || nomeLower.includes('tenis')) cat = 'Tênis';
                    else if (nomeLower.includes('bota') || nomeLower.includes('coturno')) cat = 'Botas e Coturnos';
                    else if (nomeLower.includes('tamanco') || nomeLower.includes('rasteira') || nomeLower.includes('rasteirinha')) cat = 'Tamancos/Rasteiras';

                    // Configurações padrão para o card
                    let nomeFinal = item.nome_produto || 'Produto Sem Nome';
                    let gradeFinal = adultSizes;

                    // TRAVA ULTRA SECRETA: Corrige o saquinho poluído do pgAdmin
                    if (skuPai === "saquinho") {
                        nomeFinal = "Bag Shoes Domidona";
                        gradeFinal = ["UN"]; // Remove a grade 34 a 40 e deixa apenas Único
                        cat = 'Bolsas/Acessórios';
                    }

                    mapaAgrupado.set(skuPai, {
                        id: skuPai,
                        name: nomeFinal,
                        sizes: gradeFinal,
                        category: cat,
                        image: catalogoImagensOficiais[skuPai] || 'https://placehold.co/150x150?text=Domidona'
                    });
                }
            }
        });

        skusData = Array.from(mapaAgrupado.values());

        setupCategories();
        renderSkus();
        setupEventListeners();

        const elDate = document.getElementById('print-date');
        if (elDate) elDate.textContent = new Date().toLocaleDateString('pt-BR');

    } catch (erro) {
        console.error(erro);
        if (container) {
            container.innerHTML = '<div style="text-align:center; padding:30px; color:#ef4444; font-weight:600;">❌ Erro de conexão com o banco. O server.js está ativo?</div>';
        }
    }
}

function setupCategories() {
    if (!tabsContainer) return;
    tabsContainer.innerHTML = '';

    const categoriasExistentes = ['Todas'];
    skusData.forEach(s => {
        if (!categoriasExistentes.includes(s.category)) categoriasExistentes.push(s.category);
    });

    categoriasExistentes.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${cat === state.currentCategory ? 'active' : ''}`;
        btn.textContent = cat;
        btn.dataset.cat = cat;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentCategory = cat;
            renderSkus();
        });
        tabsContainer.appendChild(btn);
    });
}

function renderSkus() {
    if (!container) return;
    container.innerHTML = '';
    
    const filteredSkus = skusData.filter(sku => {
        let matchCat = (state.currentCategory === 'Todas') || (sku.category === state.currentCategory);
        const matchSearch = sku.id.includes(state.searchTerm) || sku.name.toLowerCase().includes(state.searchTerm);
        return matchCat && matchSearch;
    });

    if (filteredSkus.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:20px; color:#64748b;">Nenhum modelo ativo encontrado.</div>';
        return;
    }

    filteredSkus.forEach(sku => {
        if (!state.inputs[sku.id]) state.inputs[sku.id] = { sizes: {}, multiplier: 1 };

        const card = document.createElement('div');
        card.className = 'sku-card';
        card.id = `card-${sku.id}`;

        let sizesHTML = '';
        sku.sizes.forEach(size => {
            const val = state.inputs[sku.id].sizes[size] || '';
            sizesHTML += `
                <div class="size-item">
                    <div class="size-label">${size}</div>
                    <input type="number" class="size-input" data-sku="${sku.id}" data-size="${size}" min="0" placeholder="0" value="${val}">
                </div>
            `;
        });

        card.innerHTML = `
            <div class="sku-header">
                <img src="${sku.image}" class="sku-image" alt="Produto" onerror="this.src='https://placehold.co/150x150?text=Domidona'">
                <div class="sku-info">
                    <h3>SKU: ${sku.id}</h3>
                    <p>${sku.name}</p>
                </div>
            </div>
            <div class="size-grid">${sizesHTML}</div>
            <div class="sku-footer no-print">
                <div class="calc-row">
                    <span>Grade: <strong id="grade-${sku.id}">0</strong></span>
                    <div class="multiplier-wrapper">
                        <span>Pedidos:</span>
                        <input type="number" class="multiplier-input" data-sku="${sku.id}" value="${state.inputs[sku.id].multiplier}" min="1">
                    </div>
                    <span>Total: <strong class="final-total" id="total-${sku.id}">0</strong></span>
                </div>
                <button class="btn-print-single" data-sku="${sku.id}">🖨️ Imprimir Apenas Esta Ref.</button>
            </div>
        `;
        container.appendChild(card);
    });

    recalculateAll();
}

function setupEventListeners() {
    if (searchInput) {
        searchInput.replaceWith(searchInput.cloneNode(true));
        const novoSearchInput = document.getElementById('search-input');
        novoSearchInput.addEventListener('input', (e) => {
            state.searchTerm = e.target.value.toLowerCase().trim();
            renderSkus();
        });
    }
    if (container) {
        container.addEventListener('input', (e) => {
            const skuId = e.target.dataset.sku;
            if (e.target.classList.contains('size-input')) {
                state.inputs[skuId].sizes[e.target.dataset.size] = parseInt(e.target.value) || 0;
            } else if (e.target.classList.contains('multiplier-input')) {
                let val = parseInt(e.target.value);
                state.inputs[skuId].multiplier = isNaN(val) || val < 1 ? 1 : val;
            }
            recalculateAll();
        });
    }
}

function recalculateAll() {
    let grandTotal = 0;
    skusData.forEach(sku => {
        const inputData = state.inputs[sku.id];
        if(!inputData) return;
        let gradePairs = 0;
        for (const size in inputData.sizes) { gradePairs += inputData.sizes[size]; }
        const skuFinalTotal = gradePairs * inputData.multiplier;
        const elGrade = document.getElementById(`grade-${sku.id}`);
        if(elGrade) {
            elGrade.textContent = gradePairs;
            const elTotal = document.getElementById(`total-${sku.id}`);
            if (elTotal) elTotal.textContent = skuFinalTotal;
        }
        grandTotal += skuFinalTotal;
    });
    if (grandTotalEl) grandTotalEl.textContent = grandTotal;
}

init();