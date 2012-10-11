﻿﻿/* Pass the Pigs */
var PIGS = PIGS || {};

PIGS.Odds = {
	positions: {
		sidenodot: { id: 'sidenodot',   odds: 0.349, pc: 0.349, name: 'Side' },
        sidedot:   { id: 'sidedot',     odds: 0.302, pc: 0.651, name: 'Side .' },
		back: 	   { id: 'back',        odds: 0.224, pc: 0.875, name: 'Razorback' },
		stand: 	   { id: 'stand',       odds: 0.088, pc: 0.963, name: 'Trotter' },
		snout:	   { id: 'snout',       odds: 0.030, pc: 0.993, name: 'Snouter' },
		jowl:      { id: 'jowl',        odds: 0.007, pc: 1.000, name: 'Leaning Jowler' },
		special:   { id: 'special',     odds: 0.050, pc: 0.000, name: 'Special' }
	},
    
    specials: {
        makinbacon:     { odds: 0.950, pc: 0.950, name: 'Makin Bacon', score: 0 },
        kissingbacon:   { odds: 0.045, pc: 0.995, name: 'Kissing Bacon', score: 100 },
        piggyback:      { odds: 0.005, pc: 1.000, name: 'Piggyback', score: 'DQ' }
    }
}

PIGS.Score = {
	1: { pos1:  'sidenodot',   pos2: 'sidenodot', score: { points: 1, name: 'sider' } },
    2: { pos1:  'sidenodot',   pos2: 'sidedot',   score: { points: 0, name: 'pig out' } },
    3: { pos1:  'sidenodot',   pos2: 'stand',      score: { points: 5, name: 'trotter'} },
    4: { pos1:  'sidenodot',   pos2: 'back',       score: { points: 5, name: 'razorback' } },
    5: { pos1:  'sidenodot',   pos2: 'snout',      score: { points: 10, name: 'snouter' } },
    6: { pos1:  'sidenodot',   pos2: 'jowl',       score: { points: 15, name: 'leaning jowler' } },
    7: { pos1:  'sidedot',     pos2: 'sidedot',   score: { points: 1, name: 'sider' } },
    8: { pos1:  'sidedot',     pos2: 'stand',      score: { points: 5, name: 'trotter' } },
    9: { pos1:  'sidedot',     pos2: 'back',       score: { points: 5, name: 'razorback' } },
    10: { pos1: 'sidedot',     pos2: 'snout',      score: { points: 10, name: 'snouter' } },
    11: { pos1: 'sidedot',     pos2: 'jowl',       score: { points: 15, name: 'leaning jowler' } },
    12: { pos1: 'back',         pos2: 'back',       score: { points: 20, name: 'double razorback' } },
    13: { pos1: 'back',         pos2: 'stand',      score: { points: 10, name: 'razorback trotter' } },
    14: { pos1: 'back',         pos2: 'snout',      score: { points: 15, name: 'razorback snouter' } },
    15: { pos1: 'back',         pos2: 'jowl',       score: { points: 20, name: 'razorback leaning jowler' } },    
    16: { pos1: 'stand',        pos2: 'stand',      score: { points: 20, name: 'double trotter' } },
    17: { pos1: 'stand',        pos2: 'snout',      score: { points: 15, name: 'trotter snouter' } },
    18: { pos1: 'stand',        pos2: 'jowl',       score: { points: 20, name: 'trotter leaning jowler' } },
    19: { pos1: 'snout',        pos2: 'snout',      score: { points: 40, name: 'double snouter' } },
    20: { pos1: 'snout',        pos2: 'jowl',       score: { points: 25, name: 'snouter leaning jowler' } },
    21: { pos1: 'jowl',         pos2: 'jowl',       score: { points: 60, name: 'AILAB double leaning jowler' } },
	22: { pos1: 'special',      pos2: 'makinbacon', score: { points: 0, name: 'Makin Bacon' } },
}

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

PIGS.Game = function(){
    /**
     * A new game needs to handle n players
     * Each game needs to handle scores for each player
     * Score per turn and cumulative scores
     * Limits number of turns per game
     */
    
    this.maxplayers = 2;
    this.maxturns = 10;
    this.player = 1;
    this.winner = 0;
    
    /*
    player: {
        name: 'player1',
        turns: [ { score: 0-100 }, ... ],
        score: <0-100>,
    }
    */
    this.players = [];
    this.turns = [];
    var count = 0;
    
    var turnCounter = function(){
        count++;
        return count;
    };
    
    var turnCount = function(){        
        return count;
    }
    
    
    //Create a turn for the current player - roll until pass the pigs || pig out etc
    this.newTurn = function(){ 
        //Create a new game ready to play
        var idx = turnCounter();
        console.log('turnCounter: ' + idx);
        
        this.turns[idx-1] = new PIGS.Turn(this.player);
        console.log(this.turns);
    }
    
    this.getCurrentTurn = function(){
        var current = turnCount() - 1;
        return this.getTurn(current);
    }
    
    this.getTurn = function(idx) {
        return this.turns[idx];
    }    
    
    this.takeTurn = function(){
        //Roll until pass the pigs || pig out etc
        var turn = this.getCurrentTurn();
        
        turn.roll();
        
        console.log()
        
        if(typeof this.players[this.player-1] == 'undefined') {
            this.players[this.player-1] = {};
            this.players[this.player-1].score = turn.score;
        }
        this.players[this.player-1].score = this.players[this.player-1].score + turn.score;
        
        console.log(this.players);
    }
    
    this.passPigs = function(player){
        var p = player;
        p++;
        
        console.log(player + ' ' + p);
        
        if(p > this.maxplayers) p = 1;
        
        this.player = p;
    };
};

PIGS.Turn = function(player){
    this.player = player;
    this.score = 0;
    
    this.roll = function(){
        /* Roll, score */
        console.log('take turn: ' + this.player);
        var results = PIGS.Actions.roll(this.player);
        
        console.log(results);
        
        if(results.positions[1] == 'special') {
            //Do some work with special positions
        } else {
            //Accumulate scores for this player and this turn
            this.score = this.score + results.scores.points
            
            console.log(this);
            
        }
        
        return this.score;
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
