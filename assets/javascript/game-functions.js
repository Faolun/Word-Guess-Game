

// references to document

var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

//variables for game

var wordBank = [
    "Blaster",
    "Han Solo",
    "Slave One",
    "Empire",
];

var wins = 0;
var losses = 0;
var guessesLeft = 10;
var gameRunning = false;
var pickedWord = "";
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];



//newGame function

function newGame() {
    gameRunning = true;
    guessesLeft = 10;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    // new word
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // create dashes

    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === " ") {
        pickedWordPlaceholderArr.push(" ");
        } 
        else {
        pickedWordPlaceholderArr.push("_");
        }
    }

    //write to doc
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join("");
    $guessedLetters.textContent = incorrectLetterBank;
   
}
//letterGuess function, checks if letter is correct

function letterGuess(letter) {
    
    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        // game logic

        guessedLetterBank.push(letter);

        // in picked word?

        for (var i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                pickedWordPlaceholderArr[i] = pickedWord[i];
                }
        }

        $placeholders.textContent = pickedWordPlaceholderArr.join("");
        checkIncorrect(letter);
    }
    else {
        if (!gameRunning) {
            alert("The Game isn't running, click on the button to start!")
        }
        else {
            alert("You've already guessed this letter!")
        }
    }
}

//checkIncorrect

function checkIncorrect(letter) {
    
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        
    guessesLeft--;
    incorrectLetterBank.push(letter);
    $guessedLetters.textContent = incorrectLetterBank.join(" ");
    $guessesLeft.textContent = guessesLeft;

    }

    checkLoss();
        
}

//checkLose

function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textcontent = pickedWord;
    }
    checkWin();
}

//checkWin
    function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join("").toLowerCase()) {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
}
}
//event listener for new game button

$newGameButton.addEventListener("click", newGame);

//event listener for onkeyup

document.onkeyup = function(event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}

