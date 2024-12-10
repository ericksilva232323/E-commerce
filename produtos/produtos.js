const prods = document.getElementById("produtos");
var produtos = []
var carrinho = JSON.parse(window.localStorage.getItem("carrinho"))
if(!carrinho){
    carrinho = [];
}else{
    console.log(JSON.stringify(carrinho));
}

async function listarProdutos() {
    try {
        const response = await fetch("http://localhost:3000/product");
        const lista = await response.json();
        produtos = lista;
        let output = "";
        lista.forEach(produto => {
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
    const produto = produtos.find((prod) => prod.id === id); // Encontra o produto pelo ID
    if (produto) {
        alert(`Produto "${produto.title}" adiconado ao carrinho`);
        carrinho.push(produto);
        window.localStorage.setItem("carrinho",JSON.stringify(carrinho));
        window.location.reload();
    } else {
        alert("Produto não encontrado.");
    }
}