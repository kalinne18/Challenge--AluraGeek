document.addEventListener("DOMContentLoaded", function() {
    const produtos = [
        {
            nome: "Produto 1",
            descricao: "Descrição do produto 1.",
            preco: "R$ 49,90",
            imagem: "caminho/para/imagem1.jpg"
        },
        {
            nome: "Produto 2",
            descricao: "Descrição do produto 2.",
            preco: "R$ 99,90",
            imagem: "caminho/para/imagem2.jpg"
        }
        // Adicione mais produtos conforme necessário
    ];

    const listaProdutos = document.querySelector(".lista-produtos");
    const nenhumProdutoMsg = document.querySelector(".nenhum-produto");

    function renderizarProdutos() {
        listaProdutos.innerHTML = ""; // Limpa a lista de produtos

        if (produtos.length === 0) {
            nenhumProdutoMsg.style.display = "block";
        } else {
            nenhumProdutoMsg.style.display = "none";
            produtos.forEach(produto => {
                const card = document.createElement("div");
                card.classList.add("card");

                const img = document.createElement("img");
                img.src = produto.imagem;
                img.alt = `Imagem do ${produto.nome}`;
                card.appendChild(img);

                const infoContainer = document.createElement("div");
                infoContainer.classList.add("card-container--info");

                const nomeProduto = document.createElement("p");
                nomeProduto.textContent = produto.nome;
                infoContainer.appendChild(nomeProduto);

                const valueContainer = document.createElement("div");
                valueContainer.classList.add("card-container--value");

                const precoProduto = document.createElement("p");
                precoProduto.textContent = `Preço: ${produto.preco}`;
                valueContainer.appendChild(precoProduto);

                const deleteIcon = document.createElement("img");
                deleteIcon.src = "caminho/para/icono-de-eliminacion";
                deleteIcon.alt = "Ícone de exclusão";
                deleteIcon.addEventListener("click", function() {
                    removerProduto(produto.nome);
                });
                valueContainer.appendChild(deleteIcon);

                infoContainer.appendChild(valueContainer);
                card.appendChild(infoContainer);

                listaProdutos.appendChild(card);
            });
        }
    }

    function adicionarProduto(event) {
        event.preventDefault();

        const nome = document.getElementById("produto-nome").value;
        const preco = document.getElementById("produto-preco").value;
        const imagem = document.getElementById("produto-imagem").value;

        if (nome && preco && imagem) {
            produtos.push({
                nome: nome,
                preco: preco,
                imagem: imagem
            });

            renderizarProdutos();
            document.getElementById("produto-form").reset();
        }
    }

    function removerProduto(nome) {
        const index = produtos.findIndex(produto => produto.nome === nome);
        if (index !== -1) {
            produtos.splice(index, 1);
            renderizarProdutos();
        }
    }

    document.getElementById("produto-form").addEventListener("submit", adicionarProduto);

    renderizarProdutos();
});



