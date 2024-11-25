const prods = document.querySelector(".container");
const produtos = [
    {
        "id": 1,
        "nome": "Tênis lindão",
        "descricao": "O tênis mais lindo do mundo",
        "preco": 200.00,
        "imagem": "tenis1.png"
    },
    {
        "id": 2,
        "nome": "Tênis bunitinho",
        "descricao": "O tênis mais bunitinho de hoje",
        "preco": 180.00,
        "imagem": "tenis2.png"
    },
    {
        "id": 3,
        "nome": "Bruzinha",
        "descricao": "Camiseta branca simples",
        "preco": 49.90,
        "imagem": "camiseta1.png"
    },
    {
        "id": 4,
        "nome": "Camiseta Preta",
        "descricao": "Camiseta pretinha básica",
        "preco": 59.90,
        "imagem": "camiseta2.png"
    },
    {
        "id": 5,
        "nome": "Calsa jeans masculino",
        "descricao": "Calsa jeans masculino, azul básico",
        "preco": 49.90,
        "imagem": "calsa1.png"
    },
    {
        "id": 6,
        "nome": "Calsa jeans feminino",
        "descricao": "Calsa jeans feminino, azul básico",
        "preco": 49.90,
        "imagem": "calsa2.png"
    }
];

function listarProdutos() {
    console.log()
    let output = "";
    produtos.forEach(produto => {
        output += `
            <div class="card" style="width: 18rem;">
                <h3 class="card-title  text-center">${produto.nome}</h3>
                <div class="card-body">
                    <p class="card-text text-center">R$ ${produto.preco.toFixed(2).replaceAll('.',',')}</p>
                </div>
                <button class="btn btn-primary" onclick="comprar(${produto.id})">Comprar</button>
            </div>
            `;
    });
    prods.innerHTML += output;
}

function comprar(id) {
    console.log(`comprar() foi chamado com id: ${id}`); // Debug

    const produto = produtos.find((prod) => prod.id === id); // Encontra o produto pelo ID
    if (produto) {
        alert(`Produto "${produto.nome}" comprado com sucesso!`);
    } else {
        alert("Produto não encontrado.");
    }
}