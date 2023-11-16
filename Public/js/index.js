const host = "http://localhost:8000";

window.addEventListener("load", mostrarEventos);


function mostrarEventos(){
  fetch(`${host}/carrusel?total=4`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const carruselDiv = document.getElementById("carrusel");
      let innerHTML = `<ul>`;

      for (i = 0; i < json.length; i++) {
        innerHTML += `<li>${json[i].nombre} - ${json[i].sala} - 
        ${json[i].fecha_inicio} - ${json[i].fecha_final} 
        <button onClick="carruselClick(${json[i].id})">Saber más</button></li>`;
      }
      innerHTML += `</ul>`;

      carruselDiv.innerHTML=innerHTML;
    }).catch(function (error) {
      console.log(error);
    });
}

function carruselClick(eventoId){
  fetch(`${host}/eventos/${eventoId}`)
  .then(function (response){
    return response.json();
  })
  .then (function (json){
    const carruselDiv = document.getElementById("carrusel");
    const eventoHTML = `<h1>${json.nombre}</h1>
    <h2>${json.tipo}</h2>
    
    
    <button onClick="mostrarEventos()">Volver</button>`;

    
    carruselDiv.innerHTML = eventoHTML;
  }).catch(function(error){
    console.log(error);
  });
}

