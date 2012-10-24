/**
 * Pass the Pigs
 * @auhtor Andrew Hill
 * PIGS.Odds
 * PIGS.Score
 */

var PIGS = PIGS || {};

PIGS.Odds = {
    /**
     * Odds calculated from 6000 rolls (12000 individual pig rolls)
     * See data/pig.dat.xlsx
     */
    
    //8 significant digits to be implemented
    /*
    positions: {
        sidenodot: { id: 'sidenodot',   odds: 0.345156433, pc: 0.345156433, name: 'Side' },
        sidedot:   { id: 'sidedot',     odds: 0.300485193, pc: 0.645641626, name: 'Side .' },
		back: 	   { id: 'back',        odds: 0.226535051, pc: 0.872176677, name: 'Razorback' },
		stand: 	   { id: 'stand',       odds: 0.092186716, pc: 0.964363393, name: 'Trotter' },
		snout:	   { id: 'snout',       odds: 0.030784675, pc: 0.995148068, name: 'Snouter' },
		jowl:      { id: 'jowl',        odds: 0.004851932, pc: 1.000000000, name: 'Leaning Jowler' },
		special:   { id: 'special',     odds: 0.003833333, pc: 0.000000000, name: 'Special' }
    },
    */
    
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
	1: { pos1:  'sidenodot',    pos2: 'sidenodot',      score: { points: 1,     name: 'sider' } },
    2: { pos1:  'sidenodot',    pos2: 'sidedot',        score: { points: 0,     name: 'pig out' } },
    3: { pos1:  'sidenodot',    pos2: 'stand',          score: { points: 5,     name: 'trotter'} },
    4: { pos1:  'sidenodot',    pos2: 'back',           score: { points: 5,     name: 'razorback' } },
    5: { pos1:  'sidenodot',    pos2: 'snout',          score: { points: 10,    name: 'snouter' } },
    6: { pos1:  'sidenodot',    pos2: 'jowl',           score: { points: 15,    name: 'leaning jowler' } },
    7: { pos1:  'sidedot',      pos2: 'sidedot',        score: { points: 1,     name: 'sider' } },
    8: { pos1:  'sidedot',      pos2: 'stand',          score: { points: 5,     name: 'trotter' } },
    9: { pos1:  'sidedot',      pos2: 'back',           score: { points: 5,     name: 'razorback' } },
    10: { pos1: 'sidedot',      pos2: 'snout',          score: { points: 10,    name: 'snouter' } },
    11: { pos1: 'sidedot',      pos2: 'jowl',           score: { points: 15,    name: 'leaning jowler' } },
    12: { pos1: 'back',         pos2: 'back',           score: { points: 20,    name: 'double razorback' } },
    13: { pos1: 'back',         pos2: 'stand',          score: { points: 10,    name: 'razorback trotter' } },
    14: { pos1: 'back',         pos2: 'snout',          score: { points: 15,    name: 'razorback snouter' } },
    15: { pos1: 'back',         pos2: 'jowl',           score: { points: 20,    name: 'razorback leaning jowler' } },    
    16: { pos1: 'stand',        pos2: 'stand',          score: { points: 20,    name: 'double trotter' } },
    17: { pos1: 'stand',        pos2: 'snout',          score: { points: 15,    name: 'trotter snouter' } },
    18: { pos1: 'stand',        pos2: 'jowl',           score: { points: 20,    name: 'trotter leaning jowler' } },
    19: { pos1: 'snout',        pos2: 'snout',          score: { points: 40,    name: 'double snouter' } },
    20: { pos1: 'snout',        pos2: 'jowl',           score: { points: 25,    name: 'snouter leaning jowler' } },
    21: { pos1: 'jowl',         pos2: 'jowl',           score: { points: 60,    name: 'AILAB double leaning jowler' } },
	22: { pos1: 'special',      pos2: 'makinbacon',     score: { points: 0,     name: 'Makin Bacon' } },
    23: { pos1: 'special',      pos2: 'kissingbacon',   score: { points: 0,     name: 'Kissing Bacon' } },
    24: { pos1: 'special',      pos2: 'piggyback',      score: { points: 0,     name: 'Piggyback' } },
}
