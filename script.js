// ======================================================
// CARVAIMPORTES - SCRIPT PRINCIPAL
// ======================================================

const WHATSAPP_LOJA = "5511999999999";
const PIX_KEY = "SEU-PIX-AQUI";


// ======================================================
// LOCAL STORAGE
// ======================================================

const STORAGE_ADMIN = "carvaProdutosAdminV2";
const STORAGE_OCULTOS = "carvaProdutosOcultosV2";
const STORAGE_CARRINHO = "carvaCarrinho";
const STORAGE_FAVORITOS = "carvaFavoritos";
const STORAGE_FRETE = "carvaFrete";


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
// PRODUTOS PADRÃO
// ======================================================

const PRODUTOS_PADRAO = [

    // EUROPEUS

    {
        id: "real-madrid",
        nome: "Real Madrid",
        categoria: "europeus",
        imagem: "./img/real-madrid.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 15,
        lancamento: true,
        maisVendido: true
    },

    {
        id: "barcelona",
        nome: "Barcelona",
        categoria: "europeus",
        imagem: "./img/barcelona.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 8,
        lancamento: true,
        maisVendido: true
    },

    {
        id: "manchester-city",
        nome: "Manchester City",
        categoria: "europeus",
        imagem: "./img/manchester-city.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 4,
        lancamento: true,
        maisVendido: false
    },

    {
        id: "psg",
        nome: "Paris Saint-Germain",
        categoria: "europeus",
        imagem: "./img/psg.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 12,
        lancamento: false,
        maisVendido: true
    },


    // BRASILEIROS

    {
        id: "sao-paulo",
        nome: "São Paulo",
        categoria: "brasileiros",
        imagem: "./img/sao-paulo.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 5,
        lancamento: true,
        maisVendido: true
    },

    {
        id: "corinthians",
        nome: "Corinthians",
        categoria: "brasileiros",
        imagem: "./img/corinthians.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 10,
        lancamento: false,
        maisVendido: true
    },

    {
        id: "palmeiras",
        nome: "Palmeiras",
        categoria: "brasileiros",
        imagem: "./img/palmeiras.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 3,
        lancamento: false,
        maisVendido: false
    },

    {
        id: "flamengo",
        nome: "Flamengo",
        categoria: "brasileiros",
        imagem: "./img/flamengo.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 18,
        lancamento: true,
        maisVendido: true
    },


    // SELEÇÕES

    {
        id: "brasil",
        nome: "Brasil",
        categoria: "selecoes",
        imagem: "./img/brasil.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 20,
        lancamento: true,
        maisVendido: true
    },

    {
        id: "argentina",
        nome: "Argentina",
        categoria: "selecoes",
        imagem: "./img/argentina.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 7,
        lancamento: false,
        maisVendido: true
    },

    {
        id: "portugal",
        nome: "Portugal",
        categoria: "selecoes",
        imagem: "./img/portugal.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 4,
        lancamento: true,
        maisVendido: false
    },

    {
        id: "franca",
        nome: "França",
        categoria: "selecoes",
        imagem: "./img/franca.png",
        precoTorcedor: 160,
        precoJogador: 180,
        estoque: 0,
        lancamento: false,
        maisVendido: false
    }

];


// ======================================================
// LOCAL STORAGE SEGURO
// ======================================================

function lerStorage(chave, padrao = []) {

    try {

        const conteudo =
            localStorage.getItem(chave);

        if (!conteudo) {

            return padrao;

        }

        return JSON.parse(conteudo);

    }

    catch (erro) {

        return padrao;

    }

}


// ======================================================
// NORMALIZAR PRODUTO
// ======================================================

function normalizarProduto(produto) {

    return {

        id:
            String(produto.id),

        nome:
            String(produto.nome),

        categoria:
            produto.categoria ||
            "europeus",

        imagem:
            produto.imagem ||
            "",

        precoTorcedor:
            Number(
                produto.precoTorcedor ??
                160
            ),

        precoJogador:
            Number(
                produto.precoJogador ??
                180
            ),

        estoque:
            Number(
                produto.estoque ??
                0
            ),

        lancamento:
            Boolean(
                produto.lancamento
            ),

        maisVendido:
            Boolean(
                produto.maisVendido
            )

    };

}


// ======================================================
// MONTAR PRODUTOS
// ======================================================

function montarProdutos() {

    const produtosAdmin =
        lerStorage(
            STORAGE_ADMIN,
            []
        );


    const produtosOcultos =
        new Set(
            lerStorage(
                STORAGE_OCULTOS,
                []
            )
        );


    const mapa =
        new Map();


    // Produtos padrões

    PRODUTOS_PADRAO.forEach(
        produto => {

            mapa.set(
                produto.id,
                normalizarProduto(
                    produto
                )
            );

        }
    );


    // Produtos do admin

    if (
        Array.isArray(
            produtosAdmin
        )
    ) {

        produtosAdmin.forEach(
            produto => {

                if (
                    produto &&
                    produto.id
                ) {

                    mapa.set(
                        produto.id,
                        normalizarProduto(
                            produto
                        )
                    );

                }

            }
        );

    }


    return Array
        .from(
            mapa.values()
        )
        .filter(
            produto =>
                !produtosOcultos.has(
                    produto.id
                )
        );

}


