

// ! --------------------------------------------------------------------------------------------------------------------------------------------
// !                                                               SECCION CORE
// ! --------------------------------------------------------------------------------------------------------------------------------------------

// ?  --------------------------------------------------------- DESPLEGAR -------------------------------------------------------------------- */

let btnCirculo = [];
btnCirculo = document.querySelectorAll(".circulo");

btnCirculo.forEach(elemento => {
  elemento.addEventListener("click", ()=>{

    let height = 0;
    let bloque = elemento.parentNode.parentNode.parentNode.querySelector(".bloque");

    if (elemento.classList.contains("miniCirculo")) {
      bloque = elemento.parentNode.parentNode.nextElementSibling.children[1];
    }

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

// ?  ------------------------------------------------------- MOVER CARRUSEL ------------------------------------------------------------------ */

const carrusel__contenedor = document.querySelector(".carrusel__contenedor");
let carrusel__card = [];
carrusel__card = document.querySelectorAll(".carrusel__card");

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

const lista = document.querySelector(".buscador__lista");
const mensajeAgregado = document.querySelector(".mensaje-agregado");
const mensajeEliminado = document.querySelector(".mensaje-eliminado");

for (i=0; i<carrusel__card.length; i++) {
  carrusel__card[i].setAttribute('onclick', `seleccionar(this, ${i})`);
  carrusel__card[i].setAttribute('data-posicion', `${i}`);
}

function seleccionar(card, indice) {
  card.classList.toggle("carrusel__card-seleccionado");
  card.children[0].classList.toggle("carrusel__boton-seleccionado");
  card.children[1].classList.toggle("carrusel__pic-seleccionado");

  llenarFomulario();
  
  lista.children[indice].children[0].classList.toggle("buscador__circulo-seleccionado");

  // * Mostrar el mensaje

  if (card.classList.contains("carrusel__card-seleccionado")) {
    mensajeAgregado.style.display = "inline-block";
    mensajeAgregado.style.zIndex = "5";
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
    mensajeEliminado.style.zIndex = "5";
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

const procesos = document.querySelector(".procesos");

function llenarFomulario() {
  // * LLenar los procesos core
  
  let carrusel__card = [];
  carrusel__card = document.querySelectorAll(".carrusel__card");

  procesos.innerHTML = "";

  for (i=0; i<carrusel__card.length; i++) {
    if (carrusel__card[i].classList.contains("carrusel__card-seleccionado")) {
      let subtitulo = carrusel__card[i].children[2].innerHTML;
      let texto = carrusel__card[i].children[3].innerHTML;
      let etiquetas = carrusel__card[i].children[4];
      var etiquetasRpa = etiquetas.querySelector('.etiquetas__rpa');
      var etiquetasIa = etiquetas.querySelector('.etiquetas__ia');

      if (etiquetasRpa !== null) {
        etiquetasRpa.classList.add('etiquetas__rpa-oscuro');
      }
      if (etiquetasIa !== null) {
        etiquetasIa.classList.add('etiquetas__ia-oscuro');
      }
    
      codigoHTML = etiquetas.outerHTML;

      if (etiquetasRpa !== null) {
        etiquetasRpa.classList.remove('etiquetas__rpa-oscuro');
      }
      if (etiquetasIa !== null) {
        etiquetasIa.classList.remove('etiquetas__ia-oscuro');
      }
      
      procesos.innerHTML += `
        <div class="procesos__card">
          <div class="procesos__eliminar"><i class="fa-solid fa-xmark" onclick="eliminarProcesoCore(${carrusel__card[i].dataset.posicion})"></i></div>

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

  // * Llenar los procesos generales 
  for (i=0; i<secGeneral__item.length; i++) {
    if (secGeneral__item[i].children[0].classList.contains("secGeneral__circulo-seleccionado")) {
      let subtitulo = secGeneral__item[i].parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1].innerHTML;
      let texto = secGeneral__item[i].children[1].innerHTML;

      let etiquetas = secGeneral__item[i].children[2];
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

      if (etiquetasRpa !== null) {
        etiquetasRpa.classList.remove('etiquetas__rpa-oscuro');
      }
      if (etiquetasIa !== null) {
        etiquetasIa.classList.remove('etiquetas__ia-oscuro');
      }

      procesos.innerHTML += `
        <div class="procesos__card">
          <div class="procesos__eliminar"><i class="fa-solid fa-xmark" onclick="eliminarProcesoGeneral(${i+8});"></i></div>

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

}


function eliminarProcesoCore(indice) {
  let carrusel__card = [];
  carrusel__card = document.querySelectorAll(".carrusel__card");

  carrusel__card.forEach(elemento => {
    if (elemento.dataset.posicion == indice) {
      seleccionar(elemento, indice);
    }
  });
  
}


function eliminarProcesoGeneral(indice) {
  seleccionarGeneral(secGeneral__item[indice-8], indice);
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
  secGeneral__item[i].setAttribute('onclick', `seleccionarGeneral(this, ${i+8})`);
}

function seleccionarGeneral(item, indice) {
  item.children[0].classList.toggle("secGeneral__circulo-seleccionado");

  lista.children[indice].children[0].classList.toggle("buscador__circulo-seleccionado");

  llenarFomulario();

  // * Mostrar el mensaje

  if (item.children[0].classList.contains("secGeneral__circulo-seleccionado")) {
    mensajeAgregado.style.display = "inline-block";
    mensajeAgregado.style.zIndex = "5";
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
    mensajeEliminado.style.zIndex = "5";
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

const combo = document.querySelector(".buscador__input-cmb");
const buscador = document.querySelector(".buscador__input-pro");

function escribirCmb(elemento) {

  combo.value = elemento.innerHTML;

  let height = 0;
  let bloque = elemento.parentNode;

    if (bloque.clientHeight == "0") {
      height = bloque.scrollHeight;
    }
    
    bloque.style.height = `${height}px`;

  for (i=0; i<lista.length; i++) {
    if (lista[i].dataset.area == combo) {
      lista[i].style.display = "grid";
    } else {
      lista[i].style.display = "none";
    }
  }
}


// ?  ------------------------------------------------------ FOCUS --------------------------------------------------------------- */

buscador.addEventListener("click", ()=>{
  lista.style.display = "block";

  let cmb = combo.value;

  let encontrado = false;
  let texto = buscador.value.toUpperCase();

    for (i=0; i<lista.children.length-1; i++){
      if(lista.children[i].children[1].textContent.toUpperCase().includes(texto) && (lista.children[i].dataset.area == cmb || cmb == "")) {
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


document.addEventListener("mousedown", (event)=>{
  if(!buscador.contains(event.target) && !lista.contains(event.target)){
      lista.style.display = "none";
  }
});

// ?  ------------------------------------------------------ TECLADO --------------------------------------------------------------- */

buscador.addEventListener("keyup",(e)=>{
  let cmb = combo.value;

  let encontrado = false;
  let texto = buscador.value.toUpperCase();

    for (i=0; i<lista.children.length-1; i++){
      if(lista.children[i].children[1].textContent.toUpperCase().includes(texto) && (lista.children[i].dataset.area == cmb || cmb == "")) {
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

llenarLista();

function llenarLista() {

  //* Listar Procesos CORE
  lista.innerHTML = "";

  let indice = 0;

  for (i=0; i<carrusel__card.length; i++) {
    lista.innerHTML += `
      <div class="buscador__item" onclick="seleccionarBuscador(this, ${carrusel__card[i].dataset.posicion})" data-area="Operación">
        <div class="buscador__circulo"><i class="fa-solid fa-plus buscador__circulo-mas"></i><i class="fa-solid fa-minus buscador__circulo-menos"></i></div>
        <span>${carrusel__card[i].children[2].innerHTML}</span>

        <div class="etiquetas etiquetas-buscador">
          ${carrusel__card[i].querySelector(".etiquetas").innerHTML}
        </div>
       </div>
    `;
    indice++;
  }

  //* Listar Procesos GENERALES

  for (i=0; i<secGeneral__item.length; i++) {
    lista.innerHTML += `
      <div class="buscador__item" onclick="seleccionarBuscador(this, ${indice})" data-area="${secGeneral__item[i].parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[1].innerHTML}">
        <div class="buscador__circulo"><i class="fa-solid fa-plus buscador__circulo-mas"></i><i class="fa-solid fa-minus buscador__circulo-menos"></i></div>
        <span>${secGeneral__item[i].children[1].innerHTML}</span>

        <div class="etiquetas etiquetas-buscador">
          ${secGeneral__item[i].querySelector(".etiquetas").innerHTML}
        </div>
      </div>
    `;
    indice++;
  }

  //* No se encontro 

  lista.innerHTML += `
    <div class="buscador__item buscador__item-ultimo"><i class="fa-sharp fa-solid fa-magnifying-glass"></i>No se encontraron resultados</div>
  `;

}


// ?  ------------------------------------------------------ AGREGAR AL FORMULARIO --------------------------------------------------------------- */

function seleccionarBuscador(elemento, indice) {

  if (elemento.dataset.area == "Operación") {
    // * CORE 
    let carrusel__card = [];
    carrusel__card = document.querySelectorAll(".carrusel__card");

    carrusel__card.forEach(e => {
      if (e.dataset.posicion == indice) {
        console.log(e)
        seleccionar(e, indice);
      }
    });
  }
  
  else {
    // * GENERAL
    seleccionarGeneral(secGeneral__item[indice-8], indice); /* cambia */
  }

} 




// ! --------------------------------------------------------------------------------------------------------------------------------------------
// !                                                          SECCION PASOS A GANAR
// ! --------------------------------------------------------------------------------------------------------------------------------------------

// ?  ------------------------------------------------------ MOVER CARRUSEL --------------------------------------------------------------- */

let botones = [];
botones = document.querySelectorAll(".sliderResponsive__boton");

let pasosContenido = document.querySelector(".sliderResponsive__contenido");

function mover(padding) {

  // * BARRA

  for (i=0; i<botones.length; i++) {
    if (i == padding) {
      botones[i].classList.add("sliderResponsive__boton-activo");

      if (padding != 0) {
        botones[i-1].parentNode.classList.add("sliderResponsive__item-activo");
      }

      if (botones[i].parentNode.classList.contains("sliderResponsive__item-activo")){
        botones[i].parentNode.classList.toggle("sliderResponsive__item-activo")
      }
      
    } else {
      botones[i].classList.remove("sliderResponsive__boton-activo");
      botones[i].parentNode.classList.remove("sliderResponsive__item-activo");
    }

  }


  // * Slider 
  pasosContenido.style.marginLeft = `${padding*-100}%`

}


// ?  --------------------------------------------------- MOVER CARRUSEL RESPONSIVE ------------------------------------------------------------- */

let barra = document.querySelector(".slider__barra");

let slider__item = [];
slider__item = document.querySelectorAll(".slider__item");

let secAhorrar__contenido = document.querySelector(".secAhorrar__contenido");


function moverSlider(padding, elemento) {
  barra.style.width = `${100/4 * padding}%`;
  secAhorrar__contenido.style.marginLeft = `${padding*-100}%`;

  elemento.classList.add("slider__circulo-activo");
  elemento.nextElementSibling.classList.add("slider__triangulos-activo");

  for (i=0; i<slider__item.length; i++) {
    if (i+1 != padding) {
      slider__item[i].children[1].classList.remove("slider__circulo-activo");
      slider__item[i].children[2].classList.remove("slider__triangulos-activo");
    }

    if (i+1<padding) {
      slider__item[i].children[1].classList.add("slider__circulo-visto");
      slider__item[i].children[2].classList.add("slider__triangulos-visto");
    } else {
      slider__item[i].children[1].classList.remove("slider__circulo-visto");
      slider__item[i].children[2].classList.remove("slider__triangulos-visto");
    }
  }
}

// ?  ------------------------------------------------------ MOVER CARRUSEL QUE TE SIGA --------------------------------------------------------------- */

let circuloMovil = []
circuloMovil = document.querySelectorAll(".slider-movil__circulo");

let barraMovil = document.querySelector(".slider-movil__barra");

let textoMovil = []
textoMovil = document.querySelectorAll(".slider-movil__p");

let triangulosMovil = []
triangulosMovil = document.querySelectorAll(".slider-movil__triangulos");

let sliderMovil = document.querySelector(".slider-movil");

// Selecciona el elemento que deseas observar
const elige = document.querySelector('#separador');

// Crea una instancia de IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  // entries es un array de objetos IntersectionObserverEntry
  // cada objeto representa un cambio en la intersección de un elemento observado
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Si el elemento está intersectando con el viewport, ejecuta la función deseada
      paso1();
    }
  });
});

// Observa el elemento seleccionado
observer.observe(elige);

function paso1() {
  // Aquí puedes definir lo que quieres que suceda cuando el elemento entra en el viewport
  barraMovil.style.width = `${100/4}%`;

  for (i=0; i<circuloMovil.length; i++) {
    if (i == 0) {
      circuloMovil[i].classList.add("slider-movil__circulo-activo");
      textoMovil[i].classList.add("slider-movil__p-activo");
      triangulosMovil[i].classList.add("slider__triangulos-activo");
    } else {
      circuloMovil[i].classList.remove("slider-movil__circulo-activo");
      textoMovil[i].classList.remove("slider-movil__p-activo");
      triangulosMovil[i].classList.remove("slider__triangulos-activo");
    }

    triangulosMovil[i].classList.remove("slider__triangulos-visto");
    circuloMovil[i].classList.remove("slider__circulo-visto");
    
  }
  setTimeout(() => {
    textoMovil[0].classList.remove("slider-movil__p-activo");
  }, 1500);
}




// Selecciona el elemento que deseas observar
const identifica = document.querySelector('.secCore');

// Crea una instancia de IntersectionObserver
const observer2 = new IntersectionObserver((entries) => {
  // entries es un array de objetos IntersectionObserverEntry
  // cada objeto representa un cambio en la intersección de un elemento observado
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Si el elemento está intersectando con el viewport, ejecuta la función deseada
      paso2();
    }
  });
});

// Observa el elemento seleccionado
observer2.observe(identifica);

function paso2() {
  // Aquí puedes definir lo que quieres que suceda cuando el elemento entra en el viewport
  barraMovil.style.width = `${100/4 * 2}%`;

  for (i=0; i<circuloMovil.length; i++) {
    if (i == 1) {
      circuloMovil[i].classList.add("slider-movil__circulo-activo");
      textoMovil[i].classList.add("slider-movil__p-activo");
      triangulosMovil[i].classList.add("slider__triangulos-activo");
    } else {
      circuloMovil[i].classList.remove("slider-movil__circulo-activo");
      textoMovil[i].classList.remove("slider-movil__p-activo");
      triangulosMovil[i].classList.remove("slider__triangulos-activo");
    }

    if (i < 1) {
      triangulosMovil[i].classList.add("slider__triangulos-visto");
      circuloMovil[i].classList.add("slider__circulo-visto");
    } else {
      triangulosMovil[i].classList.remove("slider__triangulos-visto");
      circuloMovil[i].classList.remove("slider__circulo-visto");
    }
  }
  setTimeout(() => {
    textoMovil[1].classList.remove("slider-movil__p-activo");
  }, 1500);
}



// Selecciona el elemento que deseas observar
const cotiza = document.querySelector('#formulario');

// Crea una instancia de IntersectionObserver
const observer3 = new IntersectionObserver((entries) => {
  // entries es un array de objetos IntersectionObserverEntry
  // cada objeto representa un cambio en la intersección de un elemento observado
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Si el elemento está intersectando con el viewport, ejecuta la función deseada
      paso3();
    }
  });
});

// Observa el elemento seleccionado
observer3.observe(cotiza);

function paso3() {
  // Aquí puedes definir lo que quieres que suceda cuando el elemento entra en el viewport
  barraMovil.style.width = `${100/4 * 3}%`;

  for (i=0; i<circuloMovil.length; i++) {
    if (i == 2) {
      circuloMovil[i].classList.add("slider-movil__circulo-activo");
      textoMovil[i].classList.add("slider-movil__p-activo");
      triangulosMovil[i].classList.add("slider__triangulos-activo");
    } else {
      circuloMovil[i].classList.remove("slider-movil__circulo-activo");
      textoMovil[i].classList.remove("slider-movil__p-activo");
      triangulosMovil[i].classList.remove("slider__triangulos-activo");
    }

    if (i < 2) {
      triangulosMovil[i].classList.add("slider__triangulos-visto");
      circuloMovil[i].classList.add("slider__circulo-visto");
    } else {
      triangulosMovil[i].classList.remove("slider__triangulos-visto");
      circuloMovil[i].classList.remove("slider__circulo-visto");
    }
  }

  setTimeout(() => {
    textoMovil[2].classList.remove("slider-movil__p-activo");
  }, 1500);
}




// Selecciona el elemento que deseas observar
const agenda = document.querySelector('#agenda');

// Crea una instancia de IntersectionObserver
const observer4 = new IntersectionObserver((entries) => {
  // entries es un array de objetos IntersectionObserverEntry
  // cada objeto representa un cambio en la intersección de un elemento observado
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Si el elemento está intersectando con el viewport, ejecuta la función deseada
      paso4();
    }
  });
});

// Observa el elemento seleccionado
observer4.observe(agenda);

function paso4() {
  // Aquí puedes definir lo que quieres que suceda cuando el elemento entra en el viewport
  barraMovil.style.width = `${100/4 * 4}%`;

  for (i=0; i<circuloMovil.length; i++) {
    if (i == 3) {
      circuloMovil[i].classList.add("slider-movil__circulo-activo");
      textoMovil[i].classList.add("slider-movil__p-activo");
      triangulosMovil[i].classList.add("slider__triangulos-activo");
    } else {
      circuloMovil[i].classList.remove("slider-movil__circulo-activo");
      textoMovil[i].classList.remove("slider-movil__p-activo");
      triangulosMovil[i].classList.remove("slider__triangulos-activo");
    }

    if (i < 3) {
      triangulosMovil[i].classList.add("slider__triangulos-visto");
      circuloMovil[i].classList.add("slider__circulo-visto");
    } else {
      triangulosMovil[i].classList.remove("slider__triangulos-visto");
      circuloMovil[i].classList.remove("slider__circulo-visto");
    }
  }
  setTimeout(() => {
    textoMovil[3].classList.remove("slider-movil__p-activo");
  }, 1500);
}


const ahorrar = document.querySelector('.secAhorrar');

// Crea una instancia de IntersectionObserver
const observerG = new IntersectionObserver((entries) => {
  // entries es un array de objetos IntersectionObserverEntry
  // cada objeto representa un cambio en la intersección de un elemento observado
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      // Si el elemento NO está intersectando con el viewport, ejecuta la función deseada
      
      sliderMovil.style.display = "block";
    }
    if (entry.isIntersecting) {
      // Si el elemento NO está intersectando con el viewport, ejecuta la función deseada
      
      sliderMovil.style.display = "none";
    }
  });
});

// Observa el elemento seleccionado
observerG.observe(ahorrar);
