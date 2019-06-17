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


//Demuestra al celular donde se encuentra el servidor (IP)
app.post('/server', function (req, res){
    respuesta = {
        msg: ""
    };
    var mensaje = req.body.msg;
    console.log(mensaje);
    if (mensaje === 'Sos el servidor?'){
        respuesta = {
            msg: "Si"
        };
        console.log("Si");
        res.end(JSON.stringify(respuesta));
    }
    else {
        respuesta = {
            msg: "No te entiendo"
        };
        res.end(JSON.stringify(respuesta));
    }
})