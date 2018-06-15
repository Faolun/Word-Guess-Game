

// references to document

var d_newGameButton = document.getElementById("new-game-button");
var d_placeholders = document.getElementById("placeholders");
var d_guessedLetters = document.getElementById("guessed-letters");
var d_guessesRem = document.getElementById("guesses-left");
var d_wins = document.getElementById("wins");
var d_losses = document.getElementById("losses");
var d_wookButton = document.getElementById("wookieepedia-button");

//variables for game

var wordBank = [
    "Blaster",
    "Han Solo",
    "Slave One",
    "The Galactic Empire",
    "Echuta",
    "Wookie",
    "Wampa",
    "Mandalorian",
    "Jedi",
    "Alderaan",
    "Blue Milk",
    "Cantina Band",
    "Princess Leia",
    "Hoth",
    "Lightsaber",
    "Droid",
    "Senate",
    "Darth Plagueis",
    "Sith",
    "Jar Jar Binks",
    "Sarlacc Pit",
    "Lando Calrissian",
    "Bossk",
    "Echo Base",
    "Greedo",
    "Boba Fette",
    "Dengar",
    "Luke Skywalker",
    "Darth Vader",
    "Chewbacca",
    "Yoda",
    "AT-AT",
    "Tatooine",
    "Naboo",
    "Jabba the Hutt",
    "Hydrospanner",
    "Death Star",
    "Imperial Class Star Destroyer",
    "Turbolaser",
    "Obi-Wan Kenobi",
    "Anakin Skywalker",
    "Waddo",
    "Rancor",
    "Dathomir",
    "Dantooine",
    "Rori",
    "Pod Racing",
    "Chance Cube",
    "Rebels",
    "Moff Jerjerrod",
];

var wins = 0;
var losses = 0;
var guessesRem = 7;
var gameRunning = false;
var ranWord = "";
var ranWordPlaceholderArr = [];
var userLetterArr = [];
var wrongLetterArr = [];





//newGame function

function newGame() {
    gameRunning = true;
    guessesRem = 7;
    userLetterArr = [];
    wrongLetterArr = [];
    ranWordPlaceholderArr = [];
    $('#wookieepedia-button').prop('disabled', true);
    

    // new word
    ranWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // create dashes

    for (var i = 0; i < ranWord.length; i++) {
        if (ranWord[i] === " ") {
        ranWordPlaceholderArr.push(" ");
        } 
        else if (ranWord[i] === "-") {
        ranWordPlaceholderArr.push("-");
        } 
        else {
        ranWordPlaceholderArr.push("_");
        }
    }

    //write to doc
    d_guessesRem.textContent = guessesRem;
    d_placeholders.textContent = ranWordPlaceholderArr.join("");
    d_guessedLetters.textContent = wrongLetterArr;
    
   
}
//letterGuess function, checks if letter is correct

function letterGuess(letter) {
    
    if (gameRunning === true && userLetterArr.indexOf(letter) === -1) {
        // game logic

        userLetterArr.push(letter);

        // in picked word?

        for (var i = 0; i < ranWord.length; i++) {
            if (ranWord[i].toLowerCase() === letter.toLowerCase()) {
                ranWordPlaceholderArr[i] = ranWord[i];
                }
        }

        d_placeholders.textContent = ranWordPlaceholderArr.join("");
        checkIncorrect(letter);
    }
    else {
        if (!gameRunning) {
            alert("The Game isn't running, click on <strong>May the force be with you!</strong> to start!")
        }
        else {
            alert("You've already guessed this letter!")
        }
    }
}

//checkIncorrect

function checkIncorrect(letter) {
    
    if (ranWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && ranWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        
    guessesRem--;
    wrongLetterArr.push(letter.toUpperCase());
    d_guessedLetters.textContent = wrongLetterArr.join(" ");
    d_guessesRem.textContent = guessesRem;

    }

    checkLoss();
        
}

//checkLose

function checkLoss() {
    if (guessesRem === 0) {
        losses++;
        gameRunning = false;
        d_losses.textContent = losses;
        d_placeholders.textContent = ranWord;
        $('#wookieepedia-button').prop('disabled', false);
        
    }
    checkWin();
}

//checkWin
    function checkWin() {
    if (ranWord.toLowerCase() === ranWordPlaceholderArr.join("").toLowerCase()) {
        wins++;
        gameRunning = false;
        d_wins.textContent = wins;
        $('#wookieepedia-button').prop('disabled', false);
        
    }
}


//event listener for new game button

d_newGameButton.addEventListener("click", newGame);


//event listender and function for wook link

$(document).ready(function() {
$("#wookieepedia-button").on("click", function() {
    var link = "http://starwars.wikia.com/wiki/" + ranWord.split(" ").join("_");
    window.open(link,"_blank");
 })
});


//event listener for onkeyup

document.onkeyup = function(event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}

