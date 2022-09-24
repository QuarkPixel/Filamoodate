var noSleep = new NoSleep(),
    btnUI = document.getElementsByClassName("btnUI"),
    isControlledByEventListener,
    ScreenLamp = document.getElementById("ScreenLamp"),
    ScreenUI = document.getElementById("ScreenUI"),
    SettingUI = document.getElementById("settingUI"),
    ScreenNotify = document.getElementById("ScreenNotify"),
    isUiHidden = false,
    isFullScreen = false,
    isSettingUI = false,
    objFullScreen = document.body

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

function SwitchFullScreen() {
    coolDown(256)
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
            Notification("Setting", 10000)
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

SwitchSettingUI() //[TODO)

function SwitchSettingUI() {
    // coolDown(256)//[TODO)]
    if (isSettingUI) {
        //Close
        isSettingUI = false
        // console.log("close")
        // setTimeout(() => (SettingUI.style.display = "none"), 400)
        SettingUI.style.opacity = "0"
        SettingUI.style.transform = "scale(.1)"
        SettingUI.style.bottom = "calc(1px* var(--pixelScale))"
        SettingUI.style.right = "calc(1px* var(--pixelScale))"
        SettingUI.style.pointerEvents = "none"
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
        }, 90)
    } else {
        //Open
        isSettingUI = true
        // console.log("open")
        // SettingUI.style.display = "block"
        SettingUI.style.opacity = "1"
        // SettingUI.style.filter = "blur(0)"
        SettingUI.style.transform = "scale(1)"
        SettingUI.style.bottom = "5%"
        SettingUI.style.right = "3%"
        SettingUI.style.pointerEvents = "all"
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
    // DisplaySettingUI(isSettingUI)
    // console.time("Setting: " + isSettingUI)
}

////////////////////////////////////////////////
//Setting

//Get
var currentPattern,
    settingUI_ChangeModeButton = Object.values(
        document
            .getElementById("settingUI_ChangeMode")
            .getElementsByTagName("button")
    ),
    settingUI_Option = Object.values(
        document
            .getElementById("settingUI_Option")
            .getElementsByTagName("article")
    ),
    settingUI_Lamp = Object.values(
        document.getElementById("ScreenLamp").getElementsByTagName("div")
    ),
    applyButton = document
        .getElementById("settingUI_Option")
        .getElementsByTagName("button")

//preset global
if (!localStorage.getItem("displayMode")) {
    localStorage.setItem("displayMode", 0)
}

changeMode(localStorage.getItem("displayMode"))

function changeMode(serialNumber) {
    localStorage.setItem("displayMode", serialNumber)
    currentPattern = serialNumber
    //Button Style
    settingUI_ChangeModeButton.forEach((e) => e.classList.remove("selected"))
    settingUI_ChangeModeButton[serialNumber].classList.add("selected")
    //Option Style
    settingUI_Option.forEach((e) => e.classList.remove("display"))
    settingUI_Option[serialNumber].classList.add("display")
    //Lamp Style
    settingUI_Lamp.forEach((e) => e.classList.remove("display"))
    settingUI_Lamp[serialNumber].classList.add("display")
}

// console.log("SolidColor_ColorInput")
function settingApply() {
    // console.log(currentPattern == 2)
    coolDown(800)
    if (currentPattern == 0) {
        console.log(0)
    } else if (currentPattern == 1) {
        // console.log(1)
        Set_BlurStyle()
    } else if (currentPattern == 2) {
        // console.log(2)
        Save_SolidColor()
    } else if (currentPattern == 3) {
        console.log(3)
    } else if (currentPattern == 4) {
        console.log(4)
    }
    // console.log(window.event.target)
}

function successApply() {
    applyButton[0].style.borderColor = "#0cc234"
    // changeBorder
    setTimeout(() => {
        applyButton[0].style.borderColor = ""
    }, 800)
}
// SolidColor_ColorInput.blur(function () {
// console.log("SolidColor_ColorInput")
// })

function reset() {
    localStorage.setItem("isSetting", true)
    //ColorInput
    //BigSurStyle
    //BlurStyle
    localStorage.setItem("BlurStyle_ColorBG", "#2D90DA")
    localStorage.setItem("BlurStyle_ColorI", "#6c928c")
    localStorage.setItem("BlurStyle_ColorII", "#2D90DA")
    localStorage.setItem("BlurStyle_ColorIII", "#2D90DA")
    localStorage.setItem("BlurStyle_ColorIV", "#2D90DA")
    localStorage.setItem("BlurStyle_ColorV", "#2D90DA")
    //SolidColor
    localStorage.setItem("SolidColor_Color", "#2D90DA")
    //GradientColor
    //Image
}

if (!localStorage.getItem("isSetting")) {
    reset()
}

