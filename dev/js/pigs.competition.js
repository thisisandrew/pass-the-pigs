/**
 * Pass the Pigs
 * @auhtor Andrew Hill
 * PIGS.Competition
 */

var PIGS = PIGS || {};

PIGS.Competition = function(){
    /**
     * A competition can run multiple consecutive games keeping score until unloaded
     */
    
    this.games = [];
    this.players = [];
    var count = 0;
    
    var gameCounter = function(){
        count++;
        return count;
    };
    
    var gameCount = function(){        
        return count;
    }
    
    this.newGame = function(){
        //Wipe the scoreboard...
        
        //Create a new game ready to play
        var idx = gameCounter();
        console.log('gameCounter: ' + idx);
        
        this.games[idx-1] = new PIGS.Game(this);
        
        console.log(this.games);
    };
    
    this.getCurrentGame = function(){
        console.log('PIGS.Competition.getCurrentGame()');
        
        var current = gameCount() - 1;
        console.log(current);
        
        return this.getGame(current);
    };
    
    this.getGame = function(idx) {
        return this.games[idx];
    };
    
    this.incrementWinner = function(player) {
        //Keep score of who won which game
        
        if(typeof this.players[player] == 'undefined') this.players[player] = { score: 0 }; 
        this.players[player].score = this.players[player].score + 1;
    };
    
    this.newGame();
}