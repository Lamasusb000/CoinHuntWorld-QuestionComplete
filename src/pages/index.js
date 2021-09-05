import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import "../components/CSS/Leaderboards.css"
import $ from "jquery"
import netlifyIdentity from "netlify-identity-widget"

const IndexPage = () => (
    <Layout>
        <Seo title="Home" />
        <JSimport File="Cookie.js" />
        <h2 className="AlignCenter">Welcome To The CHW Trivia Beta Site!</h2>
        <div className="WidthControl50">
            <p className="AlignCenter">
                Coded For The Community By MrTurtlesGame
            </p>
            <hr />
            <p className="Indent2">
                This site is a community created tool to be used to assist in
                your adventures on the CoinHuntWorld App! CoinHuntWorld is a
                geolocation game where users travel around the real world to
                places around their cities to collect keys and answer questions
                to collect REAL Crypto!
            </p>
            <p className="Indent2">
                Sometimes Within the game hunters recieve questions that are so
                bizzare even Google can't help them solve it but with a
                community sourced database hosted here any hunter can help their
                fellow hunters solve their most complex questions with a simple
                search from our database!
            </p>
            <p className="Indent2">
                Remember! Cheating is not fun and please be safe hunting the
                crypto and most of all... Have fun!
            </p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div id="LeaderBoard">
            <div id="Leaderboard">
                <table className="table text-white" onLoad={GrabLeaderBoards}>
                    <thead>
                        <tr>
                            <td>Rank</td>
                            <td>User</td>
                            <td>Submission Count</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="Rank1">Loading...</td>
                            <td id="User1">Loading...</td>
                            <td id="Count1">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank2">Loading...</td>
                            <td id="User2">Loading...</td>
                            <td id="Count2">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank3">Loading...</td>
                            <td id="User3">Loading...</td>
                            <td id="Count3">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank4">Loading...</td>
                            <td id="User4">Loading...</td>
                            <td id="Count4">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank5">Loading...</td>
                            <td id="User5">Loading...</td>
                            <td id="Count5">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank6">Loading...</td>
                            <td id="User6">Loading...</td>
                            <td id="Count6">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank7">Loading...</td>
                            <td id="User7">Loading...</td>
                            <td id="Count7">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank8">Loading...</td>
                            <td id="User8">Loading...</td>
                            <td id="Count8">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank9">Loading...</td>
                            <td id="User9">Loading...</td>
                            <td id="Count9">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank10">Loading...</td>
                            <td id="User10">Loading...</td>
                            <td id="Count10">Loading...</td>
                        </tr>
                    </tbody>
                </table>
                <p
                    id="JoinLeaderboard"
                    className="text-center Underline CursorClick"
                >
                    Click Here To Set You Leaderboard Name
                </p>
            </div>
        </div>
    </Layout>
)

export default IndexPage

//#region Javascript Code For Leaderboards
//#region SetCurrent ExpirationDate
var TempDate = new Date()
var ExpirationDate = new Date()
var HourInUTC = TempDate.getUTCHours()
var RequestedData = []

if (0 <= HourInUTC && HourInUTC <= 11) {
    ExpirationDate.setUTCHours(12, 0, 0, 0)
} else {
    ExpirationDate.setUTCDate(TempDate.getUTCDate() + 2)
    ExpirationDate.setUTCHours(0, 0, 0, 0)
}

async function CheckForCookies() {
    if (readCookie("Cache") === null && readCookie("Cache") !== "") {
        await ContactAPIForCookie()
        localStorage.setItem("Cache", JSON.stringify(RequestedData))
        createCookie("Cache", "True", ExpirationDate.toGMTString())
    }
}
//#endregion

//#region API Calls
async function ContactAPIForCookie() {
    let response = await fetch(
        "https://coinhuntworldtrivia.com/.netlify/functions/GrabQuestionsV4",
        {
            body: JSON.stringify({
                Text: "Dummy Text",
            }),
            method: "POST",
        }
    )
    if (response.status === 200) {
        let data = await response.json()
        window.RequestedData = data
        return
    }
}

