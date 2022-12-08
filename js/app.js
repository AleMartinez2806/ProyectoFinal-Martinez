// Contenedor Productos
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

const finalizarCompra = document.getElementById('finalizar-compra')


//Carrito vacio
let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

if (finalizarCompra) {
        finalizarCompra.addEventListener("click", () => {
          if (carrito.length === 0) {
            Swal.fire({
              title: "¡Tu carrito está vacio!",
              text: "Elige algo para continuar con la compra",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          } else {
            location.href = "./pages/compra.html";
          }
          actualizarCarrito()
        });
      }
    

//Agregar al html
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar btn btn-primary">Agregar <i class="fas fa-shopping-cart"></i></button>`
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)
    //Por cada elemento de mi array, le creo un div y le pongo un id particular, despues un get element y al elemento un event listener
    
    boton.addEventListener('click', () => {
        //esta funcion ejecuta el agregar el carrito con la id del producto
        agregarAlCarrito(producto.id)
        
    })
})

//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    //Aumentar la cantidad sin que se repita
    const existe = carrito.some (prod => prod.id === prodId) //compruebo si el elemento ya existe en el carrito

    if (existe){ //Si ya está solo actualizo la cantaidad
        const prod = carrito.map (prod => { 
                if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { //Si no existe, lo agrego al carrito
        const item = stockProductos.find((prod) => prod.id === prodId)
        
        carrito.push(item)
    }
    //Agrega al carrito y despues con la funcion actualizarCarrito lo recorro para que se muestre
     actualizarCarrito()
}

//ELIMINAR DEL CARRITO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busco el elemento y devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice del elemento ITEM y borra de a un elemento
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" //Lo uso para recorrer el carrito y mostrarlo actualizado
    
    //Por cada producto, un div con esta estructura y le meto un append al contenedorCarrito
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
   
    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto q agrego en mi carrito, con el acumulador le sumo la propiedad precio, (con el acumulador en 0)
}
