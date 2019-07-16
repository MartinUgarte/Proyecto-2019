//Crea Servidor Express.js
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Indica el puerto por el que va a estar escuchando el Servidor
var port = process.env.PORT || 3000
app.listen(port, function () {
	console.log('Corriendo en el puerto 3000')
});

//Configura el BodyParse
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())


//Variable que se va utilizar para responder al cliente
var respuesta;

//Variable de posicion
var z;
var x;
var r;


//Demuestra al celular donde se encuentra el servidor (IP)
app.post('/server', function (req, res){
    respuesta = {
        msg: ""
    };
    var mensaje = req.body.msg;
    var ip = req.body.ipEnviado;
    console.log(mensaje);
    if (mensaje === 'Sos el servidor?'){
        console.log(ip);
        respuesta = {
            msg: "Si",
            direccionIP: ip
        };
        console.log("Si");
        res.end(JSON.stringify(respuesta));
    }
})

app.post('/z', function (req, res){
    respuesta = {
        msg: ""
    };
    var direccion = req.body.direction;
    var value = req.body.value;
    console.log(direccion + ": " + value.toString());
    z = value;
    respuesta = {
        msg: "Listo",
    };
    console.log("Listo");
    res.end(JSON.stringify(respuesta));
})

app.post('/x', function (req, res){
    respuesta = {
        msg: ""
    };
    var direccion = req.body.direction;
    var value = req.body.value;
    console.log(direccion + ": " + value.toString());
    x = value;
    respuesta = {
        msg: "Listo",
    };
    console.log("Listo");
    res.end(JSON.stringify(respuesta));
})

app.post('/r', function (req, res){
    respuesta = {
        msg: ""
    };
    var direccion = req.body.direction;
    var value = req.body.value;
    console.log(direccion + ": " + value.toString());
    r = value;
    respuesta = {
        msg: "Listo",
    };
    console.log("Listo");
    res.end(JSON.stringify(respuesta));
})