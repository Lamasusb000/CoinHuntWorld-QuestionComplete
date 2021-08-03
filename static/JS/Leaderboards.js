var TempDate = new Date()
var ExpirationDate = new Date()
var HourInUTC = TempDate.getUTCHours()
var DayInUTC = TempDate.toGMTString()

if (0 <= HourInUTC && HourInUTC <= 11){
    ExpirationDate.setUTCHours(12, 0, 0, 0)
}else{
    ExpirationDate.setUTCDate(TempDate.getUTCDay() + 2)
    ExpirationDate.setUTCHours(0, 0, 0, 0)
}


async function CheckForCookies(){
    if ( readCookie("Cache") == null){
        await ContactAPIForCookie()
        localStorage.setItem("Cache", JSON.stringify(RequestedData))
        createCookie("Cache", "True", ExpirationDate.toGMTString())
    }
}


async function ContactAPIForCookie() {
	let response = await fetch("https://coinhuntworldtrivia.com/.netlify/functions/GrabQuestionsV2", {
		body: JSON.stringify({
            Text: "Dummy Text"
        }),
        method: "POST"
	});
	if (response.status === 200){
		let data = await response.json()
        window.RequestedData = data
        return
	}
}

async function GrabLeaderBoards() {
	let response = await fetch("https://coinhuntworldtrivia.com/.netlify/functions/GrabQuestionsV2", {
		body: JSON.stringify({
            Text: "Dummy Text"
        }),
        method: "POST"
	});
	if (response.status === 200){
		let data = await response.json()
        window.RequestedData = data
        return
	}
}

async function ConstructLeaderboardArray(){
    await CheckForCookies()
    RequestedData = JSON.parse(localStorage.getItem("Cache"))
    var LeaderBoards = []
    var AllUserIDs = []
    for (let i = 0; i < RequestedData.length; i++) {
        AllUserIDs.push(RequestedData[i][2]) 
    }
    UniqueUserIDs = [...new Set(AllUserIDs)]

    for (let l = 0; l < UniqueUserIDs.length; l++) {
        LeaderBoards.push({"Name": UniqueUserIDs[l], "Count": 0})

        for (let i = 0; i < RequestedData.length; i++) {
            if (RequestedData[i][2] == UniqueUserIDs[l]){
                LeaderBoards[l].Count ++
            }
        }
    }
    window.LeaderBoards = LeaderBoards
    return
}

async function FormatLeaderboards(){
    await ConstructLeaderboardArray()
    let response = await fetch("https://coinhuntworldtrivia.com/.netlify/functions/Leaderboards", {
		body: JSON.stringify({
            Text: "Dummy Text"
        }),
        method: "POST"
	});
	if (response.status === 200){
		let data = await response.json()
        window.LeaderboardNames = data
	}
    for (let l = 0; l < LeaderBoards.length; l++) {
        for (let z = 0; z < LeaderboardNames.length; z++) {
            if (LeaderBoards[l].Name == LeaderboardNames[z][0]){
                LeaderBoards[l].Name = LeaderboardNames[z][1]
            }
        }
    }
    var SortedDatabase = LeaderBoards.sort(function(a, b) {
        return b.Count - a.Count;
    });
    SortedDatabase = SortedDatabase.slice(0, 10)
    var LeaderboardList = document.createElement("table")
    var TableContainer = document.createElement("thead")
    var LeaderboardRow = document.createElement("tr")
    var Listing = document.createElement("td")
    var SubmissionCount = document.createElement("td")
    var SubmissionRank = document.createElement("td")
    Listing.appendChild(document.createTextNode("User"))
    SubmissionCount.appendChild(document.createTextNode("Submission Count"))
    SubmissionRank.appendChild(document.createTextNode("Rank"))
    LeaderboardRow.appendChild(SubmissionRank)
    LeaderboardRow.appendChild(Listing)
    LeaderboardRow.appendChild(SubmissionCount)
    TableContainer.appendChild(LeaderboardRow)
    LeaderboardList.appendChild(TableContainer)


    var TableContainer = document.createElement("tbody")
    for (let i = 0; i < SortedDatabase.length; i++) {
        var LeaderboardRow = document.createElement("tr")
        var Listing = document.createElement("td")
        var SubmissionCount = document.createElement("td")
        var SubmissionRank = document.createElement("td")
        Listing.appendChild(document.createTextNode(SortedDatabase[i].Name))
        SubmissionCount.appendChild(document.createTextNode(SortedDatabase[i].Count))
        SubmissionRank.appendChild(document.createTextNode(i + 1))
        LeaderboardRow.appendChild(SubmissionRank)
        LeaderboardRow.appendChild(Listing)
        LeaderboardRow.appendChild(SubmissionCount)
        TableContainer.appendChild(LeaderboardRow)
    }
    LeaderboardContainer = document.getElementById("LeaderBoard")
    LeaderboardList.appendChild(TableContainer)
    LeaderboardList.className = "table text-white"
    var LeaderboardHeading = document.createElement("h2")
    LeaderboardHeading.appendChild(document.createTextNode("Top 10 Triva Contributors"))
    LeaderboardHeading.className = "AlignCenter"
    LeaderboardContainer.appendChild(LeaderboardHeading)
    LeaderboardContainer.appendChild(LeaderboardList)
}

var RoundCounter = 1
function LoadLeaderboards(){
    if(window.LeaderboardStopper == false){
        try{
            window.LeaderboardStopper = true
            console.log(`It took ${RoundCounter} Attemp/s to load Leaderboards`)
            FormatLeaderboards()
            return
        }catch(err){
            RoundCounter ++
            if (window.LeaderboardStopper == false){
                setTimeout(LoadLeaderboards, 100)
            }
        }
    }

}

$(window).off("load", LoadLeaderboards)
$(window).on("load", LoadLeaderboards)