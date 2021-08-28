$("#autoComplete-Import").on("load", LoadQuestions)

var TempDate = new Date()
var ExpirationDate = new Date()
var HourInUTC = TempDate.getUTCHours()
var DayInUTC = TempDate.toGMTString()
var APIKey = ""

if (0 <= HourInUTC && HourInUTC <= 11) {
    ExpirationDate.setUTCHours(12, 0, 0, 0)
} else {
    ExpirationDate.setUTCDate(TempDate.getUTCDay() + 2)
    ExpirationDate.setUTCHours(0, 0, 0, 0)
}
function RefreshDatabase() {
    eraseCookie("Cache")
    eraseCookie("Leaderboards")
    window.location.reload()
}

async function ContactAPI() {
    let response = await fetch(
        "https://coinhuntworldtrivia.com/.netlify/functions/ExportJSON",
        {
            headers: {
                Authorization: `${window.location.hostname}`,
            },
            method: "POST",
        }
    )
    if (response.status === 200) {
        let data = await response.json()
        window.RequestedData = data
        return
    }
}

async function GetQuestions() {
    await ContactAPI()
    localStorage.setItem("Cache", JSON.stringify(RequestedData))
    createCookie("Cache", "True", ExpirationDate.toGMTString())

    var QuestionList = []
    for (let i = 0; i < window.RequestedData.length; i++) {
        QuestionList.push(window.RequestedData[i][0])
    }
    return QuestionList
}

async function CheckCache() {
    $(".RefreshDatabase").off("click", RefreshDatabase)
    $(".RefreshDatabase").on("click", RefreshDatabase)
    if (readCookie("Cache") != null && readCookie("Cache") != "") {
        window.RequestedData = JSON.parse(localStorage.getItem("Cache"))
        var QuestionList = []
        for (let i = 0; i < window.RequestedData.length; i++) {
            QuestionList.push(window.RequestedData[i][0])
        }
        return QuestionList
    } else {
        return await GetQuestions()
    }
}

function LoadQuestions() {
    var autoCompleteJS = new autoComplete({
        placeHolder: "Search Question",
        data: {
            src: CheckCache(),
            cache: true,
        },
        resultItem: {
            highlight: true,
        },
        events: {
            input: {
                selection: event => {
                    const selection = event.detail.selection.value
                    setTimeout(function () {
                        autoCompleteJS.input.value = ""
                        autoCompleteJS.input.blur()
                        autoCompleteJS.input.focus()
                    }, 100)
                    CollectResult(selection)
                },
            },
        },
    })
}

function CollectResult(selection) {
    for (let i = 0; i < window.RequestedData.length; i++) {
        if (selection === window.RequestedData[i][0]) {
            var Answer = JSON.parse(window.RequestedData[i][1])
            Answer = Answer.join("<br><br>")
            $(".AnswerLabel").css("visibility", "visible")
            document.getElementById("AnswerResults").innerHTML = Answer
        }
    }
}

function readCookie(name) {
    var nameEQ = name + "="
    var ca = document.cookie.split(";")
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == " ") c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}

function SetDatabaseRefresh() {
    var TimePeriod = ""
    var ExpirationHour = ExpirationDate.getHours()
    if (ExpirationHour >= 12) {
        TimePeriod = "PM"
    } else {
        TimePeriod = "AM"
    }

    return `Database Will Refresh at: ${ExpirationHour}:${String(
        ExpirationDate.getMinutes()
    ).padStart(2, "0")}${TimePeriod}`
}
function createCookie(name, value, Expiration) {
    if (Expiration) {
        var expires = "; expires=" + Expiration
    } else var expires = ""
    document.cookie = name + "=" + value + expires + "; path=/"
}

function readCookie(name) {
    var nameEQ = name + "="
    var ca = document.cookie.split(";")
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == " ") c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }

    return null
}

function eraseCookie(name) {
    createCookie(name, "", -1)
}
