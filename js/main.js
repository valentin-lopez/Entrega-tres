const productos = [
    {   key: "01", 
        marca: "Marco Bortolozo", 
        modelo: "Especial", 
        precio: 1300, 
        imagen: "./assets/marcoBortolozzo.jpg",
        categoria: { id: "clasicas" },
    },
    {   key: "02", 
        marca: "Kohno", 
        modelo: "Sakurai Special", 
        precio: 2399, 
        imagen: "./assets/sakuraiKohno.jpg", 
        categoria: { id: "clasicas" },
    },
    {   key: "03", 
        marca: "Jose Ramirez", 
        modelo: "C650-AP", 
        precio: 10000, imagen: "./assets/joseRamirez.jpg", 
        categoria: { id: "clasicas" }, 
    },
    {   key: "04", 
        marca: "Mark Usherovich", 
        modelo: "Roma", 
        precio: 3500, imagen: "./assets/markUsherovich.jpg", 
        categoria: { id: "clasicas" }, 
    },
    {   key: "05", 
        marca: "German Vazquez", 
        modelo: "Solista", 
        precio: 3500, imagen: "./assets/germanVazquez.jpg", 
        categoria: { id: "clasicas" }, 
    },
    {   key: "06", 
        marca: "Teodoro Perez", 
        modelo: "Especial", 
        precio: 3500, imagen: "./assets/teodoroPerez.jpg", 
        categoria: { id: "clasicas" }, 
    },
    {   key: "07", 
        marca: "Cordoba", 
        modelo: "Reissue", 
        precio: 3500, imagen: "./assets/cordobaReissue.jpg", 
        categoria: { id: "electricas" }, 
    },
    {   key: "08", 
        marca: "Paulino Bernabe", 
        modelo: "Blanca", 
        precio: 3500, imagen: "./assets/paulinoBernabe.jpg", 
        categoria: { id: "electricas" },
    },
    {   key: "09", 
        marca: "Manuel de la Chica", 
        modelo: "1966", 
        precio: 3500, imagen: "./assets/manueldelaChica.jpg", 
        categoria: { id: "electricas" },
    },
    {   key: "10", 
        marca: "José Ramírez", 
        modelo: "1aF AM", 
        precio: 3500, imagen: "./assets/joseRamirez1aFAM.jpg", 
        categoria: { id: "electricas" },
    },
];

const productsContainer = document.querySelector("#products-container");
const botonesMenu = document.querySelectorAll(".btn-menu");
let botonesAgregar;
const counter = document.querySelector("#counter");

function cargarProductos(productosElegidos) {
    productsContainer.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="img-product" src="${producto.imagen}" alt="">
            <div class="details-products">
                <h3 class="title-product">${producto.marca} ${producto.modelo}</h3>
                <p class="price-product">$${producto.precio}</p>
                <button class="add-product" id="${producto.key}">Agregar</button>
            </div>
        `;
        productsContainer.append(div);
    });

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesMenu.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesMenu.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos") {
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
        }
    });
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".add-product");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Inicializar carrito desde localStorage
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.key === idBoton);

    if(productosEnCarrito.some(producto => producto.key === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.key === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    actualizarCounter();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarCounter() {
    let newCounter = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    counter.innerText = newCounter;
}

actualizarCounter();

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnFetchData');
    const div = document.getElementById('data');

    btn.addEventListener('click', () => {
        console.log('Fetch API');

        const apiKey = '89c95d2ee1b149729f0234956242908';
        const ciudad = prompt("Ingrese su ciudad")

        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ciudad}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
           
            const location = data.location.name; 
            const temperature = data.current.temp_c; 
            const humidity = data.current.humidity; 

            
            div.innerHTML = `
                <p>Ubicación: ${location}</p>
                <p>Temperatura: ${temperature}°C</p>
                <p>Humedad: ${humidity}</p>
            `;
        })
        .catch(error => console.error('Error:', error));
    });
});








