const produtoList = () => {
    return fetch("http://localhost:3000/produtos")
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

const criarProduto = (nome, preco, imagem) => {
    return fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, preco, imagem })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

const deletarProduto = (id) => {
    return fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Erro ao deletar produto');
        }
    })
    .catch((err) => console.log(err));
}

export const serviceProdutos = {
    produtoList,
    criarProduto,
    deletarProduto
};
