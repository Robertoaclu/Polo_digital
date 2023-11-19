const host = "http://localhost:8000";

window.addEventListener("load", mostrarClientes);

//Scrip para mostrar la lista de clientes GET

function mostrarClientes() {
    let innerHTML = "";
    fetch(`${host}/clientes`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let clientesDiv = document.getElementById("clientes");

            for (i = 0; i < json.length; i++) {
                innerHTML += `<div>
            <h2>${json[i].razon_social}</h3>
            <p>CIF: ${json[i].cif}</p>
            <p>Sector: ${json[i].sector}</p>
            <p>Telefono: ${json[i].telefono}</p>
            <p>Numero de empleados: ${json[i].numero_empleados}</p>
            <button class="boton" onClick="mostrarForm(${json[i].id})">Editar</button>
            </div>`;
            }
            clientesDiv.innerHTML = innerHTML;
        }).catch(function (error) {
            console.log(error);
        });
}


// Scrip para mostrar el formulario donde editaremos GET

function mostrarForm(clienteID) {
    let innerHTML = "";
    fetch(`${host}/clientes/${clienteID}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let clientesDiv = document.getElementById("editCliente");

            innerHTML = `<div class="form">
        <h2>Editar cliente</h2>
            <div class="formBox">
                <div>
                    <label>Razon Social: <input type="razonSocial" name="razonSocial" id="razonSocial" /></label>
                </div>
                <div>
                    <label>CIF: <input type="cif" name="cif" id="cif" /></label>
                </div>
                <div>
                    <label>Sector: <input type="sector" name="sector" id="sector" /></label>
                </div>
                <div>
                    <label>Telefono: <input type="telefono" name="telefono" id="telefono" /></label>
                </div>
                <div>
                    <label>Numero de empleados: <input type="numEmpleados" name="numEmpleados" id="numEmpleados" /></label>
                </div>
            </div>
            <div>
                <button class="boton" onClick="modificarCliente(${clienteID})">Guardar</button>
            </div>`;

            clientesDiv.innerHTML = innerHTML;

            document.getElementById("razonSocial").value = json.razon_social;
            document.getElementById("cif").value = json.cif;
            document.getElementById("sector").value = json.sector;
            document.getElementById("telefono").value = json.telefono;
            document.getElementById("numEmpleados").value = json.numero_empleados;
        }).catch(function (error) {
            console.log(error);
        });
}


// Scrip para editar el cliente seleccionado POST

function modificarCliente(clienteID) {
    const razon_social = document.getElementById(`razonSocial`).value;
    const cif = document.getElementById(`cif`).value;
    const sector = document.getElementById(`sector`).value;
    const telefono = document.getElementById(`telefono`).value;
    const numero_empleados = document.getElementById(`numEmpleados`).value;

    fetch(`${host}/clientes/${clienteID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ razon_social: razon_social, cif: cif, sector: sector, telefono: telefono, numero_empleados: numero_empleados })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            alert(json.message);
            if (json.message === `Client modified`) {
                window.location.href = "/html/clientes.html";
            }
        })
        .catch(function (error) {
            console.log(error);
        })

}

// Scrip para mostrar el formulario de nuevo cliente GET

function formCliente() {
    let innerHTML = "";
    fetch(`${host}/clientes`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let clientesDiv = document.getElementById("nuevoCliente");

            innerHTML = `<div class="form">
        <h2>Nuevo cliente</h2>
            <div class="formBox">
                <div>
                    <label>Razon Social: <input type="razonSocial" name="razonSocial" id="razonSocial" /></label>
                </div>
                <div>
                    <label>CIF: <input type="cif" name="cif" id="cif" /></label>
                </div>
                <div>
                    <label>Sector: <input type="sector" name="sector" id="sector" /></label>
                </div>
                <div>
                    <label>Telefono: <input type="telefono" name="telefono" id="telefono" /></label>
                </div>
                <div>
                    <label>Numero de empleados: <input type="numEmpleados" name="numEmpleados" id="numEmpleados" /></label>
                </div>
            </div>
            <div>
                <button class="boton" onClick="nuevoCliente()">Guardar</button>
            </div>`;

            clientesDiv.innerHTML = innerHTML;

        }).catch(function (error) {
            console.log(error);
        });
}

// Scrip para añadir un cliente nuevo POST

function nuevoCliente(){
    const razon_social = document.getElementById(`razonSocial`).value;
    const cif = document.getElementById(`cif`).value;
    const sector = document.getElementById(`sector`).value;
    const telefono = document.getElementById(`telefono`).value;
    const numero_empleados = document.getElementById(`numEmpleados`).value;
    if(razon_social&&cif&&sector&&telefono&&numero_empleados){
        fetch (`${host}/clientes`, {
            method: "POST",
            headers: {"Content-Type": "applcation/jason"},
            body: JSON.stringify({ razon_social: razon_social, cif: cif, sector: sector, telefono: telefono, numero_empleados: numero_empleados })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            alert(json.message);
            if(json.message===`Client added`){
                window.location.href = `/html/clientes.html`;
            }
        })
        .catch(function (error){
            console.log(error);
        })
    }else{
        alert(`Required information is missing`);
    }
}