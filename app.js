let numeroSecreto = 0;
let fase = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let carta = []
const palo = ["ESPADA", "BASTO","ORO", "COPA"];
const numero=[1,2,3,4,5,6,7,8,9,10,11,12];
const guerracosa = ["GUERRA", "COSA"];
const guerra = ["ESPADA", "BASTO"];
const cosa = ["ORO", "COPA"];
const par = [2,4,6,8,10,12];
const impar = [1,3,5,7,9,11];
const bajo = [1,2,3,4,5,6];
const alto = [7,8,9,10,11,12];
let valorBoton;
let acierto;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario =
parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos}
${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    //let numeroGenerado1 =  Math.floor(Math.random()*4)+1;
    let numeroGenerado =  Math.floor(Math.random()*4)+1

    console.log(numeroGenerado);
   // console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    //if (listaNumerosSorteados.length == numeroMaximo) {
    //    asignarTextoElemento('p','Ya se sortearon todos los números
//posibles');
    //} else {
    //    //Si el numero generado está incluido en la lista
    //    if (listaNumerosSorteados.includes(numeroGenerado)) {
    /*        return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);*/
            return numeroGenerado;
/*        }
    }*/
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego de guerra o cosa');
    asignarTextoElemento('p',`Elije Guerra o Cosa`);
    //numeroSecreto = generarNumeroSecreto();
    fase = 1;
    carta=elegirValores(palo,numero)
    console.log(carta);
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    document.getElementById('espada').style.display="none";
    document.getElementById('basto').style.display="none";
    document.getElementById('oro').style.display="none";
    document.getElementById('copa').style.display="none";
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego

}

function elegirValor() {
    const indiceAleatorio = Math.floor(Math.random() * valores.length);
    const valorElegido = valores[indiceAleatorio];
    document.getElementById('resultado').textContent = `Valor elegido:
${valorElegido}`;
    console.log('Valor elegido:', valorElegido);
}

function elegirValores(array1, array2) {
    const indiceAleatorio1 = Math.floor(Math.random() * array1.length);
    const valorElegido1 = array1[indiceAleatorio1];

    const indiceAleatorio2 = Math.floor(Math.random() * array2.length);
    const valorElegido2 = array2[indiceAleatorio2];

    return [valorElegido1, valorElegido2];
}

function guardarValor(valor) {
    valorBoton = valor;
    console.log('Valor del botón:', valorBoton);
}

function tienenValoresIguales(arr1, arr2) {
    return arr1.some(valor => arr2.includes(valor));
}

function buscaValor(array,valorBuscado){
    return array.includes(valorBuscado);
}

function compararConArrayAnterior(arrayActual) {
        if (tienenValoresIguales(carta, arrayActual) & fase==1 ){
            document.getElementById('guerra').style.display="none";
            document.getElementById('cosa').style.display="none";
            document.getElementById('espada').style.display="block";
    document.getElementById('basto').style.display="block";
    document.getElementById('oro').style.display="block";
    document.getElementById('copa').style.display="block";
    fase++;
    console.log(fase);

}
}

function compararConValor (valorPalo){
    if(buscaValor(carta,valorPalo) & fase==2 ){
        document.getElementById('espada').style.display="none";
        document.getElementById('basto').style.display="none";
        document.getElementById('oro').style.display="none";
        document.getElementById('copa').style.display="none";
        console.log('Resultado de la comparación:', acierto);
        console.log('Array anterior:', carta);
        console.log('Array actual:', arrayActual);
    }
}


condicionesIniciales();
