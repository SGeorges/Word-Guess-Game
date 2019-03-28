
var acceptableGuesses = "abcdefghijklmnopqrstuvwxyz";
var numGuesses = 0;
var index = 0;

var counterText = document.getElementById("counterText");
var solverText = document.getElementById("solverText");
var wrongGuessesText = document.getElementById("wrongGuessesText");
var resultText = document.getElementById("resultText");

var audioElement = document.createElement("audio");

var solutions = [
    "starlight",
    "showman",
    "refugee",
    "bright",
    "antithesis"
]
var guesses = []

// THIS FUNCTION CHECKS IF YOU'VE GUESSED THE WORD CORRECTLY
function solChecker( x, word ) {
    var output = []

    for (var i= 0; i < x.length; i++) {
        for (var j=0; j < word.length; j++) {
            if (word.charAt(j) === x[i]) {
                output[j] = x[i];
            }
        }
    }

    var userAnswer = output.join("");

    if (userAnswer === word) {
        return(true);
    }
    else {
        return(false);
    }
}

// THIS FUNCTION CHECKS IF YOU'VE DUPLICATED THE CURRENT GUESS
function guessChecker(userGuess, guessBank) {
    for (var i = 0; i < guessBank.length; i++) {
        if (userGuess === guessBank[i]){
            return(false);
        }
    }
    if (i === guessBank.length) {
        return(true);   
    }
}

// THIS FUNCTION WRITES OUT THE WORD BASED ON WHAT USER HAS GUESSED
function writer( x, word ) {    
    var output = []

    for (var i = 0; i < word.length; i++) {
        output[i] = "_";
    }

    for (var i= 0; i < x.length; i++) {
        for (var j=0; j < word.length; j++) {
            if (word.charAt(j) === x[i]) {
                output[j] = x[i];
            }
        }
    }
    
    solverText.textContent = output.join(" ");
    return(output.join(" "));
}

writer(guesses, solutions[index]);
counterText.textContent = 15 - numGuesses;

document.onkeyup = function(event) {
    console.log("---You Are Guessing---")
    var userGuess = event.key;
    var word = solutions[index];

    if (numGuesses === 0) {
        var h = writer(guesses, word);

        console.log(h);

    }
    // Checks if the userGuess is a letter. Numbers/characters don't count.
    if (acceptableGuesses.indexOf(userGuess) != -1) {

        // Checks if the userGuess has already been guessed
        if (guessChecker(userGuess, guesses)) {
            guesses.push(userGuess);
            h = writer(guesses, word);
            console.log(h);
            numGuesses++;
        }

        counterText.textContent = 15 - numGuesses;
        wrongGuessesText.textContent = guesses;
        console.log(numGuesses);
        console.log(guesses);

        // Checks if the user has entered all of the letters in the word 
        if (solChecker(guesses, word)) {
            guesses = [];
            numGuesses = 0;
            index++;

            writer(guesses, solutions[index]);

            counterText.textContent = 15 - numGuesses;
            wrongGuessesText.textContent = guesses;
            resultText.textContent= "Congratz! The word was " + word;

            switch (index) {
                case 1: 
                audioElement.setAttribute("src", "assets/images/MUSE - Starlight.mp3");
                audioElement.play();
                break;

                case 2:
                audioElement.setAttribute("src", "assets/images/Panic! At The Disco - The Greatest Show (from The Greatest Showman Reimagined).mp3");
                audioElement.play();
                break;

                case 3:
                audioElement.setAttribute("src", "assets/images/Rise Against - Prayer Of The Refugee.mp3");
                audioElement.play();
                break;

                case 4:
                audioElement.setAttribute("src", "assets/images/The Killers - Mr. Brightside.mp3");
                audioElement.play();
                break;
                

                default:
                break;
            }


        }
        // Checks if the user has run out of guesses
        if ((15-numGuesses) === 0) {
            resultText.textContent= "OH no, you've run out of guesses. The word was " + word;
        }
    
    }

    // h = writer(guesses, word);
    // console.log(h);


}
