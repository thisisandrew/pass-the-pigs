/**
 * Pass the Pigs
 * @author Andrew Hill
 * PIGS.Strategy
 */

PIGS.Strategy = {
    go: function(round){
        //Roll then decide then roll then decide
        var outcome = 1;
        while(outcome) {
            //Strategy decision then...
            //implement a game strategy here...
            
            outcome = round.takeTurn();    
        }
        
    }
}

PIGS.Strategy.roller = function(){
    //Keep a log of the rolls so we can make decision about them.
}