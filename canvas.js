// import {Game} from "./ahorcado";

var ahorcado = function (contex) {
	this.contexto = contex;
	this.maximo = 5;
	this.intentos = 0;
}

var hombre = new ahorcado('2d');
var can = document.getElementById('ahorcado');

var trazo = can.getContext(hombre.contexto);
trazo.fillStyle = '#FFFFFF';
trazo.fillRect(0, 0, 400, 400);

function dibujarPoste() {
	let canvas = document.getElementById("ahorcado");
	let pincel = canvas.getContext("2d");

	pincel.fillStyle = "rgb(243, 245, 252)";
	pincel.fillRect(0, 0, canvas.width, canvas.height);

	let x = canvas.width / 2;
	let y = 35;
	pincel.beginPath();
	pincel.strokeStyle = "#0080ff"; //#7dbeff
	pincel.lineWidth = 2;

	pincel.moveTo(x, y);
	pincel.lineTo(x, y - 20);
	pincel.lineTo(x - 80, y - 20);
	pincel.lineTo(x - 80, y + 250);
	pincel.moveTo(x - 110, y + 250);
	pincel.lineTo(x + 110, y + 250);

	pincel.stroke();
	pincel.closePath();

};


let palabra = new Game();
palabra.generate();
console.log("Quedan: " + palabra.remaining);
// palabra.dibujarCampo();
dibujarPoste();

ahorcado.prototype.dibujar = function () {
	can = document.getElementById('ahorcado');
	trazo = can.getContext(hombre.contexto);

	if (palabra.verifyLetter(letra.value.charAt(0)) && this.intentos <= 5) {
		if (palabra.gane()) {
			texto.innerHTML = "Ganaste :D";
			btn.value = "Reiniciar?";
			btn.className = "visibility-none";
			letra.disabled = true;
			this.intentos = 10;
			dibujarContento();
			document.getElementById("word-result").innerHTML = "FELICITACIONES, GANASTE!!!"
			swal({
				title: "Felicitaciones",
				text: `La Palabra era ${palabra.word.toUpperCase()}`,
				icon: "success",
				buttons: false,
				timer: 1500,
			})
		}
	}
	else {
		trazo.fillStyle = '#F5EBA0';
		trazo.strokeStyle = '#F5EBA0';
		if (palabra.quedan == 0) {
			reset();
			g++;
			ganadas.innerHTML = g;
		};
		dibujarCuerpo(this.intentos);

		if (this.intentos >= 5) {
			btn.value = 'Reiniciar?';
			btn.className = "visibility-none";
			texto.innerHTML = "Intentos Vencidos :(";
			letra.value = "";
			letra.disabled = true;
			letra.enable = false;
			document.getElementById("word-result").innerHTML = "Intentos Vencidos :("
			swal({
				title: "A no desanimarse!",
				text: `La Palabra era ${palabra.word.toUpperCase()}`,
				icon: "info",
				buttons: "success",
			})
		};
		if (this.intentos >= 6) {
			reset();
		}
		this.intentos++;
	}
	letra.value = '';

}; // fin de la funcion dibujar


var letra = document.getElementById('letra');
var btn = document.getElementById('btn');
var texto = document.getElementById('texto');
var form = document.getElementById("formulario");
var puestas = document.getElementById("puestas");
var ganadas = document.getElementById("ganadas");
var perdidas = document.getElementById("perdidas");


form.addEventListener('submit', function (e) {
	e.preventDefault();
	hombre.dibujar();
	letra.focus();
	if (letra.value != "") {
		return false;

	}
});

