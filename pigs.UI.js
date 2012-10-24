/**
 * Pass the Pigs
 * @author Andrew Hill
 * PIGS.UI
 */

var PIGS = PIGS || {};

PIGS.UI = {
    newGame: function(){
        pigs.newGame();
        this.showPlayer(pigs.getCurrentGame().player);
    },
    
    roll: function(){
        var g = pigs.getCurrentGame();
        var r = g.getCurrentRound();
        
        console.log('UI roll: round: ' + r);
        
        if(typeof r != 'undefined') {
            r.takeTurn();    
        } else {
            alert('Game Over');          
        }
    },
    
    setScore: function(round, player, score){
        var r = round + 1;
        //console.log('UI.setScore round: ' + r + ' player: ' + player + ' score: ' + score);
        
        var elem_id = "tr#round_" + r + " .player_" + player; 
        console.log('Elem: ' + elem_id);
        
        $(elem_id).text(score);    
    },
    
    passThePigs: function() {
        var g = pigs.getCurrentGame();
        var r = g.getCurrentRound();
        
        r.passPigs();
    },
    
    setPlayerTotal: function(player, total) {
        console.log('UI.setPlayerTotal player: ' + player + ' total: ' + total);
        var elem_id = "#score_player_" + player;
        
        
        $(elem_id).text(total);
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
    },
    
    showPlayer: function() {
        var g = pigs.getCurrentGame();
        
        $("#scoreboard #header #player_1").removeClass('current');
        $("#scoreboard #header #player_2").removeClass('current');
        
        $("#scoreboard #header #player_" + g.player).addClass('current');
    },
    
    endGame: function(){
        var g = pigs.getCurrentGame();
        alert("That's the end folks. Player " + g.winner + ' has won!');  
    }
}