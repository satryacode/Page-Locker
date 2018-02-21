document.body.onload = function() {
    var timeoutID, urls, pin, timeout;

    function init(){
        chrome.storage.sync.get(null, function(item) {
            if (!chrome.runtime.error) {
                pin = item.pin;
                urls = item.urls;
                timeout = item.timeout;

                if(pin == undefined && urls == undefined && timeout == undefined){
                    chrome.storage.sync.set({
                        pin: "1234",
                        urls: "*",
                        timeout: "60000",
                    }, function() {
                        // Update status to let user know options were saved.
                        init();
                    });
                } else {
                    detectURL();
                }
            }
        });
    }
    init();

    function detectURL() {
        var _urls = urls.split(',');
        var URL = window.location.hostname;
        if (urls != "*") {
            for (var i = 0; i < _urls.length; i++) {
                if (URL == _urls[i]) {
                    setupDetection();
                }
            }
        } else {
            //all URL
            setupDetection();
        }
    }

    function setupDetection() {
        this.addEventListener("mousemove", resetTimer, false);
        this.addEventListener("mousedown", resetTimer, false);
        this.addEventListener("keypress", resetTimer, false);
        this.addEventListener("DOMMouseScroll", resetTimer, false);
        this.addEventListener("mousewheel", resetTimer, false);
        this.addEventListener("touchmove", resetTimer, false);
        this.addEventListener("MSPointerMove", resetTimer, false);

        goInactive();
    }

    function startTimer() {
        // wait 10 seconds before calling goInactive
        timeoutID = window.setTimeout(goInactive, parseInt(timeout));
    }

    function resetTimer(e) {
        window.clearTimeout(timeoutID);

        goActive();
    }

    function blurPage() {
        document.body.style.filter = "blur(5px)";
    }

    function unblurPage() {
        document.body.style.filter = "blur(0px)";
    }

    function goInactive() {
        // do something
        blurPage();

        window.setTimeout(function() {
            var password = prompt("Your PIN? \n(default pin is '1234')", "");

            if (password == null || password == "") {
                goInactive();
            } else {
                if (password == pin) {
                    unblurPage();
                    goActive();
                } else {
                    alert("Oops, PIN is incorrect.");
                    goInactive();
                }
            }
        }, 1);
    }

    function goActive() {
        // do something
        startTimer();
    }
}