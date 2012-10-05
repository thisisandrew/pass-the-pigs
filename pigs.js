/* Pass the Pigs */
var PIGS = PIGS || {};

PIGS.Odds = {
	positions: {
		side: 	{ odds: 0.694, pc: 0.694 },
		back: 	{ odss: 0.217, pc: 0.911 },
		stand: 	{ odds: 0.063, pc: 0.974 },
		snout:	{ odds: 0.017, pc: 0.991 },
		jowl: 	{ odds: 0.009, pc: 1.000 },
		bacon:  { odds: 0.010, pc: 0.000 }
	},
}

PIGS.Score = {
	
}

PIGS.Actions = {
	roll: function(player) {
		var rnd = Math.random().toFixed(3);
		console.log(rnd);
		
		var pos = this.getPosition(rnd);
	},
	
	getPosition: function(rnd) {
		var pos = {};
	
		for(idx in PIGS.Odds.positions) {
			console.log(PIGS.Odds.positions[idx].pc);
		
			if(rnd < PIGS.Odds.positions[idx].pc) {
				pos = idx;
				break;
			}
		}
		
		console.log(pos);
	},
}

$(function(){
	$("#roll-pigs").click(function(){
		PIGS.Actions.roll(1);
	});
});