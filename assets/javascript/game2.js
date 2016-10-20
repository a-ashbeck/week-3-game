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
    randomWord: '',
    placeholderWord: [],
    numIncorrectGuesses: 0,
    lettersUsed: [],
    gameWon: false,
    gameLost: false,
    keyInput: '',

    // Displays the blank lines for the word to be guessed
    blankLines: function(placeholder) {
        document.getElementById('guess-word').innerHTML = placeholder;
    },

    // End Game display functions
    endGameWin: function() {
        document.getElementById('win-lose').innerHTML =
            'YOU WIN!';
    },

    endGameLose: function() {
        document.getElementById('win-lose').innerHTML =
            'YOU LOSE!';
    },

    pickWord: function() {
      this.randomWord = this.wordBank[
          Math.floor(Math.random() * this.wordBank.length)
      ];
    },

    createPlaceholder: function() {
        for (var i = 0; i < this.randomWord.length; i++) {
            this.placeholderWord.push('__');
        };
        this.blankLines(hangman.placeholderWord.join(' '));
    },

    stats: function(wins, losses, numIncorrectGuesses, lettersUsed) {
        document.getElementById('wins').innerHTML =
            '<p>Wins: ' + wins +'</p>';
        document.getElementById('losses').innerHTML =
            '<p>Losses: ' + losses +'</p>';
        document.getElementById('chances').innerHTML =
            '<p>Chances remaining: ' +
            (hangman.chances - numIncorrectGuesses) + '</p>';
        document.getElementById('letters-used').innerHTML =
            '<p>Letters Used so far: ' + lettersUsed.join(' ') + '</p>';
    },

    startGame: function() {
        this.pickWord();
        this.createPlaceholder();
        this.stats(
            hangman.wins,
            hangman.losses,
            hangman.numIncorrectGuesses,
            hangman.lettersUsed
        );
    },

    checkAndUpdatePlaceholder: function() {
        if (this.randomWord.indexOf(this.keyInput) !== -1) {
            for (var i = 0; i < this.randomWord.length; i++) {
                if (this.randomWord[i] === this.keyInput) {
                    this.placeholderWord[i] = this.keyInput.toUpperCase();
                };
            };
            this.blankLines(hangman.placeholderWord.join(' '));
        } else if (this.lettersUsed.indexOf(this.keyInput) === -1) {
            this.lettersUsed.push(this.keyInput);
            this.numIncorrectGuesses++;
        };
    },

    checkResult: function() {
        if (this.placeholderWord.join('').toLowerCase() === this.randomWord) {
            this.gameWon = true;
            this.wins++;
            // this.playWinAudio();
            this.endGameWin();
        } else if ((this.numIncorrectGuesses) >= this.chances) {
            this.losses++;
            this.gameLost = true;
            // this.playLoseAudio();
            this.endGameLose();
        };
    },

    gamePlaySession: function(event) {
        this.keyInput = String.fromCharCode(event.keyCode).toLowerCase();
        // If statement to determine if key press is a letter or not
        if(this.keyInput.match(/^[A-Za-z]+$/)) {
            this.checkAndUpdatePlaceholder();
            this.stats(
                hangman.wins,
                hangman.losses,
                hangman.numIncorrectGuesses,
                hangman.lettersUsed
            );
            this.checkResult();
        };
    },

    restart: function() {
        this.randomWord = '';
        this.placeholderWord = [];
        this.numIncorrectGuesses = 0;
        this.lettersUsed = [];
        this.gameWon = false;
        this.gameLost = false;
        this.startGame();
    },

    // firstSong: document.getElementById('first-song'),
    // secondSong: document.getElementById('second-song'),

    // playWinAudio: function() {
    //   this.firstSong.play();
    // },
    //
    // playLoseAudio: function() {
    //   this.secondSong.play();
    // },
    //
    // pauseWinAudio: function() {
    //   this.firstSong.pause();
    // },
    //
    // pauseLoseAudio: function() {
    //   this.secondSong.pause();
    // }
};

// Call of the wild object
document.onkeyup = function (event) {
    if (hangman.randomWord === '') {
        hangman.startGame();
    } else if ((hangman.gameWon || hangman.gameLost) === true){
        hangman.restart();
    } else {
        hangman.gamePlaySession(event);
    };
};
