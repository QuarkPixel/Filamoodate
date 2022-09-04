var noSleep = new NoSleep(),
    btnUI = document.getElementsByClassName("btnUI"),
    isControlledByEventListener,
    ScreenLamp = document.getElementById("ScreenLamp"),
    ScreenUI = document.getElementById("ScreenUI"),
    ScreenNotify = document.getElementById("ScreenNotify"),
    isUiHidden = false,
    isFullScreen = false,
    isSettingUI = false,
    objFullScreen = document.body,
    settingUI_ChangeModeButton = Object.values(
        document
            .getElementById("settingUI_ChangeMode")
            .getElementsByTagName("button")
    )

for (let i = 0; i < btnUI.length; i++) {
    let btnUIAttr = btnUI[i].getAttribute("name").split(",")
    if (btnUIAttr.length <= 2) {
        btnUIAttr.push("16", "16")
    }
    btnUI[i].style.backgroundPosition =
        " calc(-" +
        btnUIAttr[0] +
        "px * var(--pixelScale)) calc(-" +
        btnUIAttr[1] +
        "px * var(--pixelScale))"
    btnUI[i].style.width = "calc(" + btnUIAttr[2] + "px * var(--pixelScale))"
    btnUI[i].style.height = "calc(" + btnUIAttr[3] + "px * var(--pixelScale))"
}

function debounce(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
    }
}

function SwitchFullScreen() {
    if (isFullScreen) {
        //close
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
        btnUI[1].style.pointerEvents = "all"
        let i = 2
        timer = setInterval(function () {
            if (i == -1) {
                clearInterval(timer)
            } else {
                btnUI[0].style.backgroundPosition =
                    " 0 calc(-" + i * 16 + "px * var(--pixelScale))"
            }
            i--
        }, 50)
        document.getElementsByClassName("btn")[0].style.right = 0
        ScreenLamp.style.cursor = "auto"
        document
            .getElementById("ScreenUI")
            .getElementsByClassName("background")[0].style.opacity = 0.2
        window.onmousemove = null
        ScreenLamp.onclick = null
    } else {
        //open
        isFullScreen = true
        if (!localStorage.getItem("fullScreenReminder")) {
            console.log("a")
            Notification(1, 10000)
            localStorage.setItem("fullScreenReminder", "true")
        }
        Notification("Tap blank to hide the button.", 5000)
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
        btnUI[1].style.pointerEvents = "none"
        let i = 1
        timer = setInterval(function () {
            if (i == 4) {
                clearInterval(timer)
            } else {
                btnUI[0].style.backgroundPosition =
                    " 0 calc(-" + i * 16 + "px * var(--pixelScale))"
            }
            i++
        }, 50)

        document.getElementsByClassName("btn")[0].style.right =
            "calc(-16px * var(--pixelScale))"
        ScreenUI.getElementsByClassName("background")[0].style.opacity = 0
        ScreenLamp.style.cursor = "pointer"
        window.onmousemove = function () {
            if (this.time && Date.now() - this.time < 2048) return
            this.time = Date.now()
            if (isUiHidden) {
                isUiHidden = false
                ScreenLamp.style.cursor = "pointer"
                btnUI[0].style.opacity = ""
            }
        }
        ScreenLamp.onclick = function () {
            console.log(isUiHidden)

            console.log("click clicked")
            if (isUiHidden) {
                isUiHidden = false
                ScreenLamp.style.cursor = "pointer"
                btnUI[0].style.opacity = ""
            } else {
                isUiHidden = true
                ScreenLamp.style.cursor = "none"
                btnUI[0].style.opacity = "0"
            }
        }
    }
}

function SwitchSettingUI() {
    if (isSettingUI) {
        isSettingUI = false
        let i = 3
        timer = setInterval(function () {
            if (i == -1) {
                clearInterval(timer)
            } else {
                btnUI[1].style.backgroundPosition =
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
                btnUI[1].style.backgroundPosition =
                    " calc(-16px * var(--pixelScale)) calc(-" +
                    i * 16 +
                    "px * var(--pixelScale))"
            }
            i++
        }, 50)
    }
    // console.time("Setting: " + isSettingUI)
}

//[TODO)
function changeMode(serialNumber) {
    settingUI_ChangeModeButton.forEach((e) => e.classList.remove("selected"))
    settingUI_ChangeModeButton[serialNumber].classList.add("selected")
    localStorage.setItem("displayMode", serialNumber)
    console.log(localStorage.getItem("displayMode"))
}

function Notification(context, duration) {
    let NotificationDiv = document.createElement("div")
    NotificationDiv.innerHTML = context
    ScreenNotify.append(NotificationDiv)
    NotificationDiv.style.animationDuration = duration + "ms"
    //remove
    window.setTimeout(() => {
        NotificationDiv.remove()
    }, duration + 100)
}
