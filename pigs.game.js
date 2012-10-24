/**
 * Pass the Pigs
 * @auhtor Andrew Hill
 * PIGS.Game
 */

var PIGS = PIGS || {};

PIGS.Game = function(){
    /**
     * A new game needs to handle n players
     * Each game has to handle 10 rounds
     * Each game needs to handle scores for each player
     * Score per turn and cumulative scores
     * Limits number of turns per game
     */
    
    this.maxplayers = 2;
    this.maxrounds = 10;
    this.player = 1;
    this.winner = 0;
    
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
            this.determineWinner();
            PIGS.UI.endGame();
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
    }

    this.determineWinner = function(){
        //Who's got the mostest points?
        console.log(this.players[1].score);
        console.log(this.players[2].score);
        
        if(this.players[1].score > this.players[2].score) {
            this.winner = 1;
        } else {
            this.winner = 2;
        }
    }
        
    
    //A new game should spawn a new Round...
    this.newRound();
};