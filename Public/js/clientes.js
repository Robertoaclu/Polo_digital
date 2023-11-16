const host = "http://localhost:8000";

window.addEventListener("load", mostrarClientes);

//Scrip para mostrar la lista de clientes

function mostrarClientes(){
    let innerHTML="";
    fetch(`${host}/clientes`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        let clientesDiv = document.getElementById("clientes");
        
        for (i=0; i<json.length; i++) {
            innerHTML += `<div>
            <h2>${json[i].razon_social}</h3>
            <p>CIF: ${json[i].cif}</p>
            <p>Sector: ${json[i].sector}</p>
            <p>Telefono: ${json[i].telefono}</p>
            <p>Numero de empleados: ${json[i].numero_empleados}</p>
            <button onClick="clienteClick(${json[i].id})">Editar</button>
            </div>`;
        }
        clientesDiv.innerHTML=innerHTML;
    }).catch(function(error){
        console.log(error);
    });
}


// Scrip para mostrar el cliente seleccionado

function editCliente(){
    fetch(`${host}/clientes`)
}