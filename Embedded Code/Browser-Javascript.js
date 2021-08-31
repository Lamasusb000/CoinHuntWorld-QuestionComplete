function CountDatabase() {
    var Database = JSON.parse(localStorage.getItem("Cache"))
    var DatabaseLength = 0
    for (let i = 0; i < Database.length; i++) {
        var Contributors = JSON.parse(Database[i][2])
        DatabaseLength = DatabaseLength + Contributors.length
    }
    return DatabaseLength
}

function LogDatabase(Number) {
    return JSON.parse(localStorage.getItem("Cache"))[Number]
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
