// ======================================================
// CARVAIMPORTES
// ======================================================

const WHATSAPP_LOJA = "5511991533124";
const PIX_KEY = "11991533124";


// ======================================================
// FRETE
// ======================================================

const FRETES = {
    SP: 19.90,

    RJ: 24.90,
    MG: 24.90,
    ES: 24.90,

    PR: 29.90,
    SC: 29.90,
    RS: 29.90,

    DF: 34.90,
    GO: 34.90,
    MT: 34.90,
    MS: 34.90,

    BA: 39.90,
    SE: 39.90,
    AL: 39.90,
    PE: 39.90,
    PB: 39.90,
    RN: 39.90,
    CE: 39.90,
    PI: 39.90,
    MA: 39.90,

    AC: 49.90,
    AP: 49.90,
    AM: 49.90,
    PA: 49.90,
    RO: 49.90,
    RR: 49.90,
    TO: 49.90
};


// ======================================================
// PRODUTOS
// ======================================================

const produtos = [
    {
        id: "real-madrid",
        nome: "Real Madrid",
        categoria: "europeus",
        imagem: "./img/real-madrid.png",
        estoque: 15,
        lancamento: true,
        maisVendido: true
    },

    {
        id: "barcelona",
        nome: "Barcelona",
        categoria: "europeus",
        imagem: "./img/barcelona.png",
        estoque: 8,
        lancamento: true,
        maisVendido: true
    },

    {
        id: "manchester-city",
        nome: "Manchester City",
        categoria: "europeus",
        imagem: "./img/manchestercity.png",
        estoque: 4,
        lancamento: true,
        maisVendido: false
    },

    {
        id: "psg",
        nome: "Paris Saint-Germain",
        categoria: "europeus",
        imagem: "./img/parisSaint-Germain.png",
        estoque: 12,
        lancamento: false,
        maisVendido: true
    },

    {
        id: "sao-paulo",
        nome: "São Paulo",
        categoria: "brasileiros",
        imagem: "./img/saopaulo.png",
        estoque: 5,
        lancamento: true,
        maisVendido: true
    },

    {
        id: "corinthians",
        nome: "Corinthians",
        categoria: "brasileiros",
        imagem: "./img/corinthians.png",
        estoque: 10,
        lancamento: false,
        maisVendido: true
    },

    {
        id: "palmeiras",
        nome: "Palmeiras",
        categoria: "brasileiros",
        imagem: "./img/palmeiras.png",
        estoque: 3,
        lancamento: false,
        maisVendido: false
    },

    {
        id: "flamengo",
        nome: "Flamengo",
        categoria: "brasileiros",
        imagem: "./img/flamengo.png",
        estoque: 18,
        lancamento: true,
        maisVendido: true
    },

    {
        id: "brasil",
        nome: "Brasil",
        categoria: "selecoes",
        imagem: "./img/brasil.png",
        estoque: 20,
        lancamento: true,
        maisVendido: true
    },

    {
        id: "argentina",
        nome: "Argentina",
        categoria: "selecoes",
        imagem: "./img/argentina.png",
        estoque: 7,
        lancamento: false,
        maisVendido: true
    },

    {
        id: "portugal",
        nome: "Portugal",
        categoria: "selecoes",
        imagem: "./img/portugal.png",
        estoque: 4,
        lancamento: true,
        maisVendido: false
    },

    {
        id: "franca",
        nome: "França",
        categoria: "selecoes",
        imagem: "./img/franca.png",
        estoque: 0,
        lancamento: false,
        maisVendido: false
    }
];


// ======================================================
// FUNÇÕES BÁSICAS
// ======================================================

function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function normalizarTexto(texto) {
    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// ======================================================
// FAVORITOS
// ======================================================

function pegarFavoritos() {
    try {
        return JSON.parse(
            localStorage.getItem("carvaFavoritos")
        ) || [];
    } catch {
        return [];
    }
}


function salvarFavoritos(favoritos) {
    localStorage.setItem(
        "carvaFavoritos",
        JSON.stringify(favoritos)
    );

    atualizarContadorFavoritos();
}


function produtoFavoritado(id) {
    return pegarFavoritos().includes(id);
}


function alternarFavorito(id) {
    let favoritos = pegarFavoritos();

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(
            item => item !== id
        );
    } else {
        favoritos.push(id);
    }

    salvarFavoritos(favoritos);

    carregarCatalogo();
    carregarDestaques();
}