let produtos =
    montarProdutos();


function sincronizarProdutos() {

    produtos =
        montarProdutos();

}


// ======================================================
// ADMIN
// ======================================================

function salvarProdutoPeloAdmin(
    produto
) {

    let salvos =
        lerStorage(
            STORAGE_ADMIN,
            []
        );


    if (
        !Array.isArray(
            salvos
        )
    ) {

        salvos =
            [];

    }


    const produtoNormalizado =
        normalizarProduto(
            produto
        );


    const indice =
        salvos.findIndex(
            item =>
                item.id ===
                produtoNormalizado.id
        );


    if (
        indice >= 0
    ) {

        salvos[indice] =
            produtoNormalizado;

    }

    else {

        salvos.push(
            produtoNormalizado
        );

    }


    localStorage.setItem(
        STORAGE_ADMIN,
        JSON.stringify(
            salvos
        )
    );


    let ocultos =
        lerStorage(
            STORAGE_OCULTOS,
            []
        );


    if (
        !Array.isArray(
            ocultos
        )
    ) {

        ocultos =
            [];

    }


    ocultos =
        ocultos.filter(
            id =>
                id !==
                produtoNormalizado.id
        );


    localStorage.setItem(
        STORAGE_OCULTOS,
        JSON.stringify(
            ocultos
        )
    );


    sincronizarProdutos();

}


function excluirProdutoPeloAdmin(id) {

    let produtosAdmin =
        lerStorage(
            STORAGE_ADMIN,
            []
        );


    if (
        !Array.isArray(
            produtosAdmin
        )
    ) {

        produtosAdmin =
            [];

    }


    produtosAdmin =
        produtosAdmin.filter(
            produto =>
                produto.id !== id
        );


    localStorage.setItem(
        STORAGE_ADMIN,
        JSON.stringify(
            produtosAdmin
        )
    );


    const ehProdutoPadrao =
        PRODUTOS_PADRAO.some(
            produto =>
                produto.id === id
        );


    if (
        ehProdutoPadrao
    ) {

        let ocultos =
            lerStorage(
                STORAGE_OCULTOS,
                []
            );


        if (
            !Array.isArray(
                ocultos
            )
        ) {

            ocultos =
                [];

        }


        if (
            !ocultos.includes(id)
        ) {

            ocultos.push(id);

        }


        localStorage.setItem(
            STORAGE_OCULTOS,
            JSON.stringify(
                ocultos
            )
        );

    }


    sincronizarProdutos();

}


window.CarvaAdmin = {

    getProdutos() {

        sincronizarProdutos();

        return produtos.map(
            produto => ({
                ...produto
            })
        );

    },


    salvarProduto(produto) {

        salvarProdutoPeloAdmin(
            produto
        );

    },


    excluirProduto(id) {

        excluirProdutoPeloAdmin(
            id
        );

    },


    restaurarPadroes() {

        localStorage.removeItem(
            STORAGE_ADMIN
        );

        localStorage.removeItem(
            STORAGE_OCULTOS
        );

        sincronizarProdutos();

    }

};


// ======================================================
// FORMATAR DINHEIRO
// ======================================================

function moeda(valor) {

    return Number(valor)
        .toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}


// ======================================================
// NORMALIZAR TEXTO
// ======================================================

function normalizarTexto(texto) {

    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


// ======================================================
// MENU MOBILE
// ======================================================

function configurarMenuMobile() {

    const header =
        document.querySelector(
            ".header"
        );


    const menu =
        document.querySelector(
            ".menu"
        );


    if (
        !header ||
        !menu
    ) {

        return;

    }


    if (
        document.querySelector(
            ".menu-mobile-btn"
        )
    ) {

        return;

    }


    const botao =
        document.createElement(
            "button"
        );


    botao.type =
        "button";


    botao.className =
        "menu-mobile-btn";


    botao.innerHTML =
        "☰";


    botao.setAttribute(
        "aria-label",
        "Abrir menu"
    );


    header.insertBefore(
        botao,
        menu
    );


    botao.addEventListener(
        "click",
        function (evento) {

            evento.stopPropagation();


            menu.classList.toggle(
                "ativo"
            );


            botao.innerHTML =
                menu.classList.contains(
                    "ativo"
                )
                ?
                "✕"
                :
                "☰";

        }
    );


    document.addEventListener(
        "click",
        function (evento) {

            if (
                !header.contains(
                    evento.target
                )
            ) {

                menu.classList.remove(
                    "ativo"
                );


                botao.innerHTML =
                    "☰";

            }

        }
    );


    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth >
                800
            ) {

                menu.classList.remove(
                    "ativo"
                );


                botao.innerHTML =
                    "☰";

            }

        }
    );

}


// ======================================================
// FAVORITOS
// ======================================================

function pegarFavoritos() {

    const favoritos =
        lerStorage(
            STORAGE_FAVORITOS,
            []
        );


    return Array.isArray(
        favoritos
    )
    ?
    favoritos
    :
    [];

}


function salvarFavoritos(
    favoritos
) {

    localStorage.setItem(
        STORAGE_FAVORITOS,
        JSON.stringify(
            favoritos
        )
    );


    atualizarContadorFavoritos();

}


