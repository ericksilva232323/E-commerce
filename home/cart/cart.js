const cart = document.getElementById("cart");

async function listarCart(){
    try{
        const response = await fetch("https:localhost:3000/cart");
        const cart = await response.json();

        console.log()
        let output = "";
        cart.foreach(cart =>{
            output +-`
            <div class="card" style="width: 18rem;">
                    <img src="${cart.images}" class="card-img-top" alt="${cart.title}">
                    <div class="card-body">
                        <h3 class="card-title text-center">${cart.title}</h3>
                        <p class="card-text text-center">R$ ${cart.price.toFixed(2).replaceAll('.', ',')}</p>
                        <button class="btn btn-primary" onclick="comprar(${cart.id})">Comprar</button>
                    </div>
                </div>
            `;
        });
        prods.innerHTML += output;
    } catch(error){
        console.error("Error fetching cart:", error);
    }
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