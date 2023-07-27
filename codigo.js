

// ! --------------------------------------------------------------------------------------------------------------------------------------------
// !                                                               SECCION CORE
// ! --------------------------------------------------------------------------------------------------------------------------------------------

// ?  --------------------------------------------------------- DESPLEGAR -------------------------------------------------------------------- */

function desplegar(e) {
  const circulo  = e;
  const bloque = circulo.parentNode.parentNode;
  const flecha = circulo.children[0];

  if (circulo.classList.contains("circulo-oscuro")) {
    circulo.classList.toggle("cirDesplegado-oscuro");
    flecha.classList.toggle("fleDesplegado-oscuro");
    bloque.classList.toggle("bloDesplegado");
  } else {
    circulo.classList.toggle("cirDesplegado");
    flecha.classList.toggle("fleDesplegado");
    bloque.classList.toggle("bloDesplegado");
  }

}


// ?  --------------------------------------------- AUTOMATIZAR EL TAMAÑO DEL CARRUSEL -------------------------------------------------------- */

// * carrusel__contenedor
const carrusel__contenedor = document.querySelector(".carrusel__contenedor");
let carrusel__card = [];
carrusel__card = document.querySelectorAll(".carrusel__card");
/*
let tamañoContenedor;
if (carrusel__card.length % 2 == 0) {
  tamañoContenedor = (carrusel__card.length / 2) * 100;
} else {
  tamañoContenedor = ((carrusel__card.length / 2) * 100) + 2;
}

carrusel__contenedor.style.width = `${tamañoContenedor}%`;


// * carrusel__card
let tamañoCard = 48 * 100 / tamañoContenedor;
for (i=0; i < carrusel__card.length; i++) {
  carrusel__card[i].style.width = `${tamañoCard}%`;
}

// * separacion
let espacio = (4 * 100 / tamañoContenedor)/2;
for (i=0; i < carrusel__card.length; i++) {
  carrusel__card[i].style.marginRight = `${espacio}%`;
  carrusel__card[i].style.marginLeft = `${espacio}%`;
}
*/

// ?  ------------------------------------------------------- MOVER CARRUSEL ------------------------------------------------------------------ */

let margin = 0;

function moverDerecha(flecha) { // Mover y luego clonar
  margin -= 100;
  carrusel__contenedor.style.marginLeft = `${margin}%`;
  carrusel__contenedor.style.transition = "1s ease all";

  setTimeout(() => {
    clonarPrimeroAUltimo();
    clonarPrimeroAUltimo();

    margin += 100;
    carrusel__contenedor.style.marginLeft = `${margin}%`;
    carrusel__contenedor.style.transition = "none";
  }, 1000);

  // * No se pueda desplazar hasta que termine la animación
  flecha.removeAttribute('onclick');

  setTimeout(() => {
    flecha.setAttribute('onclick', 'moverDerecha(this)');
  }, 1000);

  // * Funcion de clonar
  function clonarPrimeroAUltimo() {
    let clon = carrusel__contenedor.children[0].cloneNode(true);
    let aux;
    for (i=carrusel__contenedor.children.length-1; i>=0; i--) {
        aux = carrusel__contenedor.children[i].cloneNode(true);
        carrusel__contenedor.replaceChild(clon,carrusel__contenedor.children[i]);
        clon = aux.cloneNode(true);
    }
  }

}


function moverIzquierda(flecha) { // Clonar y luego mover
  margin -= 100;
  carrusel__contenedor.style.marginLeft = `${margin}%`;
  carrusel__contenedor.style.transition = "none";

  clonarUltimoAPrimero();
  clonarUltimoAPrimero();

  setTimeout(() => {
    margin += 100;
    carrusel__contenedor.style.marginLeft = `${margin}%`;
    carrusel__contenedor.style.transition = "1s ease all";
  }, 10);

  // * No se pueda desplazar hasta que termine la animación
  flecha.removeAttribute('onclick');

  setTimeout(() => {
    flecha.setAttribute('onclick', 'moverIzquierda(this)');
  }, 1000);

  // * Funcion de clonar
  function clonarUltimoAPrimero() {
    let clon = carrusel__contenedor.children[carrusel__contenedor.children.length-1].cloneNode(true);
    let aux;
    for (i=0; i<carrusel__contenedor.children.length; i++) {
      aux = carrusel__contenedor.children[i].cloneNode(true);
      carrusel__contenedor.replaceChild(clon,carrusel__contenedor.children[i]);
      clon = aux.cloneNode(true);
    }
  }
}


// ? ---------------------------------------------- AÑADIR DISEÑO AL SER SELECCIONADO ------------------------------------------------------- */

for (i=0; i<carrusel__card.length; i++) {
  carrusel__card[i].setAttribute('onclick', 'seleccionar(this)');
}
function seleccionar(card) {
  card.classList.toggle("carrusel__card-seleccionado");
  card.children[0].classList.toggle("carrusel__boton-seleccionado");
  card.children[1].classList.toggle("carrusel__pic-seleccionado");

  llenarFomulario();
}


