// console.log(aaa);
// import * as name from './NoSleep.min.js'
// checker()
var noSleep = new NoSleep()

var wakeLockEnabled = false
var toggleEl = document.querySelector("#toggle")
toggleEl.addEventListener(
    "click",
    function () {
        if (!wakeLockEnabled) {
            noSleep.enable() // keep the screen on!
            wakeLockEnabled = true
            toggleEl.value = "Wake Lock is enabled"
            document.body.style.backgroundColor = "#33a8ff"
        } else {
            noSleep.disable() // let the screen turn off.
            wakeLockEnabled = false
            toggleEl.value = "Wake Lock is disabled"
            document.body.style.backgroundColor = ""
        }
    },
    false
)
