// ==========================================
// ADMIN CARVAIMPORTES
// ==========================================

const formAdmin =
    document.getElementById(
        "produtoAdminForm"
    );

const listaAdmin =
    document.getElementById(
        "listaProdutosAdmin"
    );


function gerarId(nome) {
    return nome
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            ""
        );
}


function salvarProdutosAdmin() {
    localStorage.setItem(
        "carvaProdutos",
        JSON.stringify(produtos)
    );
}


function listarProdutosAdmin(
    pesquisa = ""
) {
    if (!listaAdmin) return;

    listaAdmin.innerHTML = "";

    const texto =
        pesquisa
            .toLowerCase()
            .trim();

    const filtrados =
        produtos.filter(
            produto =>
                produto.nome
                    .toLowerCase()
                    .includes(texto)
        );

    filtrados.forEach(
        produto => {
            listaAdmin.innerHTML += `
                <article class="admin-produto-card">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >

                    <div class="admin-produto-info">

                        <span>
                            ${produto.categoria}
                        </span>

                        <h3>
                            ${produto.nome}
                        </h3>

                        <p>
                            Torcedor:
                            <strong>
                                ${moeda(
                                    produto.precoTorcedor ?? 160
                                )}
                            </strong>
                        </p>

                        <p>
                            Jogador:
                            <strong>
                                ${moeda(
                                    produto.precoJogador ?? 180
                                )}
                            </strong>
                        </p>

                        <p>
                            Estoque:
                            <strong>
                                ${produto.estoque}
                            </strong>
                        </p>

                    </div>


                    <div class="admin-acoes">

                        <button
                            type="button"
                            class="admin-editar"
                            onclick="editarProdutoAdmin('${produto.id}')"
                        >
                            EDITAR
                        </button>

                        <button
                            type="button"
                            class="admin-excluir"
                            onclick="excluirProdutoAdmin('${produto.id}')"
                        >
                            EXCLUIR
                        </button>

                    </div>

                </article>
            `;
        }
    );

    const total =
        document.getElementById(
            "totalProdutosAdmin"
        );

    if (total) {
        total.textContent =
            produtos.length;
    }
}


formAdmin?.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const nome =
            document.getElementById(
                "adminNome"
            ).value.trim();

        const editando =
            document.getElementById(
                "produtoEditando"
            ).value;

        const produtoNovo = {
            id:
                editando ||
                gerarId(nome),

            nome,

            categoria:
                document.getElementById(
                    "adminCategoria"
                ).value,

            imagem:
                document.getElementById(
                    "adminImagem"
                ).value.trim(),

            precoTorcedor:
                Number(
                    document.getElementById(
                        "adminPrecoTorcedor"
                    ).value
                ),

            precoJogador:
                Number(
                    document.getElementById(
                        "adminPrecoJogador"
                    ).value
                ),

            estoque:
                Number(
                    document.getElementById(
                        "adminEstoque"
                    ).value
                ),

            lancamento:
                document.getElementById(
                    "adminLancamento"
                ).checked,

            maisVendido:
                document.getElementById(
                    "adminMaisVendido"
                ).checked
        };

        if (editando) {
            const indice =
                produtos.findIndex(
                    produto =>
                        produto.id ===
                        editando
                );

            if (indice !== -1) {
                produtos[indice] =
                    produtoNovo;
            }

        } else {

            const existe =
                produtos.some(
                    produto =>
                        produto.id ===
                        produtoNovo.id
                );

            if (existe) {
                alert(
                    "Esse produto já existe."
                );

                return;
            }

            produtos.push(
                produtoNovo
            );
        }

        salvarProdutosAdmin();

        limparFormularioAdmin();

        listarProdutosAdmin();

        alert(
            "Produto salvo!"
        );
    }
);


function editarProdutoAdmin(id) {
    const produto =
        produtos.find(
            item =>
                item.id === id
        );

    if (!produto) return;

    document.getElementById(
        "produtoEditando"
    ).value = produto.id;

    document.getElementById(
        "adminNome"
    ).value = produto.nome;

    document.getElementById(
        "adminCategoria"
    ).value = produto.categoria;

    document.getElementById(
        "adminImagem"
    ).value = produto.imagem;

    document.getElementById(
        "adminPrecoTorcedor"
    ).value =
        produto.precoTorcedor ?? 160;

    document.getElementById(
        "adminPrecoJogador"
    ).value =
        produto.precoJogador ?? 180;

    document.getElementById(
        "adminEstoque"
    ).value =
        produto.estoque;

    document.getElementById(
        "adminLancamento"
    ).checked =
        produto.lancamento;

    document.getElementById(
        "adminMaisVendido"
    ).checked =
        produto.maisVendido;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function excluirProdutoAdmin(id) {
    const produto =
        produtos.find(
            item =>
                item.id === id
        );

    if (!produto) return;

    if (
        !confirm(
            `Excluir ${produto.nome}?`
        )
    ) {
        return;
    }

    const indice =
        produtos.findIndex(
            item =>
                item.id === id
        );

    if (indice !== -1) {
        produtos.splice(
            indice,
            1
        );
    }

    salvarProdutosAdmin();

    listarProdutosAdmin();
}


function limparFormularioAdmin() {
    formAdmin?.reset();

    document.getElementById(
        "produtoEditando"
    ).value = "";

    document.getElementById(
        "adminPrecoTorcedor"
    ).value = 160;

    document.getElementById(
        "adminPrecoJogador"
    ).value = 180;

    document.getElementById(
        "adminEstoque"
    ).value = 10;
}


document
    .getElementById(
        "cancelarEdicao"
    )
    ?.addEventListener(
        "click",
        limparFormularioAdmin
    );


document
    .getElementById(
        "adminPesquisa"
    )
    ?.addEventListener(
        "input",
        function () {
            listarProdutosAdmin(
                this.value
            );
        }
    );


listarProdutosAdmin();