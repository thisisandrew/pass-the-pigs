/**
 * Utils
 * @author Andrew Hill
 * __U
 */

var __U = __U || {};

__U.log = function(type, msg){
    var _debug = true; //Set to false for production
    var _info = true; //Set to false for production
    
    if(type == 'd' && _debug && typeof window.console != 'undefined') {
        console.log('DEBUG::');
        console.log(msg);
    }
    
    if(type == 'i' && _info && typeof window.console != 'undefined') {
        console.log('INFO::');
        console.log(msg);
    }
}