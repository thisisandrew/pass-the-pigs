/**
 * Pass the Pigs
 * @auhtor Andrew Hill
 * PIGS.Game
 */

var PIGS = PIGS || {};

PIGS.Game = function(comp){
    /**
     * A new game needs to handle n players
     * Each game has to handle 10 rounds
     * Each game needs to handle scores for each player
     * Score per turn and cumulative scores
     * Limits number of turns per game
     */
    
    this.competition = comp;
    this.maxplayers = 2;
    this.maxrounds = 10;
    //this.player = 1;
    this.winner = null;
    this.status = 1;
    
    this.players = [];
    this.rounds = [];
    
    var count = 0;
    var roundCounter = function(){
        count++;
        return count;
    };
    
    var roundCount = function(){        
        return count;
    }

    this.newRound = function(){
        //create a new Round
        var idx = roundCounter();
        
        if(idx > this.maxrounds) {
            console.log('END OF GAME - Out of rounds');
            console.log(this);
            this.end();
        } else {
            this.rounds[idx-1] = new PIGS.Round(this);
        }
        
        console.log('Rounds: ');
        console.log(this.rounds);
    }
    
    this.getCurrentRound = function(){
        var current = roundCount() - 1;
        return this.getRound(current);
    }
    
    this.getRound = function(idx) {
        return this.rounds[idx];
    }

    this.getRoundCount = function(){
        var current = roundCount() - 1;
        return current;
    };
    
    this.end = function () {
        this.determineWinner();
        this.competition.incrementWinner(this.winner);
        this.status = 0;
        PIGS.UI.setGameScore(this.winner, this.competition.players[this.winner].score);
        PIGS.UI.endGame();
    };

    this.determineWinner = function(){
        //Who's got the mostest points?
        console.log(this.players[1].score);
        console.log(this.players[2].score);
        
        if(this.players[1].score > this.players[2].score) {
            this.winner = 1;
        } else {
            this.winner = 2;
        }
    };
    
    this.determineFirstPlayer = function(){
        var prev = this.getPreviousGame();
        
        console.log('determine fisrt player');
        console.log(prev);
        
        //if there is a previous game use it to calculate the first_player
        //else first_player = 1
        if(prev && prev.first_player == 1) {
            this.first_player = 2
            this.player = 2;
        } else {
            this.first_player = 1
            this.player = 1;    
        }
    };
    
    this.getPreviousGame = function(){
        //If this in NOT the first game then get the previous game
        var prev = this.competition.getPreviousGame();
        return prev;
    };
        
    //A new game should spawn a new Round...
    this.determineFirstPlayer();
    this.newRound();
};