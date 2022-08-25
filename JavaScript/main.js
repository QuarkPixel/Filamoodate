var noSleep = new NoSleep(),
    btnAnimation = document.getElementsByClassName("btnAnimation"),
    isControlledByEventListener,
    ScreenLamp = document.getElementById("ScreenLamp"),
    ScreenUI = document.getElementById("ScreenUI"),
    ScreenNotify = document.getElementById("ScreenNotify"),
    NotificationElementID = 0,
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
    btnAnimation[i].addEventListener("mouseenter", function () {
        this.style.opacity = "1"
    })
    btnAnimation[i].addEventListener("mouseleave", function () {
        this.style.opacity = "0.5"
    })
}

let isFullScreen,
    isSettingUI,
    objFullScreen = document.body

function SwitchFullScreen() {
    if (this.time && Date.now() - this.time < 2048) return
    this.time = Date.now()
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
        ScreenLamp.style.cursor = "auto"
        document
            .getElementById("ScreenUI")
            .getElementsByClassName("background")[0].style.opacity = 0.2
        window.onmousemove = null
        ScreenLamp.onclick = null
    } else {
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
        noSleep.enable()
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
    }
}

function SwitchUiVisibility(inputCase) {
    let State
    if (inputCase == "display") {
        State = ["pointer", "0.5"]
        isUiHidden = false
    } else if (inputCase == "hidden") {
        State = ["none", "0"]
        isUiHidden = true
    }
    ScreenLamp.style.cursor = State[0]
    btnAnimation[0].style.opacity = State[1]
}

function SwitchSettingUI() {
    if (this.time && Date.now() - this.time < 2048) return
    this.time = Date.now()
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
        }, 50)
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

function Notification(contextID, duration, context) {
    let ID = [document.createTextNode(context), "Tap blank to hide the button."]
    let NotificationDiv = document.createElement("div")
    let NotificationNode = ID[contextID]
    NotificationDiv.appendChild(NotificationNode)
    NotificationElementID++
    ScreenNotify.append(NotificationDiv)
    NotificationDiv.style.animationDuration = duration + "ms"
    //remove
    window.setTimeout(() => {
        NotificationDiv.remove()
    }, duration + 100)
}

Notification(
    '<div style="width: 100px; height: 100px; background:red"></div>',
    10000
)
