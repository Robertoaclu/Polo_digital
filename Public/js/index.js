const host = "http://localhost:8000";

window.addEventListener("load", mostrarEventos());

// --------------------------------------------------------------------------
// Scrip para mostrar la lista de eventos

function mostrarEventos() {
  let innerHTML= "";

  fetch(`${host}/carrusel?total=4`)
    .then(function (response) {
      return response.json();
    })
    // .then(function (json) {
    //   const carruselDiv = document.getElementById("carrusel");
    //   let innerHTML = `<ul>`;

    //   for (i = 0; i < json.length; i++) {
    //     innerHTML += `<li>${json[i].nombre} -
    //     ${json[i].sala} -
    //     ${json[i].fecha_inicio} -
    //     ${json[i].fecha_final}
    //     <button class= "boton" onClick="carruselClick(${json[i].id})">Saber más</button></li>`;
    //   }
    //   innerHTML += `</ul>`;

    //   carruselDiv.innerHTML=innerHTML;

    
    .then(function (json) {
      let carruselDiv = document.getElementById("carrusel");

      for (i = 0; i < json.length; i++) {
        innerHTML +=/*html*/ `<div>
        <h2>${json[i].nombre}</h2>
        <p>Sala: ${json[i].sala}</p> 
        <p>Fecha de inicio: ${json[i].fecha_inicio}</p> 
        <p>Fecha de finalizacion: ${json[i].fecha_final}</p>

        <button class="boton" onClick="carruselClick(${json[i].id})">Saber más</button>
        </div>`;
      }
      
      carruselDiv.innerHTML = innerHTML;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// --------------------------------------------------------------------------
// Script para mostrar el evento seleccionado

function carruselClick(eventoId) {
  fetch(`${host}/eventos/${eventoId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const carruselDiv = document.getElementById("carrusel");
      const eventoHTML = `<div>
    <h2>${json.nombre}</h2>
    <p>Lugar: ${json.sala}</p>
    <p>Comienza el ${json.fecha_inicio}</p>
    <p>Finaliza el ${json.fecha_fin}</p>
    <p>Aforo ${json.aforo}</p>
    </div>
    <button onClick="mostrarEventos()">Volver</button>`;

      carruselDiv.innerHTML = eventoHTML;
    })
    .catch(function (error) {
      console.log(error);
    });
}
