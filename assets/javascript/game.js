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

    // This displays the blank line placeholder for the word to be guessed
    blankLines: function(placeholder) {
        document.getElementById('guess-word').innerHTML = placeholder;
    },

    // This resets the HTML for id 'win-lose' each round
    setWinLoseHtml: function(winLoseReset) {
      document.getElementById('win-lose').innerHTML = winLoseReset;
    },

    // This picks a word from the wordBank and assigns it to randomWord
    pickWord: function() {
      this.randomWord = this.wordBank[
          Math.floor(Math.random() * this.wordBank.length)
      ];
    },

    // This creates the placeholder array of blank lines
    createPlaceholder: function() {
        for (var i = 0; i < this.randomWord.length; i++) {
            this.placeholderWord.push('__');
        };

        this.blankLines(this.placeholderWord.join(' '));
    },

    // This displays the current stats to the user
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

    // This initializes the game for first play
    startGame: function() {
        this.pickWord();
        this.createPlaceholder();
        this.stats();
    },

    // This checks a user's guess against randomWord, and then updates the stats
    // and placeholderWord appropriately
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

    // This checks whether the user won or lost a round and updates the game
    // appropriately
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

    // This checks for letter-only keys and sends them through the function
    // cycle
    gamePlaySession: function(event) {
        this.keyInput = String.fromCharCode(event.keyCode).toLowerCase();

        if(this.keyInput.match(/^[A-Za-z]+$/)) {
            this.checkAndUpdatePlaceholder();
            this.stats();
            this.checkResult();
        };
    },

    // This refreshes the round and restarts the game.
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

    // This controls the audio HTML to play the songs on wins and losses
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