function atualizarContadorFavoritos() {
    const contador =
        document.getElementById("contadorFavoritos");

    if (contador) {
        contador.textContent =
            pegarFavoritos().length;
    }
}


// ======================================================
// ESTOQUE
// ======================================================

function gerarEstoque(produto) {
    if (produto.estoque <= 0) {
        return `
            <div class="estoque estoque-esgotado">
                Esgotado
            </div>
        `;
    }

    if (produto.estoque <= 5) {
        return `
            <div class="estoque estoque-baixo">
                Últimas ${produto.estoque} unidades
            </div>
        `;
    }

    return `
        <div class="estoque estoque-disponivel">
            Em estoque
        </div>
    `;
}


// ======================================================
// CARD
// ======================================================

function criarCardProduto(produto) {
    const favorito =
        produtoFavoritado(produto.id);

    return `
        <article class="produto-card">

            <div class="produto-card-img">

                <img
                    src="${produto.imagem}"
                    alt="Camisa ${produto.nome}"
                    onerror="
                        this.style.display='none';
                        this.parentElement.classList.add('imagem-indisponivel');
                    "
                >

                ${
                    produto.lancamento
                        ? `<span class="badge">NOVO</span>`
                        : ""
                }

                <button
                    type="button"
                    class="btn-favorito ${favorito ? "ativo" : ""}"
                    onclick="alternarFavorito('${produto.id}')"
                >
                    ${favorito ? "❤️" : "🤍"}
                </button>

            </div>


            <div class="produto-card-info">

                <small>
                    CAMISA IMPORTADA
                </small>

                <h3>
                    ${produto.nome}
                </h3>

                ${gerarEstoque(produto)}

                <div class="precos">

                    <div>
                        <span>Torcedor</span>
                        <strong>
    ${moeda(produto.precoTorcedor)}
                        </strong>
                    </div>

                    <div>
                        <span>Jogador</span>
                        <strong>
                           ${moeda(produto.precoJogador)}
                        </strong>
                    </div>

                </div>

                ${
                    produto.estoque > 0
                        ? `
                        <a
                            href="./produto.html?id=${produto.id}"
                            class="btn-produto"
                        >
                            VER CAMISA
                        </a>
                        `
                        : `
                        <button
                            type="button"
                            class="btn-produto"
                            disabled
                            style="opacity:.5;border:0"
                        >
                            ESGOTADO
                        </button>
                        `
                }

            </div>

        </article>
    `;
}


// ======================================================
// LANÇAMENTOS HOME
// ======================================================

function carregarDestaques() {
    const lancamentos =
        document.getElementById(
            "produtosLancamentos"
        );

    if (!lancamentos) {
        return;
    }

    lancamentos.innerHTML = "";

    produtos
        .filter(produto => produto.lancamento)
        .slice(0, 4)
        .forEach(produto => {
            lancamentos.innerHTML +=
                criarCardProduto(produto);
        });
}


// ======================================================
// CATÁLOGO
// ======================================================

let filtroAtual = "todos";
let textoPesquisa = "";


function filtrarProdutos() {
    let lista = [...produtos];

    if (
        filtroAtual !== "todos" &&
        filtroAtual !== "favoritos"
    ) {
        lista = lista.filter(
            produto =>
                produto.categoria === filtroAtual
        );
    }

    if (filtroAtual === "favoritos") {
        const favoritos =
            pegarFavoritos();

        lista = lista.filter(
            produto =>
                favoritos.includes(produto.id)
        );
    }

    if (textoPesquisa) {
        const texto =
            normalizarTexto(textoPesquisa);

        lista = lista.filter(
            produto =>
                normalizarTexto(produto.nome)
                    .includes(texto)
        );
    }

    return lista;
}


