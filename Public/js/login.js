const host = "http://localhost:8000";

function login(){
    const email = document.getElementById(`email`).value;
    const password = document.getElementById(`password`).value;

    fetch (`${host}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, password: password})
    }).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
        alert(json.message);
        if(json.message === "User loged"){
            window.location.href = "/index.html";
        }
    }).catch(function(error){
        console.log(error);
    })
}


function register(){
    const email = document.getElementById(`email`).value;
    const password = document.getElementById(`password`).value;
    
}

