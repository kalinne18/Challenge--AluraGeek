import { serviceProdutos } from "./produto.js";

const produtoContainer = document.querySelector("[data-produto]");
const produtoForm = document.getElementById("produto-form");

function criarElemento(nome, preco, imagem, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="card-img">
            <img src="${imagem}" alt="${nome}">
        </div>
        <div class="card-info">
            <p>${nome}</p>
            <div class="card-value">
                <p>${preco}</p>
                <button class="botao-delete" data-id="${id}">
                    <img src="./img/lixeira.png" alt="delete">
                </button>
            </div>
        </div>
    `;
    produtoContainer.appendChild(card);
    return card;
}

const renderizar = async () => {
    try {
        const listaProduto = await serviceProdutos.produtoList();
        
        listaProduto.forEach((produto) => {
            produtoContainer.appendChild(
                criarElemento(produto.nome, produto.preco, produto.imagem, produto.id)
            );
        });
    } catch (error) {
        console.log(error);
    }
}

const adicionarProduto = async (event) => {
    event.preventDefault();
    const nome = document.getElementById("produto-nome").value;
    const preco = document.getElementById("produto-preco").value;
    const imagem = document.getElementById("produto-imagem").value;

    try {
        const novoProduto = await serviceProdutos.criarProduto(nome, preco, imagem);
        produtoContainer.appendChild(criarElemento(novoProduto.nome, novoProduto.preco, novoProduto.imagem, novoProduto.id));
        produtoForm.reset();
    } catch (error) {
        console.log(error);
    }
}

const deletarProduto = async (event) => {
    if (event.target.closest('.botao-delete')) {
        const id = event.target.closest('.botao-delete').getAttribute('data-id');
        try {
            await serviceProdutos.deletarProduto(id);
            event.target.closest('.card').remove();
        } catch (error) {
            console.log(error);
        }
    }
}

produtoForm.addEventListener("submit", adicionarProduto);
produtoContainer.addEventListener("click", deletarProduto);

renderizar();



