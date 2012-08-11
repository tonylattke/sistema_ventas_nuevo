var _numb = '0123456789';
var _lwr = 'abcdefghijklmnopqrstuvwxyzáéíóúäëïöüñ';
var _upr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÄËÏÖÜÑ';

function isValid(parm,val) {
    if (parm == "") return true;
    for (i=0; i<parm.length; i++) {
        if (val.indexOf(parm.charAt(i),0) == -1) return false;
    }
    return true;
}

function isNumber(parm) {return isValid(parm,_numb);}
function isDecimal(parm) {return isValid(parm,_numb+'.');}
function isLower(parm) {return isValid(parm,_lwr);}
function isUpper(parm) {return isValid(parm,_upr);}
function isAlpha(parm) {return isValid(parm,_lwr+_upr+' '+'.');}
function isAlphanum(parm) {return isValid(parm,_lwr+_upr+_numb+' '+'.');}
