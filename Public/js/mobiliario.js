const host = "http://localhost:8000";

window.addEventListener("load", mostrarMobiliario);

// Script para mostrar la lista de Mobiliario (GET)

function mostrarMobiliario() {
  let innerHTML = "";
  fetch(`${host}/mobiliario`)
    .then(function (response) {
        return response.json();
    })
    .then(function(json){
        let mobiliarioDiv = document.getElementById("mobiliario");

        for(i=0; i<json.length; i++){
            innerHTML +=`<div>
            <h2>${json[i].nombre}</h3>
            <p>Tipo: ${json[i].tipo}</p>
            <p>Referencia: ${json[i].referencia}</p>
            <p>Estado: ${json[i].estado}</p>
            <p>SalaId: ${json[i].salaId}</p>
            
            <button class="boton" onClick="mostrarForm(${json[i].id})">Editar</button>
            </div>`;
        }
        mobiliarioDiv.innerHTML = innerHTML;
    }).catch(function(error){
        console.log(error);
    });
}


// Script para mostrar el formulario de edicion del mobiliario ya existente en
// la base de datos (GET)

function mostrarForm(mobiliarioID) {
    let innerHTML = "";
    fetch(`${host}/mobiliario/${mobiliarioID}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let mobiliarioDiv = document.getElementById("editMobiliario");

            innerHTML = `<div class="form">
        <h2>Editar mobiliario</h2>
            <div class="formBox">
                <div>
                    <label>Nombre: <input type="nombre" name="nombre" id="nombre" /></label>
                </div>
                <div>
                    <label>Tipo: <input type="tipo" name="tipo" id="tipo" /></label>
                </div>
                <div>
                    <label>Referencia: <input type="referencia" name="referencia" id="referencia" /></label>
                </div>
                <div>
                    <label>Estado: <input type="estado" name="estado" id="estado" /></label>
                </div>
                <div>
                    <label>SalaId: <input type="salaId" name="salaId" id="salaId" /></label>
                </div>
            </div>
            <div>
                <button class="boton" onClick="modificarMobiliario(${mobiliarioID})">Guardar</button>
            </div>`;

            mobiliarioDiv.innerHTML = innerHTML;

            document.getElementById("nombre").value = json.nombre;
            document.getElementById("tipo").value = json.tipo;
            document.getElementById("referencia").value = json.referencia;
            document.getElementById("estado").value = json.estado;
            document.getElementById("salaId").value = json.salaId;
        }).catch(function (error) {
            console.log(error);
        });
}


// Script para editar el mobiliario seleccionado (POST)

function modificarMobiliario(mobiliarioID) {
    const nombre = document.getElementById(`nombre`).value;
    const tipo = document.getElementById(`tipo`).value;
    const referencia = document.getElementById(`referencia`).value;
    const estado = document.getElementById(`estado`).value;
    const salaId = document.getElementById(`salaId`).value;

    fetch(`${host}/mobiliario/${mobiliarioID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre, tipo: tipo, referencia: referencia, estado: estado, salaId: salaId })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            alert(json.message);
            if (json.message === `Forniture modified`) {
                window.location.href = "/html/mobiliario.html";
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}


// Script para mostrar el formulario de nuevo mobiliario (GET)

function formMobiliario() {
    let innerHTML = "";
    fetch(`${host}/mobiliario`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let mobiliarioDiv = document.getElementById("nuevoMobiliario");

            innerHTML = `<div class="form">
        <h2>Nuevo mobiliario</h2>
            <div class="formBox">
                <div>
                    <label>Nombre: <input type="nombre" name="nombre" id="nombre" /></label>
                </div>
                <div>
                    <label>Tipo: <input type="tipo" name="tipo" id="tipo" /></label>
                </div>
                <div>
                    <label>Referencia: <input type="referencia" name="referencia" id="referencia" /></label>
                </div>
                <div>
                    <label>Estado: <input type="estado" name="estado" id="estado" /></label>
                </div>
                <div>
                    <label>SalaId: <input type="salaId" name="salaId" id="salaId" /></label>
                </div>
            </div>
            <div>
                <button class="boton" onClick="nuevoMobiliario()">Guardar</button>
            </div>`;

            mobiliarioDiv.innerHTML = innerHTML;

        }).catch(function (error) {
            console.log(error);
        });
}


// Script para añadir un mobiliario nuevo (POST)

function nuevoMobiliario(){
    const nombre = document.getElementById(`nombre`).value;
    const tipo = document.getElementById(`tipo`).value;
    const referencia = document.getElementById(`referencia`).value;
    const estado = document.getElementById(`estado`).value;
    console.log(estado);
    const salaId = document.getElementById(`salaId`).value;
    if(nombre&&tipo&&referencia&&estado&&salaId){
        fetch (`${host}/mobiliario`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ nombre: nombre, tipo: tipo, referencia: referencia, estado: estado, salaId: salaId })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            alert(json.message);
            if(json.message===`Forniture added`){
                window.location.href = `/html/mobiliario.html`;
            }
        })
        .catch(function (error){
            console.log(error);
        })
    }else{
        alert(`Required information is missing`);
    }
}