function produtoFavoritado(id) {

    return pegarFavoritos()
        .includes(id);

}


function alternarFavorito(id) {

    let favoritos =
        pegarFavoritos();


    if (
        favoritos.includes(id)
    ) {

        favoritos =
            favoritos.filter(
                item =>
                    item !== id
            );

    }

    else {

        favoritos.push(id);

    }


    salvarFavoritos(
        favoritos
    );


    carregarDestaques();

    carregarCatalogo();

}


function atualizarContadorFavoritos() {

    const contador =
        document.getElementById(
            "contadorFavoritos"
        );


    if (contador) {

        contador.textContent =
            pegarFavoritos()
                .length;

    }

}


// ======================================================
// ESTOQUE
// ======================================================

function gerarEstoque(produto) {

    if (
        produto.estoque <= 0
    ) {

        return `
            <div class="estoque estoque-esgotado">
                Esgotado
            </div>
        `;

    }


    if (
        produto.estoque <= 5
    ) {

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
// CARD DO PRODUTO
// ======================================================

function criarCardProduto(produto) {

    const favorito =
        produtoFavoritado(
            produto.id
        );


    return `

        <article class="produto-card">

            <div class="produto-card-img">

                <img
                    src="${produto.imagem}"
                    alt="Camisa ${produto.nome}"
                    loading="lazy"
                >


                ${
                    produto.lancamento

                    ?

                    `
                    <span class="badge">
                        NOVO
                    </span>
                    `

                    :

                    ""
                }


                <button
                    type="button"

                    class="
                        btn-favorito
                        ${
                            favorito
                            ?
                            "ativo"
                            :
                            ""
                        }
                    "

                    onclick="
                        alternarFavorito(
                            '${produto.id}'
                        )
                    "
                >

                    ${
                        favorito
                        ?
                        "❤️"
                        :
                        "🤍"
                    }

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

                        <span>
                            Torcedor
                        </span>

                        <strong>
                            ${moeda(
                                produto.precoTorcedor
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Jogador
                        </span>

                        <strong>
                            ${moeda(
                                produto.precoJogador
                            )}
                        </strong>

                    </div>

                </div>


                ${
                    produto.estoque > 0

                    ?

                    `
                    <a
                        href="./produto.html?id=${produto.id}"
                        class="btn-produto"
                    >
                        VER CAMISA
                    </a>
                    `

                    :

                    `
                    <button
                        type="button"
                        class="btn-produto"
                        disabled
                        style="
                            opacity:.45;
                            border:0;
                            cursor:not-allowed;
                        "
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
// LANÇAMENTOS DA HOME
// ======================================================

function carregarDestaques() {

    sincronizarProdutos();


    const container =
        document.getElementById(
            "produtosLancamentos"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    const lancamentos =
        produtos
            .filter(
                produto =>
                    produto.lancamento
            )
            .slice(
                0,
                4
            );


    lancamentos.forEach(
        produto => {

            container.innerHTML +=
                criarCardProduto(
                    produto
                );

        }
    );

}


// ======================================================
// CATÁLOGO / FILTROS
// ======================================================

let filtroAtual =
    "todos";


let textoPesquisa =
    "";


function filtrarProdutos() {

    let lista =
        [...produtos];


    if (
        filtroAtual !==
        "todos"
        &&
        filtroAtual !==
        "favoritos"
    ) {

        lista =
            lista.filter(
                produto =>
                    produto.categoria ===
                    filtroAtual
            );

    }


    if (
        filtroAtual ===
        "favoritos"
    ) {

        const favoritos =
            pegarFavoritos();


        lista =
            lista.filter(
                produto =>
                    favoritos.includes(
                        produto.id
                    )
            );

    }


    if (
        textoPesquisa
    ) {

        const pesquisa =
            normalizarTexto(
                textoPesquisa
            );


        lista =
            lista.filter(
                produto =>

                    normalizarTexto(
                        produto.nome
                    )
                    .includes(
                        pesquisa
                    )

            );

    }


    return lista;

}


// ======================================================
// CARREGAR CATÁLOGO
// ======================================================

function carregarCatalogo() {

    sincronizarProdutos();


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

        europeus.innerHTML =
            "";

    }


    if (brasileiros) {

        brasileiros.innerHTML =
            "";

    }


    if (selecoes) {

        selecoes.innerHTML =
            "";

    }


    const lista =
        filtrarProdutos();


    lista.forEach(
        produto => {

            const card =
                criarCardProduto(
                    produto
                );


            if (
                produto.categoria ===
                "europeus"
                &&
                europeus
            ) {

                europeus.innerHTML +=
                    card;

            }


            if (
                produto.categoria ===
                "brasileiros"
                &&
                brasileiros
            ) {

                brasileiros.innerHTML +=
                    card;

            }


            if (
                produto.categoria ===
                "selecoes"
                &&
                selecoes
            ) {

                selecoes.innerHTML +=
                    card;

            }

        }
    );


    atualizarCategorias(
        lista
    );


    const quantidade =
        document.getElementById(
            "quantidadeResultados"
        );


    if (quantidade) {

        quantidade.textContent =
            lista.length === 1

            ?

            "1 camisa encontrada"

            :

            `${lista.length} camisas encontradas`;

    }

}


// ======================================================
// MOSTRAR CATEGORIAS
// ======================================================

function atualizarCategorias(lista) {

    const categorias = {

        europeus:
            document.getElementById(
                "europeus"
            ),

        brasileiros:
            document.getElementById(
                "brasileiros"
            ),

        selecoes:
            document.getElementById(
                "selecoes"
            )

    };


    Object.entries(
        categorias
    )
    .forEach(
        ([categoria, elemento]) => {

            if (!elemento) {

                return;

            }


            const possuiProdutos =
                lista.some(
                    produto =>
                        produto.categoria ===
                        categoria
                );


            elemento.style.display =
                possuiProdutos
                ?
                "block"
                :
                "none";

        }
    );


    const semResultados =
        document.getElementById(
            "semResultados"
        );


    if (semResultados) {

        semResultados.classList.toggle(
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


    input?.addEventListener(
        "input",
        function () {

            textoPesquisa =
                this.value.trim();


            carregarCatalogo();

        }
    );


    limpar?.addEventListener(
        "click",
        function () {

            textoPesquisa =
                "";


            if (input) {

                input.value =
                    "";

            }


            carregarCatalogo();

        }
    );

}


// ======================================================
// FILTROS
// ======================================================

function configurarFiltros() {

    const botoes =
        document.querySelectorAll(
            ".filtro-btn"
        );


    if (
        botoes.length === 0
    ) {

        return;

    }


    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const categoria =
        parametros.get(
            "categoria"
        );


    const filtro =
        parametros.get(
            "filtro"
        );


    if (
        [
            "europeus",
            "brasileiros",
            "selecoes"
        ].includes(
            categoria
        )
    ) {

        filtroAtual =
            categoria;

    }


    if (
        filtro ===
        "favoritos"
    ) {

        filtroAtual =
            "favoritos";

    }


    botoes.forEach(
        botao => {

            botao.classList.toggle(
                "ativo",
                botao.dataset.filtro ===
                filtroAtual
            );


            botao.addEventListener(
                "click",
                function () {

                    botoes.forEach(
                        item => {

                            item.classList.remove(
                                "ativo"
                            );

                        }
                    );


                    this.classList.add(
                        "ativo"
                    );


                    filtroAtual =
                        this.dataset.filtro;


                    carregarCatalogo();

                }
            );

        }
    );


    document
        .getElementById(
            "btnMostrarTodos"
        )
        ?.addEventListener(
            "click",
            function () {

                filtroAtual =
                    "todos";


                textoPesquisa =
                    "";


                const input =
                    document.getElementById(
                        "pesquisaProduto"
                    );


                if (input) {

                    input.value =
                        "";

                }


                botoes.forEach(
                    botao => {

                        botao.classList.toggle(
                            "ativo",
                            botao.dataset.filtro ===
                            "todos"
                        );

                    }
                );


                carregarCatalogo();

            }
        );


    document
        .getElementById(
            "abrirFavoritos"
        )
        ?.addEventListener(
            "click",
            function () {

                filtroAtual =
                    "favoritos";


                botoes.forEach(
                    botao => {

                        botao.classList.toggle(
                            "ativo",
                            botao.dataset.filtro ===
                            "favoritos"
                        );

                    }
                );


                carregarCatalogo();

            }
        );

}


// ======================================================
// CARRINHO
// ======================================================

function pegarCarrinho() {

    const carrinho =
        lerStorage(
            STORAGE_CARRINHO,
            []
        );


    return Array.isArray(
        carrinho
    )
    ?
    carrinho
    :
    [];

}


function salvarCarrinho(
    carrinho
) {

    localStorage.setItem(
        STORAGE_CARRINHO,
        JSON.stringify(
            carrinho
        )
    );


    atualizarContadorCarrinho();

    carregarCarrinhoLateral();

}


// ======================================================
// CONTADOR CARRINHO
// ======================================================

function atualizarContadorCarrinho() {

    const quantidade =
        pegarCarrinho()
        .reduce(
            (total, item) => {

                return total +
                    Number(
                        item.quantidade
                    );

            },
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


// ======================================================
// TOTAL DO CARRINHO
// ======================================================

function calcularTotalCarrinho() {

    return pegarCarrinho()
        .reduce(
            (total, item) => {

                return total +
                    (
                        Number(
                            item.preco
                        )
                        *
                        Number(
                            item.quantidade
                        )
                    );

            },
            0
        );

}


// ======================================================
// PRODUTO INDIVIDUAL
// ======================================================

let produtoAtual =
    null;


let tamanhoSelecionado =
    "";


let quantidadeAtual =
    1;


function carregarProduto() {

    sincronizarProdutos();


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
        parametros.get(
            "id"
        );


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


        imagem.alt =
            produtoAtual.nome;

    }


    const estoque =
        document.getElementById(
            "estoqueProduto"
        );


    if (estoque) {

        estoque.innerHTML =
            gerarEstoque(
                produtoAtual
            );

    }


    const torcedor =
        document.querySelector(
            'input[value="Torcedor"]'
        );


    const jogador =
        document.querySelector(
            'input[value="Jogador"]'
        );


    if (torcedor) {

        torcedor.dataset.preco =
            produtoAtual.precoTorcedor;

    }


    if (jogador) {

        jogador.dataset.preco =
            produtoAtual.precoJogador;

    }


    configurarProduto();

}


// ======================================================
// CONFIGURAR PRODUTO
// ======================================================

function configurarProduto() {

    const tamanhos =
        document.querySelectorAll(
            ".tamanho-btn"
        );


    tamanhos.forEach(
        botao => {

            botao.addEventListener(
                "click",
                function () {

                    tamanhos.forEach(
                        item => {

                            item.classList.remove(
                                "ativo"
                            );

                        }
                    );


                    this.classList.add(
                        "ativo"
                    );


                    tamanhoSelecionado =
                        this.dataset.tamanho;

                }
            );

        }
    );


    document
        .querySelectorAll(
            'input[name="modelo"]'
        )
        .forEach(
            modelo => {

                modelo.addEventListener(
                    "change",
                    atualizarTotalProduto
                );

            }
        );


    const adicionar =
        document.getElementById(
            "btnAdicionarCarrinho"
        );


    if (adicionar) {

        if (
            produtoAtual.estoque <= 0
        ) {

            adicionar.disabled =
                true;


            adicionar.textContent =
                "PRODUTO ESGOTADO";


            adicionar.style.opacity =
                ".5";


            adicionar.style.cursor =
                "not-allowed";

        }

        else {

            adicionar.addEventListener(
                "click",
                adicionarAoCarrinho
            );

        }

    }


    atualizarTotalProduto();

}


// ======================================================
// MODELO
// ======================================================

function pegarModeloSelecionado() {

    return document.querySelector(
        'input[name="modelo"]:checked'
    );

}


// ======================================================
// QUANTIDADE
// ======================================================

function alterarQuantidade(valor) {

    if (!produtoAtual) {

        return;

    }


    quantidadeAtual +=
        Number(valor);


    if (
        quantidadeAtual < 1
    ) {

        quantidadeAtual =
            1;

    }


    if (
        quantidadeAtual >
        produtoAtual.estoque
    ) {

        quantidadeAtual =
            produtoAtual.estoque;

    }


    const quantidade =
        document.getElementById(
            "quantidade"
        );


    if (quantidade) {

        quantidade.textContent =
            quantidadeAtual;

    }


    atualizarTotalProduto();

}


// ======================================================
// TOTAL PRODUTO
// ======================================================

function atualizarTotalProduto() {

    const modelo =
        pegarModeloSelecionado();


    if (!modelo) {

        return;

    }


    const total =
        Number(
            modelo.dataset.preco
        )
        *
        quantidadeAtual;


    const elemento =
        document.getElementById(
            "produtoTotal"
        );


    if (elemento) {

        elemento.textContent =
            moeda(total);

    }

}


// ======================================================
// ADICIONAR CARRINHO
// ======================================================

function adicionarAoCarrinho() {

    if (!produtoAtual) {

        return;

    }


    if (
        produtoAtual.estoque <= 0
    ) {

        alert(
            "Produto esgotado."
        );

        return;

    }


    if (
        !tamanhoSelecionado
    ) {

        alert(
            "Escolha o tamanho."
        );

        return;

    }


    const modelo =
        pegarModeloSelecionado();


    if (!modelo) {

        alert(
            "Escolha o modelo."
        );

        return;

    }


    const carrinho =
        pegarCarrinho();


    const item = {

        carrinhoId:
            Date.now() +
            Math.floor(
                Math.random() *
                10000
            ),

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
            )?.value.trim() ||
            "",

        numeroPersonalizado:
            document.getElementById(
                "numeroCamisa"
            )?.value.trim() ||
            "",

        quantidade:
            quantidadeAtual,

        preco:
            Number(
                modelo.dataset.preco
            )

    };


    carrinho.push(
        item
    );


    salvarCarrinho(
        carrinho
    );


    const toast =
        document.getElementById(
            "toast"
        );


    if (toast) {

        toast.classList.add(
            "mostrar"
        );


        setTimeout(
            function () {

                toast.classList.remove(
                    "mostrar"
                );

            },
            2200
        );

    }

}


// ======================================================
// PÁGINA CARRINHO
// ======================================================

function carregarCarrinho() {

    const lista =
        document.getElementById(
            "listaCarrinho"
        );


    if (!lista) {

        return;

    }


    const carrinho =
        pegarCarrinho();


    lista.innerHTML =
        "";


    if (
        carrinho.length === 0
    ) {

        lista.innerHTML = `

            <div class="carrinho-vazio">

                <div class="icone-vazio">
                    🛒
                </div>

                <h2>
                    Seu carrinho está vazio
                </h2>

                <p>
                    Escolha sua próxima camisa.
                </p>

                <a
                    href="./produtos.html"
                    class="btn-primary"
                >
                    VER CAMISAS
                </a>

            </div>

        `;


        atualizarResumoCarrinho();

        return;

    }


    carrinho.forEach(
        item => {

            lista.innerHTML += `

                <div class="item-carrinho">

                    <img
                        src="${item.imagem}"
                        alt="${item.nome}"
                    >


                    <div class="item-info">

                        <span class="item-tag">
                            CAMISA IMPORTADA
                        </span>


                        <h3>
                            ${item.nome}
                        </h3>


                        <p>
                            Modelo:
                            <strong>
                                ${item.modelo}
                            </strong>
                        </p>


                        <p>
                            Tamanho:
                            <strong>
                                ${item.tamanho}
                            </strong>
                        </p>


                        ${
                            item.nomePersonalizado

                            ?

                            `
                            <p>
                                Nome:
                                <strong>
                                    ${item.nomePersonalizado}
                                </strong>
                            </p>
                            `

                            :

                            ""
                        }


                        ${
                            item.numeroPersonalizado

                            ?

                            `
                            <p>
                                Número:
                                <strong>
                                    ${item.numeroPersonalizado}
                                </strong>
                            </p>
                            `

                            :

                            ""
                        }

                    </div>


                    <div class="item-actions">

                        <strong class="item-preco">

                            ${moeda(
                                Number(
                                    item.preco
                                )
                                *
                                Number(
                                    item.quantidade
                                )
                            )}

                        </strong>


                        <div class="quantidade">

                            <button
                                type="button"
                                onclick="
                                    alterarQuantidadeCarrinho(
                                        ${item.carrinhoId},
                                        -1
                                    )
                                "
                            >
                                −
                            </button>


                            <span>
                                ${item.quantidade}
                            </span>


                            <button
                                type="button"
                                onclick="
                                    alterarQuantidadeCarrinho(
                                        ${item.carrinhoId},
                                        1
                                    )
                                "
                            >
                                +
                            </button>

                        </div>


                        <button
                            type="button"
                            class="remover-item"
                            onclick="
                                removerCarrinho(
                                    ${item.carrinhoId}
                                )
                            "
                        >
                            Remover
                        </button>

                    </div>

                </div>

            `;

        }
    );


    atualizarResumoCarrinho();

}


// ======================================================
// ALTERAR QUANTIDADE CARRINHO
// ======================================================

function alterarQuantidadeCarrinho(
    carrinhoId,
    valor
) {

    const carrinho =
        pegarCarrinho();


    const item =
        carrinho.find(
            item =>
                Number(
                    item.carrinhoId
                )
                ===
                Number(
                    carrinhoId
                )
        );


    if (!item) {

        return;

    }


    item.quantidade +=
        Number(valor);


    if (
        item.quantidade < 1
    ) {

        item.quantidade =
            1;

    }


    sincronizarProdutos();


    const produto =
        produtos.find(
            produto =>
                produto.id ===
                item.produtoId
        );


    if (
        produto &&
        item.quantidade >
        produto.estoque
    ) {

        item.quantidade =
            produto.estoque;

    }


    salvarCarrinho(
        carrinho
    );


    carregarCarrinho();

}


// ======================================================
// REMOVER CARRINHO
// ======================================================

function removerCarrinho(
    carrinhoId
) {

    let carrinho =
        pegarCarrinho();


    carrinho =
        carrinho.filter(
            item =>
                Number(
                    item.carrinhoId
                )
                !==
                Number(
                    carrinhoId
                )
        );


    salvarCarrinho(
        carrinho
    );


    carregarCarrinho();

}


// ======================================================
// RESUMO CARRINHO
// ======================================================

function atualizarResumoCarrinho() {

    const total =
        calcularTotalCarrinho();


    const subtotal =
        document.getElementById(
            "subtotal"
        );


    const totalCarrinho =
        document.getElementById(
            "totalCarrinho"
        );


    if (subtotal) {

        subtotal.textContent =
            moeda(total);

    }


    if (totalCarrinho) {

        totalCarrinho.textContent =
            moeda(total);

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
        abrirCarrinhoLateral
    );


    fechar?.addEventListener(
        "click",
        fecharCarrinhoLateral
    );


    overlay?.addEventListener(
        "click",
        fecharCarrinhoLateral
    );

}


function abrirCarrinhoLateral() {

    document
        .getElementById(
            "carrinhoLateral"
        )
        ?.classList.add(
            "ativo"
        );


    document
        .getElementById(
            "carrinhoOverlay"
        )
        ?.classList.add(
            "ativo"
        );


    carregarCarrinhoLateral();

}


function fecharCarrinhoLateral() {

    document
        .getElementById(
            "carrinhoLateral"
        )
        ?.classList.remove(
            "ativo"
        );


    document
        .getElementById(
            "carrinhoOverlay"
        )
        ?.classList.remove(
            "ativo"
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


    container.innerHTML =
        "";


    if (
        carrinho.length === 0
    ) {

        container.innerHTML = `

            <div class="carrinho-lateral-vazio">

                <span>
                    🛒
                </span>

                <strong>
                    Carrinho vazio
                </strong>

                <p>
                    Adicione uma camisa.
                </p>

            </div>

        `;

    }

    else {

        carrinho.forEach(
            item => {

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
                                ${item.modelo}
                                •
                                ${item.tamanho}
                            </span>

                            <span>
                                ${item.quantidade}x
                            </span>

                        </div>


                        <strong class="item-carrinho-lateral-preco">

                            ${moeda(
                                Number(
                                    item.preco
                                )
                                *
                                Number(
                                    item.quantidade
                                )
                            )}

                        </strong>

                    </div>

                `;

            }
        );

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
// CEP
// ======================================================

function limparCep(cep) {

    return String(cep)
        .replace(
            /\D/g,
            ""
        );

}


function formatarCep(cep) {

    const limpo =
        limparCep(cep)
            .slice(
                0,
                8
            );


    if (
        limpo.length <= 5
    ) {

        return limpo;

    }


    return (
        limpo.slice(
            0,
            5
        )
        +
        "-"
        +
        limpo.slice(5)
    );

}


// ======================================================
// BUSCAR CEP
// ======================================================

async function buscarCep(cep) {

    const limpo =
        limparCep(cep);


    if (
        limpo.length !== 8
    ) {

        throw new Error(
            "Digite um CEP válido."
        );

    }


    const resposta =
        await fetch(
            `https://viacep.com.br/ws/${limpo}/json/`
        );


    if (!resposta.ok) {

        throw new Error(
            "Erro ao consultar CEP."
        );

    }


    const dados =
        await resposta.json();


    if (
        dados.erro
    ) {

        throw new Error(
            "CEP não encontrado."
        );

    }


    return dados;

}


// ======================================================
// VALOR FRETE
// ======================================================

function calcularFretePorEstado(
    uf
) {

    return FRETES[
        String(uf)
            .toUpperCase()
    ] ?? 49.90;

}


// ======================================================
// PRAZO FRETE
// ======================================================

function calcularPrazoPorEstado(
    uf
) {

    uf =
        String(uf)
            .toUpperCase();


    if (
        uf === "SP"
    ) {

        return "3 a 6 dias úteis";

    }


    if (
        [
            "RJ",
            "MG",
            "ES",
            "PR"
        ].includes(uf)
    ) {

        return "4 a 8 dias úteis";

    }


    if (
        [
            "SC",
            "RS",
            "DF",
            "GO",
            "MS"
        ].includes(uf)
    ) {

        return "5 a 10 dias úteis";

    }


    return "7 a 15 dias úteis";

}


// ======================================================
// FRETE STORAGE
// ======================================================

function salvarFrete(frete) {

    localStorage.setItem(
        STORAGE_FRETE,
        JSON.stringify(
            frete
        )
    );

}


function pegarFrete() {

    return lerStorage(
        STORAGE_FRETE,
        null
    );

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
                formatarCep(
                    this.value
                );

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
                        limparCep(
                            input.value
                        ),

                    valor:
                        valor,

                    prazo:
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

                            <span>
                                📦 Frete
                            </span>

                            <strong>
                                ${moeda(valor)}
                            </strong>

                        </div>


                        <div class="frete-resultado-linha">

                            <span>
                                🕐 Prazo
                            </span>

                            <strong>
                                ${prazo}
                            </strong>

                        </div>

                    </div>

                `;

            }

            catch (erro) {

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
// CEP CHECKOUT
// ======================================================

function configurarCepCheckout() {

    const input =
        document.getElementById(
            "clienteCep"
        );


    if (!input) {

        return;

    }


    let timer;


    input.addEventListener(
        "input",
        function () {

            this.value =
                formatarCep(
                    this.value
                );


            clearTimeout(
                timer
            );


            if (
                limparCep(
                    this.value
                ).length === 8
            ) {

                timer =
                    setTimeout(
                        preencherEnderecoCheckout,
                        400
                    );

            }

        }
    );

}


// ======================================================
// PREENCHER ENDEREÇO
// ======================================================

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
                "Consultando CEP...";

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


        Object.entries(
            campos
        )
        .forEach(
            ([id, valor]) => {

                const campo =
                    document.getElementById(
                        id
                    );


                if (campo) {

                    campo.value =
                        valor || "";

                }

            }
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
                limparCep(
                    cep.value
                ),

            valor:
                valor,

            prazo:
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

    }

    catch (erro) {

        localStorage.removeItem(
            STORAGE_FRETE
        );


        if (status) {

            status.textContent =
                erro.message;

        }


        atualizarValoresCheckout();

    }

}


// ======================================================
// TOTAL CHECKOUT
// ======================================================

function atualizarValoresCheckout() {

    const subtotal =
        calcularTotalCarrinho();


    const frete =
        pegarFrete();


    const valorFrete =
        frete

        ?

        Number(
            frete.valor
        )

        :

        0;


    const subtotalElemento =
        document.getElementById(
            "checkoutSubtotal"
        );


    const freteElemento =
        document.getElementById(
            "checkoutFrete"
        );


    const prazoElemento =
        document.getElementById(
            "checkoutPrazo"
        );


    const totalElemento =
        document.getElementById(
            "checkoutTotal"
        );


    if (subtotalElemento) {

        subtotalElemento.textContent =
            moeda(subtotal);

    }


    if (freteElemento) {

        freteElemento.textContent =
            frete

            ?

            moeda(valorFrete)

            :

            "Digite seu CEP";

    }


    if (prazoElemento) {

        prazoElemento.textContent =
            frete

            ?

            frete.prazo

            :

            "-";

    }


    if (totalElemento) {

        totalElemento.textContent =
            moeda(
                subtotal +
                valorFrete
            );

    }

}


// ======================================================
// CHECKOUT
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


    container.innerHTML =
        "";


    if (
        carrinho.length === 0
    ) {

        container.innerHTML = `

            <div class="checkout-vazio">

                <p>
                    Seu carrinho está vazio.
                </p>

                <a
                    href="./produtos.html"
                    class="btn-primary"
                >
                    VER CAMISAS
                </a>

            </div>

        `;

    }

    else {

        carrinho.forEach(
            item => {

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
                                ${item.modelo}
                                •
                                ${item.tamanho}
                            </span>

                            <span>
                                ${item.quantidade}x
                            </span>

                        </div>


                        <strong>

                            ${moeda(
                                Number(
                                    item.preco
                                )
                                *
                                Number(
                                    item.quantidade
                                )
                            )}

                        </strong>

                    </div>

                `;

            }
        );

    }


    const pix =
        document.getElementById(
            "pixKey"
        );


    if (pix) {

        pix.textContent =
            PIX_KEY;

    }


    atualizarValoresCheckout();


    document
        .getElementById(
            "checkoutForm"
        )
        ?.addEventListener(
            "submit",
            finalizarPedido
        );

}


// ======================================================
// FINALIZAR PEDIDO WHATSAPP
// ======================================================

function finalizarPedido(evento) {

    evento.preventDefault();


    const carrinho =
        pegarCarrinho();


    if (
        carrinho.length === 0
    ) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    const cepDigitado =
        limparCep(
            document.getElementById(
                "clienteCep"
            )?.value ||
            ""
        );


    const frete =
        pegarFrete();


    if (
        !frete ||
        frete.cep !==
        cepDigitado
    ) {

        alert(
            "Digite um CEP válido para calcular o frete."
        );

        return;

    }


    const nome =
        document.getElementById(
            "clienteNome"
        )?.value.trim() ||
        "";


    const telefone =
        document.getElementById(
            "clienteTelefone"
        )?.value.trim() ||
        "";


    const email =
        document.getElementById(
            "clienteEmail"
        )?.value.trim() ||
        "";


    const endereco =
        document.getElementById(
            "clienteEndereco"
        )?.value.trim() ||
        "";


    const numero =
        document.getElementById(
            "clienteNumero"
        )?.value.trim() ||
        "";


    const bairro =
        document.getElementById(
            "clienteBairro"
        )?.value.trim() ||
        "";


    const cidade =
        document.getElementById(
            "clienteCidade"
        )?.value.trim() ||
        "";


    const estado =
        document.getElementById(
            "clienteEstado"
        )?.value.trim() ||
        "";


    const complemento =
        document.getElementById(
            "clienteComplemento"
        )?.value.trim() ||
        "";


    const subtotal =
        calcularTotalCarrinho();


    const total =
        subtotal +
        Number(
            frete.valor
        );


    let mensagem =

`⚽ *NOVO PEDIDO - CARVAIMPORTES*

👤 *CLIENTE*
Nome: ${nome}
WhatsApp: ${telefone}
${email ? `E-mail: ${email}` : ""}

👕 *PRODUTOS*

`;


    carrinho.forEach(
        (
            item,
            index
        ) => {

            mensagem +=

`${index + 1}. *${item.nome}*
Modelo: ${item.modelo}
Tamanho: ${item.tamanho}
Quantidade: ${item.quantidade}
${item.nomePersonalizado ? `Nome: ${item.nomePersonalizado}` : ""}
${item.numeroPersonalizado ? `Número: ${item.numeroPersonalizado}` : ""}
Valor: ${moeda(
    Number(item.preco) *
    Number(item.quantidade)
)}

`;

        }
    );


    mensagem +=

`🛍️ *PRODUTOS*
${moeda(subtotal)}

📦 *FRETE*
${moeda(frete.valor)}

🕐 *PRAZO*
${frete.prazo}

💰 *TOTAL*
${moeda(total)}

💳 *PAGAMENTO*
PIX

🔑 *CHAVE PIX*
${PIX_KEY}

📍 *ENTREGA*
${endereco}, ${numero}
${bairro}
${cidade} - ${estado}
CEP: ${formatarCep(cepDigitado)}
${complemento ? `Complemento: ${complemento}` : ""}`;


    const url =
        `https://wa.me/${WHATSAPP_LOJA}?text=${
            encodeURIComponent(
                mensagem
            )
        }`;


    window.open(
        url,
        "_blank"
    );

}


// ======================================================
// COPIAR PIX
// ======================================================

function copiarPix() {

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(
                PIX_KEY
            )
            .then(
                function () {

                    alert(
                        "Chave PIX copiada!"
                    );

                }
            );

    }

    else {

        alert(
            `PIX: ${PIX_KEY}`
        );

    }

}


// ======================================================
// INICIAR SITE
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        sincronizarProdutos();

        configurarMenuMobile();

        atualizarContadorCarrinho();
        atualizarContadorFavoritos();

        configurarPesquisa();
        configurarFiltros();

        configurarCarrinhoLateral();

        carregarDestaques();
        carregarCatalogo();

        carregarProduto();

        carregarCarrinho();
        carregarCarrinhoLateral();

        configurarFreteProduto();
        configurarCepCheckout();

        carregarCheckout();
        atualizarValoresCheckout();

    }
);