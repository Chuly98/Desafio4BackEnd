let products = [];
let error = "";

const productsList = document.getElementById("productsList");

async function getAllProducts() {
    try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseJson = await response.json();
        products = [...responseJson.products];
        compileProducts();
    } catch (err) {
        error = err;
        console.error("Error al obtener los productos:", err);
    }
}

function compileProducts() {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const productColumn = document.createElement("div");
        productColumn.classList.add("col-md-4");

        const productCard = document.createElement("div");
        productCard.classList.add("card");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        cardBody.innerHTML = `
      <h3>${product.title}</h3>
      <p>ID del calzado: ${product.id}</p>
      <p>Description del producto: ${product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Code: ${product.code}</p>
      <p>Stock disponible: ${product.stock}</p>
    `;

        productCard.appendChild(cardBody);
        productColumn.appendChild(productCard);
        productsList.appendChild(productColumn);
    }
}

getAllProducts();