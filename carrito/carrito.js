const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const botonVaciarCarrito = document.querySelector(".empty-cart");
const totalCarrito = document.querySelector("#total");

function calcularTotal() {
  return productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
}

function actualizarCarrito() {
  if (productosEnCarrito.length >= 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("product-cart");
      div.innerHTML = `
          <img class="img-cart-product" src="${producto.imagen}" alt="">
          <div class="cart-product-title">
            <small>Título</small>
            <h3>${producto.marca} ${producto.modelo}</h3>
          </div>
          <div class="quantity-cart-product">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
          </div>
          <div class="price-cart-product">
            <small>Precio</small>
            <p>$${producto.precio}</p>
          </div>
          <div class="subtotal-cart-product">
            <small>Subtotal</small>
            <p>$${producto.precio * producto.cantidad}</p>
          </div>
          <button id="${producto.key}" class="delete-cart-product">PAPELERA</button>
      `;

      contenedorCarritoProductos.append(div);
    });

    totalCarrito.innerText = `$${calcularTotal()}`;

  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
  }
}

actualizarCarrito();

botonVaciarCarrito.addEventListener("click", () => {
  localStorage.removeItem("productos-en-carrito");
  productosEnCarrito.length = 0;
  actualizarCarrito();
});

contenedorCarritoProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-cart-product")) {
    const key = e.target.id;
    const productosActualizados = productosEnCarrito.filter(producto => producto.key !== key);

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosActualizados));
    productosEnCarrito.length = 0;
    productosEnCarrito.push(...productosActualizados);

    actualizarCarrito();
  }
});
