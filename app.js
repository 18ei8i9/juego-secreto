
let fase = 0;
let carta = []
const numero=[1,2,3,4,5,6,7,8,9,10,11,12];
const palo = ["ORO", "COPA","ESPADA", "BASTO"];
const guerracosa = ["GUERRA", "COSA"];
const guerra = ["ESPADA", "BASTO"];
const cosa = ["ORO", "COPA"];
const parimpar = ["PAR","IMPAR"];
const alrabaja = ["ALTA","BAJA"];
const paralta = [8,10,12];
const parbaja = [2,4,6];
const imparalta = [7,9,11];
const imparbaja = [1,3,5];
const cartas=[paralta,parbaja,imparalta,imparbaja];
let jugadores=[];
let jugadoresiniciales=[];
let turno=0;
let elecciones=[];
let ganadores=[];
let valorguia=""
let eleccion = new Audio("./audio/inicio.mp3");
let acierto = new Audio("./audio/acertado.mp3");
let ganaste = new Audio("./audio/ganaste.mp3");
let perdiste = new Audio("./audio/perdiste.mp3");

function limpiar(){
    document.getElementById('btnarriba').style.display="none"; //este boton no se usa ahora
    document.getElementById('btnabajo').style.display="none";  //este boton no se usa ahora
    document.getElementById('boton1').style.display="none";      //este boton no se usa ahora
    document.getElementById('boton2').style.display="none";      //este boton no se usa ahora
    document.getElementById('boton3').style.display="none";      //este boton no se usa ahora
    document.getElementById("nombre").style.display="none";
    document.getElementById("h3").style.display="none";
    document.getElementById("imagen").style.display="none";
}



//titulo y carga de jugadores
function condicionesIniciales() {                              //primer pantalla, es la primer funcion que se carga, luego se carga de vuelta con boton "reiniciar"
    fase=0;                                                    //indica que se esta en la etapa de carga
    jugadoresiniciales=[];                                     //aca se van cargando los participantes, se vuelve a poner en cero con boton "reiniciar"  
    limpiar();
    document.getElementById('nombre').style.display="block";   //aca se escriben los jugadores
    modBoton("boton2","AGREGAR");
}
//////////////////////////CAMBIA BOTONES///////////////////////////////////////////////////////////////
function modBoton(boton,variable){
    document.getElementById(boton).style.display='block';
    document.getElementById(boton).textContent=variable;
    document.getElementById(boton).value=variable;
    document.getElementById(boton).style.backgroundImage=`url(./img/${variable}.png)`;
    
}
//////////////////////////CAMBIA BOTONES///////////////////////////////////////////////////////////////

    



function compararValor(valor){
    if(valor=="AGREGAR"){
        perdiste.pause();
        perdiste.currentTime=0;
        ganaste.pause();
        ganaste.currentTime=0;
        let nombre = document.getElementById("nombre").value;

        
        if(nombre !==""){
            jugadoresiniciales.push(nombre);
            document.getElementById('nombre').value = '';
            modBoton("boton3","EMPEZAR");
        }
        document.getElementById("h3").style.display="block";
        document.getElementById("h3").innerHTML = " " ;
        for(i=0;i<jugadoresiniciales.length;i++){

            document.getElementById("h3").innerHTML +=  jugadoresiniciales[i] + "   " ;
        }        
    }
    else if(valor=="EMPEZAR"||valor=="JugarDeNuevo"){
        limpiar();
        eleccion.loop=true;
        eleccion.play();
        perdiste.pause();
        perdiste.currentTime=0;
        ganaste.pause();
        ganaste.currentTime=0;
        modBoton("btnarriba","GUERRA");
        modBoton("btnabajo","COSA");
        jugadores=jugadoresiniciales;
        fase=1;
        carta=elegirValores(guerracosa, guerra, cosa, parimpar,alrabaja,parbaja,paralta,imparbaja,imparalta);
        asignarTextoElemento('p',`jugador ${jugadores[turno]} elije una opcion`)
        console.log(carta);
    }
    else if(valor=="REINICIAR"){
        condicionesIniciales();

    }
    else if(valor=="CONTINUAR"){
        eleccion.loop=true;
        eleccion.play();
        acierto.pause();
        acierto.currentTime=0;
        if(fase==2){
            limpiar();
            asignarTextoElemento('p',`${jugadores[turno]} elije una opcion`);
            if(carta[0]=="GUERRA"){
                modBoton('btnarriba',"ESPADA");
                modBoton('btnabajo',"BASTO");
            }
            else{
                modBoton('btnarriba',"ORO");
                modBoton('btnabajo',"COPA");
            }
        }
        else if(fase==3){
            limpiar();
            asignarTextoElemento('p',`${jugadores[turno]} elije una opcion`);
            modBoton('btnarriba',`${carta[1]}PAR`);
            modBoton('btnabajo',`${carta[1]}IMPAR`);
            }
        else if(fase==4){
            limpiar();
            asignarTextoElemento('p',`${jugadores[turno]} elije una opcion`);
            modBoton('btnarriba',`${carta[2]}ALTA`);
            modBoton('btnabajo',`${carta[2]}BAJA`);
            }
        else if(fase==5){
            for(i=0;i<cartas.length;i++){
                if(tienenValoresIguales(cartas[i],carta)){
                    asignarTextoElemento('p',`${jugadores[turno]} elije una opcion`);
                    modBoton('boton1',`${carta[1]}${cartas[i][0]}`);
                    modBoton('boton2',`${carta[1]}${cartas[i][1]}`);
                    modBoton('boton3',`${carta[1]}${cartas[i][2]}`);
                }
            }
        }
    
    }
    else if(carta[1]+carta[4]==valor){
        ganaste.loop=true;
        ganaste.play();
        eleccion.pause();
        eleccion.currentTime=0;
        document.getElementById("h3").style.display="block";
        document.getElementById("h3").innerHTML = " " ;
        for(i=0;i<ganadores.length;i++){

            document.getElementById("h3").innerHTML +=  ganadores[i] + " | " ;
        }        
        asignarTextoElemento('p',`DALE CAMPEÓN, DALE CAMPEÓN!!!`);
        jugadores=[];
        ganadores=[];
        turno=0;
        fase=1;
        document.getElementById(`imagen`).style.display="block";
        document.getElementById(`imagen`).src=`./img/${carta[1]+carta[4]}.png`;
        //modBoton(`boton1`,carta[1]+carta[4]);
        modBoton(`boton2`,"JugarDeNuevo");
        modBoton(`boton3`,"REINICIAR");
        

    }
    else{

        if(buscaValor(carta,valor)){
            ganadores.push(jugadores[turno]);
        }

        if(turno==jugadores.length-1){
            limpiar();
            modBoton("boton3","CONTINUAR");
            if(ganadores.length!=0){
                document.getElementById("h3").style.display="block";
                document.getElementById("h3").innerHTML = " " ;
                for(i=0;i<ganadores.length;i++){
        
                    document.getElementById("h3").innerHTML +=  ganadores[i] + " | " ;
                }        
                 acierto.loop=true;
                 eleccion.pause();
                 acierto.play();
                 eleccion.currentTime=0;
                 asignarTextoElemento('p',`ADIVINARON`);
                 jugadores=ganadores;
                 turno=0;
                 ganadores=[];
                 fase++; }
            else{
                document.getElementById(`imagen`).style.display="block";
                document.getElementById(`imagen`).src=`./img/${carta[1]+carta[4]}.png`;
               // modBoton(`boton1`,carta[1]+carta[4]);
                modBoton(`boton2`,"JugarDeNuevo");
                modBoton(`boton3`,"REINICIAR");
        
                perdiste.loop=true;
                perdiste.play();
                eleccion.pause();
                eleccion.currentTime=0;
                asignarTextoElemento('p',`NO ADIVINO NADIE`);
                jugadores=[];
                ganadores=[];
                turno=0;
                fase=1;
               
            }
        }
        else{
            turno++;
            asignarTextoElemento('p',`jugador ${jugadores[turno]} elije una opcion`);

        }

    }

    
}

