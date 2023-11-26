const host = "http://localhost:8000";

window.addEventListener("load", mostrarInventario());

// --------------------------------------------------------------------------
// Script para mostrar la lista de INVENTARIO (GET)

function mostrarInventario() {
    let innerHTML = "";
    fetch(`${host}/inventario`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let inventarioDiv = document.getElementById("inventario");

            for (i = 0; i < json.length; i++) {
                innerHTML += `<div>
                <h2>${json[i].nombre}</h3>
                <p>Tipo: ${json[i].tipo}</p>
                <p>Referencia: ${json[i].referencia}</p>
                <p>Estado: ${json[i].estado}</p>
                <p>Marca: ${json[i].marca}</p>
                <p>ClienteId: ${json[i].clienteId}</p>
                
                <button class="boton" onClick="mostrarForm(${json[i].id})">Editar</button>
                </div>`;
            }
            inventarioDiv.innerHTML = innerHTML;
        }).catch(function (error) {
            console.log(error);
        });
}

// --------------------------------------------------------------------------
// Script para mostrar el formulario donde editaremos el objeto de INVENTARIO seleccionado (GET)

function mostrarForm(inventarioID) {
    let innerHTML = "";
    fetch(`${host}/inventario/${inventarioID}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let inventarioDiv = document.getElementById("editInventario");

            innerHTML = `<div class="form">
        <h2>Editar inventario</h2>
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
                    <label>Marca: <input type="marca" name="marca" id="marca" /></label>
                </div>
                <div>
                    <label>ClienteId: <input type="clienteId" name="clienteId" id="clienteId" /></label>
                </div>
            </div>
            <div>
                <button class="boton" onClick="modificarInventario(${inventarioID})">Guardar</button>
            </div>`;

            inventarioDiv.innerHTML = innerHTML;

            document.getElementById("nombre").value = json.nombre;
            document.getElementById("tipo").value = json.tipo;
            document.getElementById("referencia").value = json.referencia;
            document.getElementById("estado").value = json.estado;
            document.getElementById("marca").value = json.marca;
            document.getElementById("clienteId").value = json.clienteId;
        }).catch(function (error) {
            console.log(error);
        });
}

// --------------------------------------------------------------------------
// Script para editar el objeto del INVENTARIO sleccionado (POST)

function modificarInventario(inventarioID) {
    const nombre = document.getElementById(`nombre`).value;
    const tipo = document.getElementById(`tipo`).value;
    const referencia = document.getElementById(`referencia`).value;
    const estado = document.getElementById(`estado`).value;
    const marca = document.getElementById(`marca`).value;
    const clienteId = document.getElementById(`clienteId`).value;

    fetch(`${host}/inventario/${inventarioID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre, tipo: tipo, referencia: referencia, estado: estado, marca: marca, clienteId: clienteId })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            alert(json.message);
            if (json.message === `Inventory modified`) {
                window.location.href = "/html/inventario.html";
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

// --------------------------------------------------------------------------
// Script para mostrar el formulario de nuevo objeto de INVENTARIO GET

function formInventario() {
    let innerHTML = "";
    fetch(`${host}/inventario`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let inventarioDiv = document.getElementById("nuevoInventario");

            innerHTML = `<div class="form">
        <h2>Nuevo inventario</h2>
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
                    <label>Marca: <input type="marca" name="marca" id="marca" /></label>
                </div>
                <div>
                    <label>ClienteId: <input type="clienteId" name="clienteId" id="clienteId" /></label>
                </div>
            </div>
            <div>
                <button class="boton" onClick="nuevoInventario()">Guardar</button>
            </div>`;

            inventarioDiv.innerHTML = innerHTML;

        }).catch(function (error) {
            console.log(error);
        });
}

// --------------------------------------------------------------------------
// Script para añadir un cliente nuevo (POST)

function nuevoInventario(){
    const nombre = document.getElementById(`nombre`).value;
    const tipo = document.getElementById(`tipo`).value;
    const referencia = document.getElementById(`referencia`).value;
    const estado = document.getElementById(`estado`).value;
    const marca = document.getElementById(`marca`).value;
    const clienteId = document.getElementById(`clienteId`).value;
    if(nombre&&tipo&&referencia&&estado&&marca&&clienteId){
        fetch (`${host}/inventario`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ nombre: nombre, tipo: tipo, referencia: referencia, estado: estado, marca: marca, clienteId: clienteId })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            alert(json.message);
            if(json.message===`Inventory added`){
                window.location.href = `/html/inventario.html`;
            }
        })
        .catch(function (error){
            console.log(error);
        })
    }else{
        alert(`Required information is missing`);
    }
}