function dibujarCuerpo(intentos) {
	let canvas = document.getElementById("ahorcado");
	let pincel = canvas.getContext("2d");

	let x = canvas.width / 2;
	let y = 60;
	pincel.beginPath();
	pincel.strokeStyle = "#0080ff"; //#7dbeff
	pincel.lineWidth = 2;

	switch (intentos) {
		case 0:
			// intentos = 1 --> rostro
			pincel.arc(x, y, 25, 0, Math.PI * 2, false);
			break;
		case 1:
			// intentos = 2 --> torso
			pincel.moveTo(x, y + 25);
			pincel.lineTo(x, y + 25 + 110);
			break;
		case 2:
			// intentos = 3 --> brazo derecho
			pincel.moveTo(x, y + 25);
			pincel.lineTo(x + 30, y + 25 + 40);
			break;
		case 3:
			// intentos = 4 --> brazo izquierdo
			pincel.moveTo(x, y + 25);
			pincel.lineTo(x - 30, y + 25 + 40);
			break;
		case 4:
			// intentos = 5 --> pierna derecho
			pincel.moveTo(x, y + 25 + 110);
			pincel.lineTo(x + 30, y + 25 + 110 + 40);
			break;
		case 5:
			// intentos = 6 --> pierna izquierda
			pincel.moveTo(x, y + 25 + 110);
			pincel.lineTo(x - 30, y + 25 + 110 + 40);
			pincel.stroke();
			pincel.closePath();

			// intentos = 6 --> sonrisa triste
			pincel.beginPath();
			pincel.strokeStyle = "#0080ff"; //#7dbeff
			pincel.lineWidth = 2;
			pincel.arc(x, y + 15, 12, Math.PI, Math.PI * 2, false);
			pincel.stroke();
			pincel.closePath();

			// intentos = 6 --> ojo triste
			pincel.beginPath();
			pincel.strokeStyle = "#0080ff"; //#7dbeff
			pincel.lineWidth = 2;
			pincel.arc(x + 10, y - 5, 6, Math.PI, Math.PI * 2, false);
			pincel.stroke();
			pincel.closePath();

			// intentos = 6 --> ojo triste
			pincel.beginPath();
			pincel.strokeStyle = "#0080ff"; //#7dbeff
			pincel.lineWidth = 2;
			pincel.arc(x - 10, y - 5, 6, Math.PI, Math.PI * 2, false);
			break;
		default:
			break;
	}

	pincel.stroke();
	pincel.closePath();

	if (intentos >= 6) {
		palabra.generarPalabra();
	};

}

function reset() {
	trazo.clearRect(0, 0, 400, 400);
	btn.value = 'Boom';
	hombre.intentos = -1;
	dibujarPoste();
	palabra.generate();
	texto.innerHTML = "Elige una letra";
	letra.disabled = false;
	// puestas.innerHTML = "";
	letra.focus();
}

function dibujarContento() {
	let canvas = document.getElementById("ahorcado");
	let pincel = canvas.getContext("2d");

	pincel.clearRect(0, 0, canvas.width, canvas.height);

	let x = canvas.width / 2;
	let y = 60;
	pincel.beginPath();
	pincel.strokeStyle = "#0080ff"; //#7dbeff
	pincel.lineWidth = 2;

	// rostro
	pincel.arc(x, y, 25, 0, Math.PI * 2, false);
	pincel.stroke();
	pincel.closePath();

	// torso
	pincel.moveTo(x, y + 25);
	pincel.lineTo(x, y + 25 + 110);
	pincel.stroke();
	pincel.closePath();

	// brazo derecho
	pincel.moveTo(x, y + 25);
	pincel.lineTo(x + 60, y - 25 + 40);
	pincel.stroke();
	pincel.closePath();

	// brazo izquierdo
	pincel.moveTo(x, y + 25);
	pincel.lineTo(x - 60, y - 25 + 40);
	pincel.stroke();
	pincel.closePath();

	// pierna derecho
	pincel.moveTo(x, y + 25 + 110);
	pincel.lineTo(x + 30, y + 25 + 110 + 40);
	pincel.stroke();
	pincel.closePath();

	// pierna izquierda
	pincel.moveTo(x, y + 25 + 110);
	pincel.lineTo(x - 30, y + 25 + 110 + 40);
	pincel.stroke();
	pincel.closePath();

	// sonrisa alegre
	pincel.beginPath();
	pincel.strokeStyle = "#0080ff"; //#7dbeff
	pincel.lineWidth = 2;
	pincel.arc(x, y + 5, 12, 0, Math.PI, false);
	pincel.stroke();
	pincel.closePath();

	// ojo alegre
	pincel.beginPath();
	pincel.strokeStyle = "#0080ff"; //#7dbeff
	pincel.lineWidth = 2;
	pincel.arc(x + 10, y - 5, 6, Math.PI, Math.PI * 2, false);
	pincel.stroke();
	pincel.closePath();

	// ojo alegre
	pincel.beginPath();
	pincel.strokeStyle = "#0080ff"; //#7dbeff
	pincel.lineWidth = 2;
	pincel.arc(x - 10, y - 5, 6, Math.PI, Math.PI * 2, false);


	pincel.stroke();
	pincel.closePath();
}

window.onload = function () {
	let canvas = document.getElementById("ahorcado");
	if (canvas && canvas.getContext) {
		let ctx = canvas.getContext("2d");
		if (ctx) {
			// document.getElementById("btn").focus()
			// game();
			// pintaPalabra();
			// horca(errores);
			// canvas.addEventListener("click", selecciona, false);
		} else {
			alert("Error al cargar el contexto!");
		}
	}
}