function modBoton(boton,variable){
    document.getElementById(`${boton}`).style.display='block';
    document.getElementById(`${boton}`).textContent=`${variable}`;
    document.getElementById(`${boton}`).value=`${variable}`;
    document.getElementById(`${boton}`).style.backgroundImage=`url(./img/${variable}.png)`;
    

}



//////////////////////////////////////ELECCION DE CARTA//////////////////////////////////////////////////
function elegirValores(guerracosa, guerra, cosa, parimpar,alrabaja,parbaja,paralta,imparbaja,imparalta) {

    const indiceAleatorio1 = Math.floor(Math.random() * guerracosa.length);
    let valorElegido1 = guerracosa[indiceAleatorio1];
    let valorElegido2
    if(valorElegido1=="GUERRA"){
        const indiceAleatorio2 = Math.floor(Math.random() * guerra.length);
        valorElegido2 = guerra[indiceAleatorio2];
    }else{
        const indiceAleatorio2 = Math.floor(Math.random() * cosa.length);
        valorElegido2 = cosa[indiceAleatorio2];
    }

    const indiceAleatorio3 = Math.floor(Math.random() * parimpar.length);
    let valorElegido3 = parimpar[indiceAleatorio3];

    
    const indiceAleatorio4 = Math.floor(Math.random() * alrabaja.length);
    let valorElegido4 = alrabaja[indiceAleatorio4];

    let valorElegido5

    if(valorElegido3=="PAR"&&valorElegido4=="BAJA"){
        const indiceAleatorio5 = Math.floor(Math.random() * parbaja.length);
        valorElegido5 = parbaja[indiceAleatorio5];
    }else if(valorElegido3=="PAR"&&valorElegido4=="ALTA"){
        const indiceAleatorio5 = Math.floor(Math.random() * paralta.length);
        valorElegido5 = paralta[indiceAleatorio5];

    }else if(valorElegido3=="IMPAR"&&valorElegido4=="ALTA"){
        const indiceAleatorio5 = Math.floor(Math.random() * imparalta.length);
        valorElegido5 = imparalta[indiceAleatorio5];

    }else{
        const indiceAleatorio5 = Math.floor(Math.random() * imparbaja.length);
        valorElegido5 = imparbaja[indiceAleatorio5];

    }



    
    return [valorElegido1, valorElegido2, valorElegido2+valorElegido3, valorElegido2+valorElegido3+valorElegido4,valorElegido5];
    
}
//////////////////////////////////////ELECCION DE CARTA//////////////////////////////////////////////////


function tienenValoresIguales(arr1, arr2) {
    return arr1.some(valor => arr2.includes(valor));
}

function buscaValor(array,valorBuscado){
    return array.includes(valorBuscado);
}
// para los mensajes del juego

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

condicionesIniciales();