async function GrabLeaderBoards() {
    let response = await fetch(
        "https://coinhuntworldtrivia.com/.netlify/functions/GrabQuestionsV2",
        {
            body: JSON.stringify({
                Text: "Dummy Text",
            }),
            method: "POST",
        }
    )
    if (response.status === 200) {
        let data = await response.json()
        window.RequestedData = data
        return
    }
}
//#endregion
var UniqueUserIDs = []
var LeaderBoards = []
//#region CreateLeaderboards
async function ConstructLeaderboardArray() {
    await CheckForCookies()

    //#region Parse out every UserID and then Limit down to unique
    RequestedData = JSON.parse(localStorage.getItem("Cache"))
    var AllUserIDs = []
    for (let i = 0; i < RequestedData.length; i++) {
        var IDList = JSON.parse(RequestedData[i][2])
        if (IDList) {
            for (let b = 0; b < IDList.length; b++) {
                AllUserIDs.push(IDList[b])
            }
        } else {
            console.log(`Problem on Interval ${i}`)
        }
    }
    UniqueUserIDs = [...new Set(AllUserIDs)]
    //#endregion
    //#region Add "Points" To Each User Based on How Many Submissions
    LeaderBoards = []
    for (let l = 0; l < UniqueUserIDs.length; l++) {
        LeaderBoards.push({ Name: UniqueUserIDs[l], Count: 0 })

        for (let i = 0; i < RequestedData.length; i++) {
            if (RequestedData[i][2].includes(UniqueUserIDs[l])) {
                var TempString = JSON.stringify(RequestedData[i][2])
                var AddBy = await CountInside(TempString, UniqueUserIDs[l])
                LeaderBoards[l].Count = LeaderBoards[l].Count + AddBy
            }
        }
    }
    window.LeaderBoards = LeaderBoards
    return
    //#endregion
}
var LeaderboardNames = ""
async function FormatLeaderboards() {
    await ConstructLeaderboardArray()

    //#region Grab Leaderboard Names
    if (
        (readCookie("Leaderboards") === null) |
        (readCookie("Leaderboards") === "")
    ) {
        let response = await fetch(
            "https://coinhuntworldtrivia.com/.netlify/functions/Leaderboards",
            {
                body: JSON.stringify({
                    Text: "Dummy Text",
                }),
                method: "POST",
            }
        )
        if (response.status === 200) {
            let data = await response.json()
            LeaderboardNames = data
        }
        for (let l = 0; l < LeaderBoards.length; l++) {
            for (let z = 0; z < LeaderboardNames.length; z++) {
                if (LeaderBoards[l].Name === LeaderboardNames[z][0]) {
                    LeaderBoards[l].Name = LeaderboardNames[z][1]
                }
            }
        }
        var SortedDatabase = LeaderBoards.sort(function (a, b) {
            return b.Count - a.Count
        })
        localStorage.setItem("Leaderboards", JSON.stringify(SortedDatabase))
        createCookie("Leaderboards", "true", ExpirationDate.toGMTString())
    } else {
        SortedDatabase = JSON.parse(localStorage.getItem("Leaderboards"))
    }
    SortedDatabase = SortedDatabase.slice(0, 10)
    //#endregion

    //#region Fill Table
    for (let i = 0; i < SortedDatabase.length; i++) {
        $(`#Rank${i + 1}`).text(i + 1)
        $(`#User${i + 1}`).text(SortedDatabase[i].Name)
        $(`#Count${i + 1}`).text(SortedDatabase[i].Count)
    }

    document
        .getElementById("JoinLeaderboard")
        .addEventListener("click", SendDisplayName)
    window.LeaderboardPreventor = undefined
    window.LeaderboardStopper = undefined
}
//#endregion

//#region Gatsby Prevent Double Load
var RoundCounter = 1
function LoadLeaderboards() {
    window.LeaderboardPreventor = true
    if (window.LeaderboardStopper === undefined) {
        try {
            window.LeaderboardStopper = true
            console.log(
                `It took ${RoundCounter} Attemp/s to load The Leaderboards`
            )
            FormatLeaderboards()
            return
        } catch (err) {
            RoundCounter++
            if (window.LeaderboardStopper === undefined) {
                setTimeout(LoadLeaderboards, 100)
            }
        }
    }
}

$(window).off("load", LoadLeaderboards)
$(window).on("load", LoadLeaderboards)

if (window.LeaderboardPreventor === undefined) {
    window.LeaderboardPreventor = true
    LoadLeaderboards()
}
//#endregion

//#region Miscellaneous Functions
function readCookie(name) {
    var nameEQ = name + "="
    var ca = document.cookie.split(";")
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === " ") c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}
function createCookie(name, value, Expiration) {
    var expires = ""
    if (Expiration) {
        expires = "; expires=" + Expiration
    } else expires = ""
    document.cookie = name + "=" + value + expires + "; path=/"
}
async function CountInside(string, char) {
    var re = new RegExp(char, "gi")
    return string.match(re).length
}
//#endregion

//#region Upload Leaderboard Names
async function SendDisplayName() {
    if (netlifyIdentity.currentUser()) {
        var DisplayName = prompt(
            "Please Enter Your Desired Display Name. Max Length is 40 Characters",
            netlifyIdentity.currentUser().id
        )
        if (DisplayName) {
            if (DisplayName.length > 40) {
                alert(
                    "The Max Length is 40. Please try again with a smaller Name"
                )
                return
            }
            let response = await fetch(
                "https://coinhuntworldtrivia.com/.netlify/functions/UploadLeaderboards",
                {
                    body: JSON.stringify({
                        Name: `${DisplayName}`,
                        UserID: `${netlifyIdentity.currentUser().id}`,
                    }),
                    method: "POST",
                }
            )
            if (response.status === 200) {
                let data = await response.text()
                alert(data)
            }
        }
    } else {
        alert("Please Signin Before Attemping This")
    }
}
//#endregion

//#endregion
