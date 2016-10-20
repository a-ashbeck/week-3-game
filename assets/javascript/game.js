var hangman = {
    chances: 12,
    wins: 0,
    losses: 0,
    wordBank: [
        'cowboy', 'western', 'peacemaker', 'lawman', 'winchester',
        'horse', 'revolver', 'saloon', 'saddle', 'tombstone', 'noose',
        'gallows', 'boots', 'hat', 'ranch', 'cattle', 'mule', 'howdy',
        'giddyup', 'lasso', 'locomotive', 'whip', 'horseshoes',
        'gunfight', 'buckaroo', 'livestock', 'dagnabit', 'corral', 'sheriff'
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
            this.wins++;
            this.gameWon = true;
            this.Audio('first-song', 'on');
            this.setWinLoseHtml('YOU WIN!');
        } else if ((this.numIncorrectGuesses) >= this.chances) {
            this.losses++;
            this.gameLost = true;
            this.Audio('second-song', 'on');
            this.setWinLoseHtml('YOU LOSE!');
        };
    },

    gamePlaySession: function(event) {
        this.keyInput = String.fromCharCode(event.keyCode).toLowerCase();

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
        this.Audio('first-song', 'off');
        this.Audio('second-song', 'off');
        this.setWinLoseHtml('');
        this.startGame();
    },

    Audio: function(firstOrSecondSong, onOff) {
        var song = document.getElementById(firstOrSecondSong);

        if (onOff === 'on') {
            song.play();
        } else {
            song.pause();
            song.currentTime = 0;
        };
    }
};

// Call of the wild object
document.onkeyup = function(event) {
    if (hangman.randomWord === '') {
        hangman.startGame();
    } else if ((hangman.gameWon || hangman.gameLost) === true){
        hangman.restart();
    } else {
        hangman.gamePlaySession(event);
    };
};
