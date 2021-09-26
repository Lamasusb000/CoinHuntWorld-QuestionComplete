import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Modal from "../components/Modal"

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

function BatchUpload() {
    React.useEffect(() => {})
    return (
        <Layout>
            <Seo title="Batch Upload" />
            <div className="text-center">
                <button
                    id="StartUploadingButton"
                    type="button"
                    data-toggle="modal"
                    data-target="#StartUploading"
                    className="btn btn-primary"
                >
                    Start Uploading
                </button>
            </div>
            <Modal Title="Batch Uploading" ID="StartUploading" Buttons={false}>
                <div id="SubmissionPrompt" className="custom-file">
                    <input
                        type="file"
                        id="BatchUpload"
                        className="custom-file-input"
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        multiple
                        required
                        onChange={DetectUpload}
                    />
                    <label className="custom-file-label" htmlFor="BatchUpload">
                        Upload Multiple Screenshots
                    </label>
                    <div className="invalid-feedback">Invalid Upload</div>
                </div>
            </Modal>
            <div
                id="ProgressFrame"
                className="WidthControl50"
                style={{ display: "none" }}
            >
                <h3 className="text-center">Processing...</h3>
                <br />
                <div className="progress" style={{ width: "100%" }}>
                    <div
                        id="UploadProgress"
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow="1"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "0%" }}
                    >
                        75%
                    </div>
                </div>
            </div>
            <div id="page">
                <div id="CroppieContainer" style={{ display: "block" }}></div>
            </div>
            <div
                id="SnapContainer"
                className="text-center"
                style={{ display: "none" }}
            >
                <button
                    disabled
                    id="Snap"
                    type="button"
                    className="btn btn-primary"
                >
                    Snap
                </button>
            </div>
            <form
                autoComplete="off"
                id="SubmissionVerification"
                style={{
                    display: "none",
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
                    <label htmlFor="AnswerVerification">Verify Answer</label>
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
                        <input type="radio" name="ColorSelection" value="Red" />
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
                    <small className="form-text text-white">
                        If You Do Not Remember, The Countdown Timer Color is
                        Also The Vault Color
                    </small>
                    <small
                        id="ImageCallback"
                        style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                        className="form-text text-white"
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
                id="CompletionScreen"
                className="WidthControl50"
                style={{ display: "none" }}
            >
                <h3 className="text-center">Let's Check Your Statistics!</h3>
                <hr />
                <div className="form-group row justify-content-center">
                    <label
                        htmlFor="UploadedAdditions"
                        className="col-sm-3 col-form-label"
                    >
                        Sets Uploaded
                    </label>
                    <div className="col-sm-3">
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="UploadedAdditions"
                            placeholder="# Processed"
                        />
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <label
                        htmlFor="AwaitingAdditions"
                        className="col-sm-3 col-form-label"
                    >
                        Await Result
                    </label>
                    <div className="col-sm-3">
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="AwaitingAdditions"
                            placeholder="# Processed"
                        />
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <label
                        htmlFor="SuccessfulAdditions"
                        className="col-sm-3 col-form-label"
                    >
                        Successful Additions
                    </label>
                    <div className="col-sm-3">
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="SuccessfulAdditions"
                            placeholder="# Processed"
                        />
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <label
                        htmlFor="DuplicateAdditions"
                        className="col-sm-3 col-form-label"
                    >
                        Duplicates
                    </label>
                    <div className="col-sm-3">
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="DuplicateAdditions"
                            placeholder="# Processed"
                        />
                    </div>
                </div>
                <div
                    id="NoNewSets"
                    style={{ display: "none" }}
                    className="form-group row justify-content-center"
                >
                    <p className="col-sm-6 text-center">
                        Unfortunately All Questions Uploaded Were Duplicates.
                    </p>
                </div>
                <div className="form-group row justify-content-center">
                    <button
                        disabled={true}
                        className="btn btn-primary col-sm-6"
                        id="RestartPage"
                        type="button"
                        onClick={RestartPage()}
                    >
                        Submit More!
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default BatchUpload

//#region HandleOCRV3

function RestartPage() {
    window.location.reload()
}
var UploadedQuestionCount = 0
var FilesAsDataURL = []
async function DetectUpload() {
    $("#StartUploadingButton").css("display", "none")
    $("#ProgressFrame").css("display", "block")
    $("#SnapContainer").css("display", "block")
    window.$("#StartUploading").modal("hide")
    var FileSubmission = document.getElementById("BatchUpload").files
    UploadedQuestionCount = FileSubmission.length
    for (let i = 0; i < UploadedQuestionCount; i++) {
        FilesAsDataURL.push(await ReadFile(FileSubmission[i]))
    }
    SetCroppie()
}

function ReadFile(File) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()

        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsDataURL(File)
    })
}