function carregarCatalogo() {
    const europeus =
        document.getElementById(
            "produtosEuropeus"
        );

    const brasileiros =
        document.getElementById(
            "produtosBrasileiros"
        );

    const selecoes =
        document.getElementById(
            "produtosSelecoes"
        );

    if (
        !europeus &&
        !brasileiros &&
        !selecoes
    ) {
        return;
    }


    if (europeus) {
        europeus.innerHTML = "";
    }

    if (brasileiros) {
        brasileiros.innerHTML = "";
    }

    if (selecoes) {
        selecoes.innerHTML = "";
    }


    const filtrados =
        filtrarProdutos();


    filtrados.forEach(produto => {
        const card =
            criarCardProduto(produto);

        if (
            produto.categoria === "europeus" &&
            europeus
        ) {
            europeus.innerHTML += card;
        }

        if (
            produto.categoria === "brasileiros" &&
            brasileiros
        ) {
            brasileiros.innerHTML += card;
        }

        if (
            produto.categoria === "selecoes" &&
            selecoes
        ) {
            selecoes.innerHTML += card;
        }
    });


    atualizarCategorias(filtrados);


    const resultado =
        document.getElementById(
            "quantidadeResultados"
        );

    if (resultado) {
        resultado.textContent =
            `${filtrados.length} camisas encontradas`;
    }
}


function atualizarCategorias(lista) {
    const categorias = {
        europeus:
            document.getElementById("europeus"),

        brasileiros:
            document.getElementById("brasileiros"),

        selecoes:
            document.getElementById("selecoes")
    };


    Object.entries(categorias)
        .forEach(([nome, elemento]) => {

            if (!elemento) {
                return;
            }

            const existe =
                lista.some(
                    produto =>
                        produto.categoria === nome
                );

            elemento.style.display =
                existe ? "block" : "none";
        });


    const semResultado =
        document.getElementById(
            "semResultados"
        );


    if (semResultado) {
        semResultado.classList.toggle(
            "mostrar",
            lista.length === 0
        );
    }
}


// ======================================================
// PESQUISA
// ======================================================

function configurarPesquisa() {
    const input =
        document.getElementById(
            "pesquisaProduto"
        );

    const limpar =
        document.getElementById(
            "limparPesquisa"
        );


    if (input) {
        input.addEventListener(
            "input",
            function () {
                textoPesquisa =
                    this.value.trim();

                carregarCatalogo();
            }
        );
    }


    if (limpar) {
        limpar.addEventListener(
            "click",
            function () {

                textoPesquisa = "";

                if (input) {
                    input.value = "";
                }

                carregarCatalogo();
            }
        );
    }
}


// ======================================================
// FILTROS
// ======================================================

function configurarFiltros() {
    const botoes =
        document.querySelectorAll(
            ".filtro-btn"
        );

    if (!botoes.length) {
        return;
    }


    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const categoria =
        parametros.get("categoria");

    const filtro =
        parametros.get("filtro");


    if (
        [
            "europeus",
            "brasileiros",
            "selecoes"
        ].includes(categoria)
    ) {
        filtroAtual = categoria;
    }


    if (filtro === "favoritos") {
        filtroAtual = "favoritos";
    }


    botoes.forEach(botao => {

        botao.classList.toggle(
            "ativo",
            botao.dataset.filtro === filtroAtual
        );


        botao.addEventListener(
            "click",
            function () {

                botoes.forEach(item =>
                    item.classList.remove("ativo")
                );

                this.classList.add("ativo");

                filtroAtual =
                    this.dataset.filtro;

                carregarCatalogo();
            }
        );
    });


    const mostrarTodos =
        document.getElementById(
            "btnMostrarTodos"
        );

    if (mostrarTodos) {
        mostrarTodos.addEventListener(
            "click",
            function () {

                filtroAtual = "todos";
                textoPesquisa = "";

                const pesquisa =
                    document.getElementById(
                        "pesquisaProduto"
                    );

                if (pesquisa) {
                    pesquisa.value = "";
                }

                botoes.forEach(botao => {
                    botao.classList.toggle(
                        "ativo",
                        botao.dataset.filtro === "todos"
                    );
                });

                carregarCatalogo();
            }
        );
    }
}


