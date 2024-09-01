const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const botonVaciarCarrito = document.querySelector(".empty-cart");
const totalCarrito = document.querySelector("#total");

function calcularTotal() {
  let total = 0;
  productosEnCarrito.forEach(producto => total += producto.precio * producto.cantidad)
  return total;
}

function actualizarCarrito() {
  console.log(productosEnCarrito.length)
  
  if (productosEnCarrito.length >= 0) {
    
 
    contenedorCarritoProductos.innerHTML = "";
    if (productosEnCarrito.length === 0){
      const emptyState = document.createElement("div");
      emptyState.classList.add("product-cart");
      emptyState.innerHTML = `<span>Tu carrito está vacío</span>`
      contenedorCarritoProductos.append(emptyState);
      botonVaciarCarrito.disabled = true;
    } else {
      productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("product-cart");
        div.innerHTML = `
            <img class="img-cart-product" src="../${producto.imagen}" alt="${producto.marca} ${producto.modelo}">
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
            <button id="${producto.key}" class="delete-cart-product">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
  
            </button>
        `;
    
        
        contenedorCarritoProductos.append(div);
        
      });
      botonVaciarCarrito.disabled = false;
    }



    

    totalCarrito.innerText = `$${calcularTotal()}`;

  
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
