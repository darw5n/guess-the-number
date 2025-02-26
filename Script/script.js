
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let attempts = 0;
let gameStart = false;

let randomNumber = getRandomNumber(0, 100);

let submitBtn = document.getElementById("submitGuess");
let restartBtn = document.getElementById("restartButton");

updateButtons();

function updateButtons() {
    console.log("Xtentativi "+attempts);
    if (gameStart) {
        submitBtn.disabled = false;
        restartBtn.disabled = false;
    } else if (attempts > 0) {
        submitBtn.disabled = true;
        restartBtn.disabled = false;
    } else{
        submitBtn.disabled = false;
        restartBtn.disabled = true;
    }
}


function countAttempts() {
    const attemptsCounter = document.getElementById("attempts");
    attempts++;
    attemptsCounter.innerText = attempts;
    console.log("Attemps: " + attempts);
}

function restartGame() {
    //resettare tutte le variabili e l’interfaccia
    attempts = 0;
    gameStart = true;
    randomNumber = getRandomNumber(0, 100);

    //reset all ui field
    document.getElementById("attempts").innerText = attempts;
    userFeedback("");
    document.getElementById("guessField").value = "";

    //reset btn
    submitBtn.disabled = false;
    restartBtn.disabled = true;
}

function checkGuess(uNumber, rndNumber) {
    //confronta il numero inserito con quello generato
    if (uNumber == rndNumber) {
        gameStart = false;
        userFeedback("You won!");
        updateButtons(); 
    } else if (uNumber > rndNumber) {
        userFeedback("Try a smaller number");
    } else {
        userFeedback("Try a larger number");
    }

}

function userFeedback(msg) {
    //messaggio di feedback per il giocatore
    const messagge = document.getElementById("message");
    messagge.innerText = msg;
}



submitBtn.addEventListener("click", function (e) {
    // console.log(this.className); // logs the className of my_element
    // console.log(e.currentTarget === this); // logs `true`

    console.log(randomNumber);
    gameStart = true;

    const guessField = document.getElementById("guessField");
    const guessNumber = parseInt(guessField.value, 10);
    console.log("verifica "+ guessNumber);

    if (guessNumber > 100 || guessNumber <= 0) {
        userFeedback("Not valid! Try a numb between 1 and 100");
        guessField.value = ""; //reset input
    } else if (!isNaN(guessNumber)) {
        checkGuess(guessNumber, randomNumber);
        countAttempts();
         guessField.value = "";  // Resetta il campo di input
    }else {
        console.log("Inserisci un valore");
    }

    updateButtons();

});

restartBtn.addEventListener("click", function (e) {
    // console.log(this.className); // logs the className of my_element
    // console.log(e.currentTarget === this); // logs `true`
    restartGame();
});