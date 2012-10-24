//TODO: I need to create a round which comprises of a collection of turns, one for each player

/**
 * Pass the Pigs
 * @author Andrew Hill
 * PIGS.Round
 */

var PIGS = PIGS || {};

PIGS.Round = function(game){
    //Each round has a turn for each player.
    //The round controls which player is active
    this.game = game;
    this.game.player = 1;
    
    this.turns = {};
    
    console.log('New Round: ');
    
    this.newTurn = function(){
        this.turns[this.game.player] = new PIGS.Turn(this.game);
    }
    
    this.takeTurn = function(){
        var p = this.game.player;
        console.log('takeTurn(): ' + p);
        //Roll until pass the pigs || pig out etc
        var turn = this.turns[p];
        
        var result = turn.roll();
        
        //Set Scoreboard
        //console.log('set scoreboard');
        //console.log(this.game);
        PIGS.UI.setScore(this.game.getRoundCount(), p, turn.score);
        
        //Handle Pig Out
        if(result == 'ptp') {
            this.passPigs(); 
        } else if (result == 'makinbacon') {
            if(typeof this.game.players[p] == 'undefined') this.game.players[p] = { score: 0 };
            this.game.players[p].score = 0;
            PIGS.UI.setPlayerTotal(p, this.game.players[p].score);
            this.passPigs();
        }
        
        //console.log(this.players);
    }
    
    //Control the flow of turns and rounds.
    //Switches players and sytarts new round at end of previous.
    this.passPigs = function(){
        var p = this.game.player;
        
        //Accumulate points for this player
        if(typeof this.game.players[p] == 'undefined') this.game.players[p] = { score: 0 };
        this.game.players[p].score = this.game.players[p].score + this.turns[p].score;
        PIGS.UI.setPlayerTotal(this.game.player, this.game.players[p].score);
        
        p++;
        
        console.log('Pass the Pigs from ' + this.game.player + ' to ' + p);
        
        if(p > this.game.maxplayers) {
            this.game.newRound();
        } else {
            this.game.player = p;
            this.newTurn(); 
        }
        
        PIGS.UI.showPlayer();
    };
    
    this.newTurn();
    
}
