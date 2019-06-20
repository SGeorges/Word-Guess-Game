// SAME CONCEPT GUESSING GAME EXCEPT CODE REWORKED SO THE GAME IS AN OBJECT
// MINOR CHANGES TO GAMEPLAY AND REWARDS. LESS FLASHY BUT SHOULD BE SMOOTHER
// GAMEPLAY. LOOKING TO ADD MORE FEATURES TO IT.


var hangman = {
    words: [ "starlight", "showman", "refugee", "bright", "romance", "black", "glyph", "awkward", "fervid", "crypt"],
    wordOrder: [],
    guessBank: [],
    currGuess: [],
    index: 0,
    misses: 0,
    acceptableGuesses: "abcdefghijklmnopqrstuvwxyz",
    lockGame: false,

    generateOrder: function() {
        console.log("===== Generating Order =====");

        while ( this.wordOrder.length < this.words.length) {
            var num = Math.floor((Math.random()*this.words.length)+ 0);
            var dup = false;

            for (var i=0; i < this.wordOrder.length; i++) {
                if (this.wordOrder[i] === this.words[num]) {
                    dup = true;
                };
            };

            if (dup === false) {
                this.wordOrder.push(this.words[num]);
            };
        };
    },

    writeWord: function() {
        console.log("===== Writing Word =====");
        this.currGuess = [];

        for (var i = 0; i < this.wordOrder[this.index].length; i++) {
            this.currGuess[i] = "_";
        }

        for (var i = 0; i < this.guessBank.length; i++) {
            for (var j = 0; j < this.wordOrder[this.index].length; j++) {
                if (this.wordOrder[this.index].charAt(j) === this.guessBank[i]) {
                    this.currGuess[j] = this.guessBank[i];
                }
            }
        }

        document.getElementById("solverText").textContent = this.currGuess.join(" ");

    },

    addGuess: function( userGuess ) {
        console.log("adding guess");
        var aBank = []
        aBank = this.guessBank;

        function guessChecker (userGuess) {
            for (var i = 0; i < aBank.length; i++) {
                if (userGuess === aBank[i]) {
                    return(false);
                };
            };
            if (i === aBank.length) {
                return(true);
            };
        }

        if (this.acceptableGuesses.indexOf(userGuess) != -1){
            if (guessChecker(userGuess)) {
                aBank.push(userGuess);

                if (this.wordOrder[this.index].indexOf( userGuess ) === -1) {
                    this.misses++;
                };
            };
        };

        $("#hangman-img").attr("src", "./assets/images/hangman/hangman-" + this.misses + ".jpg");
        document.getElementById("guessesText").textContent = this.guessBank.join("  ");
        document.getElementById("counterText").textContent= 8 - this.misses;

    },

    checkSolution: function() {
        console.log("===== You Are Checking =====")
        var userProgress = this.currGuess.join("");

        if ( userProgress === this.wordOrder[this.index]){

            document.getElementById("resultText").textContent = "Congratulations! The word was '" + this.wordOrder[this.index] + "'";
            
            this.index++;
            this.misses = 0;
            this.guessBank = [];


            document.getElementById("guessesText").textContent = "";
            document.getElementById("counterText").textContent = 8;
            document.getElementById("winsText").textContent = this.index;

            if (this.index < this.words.length) {
                $("#hangman-img").attr("src", "./assets/images/hangman/hangman-" + this.misses + ".jpg");
                hangman.writeWord();
            }
            else {
                hangman.lockGame = true;
            };
        };
    },

    reset: function() {
        console.log("===== You Are Resetting Game =====");
        this.index = 0;
        this.misses = 0;
        this.guessBank = [];
        this.wordOrder = [];

        this.lockGame = false;

        document.getElementById("guessesText").textContent = "";
        document.getElementById("counterText").textContent = 8;
        document.getElementById("winsText").textContent = this.index;
        $("#hangman-img").attr("src", "./assets/images/hangman/hangman-0.jpg");


        this.generateOrder();
        this.writeWord();
    },


};

function gameReset () {
    document.getElementById("winsText").textContent = hangman.index;
    document.getElementById("resultText").textContent = "";

    hangman.reset();

}

hangman.generateOrder();
hangman.writeWord();

document.onkeyup = function(event) {
    console.log("===== You Are Guessing =====");
    var userGuess = event.key;

    if (hangman.lockGame != true) {
        hangman.addGuess( userGuess );
        hangman.writeWord();
        if (hangman.misses < 8) {
            hangman.checkSolution();    
        }
        else {
            document.getElementById("resultText").textContent = "OH no, you've run out of guesses. The word was '" + hangman.wordOrder[hangman.index] + "'";
            hangman.lockGame = true;
        }
    }



}















//        this.currWord = this.words[Math.floor((Math.random()*this.words.length)+ 0)];

//        wordsSelected.push(this.currWord);
