/**
 * Pass the Pigs
 * @author Andrew Hill
 * PIGS.Actions
 */

var PIGS = PIGS || {};

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
        
        return { positions: { 'pos1': pos1, 'pos2': pos2}, scores: score };
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