// ======================================================
// CARRINHO
// ======================================================

function pegarCarrinho() {
    try {
        return JSON.parse(
            localStorage.getItem(
                "carvaCarrinho"
            )
        ) || [];
    } catch {
        return [];
    }
}


function salvarCarrinho(carrinho) {
    localStorage.setItem(
        "carvaCarrinho",
        JSON.stringify(carrinho)
    );

    atualizarContadorCarrinho();
    carregarCarrinhoLateral();
}


function atualizarContadorCarrinho() {
    const carrinho =
        pegarCarrinho();

    const quantidade =
        carrinho.reduce(
            (total, item) =>
                total + Number(item.quantidade),
            0
        );


    const contador =
        document.getElementById(
            "contadorCarrinho"
        );

    const flutuante =
        document.getElementById(
            "contadorCarrinhoFlutuante"
        );


    if (contador) {
        contador.textContent =
            quantidade;
    }

    if (flutuante) {
        flutuante.textContent =
            quantidade;
    }
}


function calcularTotalCarrinho() {
    return pegarCarrinho()
        .reduce(
            (total, item) =>
                total +
                Number(item.preco) *
                Number(item.quantidade),
            0
        );
}


// ======================================================
// PRODUTO INDIVIDUAL
// ======================================================

let produtoAtual = null;
let tamanhoSelecionado = "";
let quantidadeAtual = 1;


function carregarProduto() {
    const titulo =
        document.getElementById(
            "produtoNome"
        );

    if (!titulo) {
        return;
    }


    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const id =
        parametros.get("id");


    produtoAtual =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produtoAtual) {
        titulo.textContent =
            "Produto não encontrado";

        return;
    }


    titulo.textContent =
        `Camisa ${produtoAtual.nome}`;


    const imagem =
        document.getElementById(
            "produtoImagem"
        );

    if (imagem) {
        imagem.src =
            produtoAtual.imagem;
    }


    const estoque =
        document.getElementById(
            "estoqueProduto"
        );

    if (estoque) {
        estoque.innerHTML =
            gerarEstoque(produtoAtual);
    }


    configurarProduto();
}


function configurarProduto() {
    const tamanhos =
        document.querySelectorAll(
            ".tamanho-btn"
        );


    tamanhos.forEach(botao => {
        botao.addEventListener(
            "click",
            function () {

                tamanhos.forEach(item =>
                    item.classList.remove("ativo")
                );

                this.classList.add("ativo");

                tamanhoSelecionado =
                    this.dataset.tamanho;
            }
        );
    });


    document
        .querySelectorAll(
            'input[name="modelo"]'
        )
        .forEach(modelo => {
            modelo.addEventListener(
                "change",
                atualizarTotalProduto
            );
        });


    const adicionar =
        document.getElementById(
            "btnAdicionarCarrinho"
        );

    if (adicionar) {
        adicionar.addEventListener(
            "click",
            adicionarAoCarrinho
        );
    }


    atualizarTotalProduto();
}


function alterarQuantidade(valor) {
    if (!produtoAtual) {
        return;
    }

    quantidadeAtual += Number(valor);

    if (quantidadeAtual < 1) {
        quantidadeAtual = 1;
    }

    if (
        quantidadeAtual >
        produtoAtual.estoque
    ) {
        quantidadeAtual =
            produtoAtual.estoque;
    }


    const elemento =
        document.getElementById(
            "quantidade"
        );

    if (elemento) {
        elemento.textContent =
            quantidadeAtual;
    }

    atualizarTotalProduto();
}


function pegarModeloSelecionado() {
    return document.querySelector(
        'input[name="modelo"]:checked'
    );
}


