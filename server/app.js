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
								Tema_Negro: false,
								Codigo_de_Seguridad: null,
								Verificado: false
							})
							usuario.collection("Presets").doc("Preset 1").set({
								EjeX: 0,
								EjeZ: 0,
								EjeR: 0,
							})
							usuario.collection("Presets").doc("Preset 2").set({
								EjeX: 0,
								EjeZ: 0,
								EjeR: 0,
							})
							usuario.collection("Presets").doc("Preset 3").set({
								EjeX: 0,
								EjeZ: 0,
								EjeR: 0,
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
	let bandaL = [];
	let cancionL = [];
	let presetXL = [];
	let presetZL = [];
	let presetRL = [];
	let temaNegro;
	var usuario = db.collection("Usuarios").doc(nombreL);
	usuario.get()
		.then(doc => {
			// Verifica si el usuario existe
			if (doc.exists) {
				// Verifica si la contraseña es correcta
				if (doc.data().Contraseña === contraL) {
					temaNegro = doc.data().Tema_Negro;
					usuario.collection("Bandas").get().then(sub => {
						if (sub.docs.length > 0) {
							usuario.collection("Bandas").get().then(function (querySnapshot) {
								querySnapshot.forEach(function (doc) {
									bandaL.push(doc.id);
								})
							})
							.then(function(){
								let cantBandas = bandaL.length;
								let indexBanda = 0;
								let indexPreset = 0;
								for(i = 0; i < bandaL.length; i++){
									let bandaActual = bandaL[i];
									usuario.collection("Bandas").doc(bandaActual).collection("Canciones").get().then(function (querySnapshot) {
										querySnapshot.forEach(function (doc) {
											if (doc.data().Nombre_de_la_Cancion != "Plantilla"){
												cancionL.push(bandaActual + "." + doc.data().Nombre_de_la_Cancion);
											}
										})
									}).then(function(){
										indexBanda++;
										if (indexBanda === cantBandas){
											usuario.collection("Presets").get().then(function (querySnapshot) {
												querySnapshot.forEach(function (doc) {
													presetXL.push(doc.data().EjeX);
													presetZL.push(doc.data().EjeZ);
													presetRL.push(doc.data().EjeR);
												})
											}).then(function(){
												reply = {
													msg: 'Listo',
													bandasList: bandaL,
													cancionesList: cancionL,
													presetXList: presetXL,
													presetZList: presetZL,
													presetRList: presetRL,
												};
												res.end(JSON.stringify(reply));
											})
										}
									})	
								}
							})
						}
						else {
							usuario.collection("Presets").get().then(function (querySnapshot) {
								querySnapshot.forEach(function (doc) {
									presetXL.push(doc.data().EjeX);
									presetZL.push(doc.data().EjeZ);
									presetRL.push(doc.data().EjeR);
								})
							}).then(function(){
								reply = {
									msg: 'Listo',
									bandasList: bandaL,
									cancionesList: cancionL,
									presetXList: presetXL,
									presetZList: presetZL,
									presetRList: presetRL,
									temaNegro: temaNegro,
								};
								res.end(JSON.stringify(reply));
							})
						}
					})
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


// Cambio de Contraseña (Request)
app.post('/newPasswordRequest', function(req, res){
	let userData = req.body.userData;
	let cantUsuarios;
	let userEmail;
	db.collection('Usuarios').get().then(snap => {
		cantUsuarios = snap.size; 									// Will return the collection size
	});
	db.collection("Usuarios").get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			if (userData === doc.id){
				usuarioEncontrado = true;
				securityCode = Math.floor(100000 + Math.random() * 900000);
				userEmail = doc.data().Email;
				db.collection("Usuarios").doc(doc).update({
					Codigo_de_Seguridad: securityCode
				})
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
							to: userEmail,
							subject: 'Cambio de Contraseña solcitado',
							text: 'Buenos Dias,\r\nUsted ha solicitado un cambio en su contraseña. Para ello, se le va a solicitar un codigo de seguridad.\r\nSu codigo de seguridad es: ' + securityCode + '\r\nEl equipo de MycroTech.'
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
			}
			else if (userData === doc.data().Email){
				usuarioEncontrado = true;
				securityCode = Math.floor(100000 + Math.random() * 900000);
				db.collection("Usuarios").doc(doc).update({
					Codigo_de_Seguridad: securityCode
				})
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
							to: userData,
							subject: 'Cambio de Contraseña solcitado',
							text: 'Buenos Dias,\r\nUsted ha solicitado un cambio en su contraseña. Para ello, se le va a solicitar un codigo de seguridad.\r\nSu codigo de seguridad es: ' + securityCode + '\r\nEl equipo de MycroTech.'
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
			}
			else{
				cantUsuarios--;
			}
			if (cantUsuarios === 0){
				reply = {
					msg: 'Error, usuario'
				};
				res.end(JSON.stringify(reply));
			}
		})
	})
})


// Cambio de Contraseña
app.post('/newPassword', function(req, res){
	let nombreN = req.body.username;
	let passwordN = req.body.password;
	let codeN = req.body.securityCode;
	usuario = db.collection("Usuarios").doc(nombreN);
	usuario.get()
		.then(doc => {
			// Verifica si el usuario existe
			if (doc.exists) {
				if (doc.data().Codigo_de_Seguridad === codeN){
					usuario.update({
						Codigo_de_Seguridad: null,
						Contraseña: passwordN
					})
						.then(function(){
							reply = {
								msg: 'Listo'
							}
							res.end(JSON.stringify(reply));
						})
				}
				else if (doc.data().Codigo_de_Seguridad === null){
					reply = {
						msg: 'Error, no solicitado'
					}
					res.end(JSON.stringify(reply));
				}
				else{
					reply = {
						msg: 'Error, codigo'
					}
					res.end(JSON.stringify(reply));
				}
			}
			else {
				reply = {
					msg: 'Error, usuario'
				}
				res.end(JSON.stringify(reply));
			}
		})
})


// Agregar Bandas
app.post('/newBand', function(req, res){
	//Recibe la info
	let nombreB = req.body.username;
	let bandaB = req.body.band;
	var usuario = db.collection("Usuarios").doc(nombreB);
	usuario.get()
		.then(doc => {
			// Verifica si el usuario existe
			if (doc.exists) {
				var banda = usuario.collection("Bandas").doc(bandaB);
				banda.get()
					.then(doc => {
						// Verifica si la banda existe
						if (doc.exists){
							reply = {
								msg: 'Banda ya existente'
							}
							res.end(JSON.stringify(reply));
						}
						else{
							// Agrega la banda
							usuario.collection("Bandas").doc(bandaB).set({
								Nombre_de_Banda: bandaB,
							})
							.then(function(){
								banda.collection("Canciones").doc("Plantilla").set({
									Nombre_de_la_Cancion: "Plantilla",
								})
							})
							.then(function(){
								reply = {
									msg: 'Listo'
								};
								res.end(JSON.stringify(reply));
							})
						}
					}) 
			} else {
				reply = {
					msg: 'Error, usuario'
				};
				res.end(JSON.stringify(reply));
			}
		})
})

// Agregar Canciones
app.post('/newSong', function(req, res){
	//Recibe la info
	let nombreS = req.body.username;
	let bandaS = req.body.band;
	let cancionS = req.body.song;
	var usuario = db.collection("Usuarios").doc(nombreS);
	usuario.get()
		.then(doc => {
			// Verifica si el usuario existe
			if (doc.exists) {
				var cancion = usuario.collection("Bandas").doc(bandaS).collection("Canciones").doc(cancionS);
				cancion.get()
					.then(doc => {
						// Verifica si la cancion existe
						if (doc.exists){
							reply = {
								msg: 'Cancion ya existente'
							}
							res.end(JSON.stringify(reply));
						}
						else{
							// Agrega la nueva canción
							cancion.set({
								Nombre_de_la_Cancion: cancionS,
							})
								.then(function(){
									reply = {
										msg: 'Listo'
									};
									res.end(JSON.stringify(reply));
								})
						}
					}) 
			} else {
				reply = {
					msg: 'Error, usuario'
				};
				res.end(JSON.stringify(reply));
			}
		})
})


// Modificar Preset
app.post('/saveNewPreset', function(req, res){
	//Recibe la info
	let nombreP = req.body.username;
	let nroPreset = req.body.nroPreset;
	let valueX = req.body.valueX;
	let valueZ = req.body.valueZ;
	let valueR = req.body.valueR;
	let presetDoc;
	var usuario = db.collection("Usuarios").doc(nombreP);
	switch (nroPreset){
		case 0:
			presetDoc = usuario.collection("Presets").doc("Preset 1");
			break;
		case 1:
			presetDoc = usuario.collection("Presets").doc("Preset 2");
			break;
		case 2:
			presetDoc = usuario.collection("Presets").doc("Preset 3")
			break;
		default:
			reply = {
				msg: 'Error, funcionamiento'
			}
			res.end(JSON.stringify(reply));
			break;
	}
	usuario.get()
		.then(doc => {
			// Verifica si el usuario existe
			if (doc.exists) {
				presetDoc.set({
					EjeX: valueX,
					EjeZ: valueZ,
					EjeR: valueR,
				})
					.then(function(){
						reply = {
							msg: 'Listo'
						}
						res.end(JSON.stringify(reply));
					}) 
			} else {
				reply = {
					msg: 'Error, usuario'
				};
				res.end(JSON.stringify(reply));
			}
		})
})


//Change color theme
app.post('/tema', function(req, res){
	//Recibe la info
	let nombreT = req.body.username;
	let temaNegro = req.body.temaNegro;
	var usuario = db.collection("Usuarios").doc(nombreT);
	usuario.get()
		.then(doc => {
			// Verifica si el usuario existe
			if (doc.exists) {
				usuario.update({
					Tema_Negro: temaNegro
				})
				.then(function(){
					reply = {
						msg: 'Listo'
					};
					res.end(JSON.stringify(reply));
				}) 
			} else {
				reply = {
					msg: 'Error, usuario'
				};
				res.end(JSON.stringify(reply));
			}
		})
})