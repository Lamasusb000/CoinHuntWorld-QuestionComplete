import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Tesseract from "tesseract.js"
import Croppie from "croppie"
import $ from "jquery"
import netlifyIdentity from "netlify-identity-widget"
import "../components/CSS/SpecialFormats.css"
import "../components/CSS/croppie.css"

import VaultBlue from "../images/VaultBlue.png"
import VaultGreen from "../images/VaultGreen.png"
import VaultYellow from "../images/VaultYellow.png"
import VaultRed from "../images/VaultRed.png"
import VaultPurple from "../images/VaultPurple.png"

function QuestionLookup() {
    return (
        <Layout>
            <Seo title="Home" />
            <div className="AlignCenter">
                <h4 className="AlignCenter">Add Questions</h4>
                <div id="TextOutput">
                    <br />
                </div>
                <button
                    type="button"
                    id="Modal-Opener"
                    className="btn btn-primary"
                    onClick={StartPage}
                >
                    Upload File
                </button>

                <div
                    className="modal fade"
                    id="SubmissionModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="SubmissionModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalTitle">
                                    Let's Upload Your Question
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div id="ModalBody" className="modal-body">
                                <input
                                    type="file"
                                    id="ScreenshotSubmission"
                                    accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                                />
                                <h3 id="SubmissionPrompt">Select Category</h3>
                                <div id="page">
                                    <div id="croppie-basic"></div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary RestartPage"
                                >
                                    Restart Process
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    id="basic-result"
                                    className="btn btn-primary"
                                >
                                    Submit Snip
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <form
                    autoComplete="off"
                    id="SubmissionVerification"
                    style={{
                        visibility: "hidden",
                        textAlign: "left",
                        margin: "auto",
                        width: "50%",
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="CategoryVerification">
                            Verify Category
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="CategoryVerification"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="QuestionVerification">
                            Verify Question
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="QuestionVerification"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AnswerVerification">
                            Verify Answer
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="AnswerVerification"
                        />
                    </div>
                    <div className="form-group PictureList">
                        <p>Select Vault Color</p>
                        <label>
                            <input
                                type="radio"
                                name="ColorSelection"
                                value="Blue"
                            />
                            <img
                                src={VaultBlue}
                                className="VaultSelection"
                                alt="Blue Vault"
                            />
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="ColorSelection"
                                value="Green"
                            />
                            <img
                                src={VaultGreen}
                                className="VaultSelection"
                                alt="Green Vault"
                            />
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="ColorSelection"
                                value="Yellow"
                            />
                            <img
                                src={VaultYellow}
                                className="VaultSelection"
                                alt="Yellow Vault"
                            />
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="ColorSelection"
                                value="Red"
                            />
                            <img
                                src={VaultRed}
                                className="VaultSelection"
                                alt="Red Vault"
                            />
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="ColorSelection"
                                value="Purple"
                            />
                            <img
                                src={VaultPurple}
                                className="VaultSelection"
                                alt="Purple Vault"
                            />
                        </label>
                        <small className="form-text">
                            If You Do Not Remember, The Countdown Timer Color is
                            Also The Vault Color
                        </small>
                        <small
                            id="ImageCallback"
                            style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                            className="form-text"
                            data-toggle="modal"
                            data-target="#ImageReviewModal"
                        >
                            Click Here To Check Again
                        </small>
                    </div>
                    <button
                        className="btn btn-primary"
                        type="button"
                        id="FormSubmission"
                    >
                        Submit Form
                    </button>
                </form>

                <div
                    className="modal fade"
                    id="ImageReviewModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="mySmallModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <img id="ImageReviewerObj" alt="ReviewImage" />
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ display: "none" }} id="CreateAccount">
                    <h2>You Have To Create an Account With us First.</h2>
                    <p>Once Signed Up Just Give A Quick Refresh</p>
                    <button
                        type="button"
                        className="btn btn-primary Signup"
                        onClick={NetlifyLogin}
                    >
                        Signup/ Login Here!
                    </button>
                </div>

                <div style={{ display: "none" }} id="SuccessPage">
                    <h1>You have Successfully Submitted a Question!</h1>
                    <button
                        type="button"
                        className="btn btn-primary RestartPage"
                    >
                        Submit Another Question!
                    </button>
                </div>

                <div style={{ display: "none" }} id="FailurePage">
                    <h1>
                        The Question is Already in our Database. <br /> Please
                        Try Again
                    </h1>
                    <button
                        type="button"
                        className="btn btn-primary RestartPage"
                    >
                        Submit Another Question!
                    </button>
                </div>

                <div style={{ display: "none" }} id="ErrorPage">
                    <h1>Something Went Wrong. Please Reach out to a Dev</h1>
                    <span>
                        Error Code:
                        <span id="ErrorCode">This</span>
                    </span>
                    <br />
                    <button
                        type="button"
                        className="btn btn-primary RestartPage"
                    >
                        Submit Another Question!
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default QuestionLookup

//#region HandleOCR Code
var ScreenshotSubmission,
    ModalOpener,
    SubmissionPrompt,
    CroppieContainer,
    VerificationSubmission,
    SuccessPage,
    FailurePage,
    ErrorPage = ""

function ReloadPage() {
    window.location.reload()
}
function StartPage() {
    ScreenshotSubmission = document.getElementById("ScreenshotSubmission")
    ModalOpener = document.getElementById("Modal-Opener")
    SubmissionPrompt = document.getElementById("SubmissionPrompt")
    CroppieContainer = document.getElementById("croppie-basic")
    VerificationSubmission = document.getElementById("FormSubmission")
    SuccessPage = document.getElementById("SuccessPage")
    FailurePage = document.getElementById("FailurePage")
    ErrorPage = document.getElementById("ErrorPage")

    SubmissionPrompt.style.visibility = "hidden"
    netlifyIdentity.init({})
    $(".RestartPage").on("click", ReloadPage)
    $("input[type=radio]").on("click", SetColor)
    console.log(netlifyIdentity.currentUser())
    if (
        (netlifyIdentity.currentUser() === undefined) |
        (netlifyIdentity.currentUser() === null)
    ) {
        NetlifySignup()
    } else {
        window.$("#SubmissionModal").modal("show")
    }
    ScreenshotSubmission.addEventListener("change", ImageToURL)
    VerificationSubmission.addEventListener("click", SendToDatabase)
    document
        .getElementById("ImageCallback")
        .addEventListener("click", ReviewImage)
}
var ImageCallbackStorage = ""

function ImageToURL() {
    ScreenshotSubmission.style.visibility = "hidden"
    if (SubmissionPrompt.style.visibility === "hidden") {
        SubmissionPrompt.style.visibility = "visible"
    }
    SubmissionPrompt.style.visibility = "visible"
    const file = ScreenshotSubmission.files[0]
    const reader = new FileReader()

    reader.addEventListener(
        "load",
        function () {
            // convert image file to base64 string
            SetCroppie(reader.result)
            ImageCallbackStorage = reader.result
        },
        false
    )

    if (file) {
        reader.readAsDataURL(file)
    }
}
function LogPercent(Log) {
    if (Log.status === "recognizing text") {
        document.getElementById("TextOutput").innerText = `${(
            Log.progress * 100
        ).toFixed(2)}% Done`
        if (Log.progress === 1) {
            document.getElementById("TextOutput").innerText = ""
        }
    }
}

function NetlifySignup() {
    VerificationContainer = document.getElementById("SubmissionVerification")
    ModalOpener.style.display = "none"
    VerificationContainer.style.display = "none"

    document.getElementById("CreateAccount").style.display = "block"
}
function NetlifyLogin() {
    netlifyIdentity.init({})
    netlifyIdentity.open()
}

function ProcessSubmission(DataURL, Count) {
    Tesseract.recognize(`${DataURL}`, "eng", {
        logger: m => LogPercent(m),
    }).then(({ data: { text } }) => {
        var TextArray = text.split(`\n`)
        FormatSubmission(TextArray, Count)
    })
}
var SubmissionArray = []
function FormatSubmission(Submission, Count) {
    var TempObj = []
    for (let i = 0; i < Submission.length; i++) {
        if (Submission[i] !== "") {
            TempObj.push(Submission[i])
        }
    }
    TempObj = TempObj.join(" ")
    SubmissionArray[Count] = TempObj
    if (SubmissionArray.length === 3) {
        SendVerificaiton()
    }
}

var BasicResult = ""
var CroppieController = false
var ResolutionSelection = 0

var ResolutionArray = [
    {
        Resolution: { X: 0, Y: 0 },
        Viewport: [
            { X: 300, Y: 60 },
            { X: 300, Y: 100 },
            { X: 300, Y: 60 },
        ],
        Points: [
            [0.084541063, 0.223214286, 0.917874396, 0.200892857],
            [0.084541063, 0.223214286, 0.917874396, 0.200892857],
            [0.084541063, 0.223214286, 0.917874396, 0.200892857],
        ],
    },
    {
        Resolution: { X: 9, Y: 19.5, RatioLow: 2.16, RatioHigh: 2.18 },
        Viewport: [
            { X: 300, Y: 60 },
            { X: 300, Y: 100 },
            { X: 300, Y: 60 },
        ],
        Points: [
            [0.084541063, 0.223214286, 0.917874396, 0.200892857],
            [0.024154589, 0.295758929, 0.966183575, 0.558035714],
            [0.108695652, 0.5859375, 0.881642512, 0.608258929],
        ],
    },
    {
        Resolution: { X: 9, Y: 19, RatioLow: 2.1, RatioHigh: 2.12 },
        Viewport: [
            { X: 300, Y: 60 },
            { X: 300, Y: 100 },
            { X: 300, Y: 60 },
        ],
        Points: [
            [0.084541063, 0.223214286, 0.917874396, 0.200892857],
            [0.024154589, 0.295758929, 0.966183575, 0.558035714],
            [0.108695652, 0.5859375, 0.881642512, 0.608258929],
        ],
    },
]

var CroppieCounter = 0
async function SetCroppie(DataURL) {
    BasicResult = document.getElementById("basic-result")
    ResolutionSelection = await GetResolutionSelection(DataURL, CroppieCounter)
    $(function () {
        try {
            if (!ResolutionSelection) {
                ResolutionSelection = 0
            }
            var Element = document.getElementById("croppie-basic")
            var basic = new Croppie(Element, {
                viewport: {
                    width:
                        ResolutionArray[ResolutionSelection].Viewport[
                            CroppieCounter
                        ].X,
                    height:
                        ResolutionArray[ResolutionSelection].Viewport[
                            CroppieCounter
                        ].Y,
                },
                boundary: { width: 320, height: 200 },
                showZoomer: false,
                enableResize: true,
            })
            basic.bind({
                url: `${DataURL}`,
                points: [
                    window.Points[0],
                    window.Points[1],
                    window.Points[2],
                    window.Points[3],
                ],
            })
            var SubmissionLabel = CroppieCounter
            if (CroppieController === false) {
                BasicResult.removeEventListener("click", function () {
                    basic.result("base64").then(function (base64) {
                        ChangePrompts()
                        ProcessSubmission(base64, SubmissionLabel)
                        basic.destroy()
                        CroppieController = false
                    })
                })
                BasicResult.addEventListener("click", function () {
                    basic.result("base64").then(function (base64) {
                        ChangePrompts()
                        ProcessSubmission(base64, SubmissionLabel)
                        basic.destroy()
                        CroppieController = false
                    })
                })
                CroppieController = true
                CroppieCounter++
            }
        } catch (err) {
            alert(`${err}, ResolutionSelection is ${ResolutionSelection}`)
        }
    })
}

var PointsPush = []
async function GetResolutionSelection(DataURL, CroppieCounter) {
    var img = new Image()
    img.onload = function () {
        var ScreenRatio = this.height / this.width
        ScreenRatio = ScreenRatio.toFixed(2)

        ResolutionSelection = 0
        for (let z = 0; z < ResolutionArray.length; z++) {
            if (
                ResolutionArray[z].Resolution.RatioLow <= ScreenRatio &&
                ScreenRatio <= ResolutionArray[z].Resolution.RatioHigh
            ) {
                ResolutionSelection = z
            }
        }
        PointsPush.push(
            ResolutionArray[ResolutionSelection].Points[CroppieCounter][0] *
                this.width
        )
        PointsPush.push(
            ResolutionArray[ResolutionSelection].Points[CroppieCounter][1] *
                this.height
        )
        PointsPush.push(
            ResolutionArray[ResolutionSelection].Points[CroppieCounter][2] *
                this.width
        )
        PointsPush.push(
            ResolutionArray[ResolutionSelection].Points[CroppieCounter][3] *
                this.height
        )
        window.Points = PointsPush
        PointsPush = []
        return ResolutionSelection
    }
    img.src = DataURL
}

var i = 0
var PromptArray = ["Select Question", "Select Answer", "Select Category"]
function ChangePrompts() {
    if (i >= 2) {
        window.$("#SubmissionModal").modal("hide")
        SubmissionPrompt.innerText = PromptArray[2]
        SubmissionPrompt.style.visibility = "hidden"
        ScreenshotSubmission.style.visibility = "visible"
        ModalOpener.style.visibility = "hidden"
        CroppieContainer.innerHTML = ""
        CroppieContainer.className = ""
        $("input[type=radio]:first").attr("checked", true)
        i = 0
        return
    } else {
        SubmissionPrompt.innerText = PromptArray[i]
        SetCroppie(ImageCallbackStorage)
        i++
    }
}

var VerificationContainer,
    CategoryVerification,
    QuestionVerification,
    AnswerVerification = ""
function SendVerificaiton() {
    VerificationContainer = document.getElementById("SubmissionVerification")
    CategoryVerification = document.getElementById("CategoryVerification")
    QuestionVerification = document.getElementById("QuestionVerification")
    AnswerVerification = document.getElementById("AnswerVerification")

    //prettier-ignore
    CategoryVerification.value = SubmissionArray[0].replace(/[^A-Za-z0-9" "]/g, "")
    //prettier-ignore
    QuestionVerification.value = SubmissionArray[1].replace(/[^A-Za-z0-9" ""//?"]/g, "")
    //prettier-ignore
    AnswerVerification.value = SubmissionArray[2].replace(/[^A-Za-z0-9" ""-"]/g, "")
    VerificationContainer.style.visibility = "visible"
}
var ColorVerification = ""
function SetColor() {
    var Radios = document.getElementsByName("ColorSelection")
    for (let i = 0; i < Radios.length; i++) {
        if (Radios[i].checked) {
            ColorVerification = Radios[i].value
        }
    }
}
var AlertOnce = true
async function SendToDatabase() {
    var SubmissionCount =
        localStorage.getItem("SubmissionCount") === null
            ? 0
            : parseInt(localStorage.getItem("SubmissionCount"))
    SubmissionCount++
    localStorage.setItem("SubmissionCount", SubmissionCount)
    SetColor()

    if (AlertOnce === true) {
        if (SubmissionCount < 4 || SubmissionCount % 5 === 0) {
            alert("Please Double Check Spelling is Correct Before Submitting")
            AlertOnce = false
            SubmissionCount++
            return
        }
        AlertOnce = false
        SubmissionCount++
    }

    VerificationSubmission.disabled = true
    let response = await fetch(
        "https://coinhuntworldtrivia.com/.netlify/functions/UploadQuestions",
        {
            body: JSON.stringify({
                Category: `${CategoryVerification.value}`,
                Question: `${QuestionVerification.value}`,
                Answer: `${AnswerVerification.value}`,
                Color: `${ColorVerification}`,
                UserID: `${netlifyIdentity.currentUser().id}`,
                UserEmail: `${netlifyIdentity.currentUser().email}`,
            }),
            method: "POST",
        }
    )
    if (response.status === 200) {
        let data = await response.text()
        if (data === "Success") {
            VerificationContainer.style.display = "none"
            SuccessPage.style.display = "block"
            console.log(`The Process was an ${data}`)
        } else {
            if (data === "Failed. Already in Database") {
                VerificationContainer.style.display = "none"
                FailurePage.style.display = "block"
                console.log(data)
            } else {
                ErrorPage.style.display = "block"
                document.getElementById("ErrorCode").innerText = data
                console.log(`Unknown Data Callback: ${data}`)
            }
        }
    }
}

function ReviewImage() {
    document.getElementById("ImageReviewerObj").src = ImageCallbackStorage
}

//#endregion
