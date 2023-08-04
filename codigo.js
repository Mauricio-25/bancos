

// ! --------------------------------------------------------------------------------------------------------------------------------------------
// !                                                               SECCION CORE
// ! --------------------------------------------------------------------------------------------------------------------------------------------

// ?  --------------------------------------------------------- DESPLEGAR -------------------------------------------------------------------- */

let btnCirculo = [];
btnCirculo = document.querySelectorAll(".circulo");

btnCirculo.forEach(elemento => {
  elemento.addEventListener("click", ()=>{

    let height = 0;
    let bloque = elemento.parentNode.nextElementSibling;
    let flecha = elemento.children[0];

    if (bloque.clientHeight == "0") {
      height = bloque.scrollHeight;

      if (bloque.querySelector(".miniCirculo")) { // si tiene mas flechas de despliegue adentro
        bloque.style.height = `auto`;
      } else {
        bloque.style.height = `${height}px`;
      }
    } else {
      bloque.style.height = `${height}px`;
    }


    if (flecha) {
      if (elemento.classList.contains("circulo-oscuro")) {
          elemento.classList.toggle("cirDesplegado-oscuro");
          flecha.classList.toggle("fleDesplegado-oscuro");
      } else {
          elemento.classList.toggle("cirDesplegado");
          flecha.classList.toggle("fleDesplegado");
      }
    }

  })
});


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

  // * Mostrar el mensaje
  let mensajeAgregado = document.querySelector(".mensaje-agregado");
  let mensajeEliminado = document.querySelector(".mensaje-eliminado");

  if (card.classList.contains("carrusel__card-seleccionado")) {
    mensajeAgregado.style.display = "inline-block";
    mensajeAgregado.style.zIndex = "2";
    setTimeout(() => {
      mensajeAgregado.style.display = "none";
      mensajeAgregado.style.zIndex = "1";
      mensajeAgregado.style.opacity = "0";
    }, 1500);

    setTimeout(() => {
      mensajeAgregado.style.opacity = "1";
      mensajeAgregado.style.transition = "0.5s ease all";
    }, 100);

  } else {
    mensajeEliminado.style.display = "inline-block";
    mensajeEliminado.style.zIndex = "2";
    setTimeout(() => {
      mensajeEliminado.style.display = "none";
      mensajeEliminado.style.zIndex = "1";
      mensajeEliminado.style.opacity = "0";
    }, 1500);

    setTimeout(() => {
      mensajeEliminado.style.opacity = "1";
      mensajeEliminado.style.transition = "0.5s ease all";
    }, 100);
  }
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
  let seleccionadosGeneral = [];
  seleccionadosGeneral = document.querySelectorAll(".secGeneral__circulo-seleccionado");

  for (i=0; i<seleccionadosGeneral.length; i++) {
    let subtitulo = seleccionadosGeneral[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1].innerHTML;
    let texto = seleccionadosGeneral[i].parentNode.children[1].innerHTML;

    let etiquetas = seleccionadosGeneral[i].parentNode.children[2];
    etiquetas.classList.remove('etiquetas-general');

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
        <div class="procesos__eliminar"><i class="fa-solid fa-xmark" onclick="eliminarProcesoGeneral('${texto.replace(/\s+/g, "")}');"></i></div>

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


function eliminarProcesoGeneral(nombre) {
  let seleccionadosGeneral = [];
  seleccionadosGeneral = document.querySelectorAll(".secGeneral__circulo-seleccionado");

  for (i=0; i<seleccionadosGeneral.length; i++) {
    if (seleccionadosGeneral[i].parentNode.children[1].innerHTML.replace(/\s+/g, "") == nombre) {
      seleccionarGeneral(seleccionadosGeneral[i].parentNode);
    }
  }
}









// ! --------------------------------------------------------------------------------------------------------------------------------------------
// !                                                               SECCION GENERAL
// ! --------------------------------------------------------------------------------------------------------------------------------------------

// ?  ------------------------------------------------------ EFECTO DE HOVER PORTADA --------------------------------------------------------------- */

let procGenerales = [];
procGenerales = document.querySelectorAll(".secGeneral__procesos");

let portada = [];
portada = document.querySelectorAll(".secGeneral__portada");

let vista = [];
vista = document.querySelectorAll(".secGeneral__vista");

for (let i = 0; i < procGenerales.length; i++) {
  procGenerales[i].addEventListener("mouseenter", (function(index) {
    return function() {
      portada[index].style.opacity = "0";
      portada[index].style.zIndex = "1";
      vista[index].style.opacity = "1";
      vista[index].style.zIndex = "2";
    }
  })(i))

  procGenerales[i].addEventListener("mouseleave", (function(index) {
    return function() {
      portada[index].style.opacity = "1";
      portada[index].style.zIndex = "2";
      vista[index].style.opacity = "0";
    }
  })(i))
}


// ?  ---------------------------------------------------- DESPLIEGUE DE LOS PROCESOS ------------------------------------------------------------- */

let secGeneral__elemento = [];
secGeneral__elemento = document.querySelectorAll(".secGeneral__elemento");

secGeneral__elemento.forEach((elemento, clave) => {
  elemento.addEventListener("click", ()=>{

    for (i=0; i<secGeneral__elemento.length; i++) {
      if (i == clave) {
        secGeneral__elemento[i].classList.toggle("secGeneral__elemento-desplegado");

        let height = 0;
        let desplegable = secGeneral__elemento[i].nextElementSibling;

        if (desplegable.clientHeight == "0") {
          height = desplegable.scrollHeight;
        }

        desplegable.style.height = `${height}px`;
      }

      else {
        if (secGeneral__elemento[i].classList.contains("secGeneral__elemento-desplegado")){
          secGeneral__elemento[i].classList.toggle("secGeneral__elemento-desplegado");

          let desplegable = secGeneral__elemento[i].nextElementSibling;

          desplegable.style.height = `0px`;
        }
      }
    }

  })
});

// ?  ---------------------------------------------------- SELECCIONAR PROCESOS ------------------------------------------------------------- */

let secGeneral__item = [];
secGeneral__item = document.querySelectorAll(".secGeneral__item");

for (i=0; i<secGeneral__item.length; i++) {
  secGeneral__item[i].setAttribute('onclick', 'seleccionarGeneral(this)');
}

function seleccionarGeneral(item) {
  item.children[0].classList.toggle("secGeneral__circulo-seleccionado");

  llenarFomulario();

  // * Mostrar el mensaje
  let mensajeAgregado = document.querySelector(".mensaje-agregado");
  let mensajeEliminado = document.querySelector(".mensaje-eliminado");

  if (item.children[0].classList.contains("secGeneral__circulo-seleccionado")) {
    mensajeAgregado.style.display = "inline-block";
    mensajeAgregado.style.zIndex = "2";
    setTimeout(() => {
      mensajeAgregado.style.display = "none";
      mensajeAgregado.style.zIndex = "1";
      mensajeAgregado.style.opacity = "0";
    }, 1500);

    setTimeout(() => {
      mensajeAgregado.style.opacity = "1";
      mensajeAgregado.style.transition = "0.5s ease all";
    }, 100);

  } else {
    mensajeEliminado.style.display = "inline-block";
    mensajeEliminado.style.zIndex = "2";
    setTimeout(() => {
      mensajeEliminado.style.display = "none";
      mensajeEliminado.style.zIndex = "1";
      mensajeEliminado.style.opacity = "0";
    }, 1500);

    setTimeout(() => {
      mensajeEliminado.style.opacity = "1";
      mensajeEliminado.style.transition = "0.5s ease all";
    }, 100);
  }

}





// ! --------------------------------------------------------------------------------------------------------------------------------------------
// !                                                               SECCION BUSCADOR
// ! --------------------------------------------------------------------------------------------------------------------------------------------

// ?  ------------------------------------------------------ COMBOBOX --------------------------------------------------------------- */

function escribirCmb(elemento) {
  let cmb = document.querySelector(".buscador__input-cmb");

  cmb.value = elemento.innerHTML;

  let height = 0;
  let bloque = elemento.parentNode;

    if (bloque.clientHeight == "0") {
      height = bloque.scrollHeight;
    }
    
    bloque.style.height = `${height}px`;
}


// ?  ------------------------------------------------------ FOCUS --------------------------------------------------------------- */

let buscador = document.querySelector(".buscador__input-pro");
let lista = document.querySelector(".buscador__lista");

buscador.addEventListener("click", ()=>{
  let combo = document.querySelector(".buscador__input-cmb");

  lista.style.display = "block";
  llenarListaBuscador(buscador.value, combo.value);
});


document.addEventListener("mousedown", (event)=>{
  if(!buscador.contains(event.target) && !lista.contains(event.target)){
      lista.style.display = "none";
  }
});

// ?  ------------------------------------------------------ TECLADO --------------------------------------------------------------- */

buscador.addEventListener("keyup",(e)=>{
  
  let lista = document.querySelector(".buscador__lista");
  let combo = document.querySelector(".buscador__input-cmb").value;

  let encontrado = false;
  let texto = buscador.value.toUpperCase();

    for (i=0; i<lista.children.length-1; i++){
      if(lista.children[i].children[1].textContent.toUpperCase().includes(texto) && (lista.children[i].dataset.area == combo || combo == "")) {
        lista.children[i].style.display = "grid";
        encontrado = true;
      } else {
        lista.children[i].style.display = "none";
      }
    }

    if(!encontrado) {
      lista.children[lista.children.length-1].style.display = "flex";
    } else {
      lista.children[lista.children.length-1].style.display = "none";
    }
});


function llenarListaBuscador(texto, combo) {

  let proc = texto.toUpperCase();

  //* Listar Procesos CORE
  let procesosCore = [];
  procesosCore = document.querySelectorAll(".carrusel__card");
  
  let lista = document.querySelector(".buscador__lista");
  lista.innerHTML = "";

  for (i=0; i<procesosCore.length; i++) {
    if (procesosCore[i].classList.contains("carrusel__card-seleccionado") && procesosCore[i].children[2].innerHTML.toUpperCase().includes(proc) && (combo == "Operación" || combo == "")) {
      lista.innerHTML += `
        <div class="buscador__item" onclick="seleccionarBuscador(this)" data-area="Operación">
          <div class="buscador__circulo buscador__circulo-seleccionado"><i class="fa-solid fa-plus buscador__circulo-mas"></i><i class="fa-solid fa-minus buscador__circulo-menos"></i></div>
          <span>${procesosCore[i].children[2].innerHTML}</span>

          <div class="etiquetas etiquetas-buscador">
            ${procesosCore[i].querySelector(".etiquetas").innerHTML}
          </div>
        </div>
      `;
    } else if (procesosCore[i].children[2].innerHTML.toUpperCase().includes(proc) && (combo == "Operación" || combo == "")) {
      lista.innerHTML += `
        <div class="buscador__item" onclick="seleccionarBuscador(this)" data-area="Operación">
          <div class="buscador__circulo"><i class="fa-solid fa-plus buscador__circulo-mas"></i><i class="fa-solid fa-minus buscador__circulo-menos"></i></div>
          <span>${procesosCore[i].children[2].innerHTML}</span>

          <div class="etiquetas etiquetas-buscador">
            ${procesosCore[i].querySelector(".etiquetas").innerHTML}
          </div>
        </div>
      `;
    }
  }

  //* Listar Procesos GENERALES
  let procesosGenerales = [];
  procesosGenerales = document.querySelectorAll(".secGeneral__item");

  for (i=0; i<procesosGenerales.length; i++) {
    if (procesosGenerales[i].children[0].classList.contains("secGeneral__circulo-seleccionado") && procesosGenerales[i].children[1].innerHTML.toUpperCase().includes(proc) && (combo == procesosGenerales[i].parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1].innerHTML || combo == "")) {
      lista.innerHTML += `
        <div class="buscador__item" onclick="seleccionarBuscador(this)" data-area="${procesosGenerales[i].parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1].innerHTML}">
          <div class="buscador__circulo buscador__circulo-seleccionado"><i class="fa-solid fa-plus buscador__circulo-mas"></i><i class="fa-solid fa-minus buscador__circulo-menos"></i></div>
          <span>${procesosGenerales[i].children[1].innerHTML}</span>

          <div class="etiquetas etiquetas-buscador">
            ${procesosGenerales[i].querySelector(".etiquetas").innerHTML}
          </div>
        </div>
      `;
    } else if (procesosGenerales[i].children[1].innerHTML.toUpperCase().includes(proc) && (combo == procesosGenerales[i].parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1].innerHTML || combo == "")) {
      lista.innerHTML += `
        <div class="buscador__item" onclick="seleccionarBuscador(this)" data-area="${procesosGenerales[i].parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1].innerHTML}">
          <div class="buscador__circulo"><i class="fa-solid fa-plus buscador__circulo-mas"></i><i class="fa-solid fa-minus buscador__circulo-menos"></i></div>
          <span>${procesosGenerales[i].children[1].innerHTML}</span>

          <div class="etiquetas etiquetas-buscador">
            ${procesosGenerales[i].querySelector(".etiquetas").innerHTML}
          </div>
        </div>
      `;
    }
  }

  //* No se encontro 

  lista.innerHTML += `
    <div class="buscador__item buscador__item-ultimo"><i class="fa-sharp fa-solid fa-magnifying-glass"></i>No se encontraron resultados</div>
  `;

}



// ?  ------------------------------------------------------ AGREGAR AL FORMULARIO --------------------------------------------------------------- */

function seleccionarBuscador(elemento) {

  let buscador = document.querySelector(".buscador__input-pro");
  let combo = document.querySelector(".buscador__input-cmb");

  if (elemento.dataset.area == "Operación") {
    // * CORE 
    let procesosCore = [];
    procesosCore = document.querySelectorAll(".carrusel__titulo");

    for (i=0; i<procesosCore.length; i++) {
      if (procesosCore[i].innerHTML == elemento.children[1].innerHTML) {
        seleccionar(procesosCore[i].parentNode);
      }
    }
  }

  
  else {
    // * GENERAL
    let procesosGeneral = [];
    procesosGeneral = document.querySelectorAll(".texto");

    for (i=0; i<procesosGeneral.length; i++) {
      if (procesosGeneral[i].innerHTML == elemento.children[1].innerHTML) {
        seleccionarGeneral(procesosGeneral[i].parentNode);
      }
    }
  }

  llenarListaBuscador(buscador.value, combo.value);

} 