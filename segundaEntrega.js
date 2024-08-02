const listaDeProductos = [
    {
        id: 1,
        marca: "Alhambra",
        modelo: "4Z",
        estuche: true,
        electrica: false,
        zurdo: true,
    },
    {
        id: 2,
        marca: "Alhambra",
        modelo: "3C",
        estuche: false,
        electrica: false,
        zurdo: true,
    },
    {
        id: 3,
        marca: "Godin",
        modelo: "Encore SG",
        estuche: false,
        electrica: true,
        zurdo: false,
    },
    {
        id: 4,
        marca: "La Alpujarra",
        modelo: "Alpumidi",
        estuche: true,
        electrica: true,
        zurdo: true,
    },
    {
        id: 5,
        marca: "Fender",
        modelo: "Telecaster",
        estuche: true,
        electrica: true,
        zurdo: false,
    },
];

class Guitarra {
    constructor(id, marca, modelo, estuche, electrica, zurdo) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.estuche = estuche;
        this.electrica = electrica;
        this.zurdo = zurdo;
    }
};

function main() {
    let opcionElegida = -1; // solo por darle un valor inicial
    while (opcionElegida !== 0) {
       opcionElegida = parseInt(prompt(`Bienvenido a la tienda de guitarras. Ingrese una opción:
          1. Ver listado de productos.
          2. Mostrar guitarras eléctricas.
          3. Mostrar guitarras clásicas.
          4. Mostrar guitarras para zurdos.
          5. Mostrar guitarras con estuche incluído.
          6. Agregar nuevo producto.
          
          Para salir, marque 0`));
       }
}                  

function filtrarElectrica(electrica) {
    if (electrica) {
        const guitarrasElectricas = listaDeProductos.filter(el => el.electrica);
        console.log("Nuestro catálogo de guitarras eléctricas:", guitarrasElectricas);
        alert("En la consola está la data");
    }   else {
        const clasicas = listaDeProductos.filter(el => !el.electrica);
        console.log("Nuestro catálogo de guitarras clásicas:", clasicas);
        alert("En la consola está la data");
    }

}

function filtrarZurdo(zurdo) {
    if (zurdo) {
        const GuitarrasDeZurdo = listaDeProductos.filter(el => el.zurdo);
        console.log("Nuestro catálogo de guitarras para zurdos:", GuitarrasDeZurdo);
        alert("En la consola está la data");
    }   else
        const derecho = listaDeProductos.filter(el => !el.zurdo);
        console.log("Nuestro catalogo de guitarras para derecho:", derecho);
        alert("En la consola está la data");
}

function filtrarEstuche(conEstuche) {
    if (conEstuche) {
        const guitarrasConEstuche = listaDeProductos.filter(el => el.estuche);
        console.log("Nuestro catálogo de guitarras con estuche incluído:", guitarrasConEstuche);
        alert("En la consola está la data");
    }   else {
        const sinEstuche = listaDeProductos.filter(el => !el.estuche);
        console.log("Nuestro catálogo de guitarras sin estuche incluído:", sinEstuche);
        alert("En la consola está la data");
}

function agregarProducto() {
    const id = listaDeProductos + 1;
    const marca = prompt("Ingrese la marca del producto");
    const modelo = prompt("Ingrese el modelo del producto");
    const estuche = confirm("Incluye estuche?");
    const electrica = confirm("Es eléctrica?");
    const zurdo = confirm("Es para zurdo?");

    const nuevoProducto = new Producto(id, marca, modelo, estuche, electrica, zurdo);
    listaDeProductos.push(nuevoProducto);

    alert("Producto agregado con éxito");
};


while (opcionElegida !== 0) {
    switch (opcionElegida) {
        case 1:
            console.log("Nuestro listado de productos:", listaDeProductos);
            alert("En la consola está la data")
            break;
        case 2:
            filtrarElectrica(true);
            break;
        case 3:
            filtrarElectrica(false);
            break;
        case 4:
            filtrarZurdo(true);
            break;
        case 5:
            filtrarEstuche(true);
            break;
        default:
            alert("Opción no válida");
            break;
            
    }
}

main();
