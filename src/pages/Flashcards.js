import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import "../components/CSS/Leaderboards.css"
import $ from "jquery"

const Flashcards = () => (
    <Layout>
        <Seo title="Home" />
        <JSimport File="Cookie.js" />

        <div className="WidthControl80 text-white FormStart">
            <h3 className="text-center">
                Welcome To The Flash Card Practice Area!
            </h3>
            <p className="text-center">Let's Get Started Below</p>
        </div>
        <div className="WidthControl50 text-dark FormStart">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label
                        className="input-group-text"
                        htmlFor="FlashCardSelection"
                    >
                        Criteria
                    </label>
                </div>
                <select className="custom-select" id="FlashCardSelection">
                    <option disabled defaultValue="true">
                        -- Choose an Option --{" "}
                    </option>
                    <option value="Blue">Blue Vaults</option>
                    <option value="Green">Green Vaults</option>
                    <option value="Yellow">Yellow Vaults</option>
                    <option value="Red">Red Vaults</option>
                    <option value="Purple">Purple Vaults</option>
                </select>
                <div className="input-group-append">
                    <button
                        onClick={StartTrivia}
                        type="button"
                        className="btn btn-primary"
                    >
                        Start Trivia
                    </button>
                </div>
            </div>
        </div>
        <div
            className="WidthControl50 text-dark FlashCard"
            style={{ display: "none" }}
        >
            <div className="card">
                <div className="card-header row">
                    <h5 className="col-6 mb-0">Trivia Flash Cards</h5>
                    <h5 id="TriviaCriteria" className="col-6 mb-0 text-right">
                        Loading...
                    </h5>
                </div>
                <div className="card-body AlignCenter">
                    <h5 id="TriviaCategory" className="card-title">
                        Loading...
                    </h5>
                    <div id="TriviaQuestion" className="card-text">
                        Loading...
                    </div>
                    <br />
                    <div
                        id="TriviaAnswer"
                        className="card-text"
                        style={{ visibility: "hidden" }}
                    >
                        Loading...
                    </div>
                    <br />
                    <button
                        onClick={TriviaReveal}
                        id="RevealAnswer"
                        type="button"
                        className="btn btn-primary mr-2 FlashcardButton"
                    >
                        Reveal Answer
                    </button>
                    <button
                        onClick={TriviaNext}
                        id="NextQuestion"
                        type="button"
                        className="btn btn-primary FlashcardButton NextQuestion"
                    >
                        Next Question
                    </button>
                    <button
                        onClick={RestartFlashcards}
                        id="TriviaRestart"
                        type="button"
                        style={{ display: "none", margin: "auto" }}
                        className="btn btn-primary"
                    >
                        Restart
                    </button>
                </div>
                <div id="TriviaCount" className="card-footer text-right">
                    Loading...
                </div>
            </div>
        </div>
    </Layout>
)

export default Flashcards

//#region Flashcards.js Scripts

//Grabbing All Necessary Elements

//Form
var FlashCardSelection = ""

//Flashcards
var TriviaCriteria = ""
var TriviaCategory = ""
var TriviaQuestion = ""
var TriviaAnswer = ""
var TriviaCount = ""

//Buttons
var RevealAnswer = ""
var NextQuestion = ""
var TriviaRestart = ""

//Defining Arrays
var Database = ""
var FlashcardArray = []

//Define Variables
var RandomQuestion = 0
var TriviaLength = 0
var TriviaCompleted = 1

//Start Trivia
function StartTrivia() {
    //#region Set Variables
    Database = JSON.parse(localStorage.getItem("Cache"))
    //Form
    FlashCardSelection = document.getElementById("FlashCardSelection")

    //Flashcards
    TriviaCriteria = document.getElementById("TriviaCriteria")
    TriviaCategory = document.getElementById("TriviaCategory")
    TriviaQuestion = document.getElementById("TriviaQuestion")
    TriviaAnswer = document.getElementById("TriviaAnswer")
    TriviaCount = document.getElementById("TriviaCount")

    //Buttons
    RevealAnswer = document.getElementById("RevealAnswer")
    NextQuestion = document.getElementById("NextQuestion")
    TriviaRestart = document.getElementById("TriviaRestart")
    //#endregion
    window.TriviaStopper = undefined
    window.TriviaPreventor = undefined
    TriviaCompleted = 1
    for (let i = 0; i < Database.length; i++) {
        if (Database[i][4] === FlashCardSelection.value) {
            FlashcardArray.push({
                Question: Database[i][0],
                Answer: Database[i][1],
                Category: Database[i][5],
            })
        }
    }
    //Set Trivia Length
    TriviaLength = FlashcardArray.length

    //Hide Beginning Form and Display Flashcard
    $(".FormStart").css("display", "none")
    $(".FlashCard").css("display", "block")

    //Remove Disabled Attribute From Flashcard Buttons
    $(".FlashcardButton").attr("disabled", false)

    //Set First Question
    RandomQuestion = RandomNumber(0, TriviaLength - 1)
    TriviaCriteria.innerText = `${FlashCardSelection.value} Vaults`
    TriviaCategory.innerText = `${FlashcardArray[RandomQuestion].Category}`
    TriviaQuestion.innerText = `${FlashcardArray[RandomQuestion].Question}`
    TriviaAnswer.innerText = `${JSON.parse(
        FlashcardArray[RandomQuestion].Answer
    )}`
    TriviaCount.innerText = `${TriviaCompleted} / ${TriviaLength}`

    //Remove Placed Question From Bank
    FlashcardArray.splice(RandomQuestion, 1)
}

function TriviaReveal() {
    $(TriviaAnswer).css("visibility", "visible")
    $(RevealAnswer).attr("disabled", true)
}

function TriviaNext() {
    //Check for Completion then reset
    if (TriviaLength === TriviaCompleted) {
        //Hide Menu Buttons
        $(RevealAnswer).css("display", "none")
        $(NextQuestion).css("display", "none")

        //Show Restart Button
        $(TriviaRestart).css("display", "block")
        //Clear Text and Show Completion
        TriviaCategory.innerText = `You Have Finished ${FlashCardSelection.value} Vault Flashcards!`
        TriviaQuestion.innerText = `Press the Button Below to Restart The Process`
        TriviaAnswer.innerText = ""
        return
    }

    //Reset CSS
    $(TriviaAnswer).css("visibility", "hidden")
    $(RevealAnswer).attr("disabled", false)

    //Add To The Question Number
    TriviaCompleted++

    RandomQuestion = RandomNumber(0, FlashcardArray.length - 1)
    TriviaCategory.innerText = `${FlashcardArray[RandomQuestion].Category}`
    TriviaQuestion.innerText = `${FlashcardArray[RandomQuestion].Question}`
    TriviaAnswer.innerText = `${JSON.parse(
        FlashcardArray[RandomQuestion].Answer
    )}`
    TriviaCount.innerText = `${TriviaCompleted} / ${TriviaLength}`

    //Remove Placed Question From Bank
    FlashcardArray.splice(RandomQuestion, 1)
}

//Restart Flashcards
function RestartFlashcards() {
    //Reset CSS
    $(".FormStart").css("display", "block")
    $(".FlashCard").css("display", "none")
    $(TriviaAnswer).css("visibility", "hidden")

    //Hide Reset Button
    $(TriviaRestart).css("display", "none")

    //Unhide Menu Buttons
    $(RevealAnswer).css("display", "inline-block")
    $(NextQuestion).css("display", "inline-block")
}

//Random Number For Random Flash Cards
function RandomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}
//#endregion
