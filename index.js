const Twit = require('twit');
const env = require('dotenv').config();
const fs = require('fs');
const { createCanvas, Canvas } = require('canvas');

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  // strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

setInterval(function(){
	generarImagen();
	tweetear();
}, 1000 * 20);

function tweetear()
{
	var contenido = `Numero de hoy: ${Math.floor(Math.random() * 1000)}`
	var data = {
		status: contenido
	}
	T.post('statuses/update', data, function(err, data, response) {
	  // console.log(data)
	  if(!err)
	  {
	  	console.log("Tweet enviado.");
	  }
	});	
}

function generarImagen()
{
	const canvas = createCanvas(400, 400);
	const contexto = canvas.getContext('2d');

	var colores = generarColoresAleatorios();
	contexto.fillStyle = `rgb(${colores[0]}, ${colores[1]}, ${colores[2]})`;
	contexto.fillRect(0, 0, 400, 400);

	var buf = canvas.toBuffer();
	fs.writeFileSync("imagen-colores-random.png", buf);
	console.log("¡Imagen generada!");
}

function generarColoresAleatorios()
{
	return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
}