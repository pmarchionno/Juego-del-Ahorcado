//import Swal from 'sweetalert2';

var dicDefault = [
  { word: 'Hola', help: 'Saludo' },
  { word: 'Perro', help: 'Mejor amigo del hombre' },
  { word: 'lapiz', help: 'Instrumento de escritura o de dibujo consistente en una mina o barrita de pigmento' },
  { word: 'ahorcado', help: 'Soy tu juego favorito' },
  { word: 'programa', help: 'Conjunto de pasos lógicos escritos en un lenguaje de programación' },
  { word: 'alura', help: '¡El mejor sitio para aprender a programar!' },
  { word: 'caballo', help: 'Mamífero que relincha' },
  { word: 'manzana', help: 'Fruta deliciosa baja en azúcares' },
  { word: 'olvidar', help: 'No recordar algo' },
];

let dicUser = [];
let dictionary = dicDefault.concat(dicUser);
let dicFailedLetters = {};
let lettersUser = {};

class Game {
  constructor() {
    this.word = "";
    this.help = "";
    this.remaining = 99999999;
  }

  generate() {
    let lenDic = dictionary.length;
    let rnd = Math.floor((Math.random() * lenDic));
    this.word = dictionary[rnd]['word'];
    this.help = dictionary[rnd]['help'];
    this.remaining = this.word.length;
    trazo.lineWidth = 6;

    let wordAhorcado = document.getElementsByName("word-ahorcado")[0];

    wordAhorcado.innerHTML = this.word.replace(/\w/g, "_");
    console.log('Word Selected:', this.word)
    return rnd;
  }

  verifyLetter(letter) {
    let reg = "^[a-zA-Z\\s]+$";
    let regExp = new RegExp(reg);

    let word = this.word.toLowerCase();
    let myLetter = letter.toLowerCase();
    let newWord = "";

    let wordAhorcado = document.getElementsByName("word-ahorcado")[0];
    let wordAhorcadoFail = document.getElementsByName("word-ahorcado-fail")[0];

    let actualWord = wordAhorcado.innerHTML;

    if (regExp.test(letter)) {
      if (this.remaining <= 0) {
        console.log("YOU WIN :')")
      }
      else {
        var remainingLetter = word;
        var isLetterCorrect = false;
        for (let i = 0; i < word.length; i++) {
          if (word.charAt(i) == letter.toLowerCase()) {
            newWord += word.charAt(i)
            if (!lettersUser[letter]) this.remaining--;
            isLetterCorrect = true;
          } else {
            newWord += actualWord.charAt(i);
          }
        };

        if (this.remaining == 0) {
          console.log("YOU WIN :')")
        };

        if (!isLetterCorrect) {
          if (dicFailedLetters[letter.toUpperCase()]) {
            dicFailedLetters[letter.toUpperCase()]++;
          } else {
            dicFailedLetters[letter.toUpperCase()] = 1
          }
        }

        if (lettersUser[letter]) {
          lettersUser[letter]++;
        } else {
          lettersUser[letter] = 1
        }

        wordAhorcado.innerHTML = newWord.toUpperCase();

        if (Object.keys(dicFailedLetters)) wordAhorcadoFail.innerHTML = Object.keys(dicFailedLetters).join(' ');
        console.log('Remaining:' + this.remaining, dicFailedLetters)

        return isLetterCorrect;
      }
    }

    return true;
  }

  gane() {
    if (this.remaining <= 0) {
      return true;
    }
    else {
      return false;
    }
  }

  generarPalabra() {
    var ancho = 350;
    var anchoCanvas = 400;
    var espacio = ((ancho * 0.20) / (this.word.length - 1));
    var anchoLinea = (ancho * 0.80) / this.word.length;
    var inicioX = (anchoCanvas - ancho) / 2;
    var indiceLetra = [];

    for (var i = 0; i < (this.word.length); i++) {
      trazo.beginPath();
      trazo.lineWidth = 6;
      trazo.moveTo(inicioX, 380);
      puntoInicio = inicioX + ((anchoLinea - 30) / 2); // Para centrar la letra en la linea
      inicioX = inicioX + anchoLinea
      trazo.lineTo(inicioX, 380);
      trazo.font = "bold 30px sans-serif";
      trazo.fillStyle = "#E9070D";
      trazo.fillText(this.word.charAt(i).toUpperCase(), puntoInicio, 375);
      inicioX += espacio;
      trazo.strokeStyle = "#E9070D";
      trazo.stroke();
      trazo.closePath();
    };

  }
}

var letra = document.getElementById('letra');
if (letra) {
  letra.onkeyup = (e) => {
    const reg = "^[a-zA-Z\\s]+$";
    let regExp = new RegExp(reg);
    if (regExp.test(e.target.value)) {
      // console.log('OK')
    }
    else {
      letra.value = ''
    }
  }
}

function addNewWord() {
  let inputNewWord = document.getElementById("input-new-word").value;
  let reg = "^[a-zA-Z\\s]+$";
  let regExp = new RegExp(reg);

  if (inputNewWord.length > 0 && regExp.test(inputNewWord)) {
    if (Object.keys(dictionary).indexOf(inputNewWord) >= 0) {

    } else {
      dicUser.push({ word: inputNewWord, help: '' })
      dictionary = dicDefault.concat(dicUser);
    }
      swal({
        text:"Palabra Agregada Correctamente",
        icon: "success",
        buttons:false,
        timer: 1500,
    })
  }

  document.getElementById("input-new-word").value = ""
  document.getElementById("input-new-word").focus()
}

var addWord = document.getElementById("add-word")
if (addWord) addWord.addEventListener("click", addNewWord)
