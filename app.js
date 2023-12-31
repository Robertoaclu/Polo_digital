// NODE:JS + EXPRESS



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
// Funciones utiles

function handleSQLError(response, error, result, callback) {
    if (error) {
        response.status(400).send(`error: ${error.message}`);

        return;
    }
    callback(result);
}

// Termina Funciones Utiles
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// Aqui empieza la API

// Ends points para INDEX

// URL: http://localhost:8000/carrusel?total=3

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


// URL: http://localhost:8000/eventos/2

app.get(`/eventos/:idEventos`, function (request, response) {
    connection.query(`SELECT * FROM eventos WHERE id = "${request.params.idEventos}"`, 
    function (error, result, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        let idEventos = request.params.idEventos;

        if (result.length == 0) {
            response.send({});
        } else {
            response.send(result[0]);
        }
    });
});

// Termina INDEX
// --------------------------------------------------------------------------



// --------------------------------------------------------------------------
// Ends pints para login/registro

// Ejemplo URL: http://localhost:8000/login?email=robertoaclu@gmail.com&password=1234
// Login

/* app.get(`/login`, function (request, response) {
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
}); */

// Login con BODY
app.post(`/login`, function (request, response) {
    const email = request.body.email;
    const password = request.body.password;

    connection.query(`SELECT * FROM usuarios WHERE email = "${email}" and password = "${password}"`, 
    function (error, result, fields) {
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

app.post(`/registro`, function (request, response) {
    let nombre = request.body.nombre;
    let apellido = request.body.apellido;
    let email = request.body.email;
    let password = request.body.password;
    // let cliente = request.body.cliente;

    connection.query(`INSERT INTO usuarios (email,password) VALUES ("${email}", "${password}")`, 
    function (error, resultInsert, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send(resultInsert);
    });

    connection.query(`SELECT id FROM usuarios WHERE email="${email}"`, 
    function (error, resultSelect, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        const ultimoID = resultSelect[0].id;
        console.log(ultimoID);

        connection.query(`INSERT INTO empleados_clientes (nombre, apellido, usuarioId) VALUES ("${nombre}", "${apellido}", "${ultimoID}")`, 
        function (error, result, fields) {
            if (error) {
                return console.error(`error: ${error.message}`);
            }
            response.send(result);
        });
    });



    console.log(request.body);
});

//Termina login y registro
// --------------------------------------------------------------------------


// Endpoints para CLIENTES

app.get(`/clientes`, function (request, response) {
    connection.query(`SELECT * FROM clientes`, function (error, result, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send(result);
    });
    console.log("Listado de clientes en base de datos.");
});

app.post(`/clientes`, function (request, response) {
    let razon_social = request.body.razon_social;
    let cif = request.body.cif;
    let sector = request.body.sector;
    let telefono = request.body.telefono;
    let numero_empleados = request.body.numero_empleados;

    connection.query(`INSERT INTO clientes (razon_social, cif, sector, telefono, numero_empleados) 
    VALUES ("${razon_social}","${cif}", "${sector}", "${telefono}", "${numero_empleados}")`, 
    function (error, result, fields){
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send({message: `Client added`});
    });
    console.log("Insertar nuevo cliente en base de datos.");    
});

app.post(`/clientes/:id`, function (request, response) {
    let razon_social = request.body.razon_social;
    let cif = request.body.cif;
    let sector = request.body.sector;
    let telefono = request.body.telefono;
    let numero_empleados = request.body.numero_empleados;

    connection.query(`UPDATE clientes SET razon_social = "${razon_social}", cif = "${cif}", sector = "${sector}", 
    telefono = "${telefono}", numero_empleados = "${numero_empleados}" WHERE id = ${request.params.id}`,
    function (error, result, fields){
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send({message: `Client modified`});

    });
    console.log("update cliente en base de datos");
});



// Extra
app.get(`/clientes/:id`, function (request, response) {
    connection.query(`SELECT * FROM clientes where id= ${request.params.id}`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            response.send(result[0]);
        });
        
    });
    console.log("Obtiene los datos del cliente con el id en :id");
});

// Terminan los endpoints de CLIENTES
// --------------------------------------------------------------------------
// Endpoints de MOBILIARIO

app.get(`/mobiliario`, function (request, response) {
    connection.query(`SELECT * FROM mobiliario`, function (error, result, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send(result);
    });
    console.log("Listado de mobiliario en base de datos.");
});

app.post(`/mobiliario`, function (request, response) {
    let nombre = request.body.nombre;
    console.log(nombre);
    let tipo = request.body.tipo;
    let referencia = request.body.referencia;
    let estado = request.body.estado;
    console.log(estado);
    let salaId = request.body.salaId;

    connection.query(`INSERT INTO mobiliario (nombre, tipo, referencia, estado, salaId) 
    VALUES ("${nombre}","${tipo}", "${referencia}", "${estado}", "${salaId}")`, 
    function (error, result, fields){
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send({message: `Forniture added`});
    });
    console.log("Insertar nuevo mobiliario en base de datos.");    
});

app.post(`/mobiliario/:id`, function (request, response) {
    let nombre = request.body.nombre;
    let tipo = request.body.tipo;
    let referencia = request.body.referencia;
    let estado = request.body.estado;
    let salaId = request.body.salaId;

    connection.query(`UPDATE mobiliario SET nombre = "${nombre}", tipo = "${tipo}", referencia = "${referencia}", 
    estado = "${estado}", salaId = "${salaId}" WHERE id = ${request.params.id}`,
    function (error, result, fields){
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send({message: `Forniture modified`});

    });
    console.log("update mobiliario en base de datos");
});

app.get(`/mobiliario/:id`, function (request, response) {
    connection.query(`SELECT * FROM mobiliario where id= ${request.params.id}`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            response.send(result[0]);
        });
        
    });
    console.log("Obtiene los datos del mobiliario con el id en :id");
});

