// Inicializacion de variables//
let turnCards= 0;  
let cardOne= null;
let cardTwo= null;
let firstResult= null;
let secondResult= null;
let movementsCount= 0;
let hitsCount= 0;
let timer = false;
let timerRegresive= 45;
let timerInitial= 45;
let timeRegresive = null;

//Variables de Sonido//
let winAudio= new Audio('./sounds/win.wav');
let loseAudio= new Audio('./sounds/lose.wav');
let clickAudio= new Audio('./sounds/click.wav');
let wrongAudio= new Audio('./sounds/wrong.wav');
let= hitAudio= new Audio('./sounds/hit.wav');

// seleccionando el DOM.
let showMovements= document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTime= document.getElementById('timer');


  //Creo un array y luego lo desordeno, sort(fn--para ordenar o desordenar.)//
let numbers =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8] //[0,1,2,3,4,5,6,7]
    numbers= numbers.sort(()=>{return Math.random()-0.5});
    // console.log(numbers);

//  function timer..   //

function timerCount(){
 timeRegresive= setInterval(() => {
    timerRegresive --;
    showTime.innerHTML= `Timer: ${timerRegresive} seconds` 
    if(timerRegresive === 0){
        clearInterval(timeRegresive);
        blockCards();
        loseAudio.play();
     }
 }, 1000);
}
// Para mostrar todas las cards destapadas.
function blockCards(numbers){
    for (let i = 0; i <= 15; i++) {
    let cardBlock = document.getElementById(i);
    cardBlock.disabled = true;
    // cardBlock.innerText= `<img src= "./img/${numbers[i]}.png" alt="">`
    }
}


    
//Funcion Principal//
//mostrar primer numero..//
const turn = (id)=>{

    if(timer === false){
        timerCount();
        timer= true;

    }
    turnCards++;

    if(turnCards === 1){
        cardOne= document.getElementById(id);
        firstResult= numbers[id];
        // console.log(cardOne)
        //Vinculo el array cn el id del html//.
         cardOne.innerHTML= `<img src="./img/${firstResult}.png" alt="">`;   // cardOne.innerHTML= firstResult; 
        //deshabilitar primer boton.//
        clickAudio.play();
        cardOne.disabled =true;

    } else if(turnCards === 2){
        cardTwo= document.getElementById(id);
        secondResult= numbers[id];
        cardTwo.innerHTML= `<img src="./img/${secondResult}.png" alt="">`; 
        cardTwo.disabled = true;
        movementsCount++;
        showMovements.innerHTML = `Movements: ${movementsCount}`;

        if(firstResult === secondResult){
            //Poner el tarjetas giradas en 0..
            turnCards= 0;
            hitsCount++;
            showHits.innerHTML = `Hits: ${hitsCount}`

            if(hitsCount === 8){
                winAudio.play();
                clearInterval(timeRegresive);
                showHits.innerHTML= `Hits: ${hitsCount} 😱🤯😱`;
                showMovements.innerHTML= `Movements: ${movementsCount} 😎`;
                showTime.innerHTML= `Amazing! 🎉🎊 You only delayed ${timerInitial - timerRegresive} seconds`
            }
            hitAudio.play();
        }else{
            wrongAudio.play();
            //mostrar valores y taparlos.
            setTimeout(()=>{
            cardOne.innerHTML= ' '
            cardTwo.innerHTML= ' '
            //debo deshabilitar el disabled.
            cardOne.disabled = false;
            cardTwo.disabled= false;
            turnCards= 0;
            },800)
            
        }


    }
    
   
}

