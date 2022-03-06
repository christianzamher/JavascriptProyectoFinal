document.addEventListener('DOMContentLoaded', () => {

            
    

    let carrito = [];
    
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DomTotalCanvas = document.querySelector('.totalMoney')
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;
    

    // Funciones
    const URLJSON = "datos.json"
    $.getJSON(URLJSON, function (respuesta, estado) {
        if(estado === "success"){
        let misDatos = respuesta;


     function renderizarProductos() {
        
        for(const info of misDatos){
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            //Descripcion 
            const miNodoDescripcion = document.createElement('p');
            miNodoDescripcion.textContent = `${info.descripcion}`
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `$${info.precio}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'Agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoDescripcion);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        }
    }

    
    // Evento para añadir un producto al carrito de la compra
    
    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    
    // Dibuja todos los productos guardados en el carrito
    
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
            carritoSinDuplicados.forEach((item) => {
           
        const miItem = misDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
           
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
               return itemId === item ? total += 1 : total;
            }, 0);
            // nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            
            
            
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        
        DOMtotal.textContent = calcularTotal();
        Canvass()
        
        
    }
    function Canvass (){
        let canvasText = document.querySelector('#money')
        
        canvasText.innerHTML = `<img src="https://troquelando.com/wp-content/uploads/2021/01/Gracias-por-tu-compra-redondo.png">`
        DomTotalCanvas.innerHTML = calcularTotal() 
    }

    
    //Evento para borrar un elemento del carrito
   
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
       
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }

    
     //Calcula el precio total teniendo en cuenta los productos repetidos
     
    function calcularTotal() {
        
        return carrito.reduce((total, item) => {
                const miItem = misDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            
            return total +  miItem[0].precio;
        }, 0).toFixed(2);
        
    }

    
    //Vacia el carrito y vuelve a dibujarlo
    
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

    }
    
     

    

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
     DOMbotonVaciar.addEventListener('click', vaciarCarrito);
     

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
}
});
});


//Estilos para la Web:

//footer
let footer = document.createElement("footer");
footer.innerHTML = `<h3>The Food House Experience</h3>
                    <a class="nav-link active" aria-current="page" href="#">Contacto</a>
                    <a class="nav-link active" aria-current="page" href="#">Nosotros</a>
                    <a class="nav-link active" aria-current="page" href="#">Locales</a>`; 
footer.style.background = "black";
footer.style.color = "white";
footer.style.textAlign = "center"

document.body.appendChild(footer)

//Body:
document.body.style.background = "rgb(252, 167, 1)  no-repeat right top";



//Jquery
$(document).ready(function () {
    $('header').prepend(`<img src="https://freshlabbatavia.com/wp-content/uploads/2017/07/cooking-header.jpg" class="img-fluid" alt="Comida">`);
    $('.img-fluid').on("click", function(){
        alert("Bienvenidos y Gracias por elegirnos");
    })

$('.img-fluid').hide()
.slideDown(3000);

     
    })

