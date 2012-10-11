//TODO: I need to create a round which comprises of a collection of turns, one for each player

/**
 * Pass the Pigs
 * @auhtor Andrew Hill
 * PIGS.Turn
 * PIGS.Actions
 */

var PIGS = PIGS || {};

/**
 * PIGS.Turn
 * Each player has multiple rolls per turn until the pigs are passed.
 */
PIGS.Turn = function(player){
    console.log('New Turn: ' + player);
    
    this.player = player;
    this.score = 0;
    
    this.roll = function(){
        this.player = player;
        
        /* Roll, score */
        console.log('take turn: ' + this.player);
        var results = PIGS.Actions.roll(this.player);
        
        console.log(results);
        
        if(results.scores.name == 'pig out') {
            this.score = 0;
            return 'ptp';
        } else if(results.positions[1] == 'special') {
            this.score = 0;
            return results.scores.name; //Pass back the name of the special position
        } else {
            //Accumulate scores for this turn
            this.score = this.score + results.scores.points
            
            console.log(this);
            return results.scores.points;
        }
    }
}

PIGS.Actions = {
	roll: function(player) {
        var score = {};
        var isSpecial = false;
		var rnd1 = Math.random().toFixed(3);
        var rnd2 = Math.random().toFixed(3);
        
        console.log(rnd1 + ' ' + rnd2);
        
        if(rnd1 <= rnd2) {
            var pos1 = this.getPosition(rnd1);
            var pos2 = this.getPosition(rnd2);    
        } else {
            var pos1 = this.getPosition(rnd2);
            var pos2 = this.getPosition(rnd1);
        }
        
        var isSpecial = this.checkSpecial(rnd1);
        
        if(isSpecial){
            pos1 = 'special';
            pos2 = this.getSpecialPosition(rnd2);
        }
        
        score = this.getScore(pos1, pos2);

        console.log(score);
    
        PIGS.UI.showPositions(pos1, pos2);
        PIGS.UI.showScore(score.points, score.name);
        
        return { positions: { 1: pos1, 2: pos2}, scores: score };
	},
	
	getPosition: function(rnd) {
		var pos = {};
	
		for(idx in PIGS.Odds.positions) {
			//console.log(PIGS.Odds.positions[idx].pc);
		
			if(rnd <= PIGS.Odds.positions[idx].pc) {
				pos = idx;
				break;
			}
		}
		
		return pos;
	},
    
    getSpecialPosition: function(rnd){
        var pos = {};
	
		for(idx in PIGS.Odds.specials) {
			//console.log(PIGS.Odds.specials[idx].pc);
		
			if(rnd <= PIGS.Odds.specials[idx].pc) {
				pos = idx;
				break;
			}
		}
		
		return pos;
    },
    
    getScore: function(pos1, pos2){
        console.log(pos1 + ' ' + pos2);
        
        for(idx in PIGS.Score) {
            if(PIGS.Score[idx].pos1 == pos1 && PIGS.Score[idx].pos2 == pos2) {
                return PIGS.Score[idx].score;
            }
        }  
    },
    
    checkSpecial: function(rnd){
        if(rnd <= PIGS.Odds.positions['special'].odds){
            console.log('Special: ' + rnd);
            return true;
        }
        
        console.log('Not Special: ' +rnd);
        return false;
    }
}


PIGS.UI = {
    newGame: function(){
        pigs.newGame();
    },
    
    roll: function() {
        pigs.getCurrentGame().takeTurn();  
    },
    
    setScore: function(player, turn, score){
        if(player == 1) {
            $("tr#turn_" + turn + " .player_" + player).text(score);    
        }
    },
    
    updateTotal: function(player, total) {
        
    },
    
    showPositions: function(pos1, pos2){
        $("#pig1-pos").text(pos1);
        $("#pig2-pos").text(pos2);
    },
    
    showScore: function(points, name) {
        $("#scores").hide();
        
        $("#roll-points").text(points);
        $("#roll-name").text(name);
        
        $("#scores").show();
    }
    
    
}

var pigs = pigs || new PIGS.Competition();

$(function(){
	$("#ui-btn-new-game").click(function(){
		PIGS.UI.newGame();
        return false;
	});
    
    $("#ui-btn-roll").click(function(){
		PIGS.UI.roll();
        return false;
	});
    
    $("#roll-pigs").click(function(){
		PIGS.Actions.roll(1);
        return false;
	});
    
    $("#reset").click(function(){
		location.reload();
	});
});
