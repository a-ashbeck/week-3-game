var hangman = {
    chances: 12,
    wins: 0,
    losses: 0,
    wordBank: [
            'cowboy', 'western', 'wildbill', 'billythekid', 'winchester',
            'horse', 'revolver', 'saloon', 'saddle', 'tombstone', 'noose',
            'gallows', 'boots', 'hat', 'ranch', 'cattle', 'mule', 'wyattearp',
            'buffalobill', 'ponyexpress', 'jessejames', 'whip', 'highnoon',
            'gunfight'
    ],
    idList: [
            'wins', 'losses', 'chances', 'letters-used',
            'guess-word', 'win-lose'
    ],

    // Set the divs and their IDs
    gameDisplay: function() {
        var displayDivs = document.getElementById('game');
        for (var i = 0; i < this.idList.length; i++) {
          var createDiv = document.createElement('div');
          createDiv.innerHTML = '<div class="text-center" id="' + this.idList[i] + '"></p>';
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
            '<p>Chances remaining: ' + (this.chances - numIncorrectGuesses) + '</p>';
        document.getElementById('letters-used').innerHTML =
            '<p>Letters Used so far: ' + lettersUsed.join(' ') + '</p>';
    },

    // End Game display functions
    endGameWin: function() {
        document.getElementById('win-lose').innerHTML =
            '<h2 class="pop-up text-center">YOU WIN!</h2>';
    },
    endGameLose: function() {
        document.getElementById('win-lose').innerHTML =
            '<h2 class="pop-up text-center">YOU LOSE!</h2>';
    },

    // Game management functions
    startGame: function() {
        this.gameDisplay();

        var randomWord = this.wordBank[
              Math.floor(Math.random() * this.wordBank.length)
            ],
            placeholderWord = [],
            lettersUsed = [],
            numIncorrectGuesses = 0;

        // Create letter blanks in placeholderWord array
        for (var i = 0; i < randomWord.length; i++) {
            placeholderWord.push('__');

        }
        this.blankLines(placeholderWord.join(' '));

        // Display game stats
        this.stats(this.wins, this.losses, numIncorrectGuesses, lettersUsed);

        // Game play action
        document.onkeyup = function (event) {
            var input = String.fromCharCode(event.keyCode).toLowerCase();

            // If statement to determine if key press is a letter or not
            if(input.match(/^[A-Za-z]+$/)) {
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
                    hangman.playWinAudio();
                    hangman.endGameWin();
                    hangman.restart();
                } else if ((numIncorrectGuesses) >= hangman.chances) {
                    hangman.losses++;
                    hangman.playLoseAudio();
                    hangman.endGameLose();
                    hangman.restart();
                };
            };
        };
    },

    restart: function() {
        document.onkeyup = function () {
            hangman.gameDisplay();
            hangman.startGame();
        };
    },

    firstSong: document.getElementById('first-song'),
    secondSong: document.getElementById('second-song'),

    playWinAudio: function() {
      this.firstSong.play();
    },

    playLoseAudio: function() {
      this.secondSong.play();
    },

    pauseWinAudio: function() {
      this.firstSong.pause();
    },

    pauseLoseAudio: function() {
      this.secondSong.pause();
    }
};

// Call of the wild object
document.onkeyup = function (event) {
    hangman.startGame();
};
