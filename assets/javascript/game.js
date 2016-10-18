var hangman = {
    chances: 12,
    wins: 0,
    losses: 0,
    wordBank: [
            'cowboy', 'western', 'wildbill', 'billythekid', 'winchester',
            'horse', 'revolver', 'saloon', 'saddle', 'tombstone', 'noose',
            'gallows', 'boots', 'hat', 'ranch', 'cattle', 'mule'
    ],
    idList: [
            'wins', 'losses', 'chances', 'letters-used',
            'guess-word', 'win-lose'
    ],

    // Set the divs and their IDs
    gameDisplay: function() {
        var displayDivs = document.getElementById('game');
        for (var i = 0; i < hangman.idList.length; i++) {
          var createDiv = document.createElement('div');
          createDiv.innerHTML = '<div id="' + hangman.idList[i] + '"></p>';
          displayDivs.appendChild(createDiv);
        };
        document.getElementById('win-lose').innerHTML = '';
    },

    // Displays the blank lines for the word to be guessed
    blankLines: function(placeholder) {
        document.getElementById('guess-word').innerHTML = placeholder;
    },

    // Stats display functions
    stats: function(wins, losses, numIncorrectGuesses, lettersUsed) {
        document.getElementById('wins').innerHTML =
            '<p>Wins: ' + wins +'</p>';
        document.getElementById('losses').innerHTML =
            '<p>Losses: ' + losses +'</p>';
        document.getElementById('chances').innerHTML =
            '<p>Chances remaining: ' + (hangman.chances - numIncorrectGuesses) + '</p>';
        document.getElementById('letters-used').innerHTML =
            '<p>Letters Used so far: ' + lettersUsed.join(' ') + '</p>';
    },

    // End Game display functions
    endGameWin: function() {
        document.getElementById('win-lose').innerHTML =
            '<h2>YOU WIN!</h2>';
    },
    endGameLose: function() {
        document.getElementById('win-lose').innerHTML =
            '<h2>YOU LOSE!</h2>';
    },
    restart: function() {
        document.onkeyup = function () {
            hangman.gameDisplay();
            start();
        };
    }
};

function start() {
    hangman.gameDisplay();

    var randomWord = hangman.wordBank[
          Math.floor(Math.random() * hangman.wordBank.length)
        ],
        placeholderWord = [],
        lettersUsed = [],
        numIncorrectGuesses = 0;

    // Create letter blanks in placeholderWord array
    for (var i = 0; i < randomWord.length; i++) {
        placeholderWord.push('__');

    }
    hangman.blankLines(placeholderWord.join(' '));

    // Display game stats
    hangman.stats(hangman.wins, hangman.losses, numIncorrectGuesses, lettersUsed);

    // Game play action
    document.onkeyup = function (event) {
        var input = String.fromCharCode(event.keyCode).toLowerCase(),
            letters = /^[A-Za-z]+$/;

        // If statement to determine if key press is a letter or not
        if(input.match(letters)) {
            // Code block to swap out correct guesses and log incorrect guesses
            if (randomWord.indexOf(input) !== -1) {
                for (var i = 0; i < randomWord.length; i++) {
                    if (randomWord[i] === input) {
                        placeholderWord[i] = input.toUpperCase();
                    };
                };
                hangman.blankLines(placeholderWord.join(' '));
            } else if (lettersUsed.indexOf(input) === -1) {
                lettersUsed.push(input);
                numIncorrectGuesses++;
            };

            // Updated stats ouput
            hangman.stats(hangman.wins, hangman.losses, numIncorrectGuesses, lettersUsed);

            // End game win/lose if statements
            if (placeholderWord.join('').toLowerCase() === randomWord) {
                hangman.wins++;
                hangman.endGameWin();
                hangman.restart();
            };

            if ((numIncorrectGuesses) >= hangman.chances) {
                hangman.losses++;
                hangman.endGameLose();
                hangman.restart();
            };
        };
    };
}

document.onkeyup = function () {
    start();
};
