//-Configuracion--------------------------------------------------------------------------------------------------------
// Crea Servidor Express.js
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Indica el puerto por el que va a estar escuchando el Servidor
var port = process.env.PORT || 3000
app.listen(port, function () {
	console.log('Corriendo en el puerto 3000')
});

// Configura el BodyParse
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

// Configura Firebase
var admin = require("firebase-admin");
var serviceAccount = require("./MycroTechAdminSDK.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mycrotech-2019.firebaseio.com"
});
// Configura Cloud Firestore de Firebase
var db = admin.firestore();

//Configura Nodemailer (para enviar emails)
var nodemailer = require("nodemailer");

// Variable que se va utilizar para responder al cliente
var respuesta;

//-Simulación de brazo--------------------------------------------------------------------------------------------------------
// Demuestra al celular donde se encuentra el servidor (IP)
app.post('/server', function (req, res){
    respuesta = {
        msg: ""
    };
    var mensaje = req.body.msg;
    var ip = req.body.ipEnviado;
    console.log(mensaje);
    if (mensaje === 'Sos el servidor?'){
        //console.log(ip);
        respuesta = {
            msg: "Si",
            direccionIP: ip
        };
        //console.log("Si");
        res.end(JSON.stringify(respuesta));
    }
})

app.post('/move', function (req, res){
    respuesta = {
        msg: ""
    };
    var direccion = req.body.direction;
    var value = req.body.value;
    console.log(direccion + ": " + value.toString());
    respuesta = {
        msg: "Listo",
    };
    console.log("Listo");
    res.end(JSON.stringify(respuesta));
})

//-Cliente - Servidor - Base de Datos-----------------------------------------------------------------------------------
// Registro
app.post('/register', function (req, res) {
	let repetido = false;
	// Recibe la info
	let nombreR = req.body.username;
	let emailR = req.body.email;
	let contraR = req.body.password;
	// Crea un documento en la collección Usuarios
	var usuario = db.collection("Usuarios").doc(nombreR);
	usuario.get()
		// Verifica si el documento ya existe; si es así, envía error
		.then(doc => {
			if (doc.exists) {
				reply = {
					msg: 'Error'
				};
				res.end(JSON.stringify(reply));
			} else {
				// Verifica si el email ya fue usado
				db.collection("Usuarios").where('Email', '==', emailR).get()
					.then(snapshot => {
						snapshot.forEach(doc => {
							repetido = true;
							reply = {
								msg: 'Error, mail'
							};
							res.end(JSON.stringify(reply));
						});
						// Si el email nunca fue usado, se crea un nuevo usuario en la Base de Datos
						if (repetido === false) {
							usuario.set({
								Nombre_de_Usuario: nombreR,
								Email: emailR,
								Contraseña: contraR,
								Verificado: false
                            })
                                // Luego, envia un mail al usuario
								.then(function (docRef) {
									var transporter = nodemailer.createTransport(({
										service: 'gmail',
										auth: {
											type: 'OAuth2',
											user: 'mycrotech2019@gmail.com',
											password: 'MycroTechProyecto',
											clientId: '610628515023-rmhl07nacbrguu44v6tbcmksoatdi4lf.apps.googleusercontent.com',
											clientSecret: 'NJRUfYXTNoRXZEoDDYm9kf0R',
											refreshToken: '1/s6tlQw3Pui36G9Ioyg-uOc5kGHKOisjMtADK4HoVq_ErwSRFC1TaVSU2OmqfyLx2',
											accessToken: 'ya29.Glt1Bz0T3kJYIWPMrjwE2NZ4mRiMt_qozuVQHa828etEQCZVaV1ZllnescavrIVb9P5W_-HnkKs_a_ZlGqN2gC5RYVBYpOmPshG9ydRrK5kyubVwUgITIb0RyieE'
										}
									}));

									var mailOptions = {
										from: 'El equipo MycroTech <mycrotech2019@gmail.com>',
										to: emailR,
										subject: 'Registro Exitoso',
										text: 'Buenos Dias,\r\nGracias por registrarse a MycroTech. A partir de ahora usted podrá tener la mejor experiencia con nuestros brazos robóticos.\r\nEl equipo de MycroTech.'
									}

									transporter.sendMail(mailOptions, function (err, res) {
										if (err) {
											console.log('Error: ' + err);
										} else {
											console.log('Email sent');
										}
                                    })
                                    
									reply = {
										msg: 'Listo'
									};
									res.end(JSON.stringify(reply));
                                })
                                
								.catch(function (error) {
									console.error("Error adding document: ", error);
								})
						}
					})
			}
		})
});


// Inicio de Sesión
app.post('/login', function (req, res) {
	// Recibe la info
	let nombreL = req.body.username;
	let contraL = req.body.password;
	var usuario = db.collection("Usuarios").doc(nombreL);
	usuario.get()
		.then(doc => {
			// Verifica si el usuario existe
			if (doc.exists) {
				// Verifica si la contraseña es correcta
				if (doc.data().Contraseña === contraL) {
					reply = {
						msg: 'Listo'
					};
					res.end(JSON.stringify(reply));
				} else {
					reply = {
						msg: 'Error, contra'
					};
					res.end(JSON.stringify(reply));
				}
			} else {
				reply = {
					msg: 'Error, usuario'
				};
				res.end(JSON.stringify(reply));
			}
		})
});