// ? ------------------------------------------- CAMBIAR EL ESTILO DEL CARRUSEL (RESPONSIVE) -------------------------------------------------- */

if (window.matchMedia("(max-width: 767px)").matches) {
  // El código aquí se ejecutará si el tamaño de la pantalla es menor a 767px
  
  const btnIzq = document.querySelector(".carrusel__control-izq");
  btnIzq.setAttribute('onclick', 'moverIzquierdaResp(this)');

  const btnDer = document.querySelector(".carrusel__control-der");
  btnDer.setAttribute('onclick', 'moverDerechaRes(this)');

}

function moverDerechaRes(flecha) { // Mover y luego clonar
  margin -= 100;
  carrusel__contenedor.style.marginLeft = `${margin}%`;
  carrusel__contenedor.style.transition = "1s ease all";

  setTimeout(() => {
    clonarPrimeroAUltimo();

    margin += 100;
    carrusel__contenedor.style.marginLeft = `${margin}%`;
    carrusel__contenedor.style.transition = "none";
  }, 1000);

  // * No se pueda desplazar hasta que termine la animación
  flecha.removeAttribute('onclick');

  setTimeout(() => {
    flecha.setAttribute('onclick', 'moverDerechaRes(this)');
  }, 1000);

  // * Funcion de clonar
  function clonarPrimeroAUltimo() {
    let clon = carrusel__contenedor.children[0].cloneNode(true);
    let aux;
    for (i=carrusel__contenedor.children.length-1; i>=0; i--) {
        aux = carrusel__contenedor.children[i].cloneNode(true);
        carrusel__contenedor.replaceChild(clon,carrusel__contenedor.children[i]);
        clon = aux.cloneNode(true);
    }
  }

}

function moverIzquierdaResp(flecha) { // Clonar y luego mover
  margin -= 100;
  carrusel__contenedor.style.marginLeft = `${margin}%`;
  carrusel__contenedor.style.transition = "none";

  clonarUltimoAPrimero();

  setTimeout(() => {
    margin += 100;
    carrusel__contenedor.style.marginLeft = `${margin}%`;
    carrusel__contenedor.style.transition = "1s ease all";
  }, 10);

  // * No se pueda desplazar hasta que termine la animación
  flecha.removeAttribute('onclick');

  setTimeout(() => {
    flecha.setAttribute('onclick', 'moverIzquierdaResp(this)');
  }, 1000);

  // * Funcion de clonar
  function clonarUltimoAPrimero() {
    let clon = carrusel__contenedor.children[carrusel__contenedor.children.length-1].cloneNode(true);
    let aux;
    for (i=0; i<carrusel__contenedor.children.length; i++) {
      aux = carrusel__contenedor.children[i].cloneNode(true);
      carrusel__contenedor.replaceChild(clon,carrusel__contenedor.children[i]);
      clon = aux.cloneNode(true);
    }
  }
}


// ? ------------------------------------------------------ AÑADIR AL FORMULARIO --------------------------------------------------------------- */

function llenarFomulario() {
  // * LLenar los procesos core
  let seleccionadosCore = [];
  seleccionadosCore = document.querySelectorAll(".carrusel__card-seleccionado");

  let procesos = document.querySelector(".procesos");
  procesos.innerHTML = "";

  for (i=0; i<seleccionadosCore.length; i++) {
    let subtitulo = seleccionadosCore[i].children[2].innerHTML;
    let texto = seleccionadosCore[i].children[3].innerHTML;
    let etiquetas = seleccionadosCore[i].children[4];
    var etiquetasRpa = etiquetas.querySelector('.etiquetas__rpa');
    var etiquetasIa = etiquetas.querySelector('.etiquetas__ia');

    if (etiquetasRpa !== null) {
      etiquetasRpa.classList.add('etiquetas__rpa-oscuro');
    }
    if (etiquetasIa !== null) {
      etiquetasIa.classList.add('etiquetas__ia-oscuro');
    }
  
    codigoHTML = etiquetas.outerHTML;
    
    procesos.innerHTML += `
      <div class="procesos__card">
        <div class="procesos__eliminar"><i class="fa-solid fa-xmark" onclick="eliminarProcesoCore('${subtitulo}')"></i></div>

        <div class="procesos__contenido">
            <strong class="procesos__subtitulo">${subtitulo}</strong>
            <p class="procesos__texto">
                ${texto}
            </p>
        </div>

        ${codigoHTML}
      </div>
    `;

  }

  // * Llenar los procesos generales 
}


function eliminarProcesoCore(nombre) {
  let seleccionadosCore = [];
  seleccionadosCore = document.querySelectorAll(".carrusel__card-seleccionado");

  for (i=0; i<seleccionadosCore.length; i++) {
    if (seleccionadosCore[i].querySelector('.carrusel__titulo').innerHTML == nombre) {
      seleccionar(seleccionadosCore[i]);
    }
  }
}