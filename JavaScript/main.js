var noSleep = new NoSleep(),
    btnAnimation = document.getElementsByClassName("btnAnimation"),
    isControlledByEventListener,
    ScreenLamp = document.getElementById("ScreenLamp"),
    ScreenUI = document.getElementById("ScreenUI"),
    isUiHidden = false
for (let i = 0; i < btnAnimation.length; i++) {
    let btnAnimationAttr = btnAnimation[i].getAttribute("name").split(",")
    if (btnAnimationAttr.length <= 2) {
        btnAnimationAttr.push("16", "16")
    }
    btnAnimation[i].style.backgroundPosition =
        " calc(-" +
        btnAnimationAttr[0] +
        "px * var(--pixelScale)) calc(-" +
        btnAnimationAttr[1] +
        "px * var(--pixelScale))"
    btnAnimation[i].style.width =
        "calc(" + btnAnimationAttr[2] + "px * var(--pixelScale))"
    btnAnimation[i].style.height =
        "calc(" + btnAnimationAttr[3] + "px * var(--pixelScale))"
    //hover
    btnAnimation[i].addEventListener("mouseenter", function () {
        this.style.opacity = "1"
    })
    btnAnimation[i].addEventListener("mouseleave", function () {
        this.style.opacity = "0.5"
    })
}

// find setting in
let isFullScreen,
    isSettingUI,
    objFullScreen = document.body

function SwitchFullScreen() {
    if (isFullScreen) {
        isFullScreen = false
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
        noSleep.disable()
        let i = 2
        timer = setInterval(function () {
            if (i == -1) {
                clearInterval(timer)
            } else {
                btnAnimation[0].style.backgroundPosition =
                    " 0 calc(-" + i * 16 + "px * var(--pixelScale))"
            }
            i--
        }, 50)
        ScreenUI.style.right = 0
        document
            .getElementById("ScreenUI")
            .getElementsByClassName("background")[0].style.opacity = 0.2
        window.onmousemove = null
        ScreenLamp.onclick = null
    } else {
        //FullScreen
        isFullScreen = true
        if (objFullScreen.requestFullscreen) {
            objFullScreen.requestFullscreen()
        } else if (objFullScreen.webkitRequestFullScreen) {
            objFullScreen.webkitRequestFullScreen()
        } else if (objFullScreen.mozRequestFullScreen) {
            objFullScreen.mozRequestFullScreen()
        } else if (objFullScreen.msRequestFullscreen) {
            objFullScreen.msRequestFullscreen()
        }
        //AwakeScreen
        noSleep.enable()
        //Animation
        let i = 1
        timer = setInterval(function () {
            if (i == 4) {
                clearInterval(timer)
            } else {
                btnAnimation[0].style.backgroundPosition =
                    " 0 calc(-" + i * 16 + "px * var(--pixelScale))"
            }
            i++
        }, 50)

        ScreenUI.style.right = "calc(-16px * var(--pixelScale))"
        ScreenUI.getElementsByClassName("background")[0].style.opacity = 0
        ScreenLamp.style.cursor = "pointer"
        //add interval
        window.onmousemove = function () {
            if (this.time && Date.now() - this.time < 2048) return
            this.time = Date.now()
            SwitchUiVisibility("display")
        }
        ScreenLamp.onclick = function () {
            if (isUiHidden) {
                SwitchUiVisibility("display")
            } else {
                SwitchUiVisibility("hidden")
            }
        }
        // window.addEventListener("touchend", EventListenerFindTouched(), false)
    }
}

function SwitchUiVisibility(inputCase) {
    let State
    if (inputCase == "display") {
        console.log("a")
        State = ["pointer", "0.5"]
        isUiHidden = false
    } else if (inputCase == "hidden") {
        State = ["none", "0"]
        isUiHidden = true
    }
    ScreenLamp.style.cursor = State[0]
    btnAnimation[0].style.opacity = State[1]
}

// var openSettingUI = false
function SwitchSettingUI() {
    if (isSettingUI) {
        isSettingUI = false
        let i = 3
        timer = setInterval(function () {
            if (i == -1) {
                clearInterval(timer)
            } else {
                btnAnimation[1].style.backgroundPosition =
                    " calc(-16px * var(--pixelScale)) calc(-" +
                    i * 16 +
                    "px * var(--pixelScale))"
            }
            i--
        }, 50 + i * 10)
    } else {
        isSettingUI = true
        let i = 0
        timer = setInterval(function () {
            if (i == 4) {
                clearInterval(timer)
            } else {
                btnAnimation[1].style.backgroundPosition =
                    " calc(-16px * var(--pixelScale)) calc(-" +
                    i * 16 +
                    "px * var(--pixelScale))"
            }
            i++
        }, 50)
    }
    console.log("Setting: " + isSettingUI)
}
