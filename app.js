
let fase = 0;
let carta = []
const numero=[1,2,3,4,5,6,7,8,9,10,11,12];
const palo = ["ORO", "COPA","ESPADA", "BASTO"];
const guerracosa = ["GUERRA", "COSA"];
const guerra = ["ESPADA", "BASTO"];
const cosa = ["ORO", "COPA"];
const par = [2,4,6,8,10,12];
const impar = [1,3,5,7,9,11];
const baja = [1,2,3,4,5,6];
const alta = [7,8,9,10,11,12];
let valorBoton;
let acierto;
let jugadores=[];
let turno;
let elecciones=[];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function condicionesIniciales() {
    asignarTextoElemento('h1','GUERRA O COSA');
    asignarTextoElemento('p',`INGRESE JUGADORES`);
    fase = 1;
    carta=elegirValores(palo,numero)
    console.log(carta);
    document.getElementById('nombre').style.display="block";
    document.getElementById('agregar').style.display="block";
    document.getElementById('terminar').style.display="block";
    document.getElementById('guerra').style.display="none";
    document.getElementById('cosa').style.display="none";
    document.getElementById('espada').style.display="none";
    document.getElementById('basto').style.display="none";
    document.getElementById('oro').style.display="none";
    document.getElementById('copa').style.display="none";
    document.getElementById('par').style.display="none";
    document.getElementById('impar').style.display="none";
    document.getElementById('alta').style.display="none";
    document.getElementById('baja').style.display="none";
    document.getElementById('1').style.display="none";
    document.getElementById('2').style.display="none";
    document.getElementById('3').style.display="none";
    document.getElementById('4').style.display="none";
    document.getElementById('5').style.display="none";
    document.getElementById('6').style.display="none";
    document.getElementById('7').style.display="none";
    document.getElementById('8').style.display="none";
    document.getElementById('9').style.display="none";
    document.getElementById('10').style.display="none";
    document.getElementById('11').style.display="none";
    document.getElementById('12').style.display="none";
    
}

function agregaJugador(){
    let nombre = document.getElementById("nombre").value;
    if(nombre !==""){
        jugadores.push(nombre);
        document.getElementById('nombre').value = '';
        console.log(jugadores);
    }
}
function terminaCarga(){
    document.getElementById('nombre').style.display="none";
    document.getElementById('agregar').style.display="none";
    document.getElementById('terminar').style.display="none";
    document.getElementById('guerra').style.display="block";
    document.getElementById('cosa').style.display="block";
    asignarTextoElemento('p',`ELIGE GUERRA O COSA`);
    console.log(jugadores);
    turno = 0;

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

function tienenValoresIguales(arr1, arr2) {
    return arr1.some(valor => arr2.includes(valor));
}

function buscaValor(array,valorBuscado){
    return array.includes(valorBuscado);
}

function compararConArrayAnterior(arrayActual) {
    if(turno<jugadores.length){
        elecciones[turno] = tienenValoresIguales(carta, arrayActual);
        turno++;
        console.log(elecciones);
        console.log(turno);}
    else if (tienenValoresIguales(carta, arrayActual) & fase==1 ){
        document.getElementById('guerra').style.display="none";
        document.getElementById('cosa').style.display="none";
        if(tienenValoresIguales(guerra, arrayActual)){
            asignarTextoElemento('p',`ELIGE ESPADA O BASTO`);
        document.getElementById('espada').style.display="block";
        document.getElementById('basto').style.display="block";}
        else if(tienenValoresIguales(cosa, arrayActual)){
            asignarTextoElemento('p',`ELIGE ORO O COPAS`);
        document.getElementById('oro').style.display="block";
        document.getElementById('copa').style.display="block";}
        fase++;
        console.log(fase);

    }else if(tienenValoresIguales(carta, arrayActual) & fase==3 ){
        asignarTextoElemento('p',`ES UNA CARTA BAJA (1 AL 6) O ALTA (7 AL 12)?`);
        document.getElementById('alta').style.display="block";
        document.getElementById('baja').style.display="block";
        document.getElementById('par').style.display="none";
        document.getElementById('impar').style.display="none";
        console.log('Array anterior:', carta);
        fase++;
        console.log(fase);

    }else if(tienenValoresIguales(carta, arrayActual) & fase==4 ){
        asignarTextoElemento('p',`DALE CRACK ARRIESGA QUE YA ES TUYO!!!`);
        document.getElementById('alta').style.display="none";
        document.getElementById('baja').style.display="none";
        console.log('Array anterior:', carta);
        fase++;
        console.log(fase);
        if(tienenValoresIguales(carta, par) & tienenValoresIguales(carta, baja)){
            document.getElementById('2').style.display="block";
            document.getElementById('4').style.display="block";
            document.getElementById('6').style.display="block";
            
            
        }else if(tienenValoresIguales(carta, par) & tienenValoresIguales(carta, alta)){
            document.getElementById('8').style.display="block";
            document.getElementById('10').style.display="block";
            document.getElementById('12').style.display="block";

        }else if(tienenValoresIguales(carta, impar) & tienenValoresIguales(carta, baja)){
            document.getElementById('1').style.display="block";
            document.getElementById('3').style.display="block";
            document.getElementById('5').style.display="block";


        }else{
            document.getElementById('7').style.display="block";
            document.getElementById('9').style.display="block";
            document.getElementById('11').style.display="block";

        }

    }else{
        alert("PERDISTE");
        condicionesIniciales();
        
    }
}

function compararConValor (valorPalo){
    if(buscaValor(carta,valorPalo) & fase==2){
        asignarTextoElemento('p',`ES PAR O IMPAR`);
        document.getElementById('espada').style.display="none";
        document.getElementById('basto').style.display="none";
        document.getElementById('copa').style.display="none";
        document.getElementById('oro').style.display="none";
        document.getElementById('par').style.display="block";
        document.getElementById('impar').style.display="block";
        console.log('Array anterior:', carta);
        fase++;
        console.log(fase);
        }
    else if(buscaValor(carta,parseInt(valorPalo)) & fase==5 ){
        console.log("ganaste");
        alert("VAAAAAAAAMOOOOOOO CAPOOOOOOO");
    }else{
        alert("PERDSTE GATO");
        condicionesIniciales();
    }
}


condicionesIniciales();
