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
        
        this.games[idx-1] = new PIGS.Game();
        
        console.log(this.games);
        
        this.getCurrentGame().newTurn();
    };
    
    this.getCurrentGame = function(){
        var current = gameCount() - 1;
        return this.getGame(current);
    }
    
    this.getGame = function(idx) {
        return this.games[idx];
    }
}