var CroppieCounter = 0
var CropCount = 0
var ResolutionSelection = 0
var CompletedCrops = 0
var StagedQuestions = []
async function SetCroppie() {
    //Result Buttons Goes Here... Needs Modal.js Update

    for (let i = 0; i < FilesAsDataURL.length; i++) {
        for (let l = 0; l < 3; l++) {
            var basic = await AutoCrop(i)
            if (l === 2) {
                await WaitForSnap()
            }
            basic.result("base64").then(function (base64) {
                StagedQuestions.push(base64)
                ProcessSubmission(base64, CropCount)
                CropCount++
            })
            await basic.destroy()
        }
        CompletedCrops++
        UpdateProgressBar(
            "UploadProgress",
            CompletedCrops / UploadedQuestionCount
        )
    }
    $("#ProgressFrame").css("display", "none")
    $("#SnapContainer").css("display", "none")
}
async function WaitForSnap() {
    $("#Snap").prop("disabled", false)
    return new Promise(resolve => {
        $("#Snap").on("click", function () {
            $("#Snap").prop("disabled", true)
            resolve("success")
        })
    })
}
async function AutoCrop(i) {
    ResolutionSelection = await GetResolutionSelection(
        FilesAsDataURL[i],
        CroppieCounter
    )
    return new Promise(resolve => {
        try {
            if (!ResolutionSelection) {
                ResolutionSelection = 0
            }
            var Element = document.getElementById("CroppieContainer")
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
                url: `${FilesAsDataURL[i]}`,
                points: [Points[0], Points[1], Points[2], Points[3]],
            })
            setTimeout(() => {
                resolve(basic)
            }, 400)
            CroppieCounter++
            if (CroppieCounter === 3) {
                CroppieCounter = 0
            }
        } catch (err) {
            console.log(
                `${err}, ResolutionSelection is ${ResolutionSelection}, Croppie Counter is at ${CroppieCounter}`
            )
            alert(
                `${err}, ResolutionSelection is ${ResolutionSelection}, Croppie Counter is at ${CroppieCounter}`
            )
        }
    })
}

var PointsPush = []
var Points = []
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
async function GetResolutionSelection(DataURL, CroppieCounter) {
    return new Promise(resolve => {
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
            Points = PointsPush
            PointsPush = []
            resolve(ResolutionSelection)
        }
        img.src = DataURL
    })
}
var TesseractReturn = []
async function ProcessSubmission(DataURL, Count) {
    Tesseract.recognize(`${DataURL}`, "eng").then(({ data: { text } }) => {
        TesseractReturn = text.split(`\n`)
        FormatSubmission(TesseractReturn, Count)
    })
}

var SubmissionArray = []
var BulkUploadArray = []

async function FormatSubmission(Submission, Count) {
    var TempObj = []
    for (let i = 0; i < Submission.length; i++) {
        if (Submission[i] !== "") {
            TempObj.push(Submission[i])
        }
    }
    TempObj = TempObj.join(" ")
    SubmissionArray[Count] = TempObj
    if (SubmissionArrayCheck()) {
        BulkUploadArray.push(SubmissionArray)
        CheckEligibility()
    }
}
function SubmissionArrayCheck() {
    if (SubmissionArray.length === UploadedQuestionCount * 3) {
        for (let z = 0; z < SubmissionArray.length; z++) {
            if (!SubmissionArray[z]) {
                return false
            }
        }
        return true
    }
}

function UpdateProgressBar(ID, Percent) {
    Percent = (Percent * 100).toFixed(0)
    document.getElementById(ID).style.width = `${Percent}%`
    document.getElementById(ID).innerText = `${Percent}%`
    document.getElementById(ID).ariaValueNow = Percent
}

var VerifiedQuestions = []
var FormatedQuesitons = []
async function CheckEligibility() {
    let k = 0
    for (let i = 0; i < UploadedQuestionCount; i++) {
        VerifiedQuestions.push(SubmissionArray[k + 1])
        FormatedQuesitons[i] = {
            Category: SubmissionArray[k],
            Question: SubmissionArray[k + 1],
            Answer: SubmissionArray[k + 2],
            ApprovalStatus: "",
        }
        k = k + 3
    }
    DupeCheck()
}

