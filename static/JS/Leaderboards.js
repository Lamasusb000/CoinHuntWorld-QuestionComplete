//#region SetCurrent ExpirationDate
var TempDate = new Date()
var ExpirationDate = new Date()
var HourInUTC = TempDate.getUTCHours()
var DayInUTC = TempDate.toGMTString()

if (0 <= HourInUTC && HourInUTC <= 11){
    ExpirationDate.setUTCHours(12, 0, 0, 0)
}else{
    ExpirationDate.setUTCDate(TempDate.getUTCDate() + 2)
    ExpirationDate.setUTCHours(0, 0, 0, 0)
}


async function CheckForCookies(){
    if ( readCookie("Cache") == null){
        await ContactAPIForCookie()
        localStorage.setItem("Cache", JSON.stringify(RequestedData))
        createCookie("Cache", "True", ExpirationDate.toGMTString())
    }
}
//#endregion

//#region API Calls
async function ContactAPIForCookie() {
	let response = await fetch("https://coinhuntworldtrivia.com/.netlify/functions/GrabQuestionsV4", {
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
//#endregion

//#region CreateLeaderboards
async function ConstructLeaderboardArray(){
    await CheckForCookies()
    RequestedData = JSON.parse(localStorage.getItem("Cache"))
    var LeaderBoards = []
    var AllUserIDs = []
    for (let i = 0; i < RequestedData.length; i++) {
        var IDList = JSON.parse(RequestedData[i][2])
        if (IDList){
            for (let b = 0; b < IDList.length; b++) {
                AllUserIDs.push(IDList[b]) 
            }
        }else{
            console.log(`Problem on Interval ${i}`)
        }


    }
    UniqueUserIDs = [...new Set(AllUserIDs)]

    for (let l = 0; l < UniqueUserIDs.length; l++) {
        LeaderBoards.push({"Name": UniqueUserIDs[l], "Count": 0})

        for (let i = 0; i < RequestedData.length; i++) {
            if (RequestedData[i][2].includes(UniqueUserIDs[l])){
                var TempString = JSON.stringify(RequestedData[i][2])
                var AddBy = await CountInside(TempString, UniqueUserIDs[l])
                LeaderBoards[l].Count = LeaderBoards[l].Count + AddBy
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
    var LeaderBoardJoin = document.createElement("p")
    LeaderBoardJoin.appendChild(document.createTextNode("Click Here To Set Your LeaderBoard Name"))
    LeaderBoardJoin.addEventListener("click", SendDisplayName)
    LeaderBoardJoin.className = "AlignCenter Underline CursorClick"
    LeaderboardContainer.appendChild(LeaderboardHeading)
    LeaderboardContainer.appendChild(LeaderboardList)
    LeaderboardContainer.appendChild(LeaderBoardJoin)
    window.LeaderboardPreventor = undefined
    window.LeaderboardStopper = undefined
}
//#endregion

//#region Gatsby Prevent Double Load
var RoundCounter = 1
function LoadLeaderboards(){
	window.LeaderboardPreventor = true
    if(window.LeaderboardStopper == undefined){
        try{
			window.LeaderboardStopper = true
			console.log(`It took ${RoundCounter} Attemp/s to load The Leaderboards`)
			FormatLeaderboards()
			return
        }catch(err){
            RoundCounter ++
            if (window.LeaderboardStopper == undefined){
                setTimeout(LoadLeaderboards, 100)
            }
        }
    }

}

$(window).off("load", LoadLeaderboards)
$(window).on("load", LoadLeaderboards)

if(window.LeaderboardPreventor == undefined){
	window.LeaderboardPreventor = true
	LoadLeaderboards()
}
//#endregion

//#region Miscellaneous Functions
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
async function CountInside(string,char) {
    var re = new RegExp(char,"gi");
    return string.match(re).length;
}
//#endregion

//#region Upload Leaderboard Names
async function SendDisplayName(){
    if(netlifyIdentity.currentUser()){
        var DisplayName = prompt("Please Enter Your Desired Display Name. Max Length is 40 Characters", netlifyIdentity.currentUser().id)
        if(DisplayName){
            if(DisplayName.length > 40){
                alert("The Max Length is 40. Please try again with a smaller Name")
                return
            }
            let response = await fetch("https://coinhuntworldtrivia.com/.netlify/functions/UploadLeaderboards", {
                body: JSON.stringify({
                    Name: `${DisplayName}`,
                    UserID: `${netlifyIdentity.currentUser().id}`
                }),
                method: "POST"
            });
            if (response.status === 200){
                let data = await response.text()
                alert(data)
            }
        }
    }else{
        alert("Please Signin Before Attemping This")
    }
}
//#endregion