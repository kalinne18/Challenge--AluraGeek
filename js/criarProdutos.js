import { serviceProdutos } from "../produto.js";

const produtoForm = document.querySelector("#produto-form");
const produtoContainer = document.querySelector("[data-produto]");
const nenhumProdutoMsg = document.querySelector(".nenhum-produto");

function criarElemento(nome, preco, imagem, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="card-1mg">
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

const adicionarProduto = async (event) => {
    event.preventDefault();
    const nome = document.querySelector("#produto-nome").value;
    const preco = document.querySelector("#produto-preco").value;
    const imagem = document.querySelector("#produto-imagem").value;

    try {
        const novoProduto = await serviceProdutos.criarProduto(nome, preco, imagem);
        produtoContainer.appendChild(criarElemento(novoProduto.nome, novoProduto.preco, novoProduto.imagem, novoProduto.id));
        produtoForm.reset();
        if (nenhumProdutoMsg) {
            nenhumProdutoMsg.style.display = "none";
        }
    } catch (error) {
        console.log(error);
    }
}

produtoForm.addEventListener("submit", adicionarProduto);
