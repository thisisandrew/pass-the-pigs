/**
 * Pass the Pigs
 * @auhtor Andrew Hill
 * PIGS.Competition
 */

var PIGS = PIGS || {};

PIGS.Competition = function(){
    /**
     * A competition can run multiple consecutive games keeping score until unloaded
     * determine of the player 2 should be an ai player or human
     */
    
    this.games = [];
    this.players = [];
    this.ai = true;
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
        __U.log('i', 'gameCounter: ' + idx);
        
        this.games[idx-1] = new PIGS.Game(this);
        
        __U.log('i', this.games);
    };
    
    this.getCurrentGame = function(){
        var current = gameCount() - 1;
        return this.getGame(current);
    };
    
    this.getPreviousGame = function(){
        if(gameCount() > 1){
            var previous = gameCount() - 2;
        } else {
            return false;
        }
       
        return this.getGame(previous);
    };
    
    this.getGame = function(idx) {
        return this.games[idx];
    };
    
    this.incrementWinner = function(player) {
        //Keep score of who won which game
        
        if(typeof this.players[player] == 'undefined') this.players[player] = { score: 0 }; 
        this.players[player].score = this.players[player].score + 1;
    };
}