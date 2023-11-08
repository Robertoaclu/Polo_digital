const express = require ("express");
const app = express ();
const mysql = require("mysql2");

app.use (express.static (`public`));

// --------------------------------------------------------------------------
// Crear conexion con MySQL

const connection = mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "Elitista1990",
    database: "polo_digital",
});


// --------------------------------------------------------------------------
// Conectar con MySQL

connection.connect(function (error) {
    if (error) {
        return console.error(`error: ${error.message}`);
    }
    console.log("Conectando a MySQL!!!");
});


// --------------------------------------------------------------------------
// Aqui empieza la API


// Carrusel

app.get (`/carrusel`, function(request, response){
    connection.query("select * from eventos", function (error, result, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        let eventos=[ ];
        let total = 3;

        for (let i = 0; i<total; i++){
            eventos[i] = result[i];
        }
        response.send(eventos);        
    });
    
});


// Login

app.get (`/login`, function(request, response){
    const email = request.query.email;
    const password = request.query.password;

    connection.query(`select * from usuarios where email = "${request.query.email}" and password = "${request.query.password}"`, function (error, result, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        
        if (result.length == 0){
            response.send({message: "Email o password no validos"});
        }else {
            response.send({message: "Ususario logueado"});
        }
                
    });
    
});



// --------------------------------------------------------------------------
// Especificamos el puerto por el que se comunica el punto de salida

app.listen(8000, function(){
    console.log(`Server up and running!`);
});
