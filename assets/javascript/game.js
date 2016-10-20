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

    blankLines: function(placeholder) {
        document.getElementById('guess-word').innerHTML = placeholder;
    },

    setWinLoseHtml: function(winLoseReset) {
      document.getElementById('win-lose').innerHTML = winLoseReset;
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
        this.blankLines(this.placeholderWord.join(' '));
    },

    stats: function() {
        document.getElementById('wins').innerHTML =
            '<p>Wins: ' + this.wins +'</p>';
        document.getElementById('losses').innerHTML =
            '<p>Losses: ' + this.losses +'</p>';
        document.getElementById('chances').innerHTML =
            '<p>Chances remaining: ' +
            (this.chances - this.numIncorrectGuesses) + '</p>';
        document.getElementById('letters-used').innerHTML =
            '<p>Letters Used so far: ' + this.lettersUsed.join(' ') + '</p>';
    },

    startGame: function() {
        this.pickWord();
        this.createPlaceholder();
        this.stats();
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
            this.playWinAudio();
            this.setWinLoseHtml('YOU WIN!');
        } else if ((this.numIncorrectGuesses) >= this.chances) {
            this.losses++;
            this.gameLost = true;
            this.playLoseAudio();
            this.setWinLoseHtml('YOU LOSE!');
        };
    },

    gamePlaySession: function(event) {
        this.keyInput = String.fromCharCode(event.keyCode).toLowerCase();
        // If statement to determine if key press is a letter or not
        if(this.keyInput.match(/^[A-Za-z]+$/)) {
            this.checkAndUpdatePlaceholder();
            this.stats();
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
        this.stopWinAudio();
        this.stopLoseAudio();
        this.setWinLoseHtml('');
        this.startGame();
    },

    playWinAudio: function() {
      document.getElementById('first-song').play();
    },

    stopWinAudio: function() {
      document.getElementById('first-song').pause();
      document.getElementById('first-song').currentTime = 0;
    },

    playLoseAudio: function() {
      document.getElementById('second-song').play();
    },

    stopLoseAudio: function() {
      document.getElementById('second-song').pause();
      document.getElementById('second-song').currentTime = 0;
    }
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
