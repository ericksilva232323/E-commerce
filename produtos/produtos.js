const prods = document.getElementById("produtos");


async function listarProdutos() {
    try {
        const response = await fetch("http://localhost:3000/product");
        const produtos = await response.json();

        console.log()
        let output = "";
        produtos.forEach(produto => {
            output += `
           <div class="card" style="width: 18rem;">
                    <img src="${produto.images}" class="card-img-top" alt="${produto.title}">
                    <div class="card-body">
                        <h3 class="card-title text-center">${produto.title}</h3>
                        <p class="card-text text-center">R$ ${produto.price.toFixed(2).replaceAll('.', ',')}</p>
                        <button class="btn btn-primary" onclick="comprar(${produto.id})">Comprar</button>
                    </div>
                </div>
            `;
        });
        prods.innerHTML += output;
    } catch (error) {
        console.error("Error fetching products:", error)
    }
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