function atualizarTotalProduto() {
    const modelo =
        pegarModeloSelecionado();

    if (!modelo) {
        return;
    }

    const preco =
        Number(modelo.dataset.preco);

    const total =
        preco * quantidadeAtual;


    const elemento =
        document.getElementById(
            "produtoTotal"
        );

    if (elemento) {
        elemento.textContent =
            moeda(total);
    }
}


function adicionarAoCarrinho() {
    if (!produtoAtual) {
        return;
    }


    if (!tamanhoSelecionado) {
        alert(
            "Escolha o tamanho."
        );

        return;
    }


    const modelo =
        pegarModeloSelecionado();

    if (!modelo) {
        return;
    }


    const item = {
        carrinhoId:
            Date.now(),

        produtoId:
            produtoAtual.id,

        nome:
            produtoAtual.nome,

        imagem:
            produtoAtual.imagem,

        modelo:
            modelo.value,

        tamanho:
            tamanhoSelecionado,

        nomePersonalizado:
            document.getElementById(
                "nomeCamisa"
            )?.value.trim() || "",

        numeroPersonalizado:
            document.getElementById(
                "numeroCamisa"
            )?.value.trim() || "",

        quantidade:
            quantidadeAtual,

        preco:
            Number(
                modelo.dataset.preco
            )
    };


    const carrinho =
        pegarCarrinho();

    carrinho.push(item);

    salvarCarrinho(carrinho);


    const toast =
        document.getElementById(
            "toast"
        );

    if (toast) {
        toast.classList.add("mostrar");

        setTimeout(() => {
            toast.classList.remove("mostrar");
        }, 2000);
    }
}


// ======================================================
// CARRINHO LATERAL
// ======================================================

function configurarCarrinhoLateral() {
    const abrir =
        document.getElementById(
            "abrirCarrinhoLateral"
        );

    const fechar =
        document.getElementById(
            "fecharCarrinhoLateral"
        );

    const overlay =
        document.getElementById(
            "carrinhoOverlay"
        );


    abrir?.addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "carrinhoLateral"
                )
                ?.classList.add("ativo");

            overlay?.classList.add("ativo");

            carregarCarrinhoLateral();
        }
    );


    function fecharLateral() {
        document
            .getElementById(
                "carrinhoLateral"
            )
            ?.classList.remove("ativo");

        overlay?.classList.remove("ativo");
    }


    fechar?.addEventListener(
        "click",
        fecharLateral
    );

    overlay?.addEventListener(
        "click",
        fecharLateral
    );
}


function carregarCarrinhoLateral() {
    const container =
        document.getElementById(
            "carrinhoLateralProdutos"
        );

    if (!container) {
        return;
    }


    const carrinho =
        pegarCarrinho();

    container.innerHTML = "";


    if (!carrinho.length) {
        container.innerHTML = `
            <div class="carrinho-lateral-vazio">
                <span>🛒</span>
                <strong>Carrinho vazio</strong>
            </div>
        `;
    } else {
        carrinho.forEach(item => {

            container.innerHTML += `
                <div class="item-carrinho-lateral">

                    <img
                        src="${item.imagem}"
                        alt="${item.nome}"
                    >

                    <div class="item-carrinho-lateral-info">

                        <strong>
                            ${item.nome}
                        </strong>

                        <span>
                            ${item.modelo} • ${item.tamanho}
                        </span>

                        <span>
                            ${item.quantidade}x
                        </span>

                    </div>

                    <strong>
                        ${moeda(
                            item.preco *
                            item.quantidade
                        )}
                    </strong>

                </div>
            `;
        });
    }


    const total =
        document.getElementById(
            "carrinhoLateralTotal"
        );

    if (total) {
        total.textContent =
            moeda(
                calcularTotalCarrinho()
            );
    }
}


// ======================================================
// FRETE
// ======================================================

function limparCep(cep) {
    return String(cep)
        .replace(/\D/g, "");
}


function formatarCep(cep) {
    const limpo =
        limparCep(cep).slice(0, 8);

    if (limpo.length <= 5) {
        return limpo;
    }

    return (
        limpo.slice(0, 5) +
        "-" +
        limpo.slice(5)
    );
}


