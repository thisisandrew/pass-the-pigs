/**
 * Pass the Pigs
 * @author Andrew Hill
 * PIGS Main
 */

var PIGS = PIGS || {};

var pigs = pigs || new PIGS.Competition();


//UI Handlers - Simples for now...
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
    
    $("#ui-btn-pass-the-pigs").click(function(){
		PIGS.UI.passThePigs();
        return false;
	});
    
    $("#reset").click(function(){
		location.reload();
	});
});