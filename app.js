const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.static(`public`));
app.use(express.json());

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

// Ends points para INDEX
// Carrusel

app.get(`/carrusel`, function (request, response) {
    connection.query("SELECT * FROM eventos", function (error, result, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        let eventos = [];
        let total = request.query.total;

        for (let i = 0; i < total; i++) {
            eventos[i] = result[i];
        }
        response.send(eventos);
    });

});


app.get (`/eventos/:idEventos`, function(request, response) {
    connection.query(`SELECT * FROM eventos WHERE id = "${request.params.idEventos}"`, function(error, result, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        let idEventos = request.params.idEventos;
        
        if (result.length==0){
            response.send ({});
        }else{
            response.send(result[0]);
        }
        

    });
    
    
});
// Termina INDEX -------------------------------------------------------------



// Ends pints para login/registro
// Ejemplo URL: http://localhost:8000/login?email=robertoaclu@gmail.com&password=1234
// Login

app.get(`/login`, function (request, response) {
    const email = request.query.email;
    const password = request.query.password;

    connection.query(`SELECT * FROM usuarios WHERE email = "${request.query.email}" and password = "${request.query.password}"`, function (error, result, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }

        if (result.length == 0) {
            response.send({ message: "Email o password no validos" });
        } else {
            response.send({ message: "Ususario logueado" });
        }

    });

});

app.post(`/registro`, function(request, response){
    let nombre= request.body.nombre;
    let apellido= request.body.apellido;
    let email= request.body.email;

    console.log(request.body);

    // insert into empleados_clientes
    // insert into usuarios

    response.send({message: `registro`});
});
//Termina login y registro --------------------------------------------------



// --------------------------------------------------------------------------
// Especificamos el puerto por el que se comunica el punto de salida

app.listen(8000, function () {
    console.log(`Server up and running!`);
});