async function buscarCep(cep) {
    const limpo =
        limparCep(cep);

    if (limpo.length !== 8) {
        throw new Error(
            "Digite um CEP válido."
        );
    }

    const resposta =
        await fetch(
            `https://viacep.com.br/ws/${limpo}/json/`
        );

    const dados =
        await resposta.json();

    if (dados.erro) {
        throw new Error(
            "CEP não encontrado."
        );
    }

    return dados;
}


function calcularFretePorEstado(uf) {
    return FRETES[
        String(uf).toUpperCase()
    ] ?? 49.90;
}


function calcularPrazoPorEstado(uf) {
    if (uf === "SP") {
        return "3 a 6 dias úteis";
    }

    if (
        ["RJ", "MG", "ES", "PR"]
            .includes(uf)
    ) {
        return "4 a 8 dias úteis";
    }

    return "7 a 15 dias úteis";
}


function salvarFrete(frete) {
    localStorage.setItem(
        "carvaFrete",
        JSON.stringify(frete)
    );
}


function pegarFrete() {
    try {
        return JSON.parse(
            localStorage.getItem(
                "carvaFrete"
            )
        );
    } catch {
        return null;
    }
}


// ======================================================
// FRETE PRODUTO
// ======================================================

function configurarFreteProduto() {
    const input =
        document.getElementById(
            "cepProduto"
        );

    const botao =
        document.getElementById(
            "calcularFreteProduto"
        );

    const resultado =
        document.getElementById(
            "resultadoFreteProduto"
        );


    if (
        !input ||
        !botao ||
        !resultado
    ) {
        return;
    }


    input.addEventListener(
        "input",
        function () {
            this.value =
                formatarCep(this.value);
        }
    );


    botao.addEventListener(
        "click",
        async function () {

            resultado.innerHTML =
                "Consultando CEP...";

            try {
                const dados =
                    await buscarCep(
                        input.value
                    );

                const valor =
                    calcularFretePorEstado(
                        dados.uf
                    );

                const prazo =
                    calcularPrazoPorEstado(
                        dados.uf
                    );

                salvarFrete({
                    cep:
                        limparCep(input.value),

                    valor,
                    prazo,

                    cidade:
                        dados.localidade,

                    uf:
                        dados.uf
                });


                resultado.innerHTML = `
                    <div class="frete-sucesso">

                        <strong>
                            ${dados.localidade} - ${dados.uf}
                        </strong>

                        <div class="frete-resultado-linha">
                            <span>📦 Frete</span>
                            <strong>${moeda(valor)}</strong>
                        </div>

                        <div class="frete-resultado-linha">
                            <span>🕐 Prazo</span>
                            <strong>${prazo}</strong>
                        </div>

                    </div>
                `;

            } catch (erro) {

                resultado.innerHTML = `
                    <div class="frete-erro">
                        ${erro.message}
                    </div>
                `;
            }
        }
    );
}


// ======================================================
// CHECKOUT
// ======================================================

function configurarCepCheckout() {
    const cep =
        document.getElementById(
            "clienteCep"
        );

    if (!cep) {
        return;
    }


    cep.addEventListener(
        "input",
        function () {

            this.value =
                formatarCep(this.value);

            if (
                limparCep(this.value)
                    .length === 8
            ) {
                preencherEnderecoCheckout();
            }
        }
    );
}


async function preencherEnderecoCheckout() {
    const cep =
        document.getElementById(
            "clienteCep"
        );

    const status =
        document.getElementById(
            "statusCep"
        );

    if (!cep) {
        return;
    }


    try {
        if (status) {
            status.textContent =
                "Consultando...";
        }


        const dados =
            await buscarCep(
                cep.value
            );


        const campos = {
            clienteEndereco:
                dados.logradouro,

            clienteBairro:
                dados.bairro,

            clienteCidade:
                dados.localidade,

            clienteEstado:
                dados.uf
        };


        Object.entries(campos)
            .forEach(([id, valor]) => {

                const input =
                    document.getElementById(id);

                if (input) {
                    input.value =
                        valor || "";
                }
            });


        const valor =
            calcularFretePorEstado(
                dados.uf
            );

        const prazo =
            calcularPrazoPorEstado(
                dados.uf
            );


        salvarFrete({
            cep:
                limparCep(cep.value),

            valor,
            prazo,

            cidade:
                dados.localidade,

            uf:
                dados.uf
        });


        if (status) {
            status.textContent =
                `✓ ${dados.localidade} - ${dados.uf}`;
        }


        atualizarValoresCheckout();

    } catch (erro) {

        if (status) {
            status.textContent =
                erro.message;
        }
    }
}


