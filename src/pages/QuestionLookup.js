import * as React from "react"
import $ from "jquery"
import autoComplete from "@tarekraafat/autocomplete.js"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../components/CSS/autoCompletes.css"
import "../components/CSS/SpecialFormats.css"
import "../components/CSS/AddingQuestions.css"

import Modal from "../components/Modal"

function QuestionLookup() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900)
    React.useEffect(() => {
        LoadQuestions()

        window.addEventListener(
            "resize",
            () => {
                var ismobile = window.innerWidth < 900
                if (ismobile !== isMobile) setIsMobile(ismobile)
            },
            false
        )
    }, [isMobile] = "")
    return (
        <Layout>
            <Seo title="Question Lookup" />
            <div style={{ height: "100%" }} className="AlignCenter row">
                <h4 className="AlignCenter">Question Search</h4>
                <p className="text-center" id="DatabaseRefresh"></p>
                <div className="autoComplete_wrapper AlignCenter">
                    <input
                        id="autoComplete"
                        type="search"
                        dir="ltr"
                        spellCheck="false"
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="off"
                    />
                </div>
                <br />
                <br />
                <h3 className="AnswerLabel" style={{ visibility: "hidden" }}>
                    Possible Answers
                </h3>
                <hr
                    className="AnswerLabel bg-white WidthControl50 mb-3"
                    style={{ visibility: "hidden" }}
                />
                <h4 id="AnswerResults">
                    <br />
                </h4>
                <br />
                <br />
                <p>
                    <br />
                </p>
                <div
                    style={{ position: "absolute", bottom: 0 }}
                    className={`gap-2 mb-5 ${
                        isMobile ? "btn-group-vertical" : "btn-group"
                    }`}
                >
                    <button className="btn btn-primary RefreshDatabase">
                        Refresh Database Manually
                    </button>
                    <button
                        disabled
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#ReportIssue"
                    >
                        Report Question/ Answer Pair
                    </button>
                </div>
                <Modal
                    ID="ReportIssue"
                    Title="Report a Question Set"
                    SubmitLang="Report Question"
                    SubmitID="SubmitReportedQuestion"
                    CloseLang="Cancel"
                >
                    <div className="text-left form-group">
                        <div className="form-group">
                            <label
                                className="col-form-label"
                                htmlFor="ReportQuest"
                            >
                                Question
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                disabled
                                value="Question Will go Here"
                            ></input>
                            <label
                                className="col-form-label"
                                htmlFor="ReportQuest"
                            >
                                Answer
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                disabled
                                value="Answer Array Here"
                            ></input>
                            <label
                                className="col-form-label"
                                htmlFor="ReportQuest"
                            >
                                Color
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                disabled
                                value="Color"
                            ></input>
                            <label
                                className="col-form-label"
                                htmlFor="ReportQuest"
                            >
                                Category
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                disabled
                                value="Category Listed Here"
                            ></input>
                        </div>
                    </div>
                </Modal>
            </div>
        </Layout>
    )
}

export default QuestionLookup

//#region Reporting Questions
var CachedQuestion = ""

async function ReportQuestion() {
    let ReportedID = JSON.stringify(CachedQuestion[3])
    ReportedID = JSON.parse(ReportedID)
    console.log(ReportedID)
    /*
    let response = await fetch(
        "https://coinhuntworldtrivia.com/.netlify/functions/ReportQuestion",
        {
            body: ReportedID,
            method: "POST",
        }
    )
    if (response.status === 200) {
        let data = await response.json()
        RequestedData = data
        return
    }
    */
}

//#endregion

//#region SearchFunction Code

var RequestedData = []
var TempDate = new Date()
var ExpirationDate = new Date()
var HourInUTC = TempDate.getUTCHours()

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
        RequestedData = data
        return
    }
}

async function GetQuestions() {
    await ContactAPI()
    localStorage.setItem("Cache", JSON.stringify(RequestedData))
    createCookie("Cache", "True", ExpirationDate.toGMTString())

    var QuestionList = []
    for (let i = 0; i < RequestedData.length; i++) {
        QuestionList.push(RequestedData[i][0])
    }
    return QuestionList
}

async function CheckCache() {
    $(".RefreshDatabase").off("click", RefreshDatabase)
    $(".RefreshDatabase").on("click", RefreshDatabase)
    if (readCookie("Cache") !== +(+null) && readCookie("Cache") !== +"") {
        RequestedData = JSON.parse(localStorage.getItem("Cache"))
        var QuestionList = []
        for (let i = 0; i < RequestedData.length; i++) {
            QuestionList.push(RequestedData[i][0])
        }
        return QuestionList
    } else {
        return await GetQuestions()
    }
}

function LoadQuestions() {
    $("#SubmitReportedQuestion").on("click", ReportQuestion)
    document.getElementById("DatabaseRefresh").innerText = SetDatabaseRefresh()
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
    for (let i = 0; i < RequestedData.length; i++) {
        if (selection === RequestedData[i][0]) {
            CachedQuestion = RequestedData[i]
            var Answer = JSON.parse(RequestedData[i][1])
            Answer = Answer.join("<br><br>")
            $(".AnswerLabel").css("visibility", "visible")
            document.getElementById("AnswerResults").innerHTML = Answer
        }
    }
}

function createCookie(name, value, Expiration) {
    var expires
    if (Expiration) {
        expires = "; expires=" + Expiration
    } else expires = ""
    document.cookie = name + "=" + value + expires + "; path=/"
}

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

function eraseCookie(name) {
    createCookie(name, "", -1)
}

function SetDatabaseRefresh() {
    var TimePeriod = ""
    var ExpirationHour = ExpirationDate.getHours()
    if (ExpirationHour >= 12) {
        TimePeriod = "PM"
        if (ExpirationHour > 12) {
            ExpirationHour = ExpirationHour - 12
        }
    } else {
        TimePeriod = "AM"
    }

    return `Database Will Refresh at: ${ExpirationHour}:${String(
        ExpirationDate.getMinutes()
    ).padStart(2, "0")}${TimePeriod}`
}

//#endregion
