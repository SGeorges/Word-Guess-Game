
var acceptableGuesses = "abcdefghijklmnopqrstuvwxyz";
var missGuess = 0;
var index = 0;

var lockGame = false;

var counterText = document.getElementById("counterText");
var solverText = document.getElementById("solverText");
var wrongGuessesText = document.getElementById("wrongGuessesText");
var resultText = document.getElementById("resultText");
var winsText = document.getElementById("winsText");
var endGame = document.getElementById("endGame");

var audioElement = document.createElement("audio");
audioElement.volume = 0.05;

var solutions = [
    "starlight",
    "showman",
    "refugee",
    "bright",
    "romance",
    "black",
    "caravan"
]
var guesses = []

// THIS FUNCTION CHECKS IF YOU'VE GUESSED THE WORD CORRECTLY
function solChecker( guessBank, word ) {
    var output = []

    for (var i= 0; i < guessBank.length; i++) {
        for (var j=0; j < word.length; j++) {
            if (word.charAt(j) === guessBank[i]) {
                output[j] = guessBank[i];
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
function writer( guessBank, word ) {    
    var output = []

    for (var i = 0; i < word.length; i++) {
        output[i] = "_";
    }

    for (var i= 0; i < guessBank.length; i++) {
        for (var j=0; j < word.length; j++) {
            if (word.charAt(j) === guessBank[i]) {
                output[j] = guessBank[i];
            }
        }
    }
    
    solverText.textContent = output.join(" ");
    return(output.join(" "));
}

writer(guesses, solutions[index]);
counterText.textContent = 6 - missGuess;

document.onkeyup = function(event) {
    console.log("---You Are Guessing---")
    var userGuess = event.key;
    var word = solutions[index];

    if (lockGame != true) {
        
        // Checks if the userGuess is a letter. Numbers/characters don't count.
        if (acceptableGuesses.indexOf(userGuess) != -1) {

            // Checks if the userGuess has already been guessed
            if (guessChecker(userGuess, guesses)) {
                guesses.push(userGuess);
                h = writer(guesses, word);
                console.log(h);

                // if the user guess isn't in the word don't count miss guess
                if (word.indexOf(userGuess) === -1) {
                    missGuess++;
                }
            }

            counterText.textContent = 6 - missGuess;
            wrongGuessesText.textContent = guesses;

            // Checks if the user has entered all of the letters in the word 
            if (solChecker(guesses, word)) {
                guesses = [];
                missGuess = 0;
                index++;

                if (index != solutions.length){
                    writer(guesses, solutions[index]);
                }

                counterText.textContent = 6 - missGuess;
                wrongGuessesText.textContent = guesses;
                winsText.textContent = index;
                resultText.textContent= "Congratulations! The word was '" + word + "'";

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
                    
                    case 5:
                    audioElement.setAttribute("src", "assets/images/My Chemical Romance - Helena.mp3");
                    audioElement.play();
                    break;

                    case 6:
                    audioElement.setAttribute("src", "assets/images/The Rolling Stones - Paint It, Black.mp3");
                    audioElement.play();
                    break;

                    case 7:
                    audioElement.setAttribute("src", "assets/images/Caravan Palace - Lone Digger.mp3");
                    audioElement.play();
                    break;

                    default:
                    break;
                }

                if (index === solutions.length) {
                    lockGame = true;
                    document.getElementById("endGame").src="assets/images/rickrolled.gif"
                }

            }
            // Checks if the user has run out of guesses
            if ((6-missGuess) === 0) {
                resultText.textContent= "OH no, you've run out of guesses. The word was " + word;
                lockGame = true;
                document.getElementById("endGame").src="assets/images/fuckolly.jpg"

            }        
        }
    }
}

