/**
 * Pass the Pigs
 * @author Andrew Hill
 * PIGS.Actions
 */

var PIGS = PIGS || {};

/**
 * PIGS.Turn
 * Each player has multiple rolls per turn until the pigs are passed.
 */
PIGS.Turn = function(game){
    this.game = game;
    this.player = this.game.player;
    console.log('New Turn: ' + this.player);

    this.score = null;
    
    this.roll = function(){
        
        /* Roll, score */
        console.log('take turn: ' + this.player);
        var results = PIGS.Actions.roll(this.player);
        
        console.log(results);
        
        if(results.scores.name == 'pig out') {
            this.score = results.scores.points;
            //return 'ptp';
        } else if(results.positions.pos1 == 'special') {

            this.score = results.scores.points;
            
        } else {
            //Accumulate scores for this turn
            this.score = this.score + results.scores.points
            
            console.log(this);
            //return results.scores.points;
        }
        
        return results;
    }
}