function atualizarValoresCheckout() {
    const subtotal =
        calcularTotalCarrinho();

    const frete =
        pegarFrete();

    const valorFrete =
        frete
            ? Number(frete.valor)
            : 0;


    const subtotalEl =
        document.getElementById(
            "checkoutSubtotal"
        );

    const freteEl =
        document.getElementById(
            "checkoutFrete"
        );

    const prazoEl =
        document.getElementById(
            "checkoutPrazo"
        );

    const totalEl =
        document.getElementById(
            "checkoutTotal"
        );


    if (subtotalEl) {
        subtotalEl.textContent =
            moeda(subtotal);
    }


    if (freteEl) {
        freteEl.textContent =
            frete
                ? moeda(valorFrete)
                : "Digite seu CEP";
    }


    if (prazoEl) {
        prazoEl.textContent =
            frete
                ? frete.prazo
                : "-";
    }


    if (totalEl) {
        totalEl.textContent =
            moeda(
                subtotal +
                valorFrete
            );
    }
}


// ======================================================
// CARREGAR CHECKOUT
// ======================================================

function carregarCheckout() {
    const container =
        document.getElementById(
            "checkoutProdutos"
        );

    if (!container) {
        return;
    }


    const carrinho =
        pegarCarrinho();

    container.innerHTML = "";


    carrinho.forEach(item => {

        container.innerHTML += `
            <div class="checkout-item">

                <img
                    src="${item.imagem}"
                    alt="${item.nome}"
                >

                <div>
                    <strong>
                        ${item.nome}
                    </strong>

                    <span>
                        ${item.modelo} • ${item.tamanho}
                    </span>

                    <span>
                        ${item.quantidade}x
                    </span>
                </div>

                <strong>
                    ${moeda(
                        item.preco *
                        item.quantidade
                    )}
                </strong>

            </div>
        `;
    });


    const pix =
        document.getElementById(
            "pixKey"
        );

    if (pix) {
        pix.textContent =
            PIX_KEY;
    }


    atualizarValoresCheckout();
}


// ======================================================
// PIX
// ======================================================

function copiarPix() {
    navigator.clipboard
        ?.writeText(PIX_KEY)
        .then(() => {
            alert(
                "Chave PIX copiada!"
            );
        });
}


// ======================================================
// INICIAR
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        atualizarContadorCarrinho();
        atualizarContadorFavoritos();

        configurarPesquisa();
        configurarFiltros();
        configurarCarrinhoLateral();

        carregarDestaques();
        carregarCatalogo();

        carregarProduto();

        carregarCarrinhoLateral();

        configurarFreteProduto();
        configurarCepCheckout();

        carregarCheckout();
        atualizarValoresCheckout();

    }
);
// ==========================================
// PRODUTOS SALVOS PELO ADMIN
// ==========================================

try {

    const produtosSalvos =
        JSON.parse(
            localStorage.getItem(
                "carvaProdutos"
            )
        );


    if (
        Array.isArray(produtosSalvos)
    ) {

        produtos.splice(
            0,
            produtos.length,
            ...produtosSalvos
        );

    }

}

catch (erro) {

    console.log(
        "Usando produtos padrões."
    );

}


// preços padrões

produtos.forEach(
    produto => {

        if (
            produto.precoTorcedor == null
        ) {

            produto.precoTorcedor =
                160;

        }


        if (
            produto.precoJogador == null
        ) {

            produto.precoJogador =
                180;

        }

    }
);