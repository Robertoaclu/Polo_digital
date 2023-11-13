const host = "http://localhost:8000";

window.addEventListener("load", function (event) {
  fetch(`${host}/carrusel?total=4`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const carruselDiv = document.getElementById("carrusel");
      carruselDiv.innerHTML = `<ul>`;

      for (i = 0; i < json.length; i++) {
        carruselDiv.innerHTML += `<li>${json[i].nombre} - ${json[i].sala} - ${json[i].fecha_inicio} - ${json[i].fecha_final} <button onClick="carruselClick${json[i].id}>Saber más</button>"</li>`;
      }
      carruselDiv += `</ul>`;
    }).catch(function (error) {
      console.log(error);
    });
});

function carruselClick(eventoId){
    console.log(eventoId);
}
