const prods = document.getElementById("produtos");
var carrinho = JSON.parse(window.localStorage.getItem("carrinho"))
var produtos = []
if(!carrinho){
    carrinho = [];
}else{
    console.log(JSON.stringify(carrinho));
}
    async function listarCart() {
    
        if (!carrinho.length) {
            prods.innerHTML = "<p>O carrinho está vazio.</p>";
            return;
        }
    
        // Generate HTML for cart items
        let output = "";
        let total = 0;
        carrinho.forEach(produto => {
            total += produto.price; // Sum up the total price
            output += `
                <div class="card" style="width: 18rem;">
                    <img src="${produto.images}" class="card-img-top" alt="${produto.title}">
                    <div class="card-body">
                        <h3 class="card-title text-center">${produto.title}</h3>
                        <p class="card-text text-center">R$ ${(produto.price / 100).toFixed(2).replace('.', ',')}</p>
                        <button class="btn btn-danger" onclick="remover(${produto.id})">Remover</button>
                    </div>
                </div>
            `;
        });
    
        // Add a Checkout button and display the total
        output += `
            <div class="cart-total">
                <h3>Total: R$ ${(total / 100).toFixed(2).replace('.', ',')}</h3>
                <button class="btn btn-success" onclick="checkout(${total})">Finalizar Compra</button>
            </div>
        `;
    
        prods.innerHTML = output;
    }
    

function comprar(id) {
    console.log(`comprar() foi chamado com id: ${id}`); // Debug

    const cart = produtos.find((cart) => cart.id === id); // Encontra o produto pelo ID
    if (cart) {
        alert(`Produto "${cart.nome}" comprado com sucesso!`);
    } else {
        alert("Produto não encontrado.");
    }
}

function remover(id) {
    let carrinho = JSON.parse(window.localStorage.getItem("carrinho")) || [];
    carrinho = carrinho.filter(produto => produto.id !== id);
    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
    listarCart(); // Refresh the cart display
    alert("Produto removido do carrinho.");
}

function checkout(total) {
    // Save the total amount to localStorage
    window.localStorage.setItem("cartTotal", total);

    // Redirect to the checkout page
    window.location.href = "../../pagamentos/forms.html";
}