//Terminan los endpoints de MOBILIARIO
// --------------------------------------------------------------------------
// Endpoints de INVENTARIO

app.get(`/inventario`, function (request, response) {
    connection.query(`SELECT * FROM inventario`, function (error, result, fields) {
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send(result);
    });
    console.log("Listado de inventario en base de datos.");
});

app.post(`/inventario`, function (request, response) {
    let nombre = request.body.nombre;
    let tipo = request.body.tipo;
    let referencia = request.body.referencia;
    let estado = request.body.estado;
    let marca = request.body.marca;
    let clienteId = request.body.clienteId;

    connection.query(`INSERT INTO inventario (nombre, tipo, referencia, estado, marca, clienteId) 
    VALUES ("${nombre}","${tipo}", "${referencia}", "${estado}", "${marca}", "${clienteId}")`, 
    function (error, result, fields){
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send({message: `Inventory added`});
    });
    console.log("Insertar nuevo inventario en base de datos.");    
});

app.post(`/inventario/:id`, function (request, response) {
    let nombre = request.body.nombre;
    let tipo = request.body.tipo;
    let referencia = request.body.referencia;
    let estado = request.body.estado;
    let marca = request.body.marca;
    let clienteId = request.body.clienteId;

    connection.query(`UPDATE inventario SET nombre = "${nombre}", tipo = "${tipo}", referencia = "${referencia}", 
    estado = "${estado}", marca = "${marca}", clienteId = "${clienteId}" WHERE id = ${request.params.id}`,
    function (error, result, fields){
        if (error) {
            return console.error(`error: ${error.message}`);
        }
        response.send({message: `Inventory modified`});

    });
    console.log("update inventario en base de datos");
});

app.get(`/inventario/:id`, function (request, response) {
    connection.query(`SELECT * FROM inventario where id= ${request.params.id}`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            response.send(result[0]);
        });
        
    });
    console.log("Obtiene los datos del inventario con el id en :id");
});


// Terminan los endpoints de INVENTARIO
// --------------------------------------------------------------------------
// Especificamos el puerto por el que se comunica el punto de salida

app.listen(8000, function () {
    console.log(`Server up and running!`);
});
