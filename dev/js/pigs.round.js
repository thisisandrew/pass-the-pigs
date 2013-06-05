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
    this.turns = {};
    
    __U.log('i', 'PIGS.Round - New Round');
    
    this.newTurn = function(){
        this.turns[this.game.player] = new PIGS.Turn(this.game);
        
        //Check if the 2nd player is AI?
        //Otherwise the human player will play via the UI.
        if(this.game.competition.ai) {
            //then lets kick in the strategy for AI player
            //hand this Turn to the strategy and let it play until Pass the Pigs OR Pig Out OR other turn ending event
            PIGS.Strategy.go(this);
        }
    }
    
    this.takeTurn = function(){
        //outcome can be passed back to strategy to tell it whether the player pigged out or what have you
        // 0 - turn over, 1 - turn can continue
        var outcome = 1;
        
        //Check game hasn't ended
        if(this.game.status == 0) {
            alert('Game has ended. Start another!');
            return 0; //return zero outcome for strategy
        }
        
        var p = this.game.player;
        if(typeof this.game.players[p] == 'undefined') this.game.players[p] = { score: 0 };
        
        //Roll until pass the pigs || pig out etc
        var turn = this.turns[p];
        var result = turn.roll();
        
        //Set Cumulative Turn Scoreboard
        PIGS.UI.setScore(this.game.getRoundCount(), p, turn.score);
        
        //Handle Pig Out
        if(result.scores.name == 'pig out') {
            //Then pass the pigs
            this.passPigs();
        } else if (result.positions.pos1 == 'special') {
            //Handle all special rolls
            if (result.positions.pos2 == 'makinbacon') {
                this.game.players[p].score = 0;
                PIGS.UI.setPlayerTotal(p, this.game.players[p].score);
                
                //Make previous all previous turns in previous rounds for this player zero
                for(round_idx in this.game.rounds){
                    for(turn_idx in this.game.rounds[round_idx].turns){
                        if(this.game.rounds[round_idx].turns[turn_idx].player == p) {
                            //this is a previous turn from a previous round for this player
                            this.game.rounds[round_idx].turns[turn_idx].score = 0;
                            PIGS.UI.setScore(round_idx, p, 0);
                        }
                    }
                }
                
                this.passPigs();
            } else if (result.positions.pos2 == 'kissingbacon') {
                //Score 100 - player wins
                //Bank the points
                this.game.players[p].score = this.game.players[p].score + 100;
                PIGS.UI.setPlayerTotal(p, this.game.players[p].score);
                
                this.game.end();
            } else if (result.positions.pos2 == 'piggyback') {
                //
            }
            
        } else {
            //Can roll again;
            outcome = 1;
            
            //If no pig out or special then update normal scores...
            
            //Set the cumulative player score - before accounting for special and pig outs
            
            //Update the UI with points scored in this turn
            var total = this.game.players[p].score + turn.score;
            PIGS.UI.setPlayerTotal(p, total);
            
            //Check if the players score has topped 100
            if(total >= 100) {
                this.game.players[p].score = total;
                this.game.end();
            }
        }
       
        return outcome;
    }
    
    //Control the flow of turns and rounds.
    //Switches players and sytarts new round at end of previous.
    this.passPigs = function(){
        var p = this.game.player;
       
        if(this.turns[p].score == null) {
            //No roll yet this turn
            alert('You must roll at least once before you Pass The Pigs');
            return;
        }
       
        //Accumulate points for this player
        if(typeof this.game.players[p] == 'undefined') this.game.players[p] = { score: 0 };
        this.game.players[p].score = this.game.players[p].score + this.turns[p].score;
        PIGS.UI.setPlayerTotal(this.game.player, this.game.players[p].score);
        
        p++;
        
        __U.log('i', 'Pass the Pigs from ' + this.game.player + ' to ' + (p > this.game.maxplayers ? 1 : p));
        
        if(p > this.game.maxplayers) {
            this.game.player = 1;
        } else {
            this.game.player = p;
        }
        
        //Depending on who started first it may be that the other player still needs to go in this round.
        //Check if both turns have been taken in this round before moving to a new round.
        if(this.checkAllPlayersHaveTakenTurn()) {
            //Move to new round
            this.game.newRound();
        } else {
            this.newTurn();
        }
        
        PIGS.UI.showPlayer(this.game);
    };
    
    this.checkAllPlayersHaveTakenTurn = function(){
        //count the number of turns.
        //if they are all there then the riund is all done...
        if(this.countTurns() < this.game.maxplayers) {
            return false;
        }
        
        return true;
    };
    
    this.countTurns = function(){
        var size = 0, idx;
        for(idx in this.turns){
            if(this.turns.hasOwnProperty(idx)) size++; 
        }
        
        return size;
    };
    
    this.newTurn();
}
