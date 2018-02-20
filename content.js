
var timeoutID;

function setup() {
    this.addEventListener("mousemove", resetTimer, false);
    this.addEventListener("mousedown", resetTimer, false);
    this.addEventListener("keypress", resetTimer, false);
    this.addEventListener("DOMMouseScroll", resetTimer, false);
    this.addEventListener("mousewheel", resetTimer, false);
    this.addEventListener("touchmove", resetTimer, false);
    this.addEventListener("MSPointerMove", resetTimer, false);
 
 	goInactive();
}
setup();
 
function startTimer() {
    // wait 10 seconds before calling goInactive
    timeoutID = window.setTimeout(goInactive, 60000);
}
 
function resetTimer(e) {
    window.clearTimeout(timeoutID);
 
    goActive();
}
 
function goInactive() {
    // do something
    var password = prompt("Password ?", "");

	if (password == null || password == "") {
	    goInactive();
	} else {
		if(password == "qwop"){
			goActive();
		} else {
			alert("Are you kidding me? -__- ");
			goInactive();
		}
	    
	}
}
 
function goActive() {
    // do something
    startTimer();
}