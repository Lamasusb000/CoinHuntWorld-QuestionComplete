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

//#region Download Database
function download(csv) {
    var hiddenElement = document.createElement("a")
    hiddenElement.href =
        "data:text/csv;charset=utf-8," + encodeURIComponent("\uFEFF" + csv)
    hiddenElement.target = "_blank"
    hiddenElement.download = "chw_trivia.csv"
    hiddenElement.click()
}

function toCSV(table) {
    return table
        .map(row =>
            row
                .map(cell => {
                    cell = cell.toString()
                    if (cell.replace(/ /g, "").match(/[\s,"]/)) {
                        return '"' + cell.replace(/"/g, '""') + '"'
                    }
                    return cell
                })
                .join(",")
        )
        .join("\n")
}

fetch("https://coinhuntworldtrivia.com/API/ExportJSON")
    .then(response => response.json())
    .then(toCSV)
    .then(download)
//#endregion

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