var settingDOM = {
    //i:input|p:preview
    BigSurStyle: { i: [], p: [] },
    BlurStyle: {
        i: [
            document.getElementById("BlurStyle_ColorInputBG"),
            document.getElementById("BlurStyle_ColorInputI"),
            document.getElementById("BlurStyle_ColorInputII"),
            document.getElementById("BlurStyle_ColorInputIII"),
            document.getElementById("BlurStyle_ColorInputIV"),
            document.getElementById("BlurStyle_ColorInputV"),
        ],
        p: [
            document.getElementById("BlurStyle_ColorPreviewBG"),
            document.getElementById("BlurStyle_ColorPreviewI"),
            document.getElementById("BlurStyle_ColorPreviewII"),
            document.getElementById("BlurStyle_ColorPreviewIII"),
            document.getElementById("BlurStyle_ColorPreviewIV"),
            document.getElementById("BlurStyle_ColorPreviewV"),
        ],
    },
    SolidColor: {
        i: document.getElementById("SolidColor_ColorInput"),
        p: document.getElementById("SolidColor_ColorPreview"),
    },
    GradientColor: { i: [], p: [] },
    Image: { i: [], p: [] },
}

//!>>>BigSurStyle<<<

//!>>>BlurStyle<<<
//*>>Preset
settingDOM.BlurStyle.i[0].value = localStorage.getItem("BlurStyle_ColorBG")
settingDOM.BlurStyle.i[1].value = localStorage.getItem("BlurStyle_ColorI")
settingDOM.BlurStyle.i[2].value = localStorage.getItem("BlurStyle_ColorII")
settingDOM.BlurStyle.i[3].value = localStorage.getItem("BlurStyle_ColorIII")
settingDOM.BlurStyle.i[4].value = localStorage.getItem("BlurStyle_ColorIV")
settingDOM.BlurStyle.i[5].value = localStorage.getItem("BlurStyle_ColorIV")
Set_BlurStyle()

//*>>Set
function Set_BlurStyle() {
    let colorBG = localStorage.getItem("BlurStyle_ColorBG"),
        colorI = localStorage.getItem("BlurStyle_ColorI")
    settingDOM.BlurStyle.p[0].style.background = colorBG
    settingUI_Lamp[1].style.backgroundColor = colorBG
    settingDOM.BlurStyle.p[1].style.background = colorI
    settingUI_Lamp[1].style.backgroundColor = colorI
    //[TODO)document.documentElement.style.setProperty("--test", "blue")
}

//*>>Save
function Save_Blurstyle() {
    if (CheckIsColor(settingDOM.BlurStyle.i[0].value)) {
        localStorage.setItem(
            "SolidColor_Color",
            settingDOM.BlurStyle.i[0].value
        )
        Set_BlurStyle()
        successApply()
    } else {
        Notification("Not supported color code.", 2000)
    }
}

//!>>>SolidColor<<<
//*>>Preset
var SolidColor_ColorInput = document.getElementById("SolidColor_ColorInput"),
    SolidColor_ColorPreview = document.getElementById("SolidColor_ColorPreview") //[TODO)
// if (!localStorage.getItem("SolidColor_Color")) {
//     localStorage.setItem("SolidColor_Color", "#2D90DA")
// }
settingDOM.SolidColor.i.value = localStorage.getItem("SolidColor_Color")
Set_SolidColor()

//*>>Set
function Set_SolidColor() {
    let color = localStorage.getItem("SolidColor_Color")
    settingDOM.SolidColor.p.style.background = color
    settingUI_Lamp[2].style.backgroundColor = color
}

//*>>Save
function Save_SolidColor() {
    if (CheckIsColor(settingDOM.SolidColor.i.value)) {
        localStorage.setItem("SolidColor_Color", settingDOM.SolidColor.i.value)
        Set_SolidColor()
        successApply()
    } else {
        Notification("Not supported color code.", 2000)
    }
}

//!>>>GradientColor<<<

//!>>Image<<<

// function F_BigSurStyle() {
//     console.log("aa1")
// }
// function F_BlurStyle() {}

// function F_SolidColor() {
//     console.log(CheckIsColor(SolidColor_ColorInput.value))

//     // return 11
//     // console.log(SolidColor_ColorInput.value)
// }

// function F_GradientColor() {}
// function F_Image() {}

////////////////////////////////////////////////
//Notification

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

document.addEventListener("keyup", function (e) {
    if (e.key == "Enter" && isSettingUI) {
        // console.log("a")
        settingApply()
        // SwitchSettingUI()
    }
})

function CheckIsColor(val) {
    //not support rgba()
    let type
    if (/^rgb\(/.test(val)) {
        type =
            "^[rR][gG][Bb][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[)]{1}$"
    } else if (/^#/.test(val)) {
        type = "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"
    } else {
        return false
    }
    let re = new RegExp(type)
    if (val.match(re) == null) {
        return false
    } else {
        return true
    }
}

function coolDown(time) {
    let e = window.event.target
    e.style.pointerEvents = "none"
    setTimeout(function () {
        e.style.pointerEvents = "all"
    }, time)
}