async function DupeCheck() {
    let response = await fetch(
        "https://coinhuntworldtrivia.com/.netlify/functions/MassDupeCheck",
        {
            body: JSON.stringify(FormatedQuesitons),
            method: "POST",
        }
    )
    if (response.status === 200) {
        //Success
        FormatedQuesitons = await response.json()
        StartVerification()
    } else {
        alert(
            `Error Code: ${response.status}. Serverside Error. If Repeating please report to @CHW_Trivia on Twitter`
        )
    }
}
var ApprovedQuestions = []
async function StartVerification() {
    console.log(FormatedQuesitons)
    netlifyIdentity.init({})
    for (let i = 0; i < FormatedQuesitons.length; i++) {
        if (FormatedQuesitons[i].ApprovalStatus === true) {
            ApprovedQuestions.push(FormatedQuesitons[i])
        } else {
            FailedUploads++
        }
    }
    if (ApprovedQuestions.length < 1) {
        //Alert User to No New Questions Being Submit
        CompleteScreen()
        $("#NoNewSets").css("display", "block")
        $("#RestartPage").prop("disabled", false)
        return
    }
    console.log(`${ApprovedQuestions.length} Sets Approved`)

    $("#SubmissionVerification").css("display", "block")
    //Fill The Form
    console.log("Form Filling")
    for (let i = 0; i < ApprovedQuestions.length; i++) {
        $("#CategoryVerification").val(ApprovedQuestions[i].Category)
        $("#QuestionVerification").val(ApprovedQuestions[i].Question)
        $("#AnswerVerification").val(ApprovedQuestions[i].Answer)
        console.log("Form Filled")
        await AwaitSubmit(i)

        ApprovedQuestions[i] = {
            Question: $("#QuestionVerification").val(),
            Answer: $("#AnswerVerification").val(),
            Category: $("#CategoryVerification").val(),
            Color: await SetColor(),
            UserID: netlifyIdentity.currentUser().id,
            UserEmail: netlifyIdentity.currentUser().email,
        }
        var Radios = document.getElementsByName("ColorSelection")
        for (let k = 0; k < Radios.length; k++) {
            if (Radios[k].checked) {
                Radios[k].checked = false
            }
        }
        SendQuestions(i)
    }
    CompleteScreen()
    $("#SubmissionVerification").css("display", "none")
    $("#CompletionScreen").css("display", "block")
}

async function AwaitSubmit() {
    return new Promise(resolve => {
        $("#FormSubmission").on("click", async function () {
            if (!(await SetColor())) {
                alert("Please Select Vault Color")
            } else {
                resolve()
            }
        })
    })
}
var ColorVerification = ""
async function SetColor() {
    return new Promise(resolve => {
        var Radios = document.getElementsByName("ColorSelection")
        for (let i = 0; i < Radios.length; i++) {
            if (Radios[i].checked) {
                ColorVerification = Radios[i].value
            }
        }
        resolve(ColorVerification)
    })
}

var SuccessfulUploads = 0
var FailedUploads = 0
async function SendQuestions(SetNumber) {
    let response = await fetch(
        "https://coinhuntworldtrivia.com/.netlify/functions/UploadQuestions",
        {
            body: JSON.stringify({
                Question: ApprovedQuestions[SetNumber].Question,
                Answer: ApprovedQuestions[SetNumber].Answer,
                Category: ApprovedQuestions[SetNumber].Category,
                Color: ApprovedQuestions[SetNumber].Color,
                UserID: ApprovedQuestions[SetNumber].UserID,
                UserEmail: ApprovedQuestions[SetNumber].UserEmail,
            }),
            method: "POST",
        }
    )
    if (response.status === 200) {
        let data = await response.text()
        if (data === "Success") {
            SuccessfulUploads++
        } else {
            if (data === "Failed. Already in Database") {
                FailedUploads++
                console.log(data)
            } else {
                FailedUploads++
                console.log(`Unknown Data Callback: ${data}`)
            }
        }
    } else {
        FailedUploads++
        console.log(`Unknown Data Callback`)
    }
    await CompleteScreen()
}

async function CompleteScreen() {
    $("#UploadedAdditions").val(UploadedQuestionCount)
    $("#AwaitingAdditions").val(
        UploadedQuestionCount - SuccessfulUploads - FailedUploads
    )
    $("#SuccessfulAdditions").val(SuccessfulUploads)
    $("#DuplicateAdditions").val(FailedUploads)

    if (UploadedQuestionCount - SuccessfulUploads - FailedUploads === 0) {
        $("#RestartPage").prop("disabled", false)
        if (SuccessfulUploads == 0) {
            $("#NoNewSets").css("display", "block")
        }
    }
}
//#endregion
