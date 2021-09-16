function CountDatabase() {
    var Database = JSON.parse(localStorage.getItem("Cache"))
    var DatabaseLength = 0
    for (let i = 0; i < Database.length; i++) {
        var Contributors = JSON.parse(Database[i][2])
        DatabaseLength = DatabaseLength + Contributors.length
    }
    return `There are Currently ${Database.length} Questions and ${DatabaseLength} Answers`
}

function LogDatabase(Number) {
    return JSON.parse(localStorage.getItem("Cache"))[Number]
}

function LogBasedOnUserID(UserID) {
    var Database = JSON.parse(localStorage.getItem("Cache"))
    var Count = 0
    var SubmittedData = []
    for (let i = 0; i < Database.length; i++) {
        if (Database[i][2].includes(UserID)) {
            SubmittedData[Count] = {
                Count: Count,
                Question: Database[i][0],
                Answer: JSON.parse(Database[i][1]),
                UserID: JSON.parse(Database[i][2]),
            }
            Count++
        }
    }
    return SubmittedData
}

//#region Cookie Code
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

//#endregion
