var hangman = {
    chances: 12,
    wins: 0,
    losses: 0,
    wordBank: ['cowboy', 'western', 'wildbill', 'billythekid', 'winchester'],

    gameDisplay: function () {
        document.getElementById('game').innerHTML =
            '<div id="wins"></div>' +
            '<div id="losses"></div>' +
            '<div id="chances"></div>' +
            '<div id="letters-used"></div>' +
            '<div id="guess-word"></div>' +
            '<div id="win-lose"></div>';
    },
    styleSpace: function (placeholder) {
        document.getElementById('guess-word').innerHTML = placeholder;
    },
    stats: function (wins, losses, numIncorrectGuesses, lettersUsed) {
        document.getElementById('wins').innerHTML =
            '<p>Wins: ' + wins +'</p>';
        document.getElementById('losses').innerHTML =
            '<p>Losses: ' + losses +'</p>';
        document.getElementById('chances').innerHTML =
            '<p>Chances remaining: ' + (hangman.chances - numIncorrectGuesses) + '</p>';
        document.getElementById('letters-used').innerHTML =
            '<p>Letters Used so far: ' + lettersUsed.join(' ') + '</p>';
    },
    endGameWin: function () {
        document.getElementById('win-lose').innerHTML =
            '<h2>YOU WIN!</h2>';
        document.onkeyup = function () {
            hangman.gameDisplay();
            start();
        };
    },
    endGameLose: function () {
        document.getElementById('win-lose').innerHTML =
            '<h2>YOU LOSE!</h2>';
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

    // write blank word
    for (var i = 0; i < randomWord.length; i++) {
        placeholderWord.push('__');
    }
    hangman.styleSpace(placeholderWord.join('  '));

    hangman.stats(hangman.wins, hangman.losses, numIncorrectGuesses, lettersUsed);

    document.onkeyup = function (event) {
        var input = String.fromCharCode(event.keyCode).toLowerCase();

        if (randomWord.indexOf(input) !== -1) {
            for (var i = 0; i < randomWord.length; i++) {
                if (randomWord[i] === input) {
                    placeholderWord[i] = input;
                };
            };
            hangman.styleSpace(placeholderWord.join('  '));
        } else if (lettersUsed.indexOf(input) === -1) {
            lettersUsed.push(input);
            numIncorrectGuesses++;
        };

        hangman.stats(hangman.wins, hangman.losses, numIncorrectGuesses, lettersUsed);

        if (placeholderWord.join('').toLowerCase() === randomWord) {
            hangman.wins++;
            hangman.endGameWin();
        };

        if ((numIncorrectGuesses) >= hangman.chances) {
            hangman.losses++;
            hangman.endGameLose();
        };
    };
}

document.onkeyup = function () {
    start();
};
