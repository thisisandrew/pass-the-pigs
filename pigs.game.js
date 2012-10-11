/**
 * Pass the Pigs
 * @auhtor Andrew Hill
 * PIGS.Game
 */

var PIGS = PIGS || {};

PIGS.Game = function(){
    /**
     * A new game needs to handle n players
     * Each game needs to handle scores for each player
     * Score per turn and cumulative scores
     * Limits number of turns per game
     */
    
    this.maxplayers = 2;
    this.maxturns = 10;
    this.player = 1;
    this.winner = 0;
    
    /*
    player: {
        name: 'player1',
        turns: [ { score: 0-100 }, ... ],
        score: <0-100>,
    }
    */
    this.players = [];
    this.turns = [];
    var count = 0;
    
    var turnCounter = function(){
        count++;
        return count;
    };
    
    var turnCount = function(){        
        return count;
    }
    
    //Create a turn for the current player - roll until pass the pigs || pig out etc
    this.newTurn = function(player){
        if(player) this.player = player;
        //Create a new game ready to play
        var idx = turnCounter();
        console.log('turnCounter: ' + idx);
        
        this.turns[idx-1] = new PIGS.Turn(this.player);
        console.log('Turns: ');
        console.log(this.turns);
    }
    
    this.getCurrentTurn = function(){
        var current = turnCount() - 1;
        return this.getTurn(current);
    }
    
    this.getTurn = function(idx) {
        return this.turns[idx];
    }    
    
    this.takeTurn = function(){
        console.log('takeTurn(): ' + this.player);
        //Roll until pass the pigs || pig out etc
        var turn = this.getCurrentTurn();
        
        var result = turn.roll();
        
        if(typeof this.players[this.player-1] == 'undefined') {
            this.players[this.player-1] = {};
            this.players[this.player-1].score = turn.score;
        }
        
        //Accumulate
        this.players[this.player-1].score = this.players[this.player-1].score + turn.score;
        
        //Set Scoreboard
        PIGS.UI.setScore(this.player, turnCount(), turn.score);
        
        //Handle Pig Out
        if(result == 'ptp') {
            this.passPigs(this.player); 
        }
        
        //console.log(this.players);
    }
    
    this.passPigs = function(player){
        var p = player;
        p++;
        
        console.log(player + ' ' + p);
        
        if(p > this.maxplayers) {
            p = 1;
        }
        
        this.player = p;
        this.newTurn(this.player);
    };
};