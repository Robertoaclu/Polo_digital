const host = "http://localhost:8000";

function login() {
  const email = document.getElementById(`email`).value;
  const password = document.getElementById(`password`).value;

  fetch(`${host}/login-register`, {
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({ email: email, password: password })
})
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      alert(json.message);
      if (json.message === "User loged") {
        window.location.href = "/index.html";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function register() {
  const email = document.getElementById(`email`).value;
  const password = document.getElementById(`password`).value;
  const nombre = document.getElementById(`nombre`).value;
  const apellido = document.getElementById(`apellido`).value;
  const dni = document.getElementById(`dni`).value;
  const cliente = document.getElementById(`cliente`).value;
  const telefono = document.getElementById(`telefomo`).value;
  const reppassword = document.getElementById(`reppassword`).value;

  if (password==reppassword){
    fetch(`${host}/login-register`, {
        method:"POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({email: email, password:password, nombre: nombre, apellido: apellido, dni: dni, cliente: cliente, telefono: telefono})
      })
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        alert(json.message);
        if(json.message === `User Registered`){
            window.location.href = "/index.html";
        }
      })
      .catch(function (error){
        console.log(error);
      })

  }else{
        alert(`Password doesn't match`);
        window.location.href = "/index.html";
    }
}


  

