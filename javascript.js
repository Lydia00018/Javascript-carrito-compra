var cosas = ["Reloj de arena decorativo TILLSYN,Supermega reloj de arena,9,10,20,30,https://www.ikea.com/es/es/images/range-introduction/ikea-ikea-tillsyn-hourglass-begåvning-glass-dome__1364493362974-s31.jpg","LATTJO  Peluche,El peluche que hará feliz a tu perro,12,11,22,33,https://www.ikea.com/es/es/images/products/lattjo-peluche-robot-verde-claro__0520262_pe642048_s4.jpg"];
var cesta={};

var Ikea = function(Nombre, Desc, Precio, Altura, Anchura, Profundidad, Imagen,Cantidad){
  this.nombre=Nombre;
  this.desc=Desc;
  this.precio=Precio;
  this.altura=Altura;
  this.anchura=Anchura;
  this.profundidad=Profundidad;
  this.imagen=Imagen;
  this.stock =10;  
  this.comprar = function(cantidad){   
    return (this.stock = this.stock > 0 ? this.stock - cantidad : 0);
  }
}

var array = cosas.map(function(elem){
    return elem.split(",");
});

// Construimos un array de los objetos instanciados
var arrayMuebles = []; 
array.forEach(function(elem){
  var mueble = new Ikea (elem[0].trim(),elem[1].trim(), elem[2].trim(), elem[3].trim(), elem[4].trim(), elem[5].trim(), elem[6].trim());
  arrayMuebles.push(mueble);
});

console.log(arrayMuebles);

// Seleccionamos la plantilla
var template= document.querySelector("#item");
var newDiv = template.content.querySelector("#display");

for(i=0;i<arrayMuebles.length;i++) {
    var a = newDiv.cloneNode(true);
    a.querySelector("#nombre").innerHTML = arrayMuebles[i].nombre;
    a.querySelector("#description").innerHTML= arrayMuebles[i].desc;
    a.querySelector("img").src=arrayMuebles[i].imagen;
    a.querySelector("#precioo").innerHTML= "Precio: "+arrayMuebles[i].precio+" euros";
    var cantidadCarrito=a.querySelector("#cantidad");
    cantidadCarrito.id="cantidad"+i;
    var btn = a.querySelector("#boton-carrito");
    btn.id = i;
    btn.addEventListener("click", compra);
    document.querySelector("#colItems").appendChild(a);
}

function compra(event) {
  var idBtn = event.target.id;
  var articulo = arrayMuebles[idBtn];
  var cantidad= document.querySelector("#cantidad"+idBtn).value;
  añadirACesta(articulo.nombre, cantidad);
}

function añadirACesta(clave, cantidad) {
    cesta[clave] = cesta[clave] ? cesta[clave] + parseInt(cantidad):parseInt(cantidad);
    pintarCesta();
  }

function getElementoByNombre(texto) {
    for(var i=0; i<arrayMuebles.length;i++) {
        if (arrayMuebles[i].nombre == texto) return arrayMuebles[i];
    }
}

// Pintar cesta
var cestaCompra;
function pintarCesta(){
var templateCarrito= document.querySelector(".estructura-carrito");
cestaCompra = templateCarrito.content.querySelector(".articulos-en-carrito");
var fila=document.querySelector(".fila-item");
for (var i =0;i<fila.childElementCount; i++) {
        fila.childNodes[i].innerHTML = "";
    }
  var costeCesta=0;
  for (var items in cesta) {
    var cantidades = parseInt(cesta[items]);
    var mueble = getElementoByNombre(items);
    var i=cestaCompra.cloneNode(true);
    i.querySelector("#nombre-en-carrito").innerHTML=mueble.nombre;;
    i.querySelector("#cantidad-en-carrito").innerHTML=parseInt(cantidades);
    i.querySelector("#precio-en-carrito").innerHTML= mueble.precio + "€";
    costeCesta += cantidades * mueble.precio;  
    fila.appendChild(i);
  }
  // Suma totales
  var total=document.querySelector("#total-en-carrito");
  total.innerHTML = "<strong> " + costeCesta + " €</strong>";
  };

// Botón compra final
var botonCompra =document.querySelector("#boton-comprar");
botonCompra.addEventListener("click", compraFinal);
function compraFinal(event){
  var filaP=document.querySelector(".fila-item");
  while (filaP.hasChildNodes()) {   
  filaP.removeChild(filaP.firstChild);
  }
  var total=document.querySelector("#total-en-carrito");
  total.innerHTML="";
  var msg= document.querySelector("#mensaje-compra");
  msg.innerHTML="¡Gracias por su compra!";
}