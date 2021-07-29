var ScreenshotSubmission = document.getElementById("ScreenshotSubmission")
var ModalOpener = document.getElementById("Modal-Opener")
var SubmissionPrompt = document.getElementById("SubmissionPrompt")
var CroppieContainer = document.getElementById("croppie-basic")
var VerificationSubmission = document.getElementById("FormSubmission")
var SuccessPage = document.getElementById("SuccessPage")
var FailurePage = document.getElementById("FailurePage")
var ErrorPage = document.getElementById("ErrorPage")
var OneTimeLoad = false

SubmissionPrompt.style.visibility = "hidden"

$("#Modal-Opener").off("click", StartPage)
$("#Modal-Opener").on("click", StartPage)

$(".RestartPage").off("click", ReloadPage)
$(".RestartPage").on("click", ReloadPage)

$(".Signup").off("click", OpenNetlify)
$(".Signup").on("click", OpenNetlify)

$("input[type=radio]").off("click", SetColor)
$("input[type=radio]").on("click", SetColor)

function OpenNetlify(){
  netlifyIdentity.open()
  $(".btnClose").off("click", ReloadPage)
  $(".btnClose").on("click", ReloadPage)  
}
function ReloadPage(){
  location.reload()
}

function StartPage(){
  if(OneTimeLoad == false){
    if (netlifyIdentity.currentUser() == undefined | netlifyIdentity.currentUser() == null){
      NetlifySignup()
    }else{
      $("#SubmissionModal").modal("show")
    }
    ScreenshotSubmission.addEventListener("change", ImageToURL);
    VerificationSubmission.addEventListener("click", SendToDatabase)
    document.getElementById("ImageCallback").addEventListener("click", ReviewImage)
  }
}
var ImageCallbackStorage = ""

function ImageToURL() {
    ScreenshotSubmission.style.visibility = "hidden"
    if (SubmissionPrompt.style.visibility == "hidden"){
      SubmissionPrompt.style.visibility = "visible"
    }
    SubmissionPrompt.style.visibility = "visible"
    const file = ScreenshotSubmission.files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      SetCroppie(reader.result)
      ImageCallbackStorage = reader.result
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }
function LogPercent(Log){
    if (Log.status == "recognizing text"){
        document.getElementById("TextOutput").innerText = `${(Log.progress * 100).toFixed(2)}% Done`
        if (Log.progress == 1){
          document.getElementById("TextOutput").innerText = ""
        }
    }
}

function NetlifySignup(){
  ModalOpener.style.display = "none"
  VerificationContainer.style.display = "none"

  document.getElementById("CreateAccount").style.display = "block"
}

function ProcessSubmission(DataURL, Count){
Tesseract.recognize(
    `${DataURL}`,
    'eng',
    { logger: m => LogPercent(m) }
  ).then(({ data: { text } }) => {
    var TextArray = text.split(`\n`)
    FormatSubmission(TextArray, Count)
  })
}
var SubmissionArray = []
function FormatSubmission(Submission, Count){
  var TempObj = []
  for (let i = 0; i < Submission.length; i++) {
    if (Submission[i] != "") {
      TempObj.push(Submission[i])
    }
  }
  TempObj = TempObj.join(" ")
  SubmissionArray[Count] = TempObj
  if(SubmissionArray.length == 3){
    SendVerificaiton()
  }
}

var BasicResult = document.getElementById("basic-result")
var CroppieController = false
var ResolutionSelection = 0


let ResolutionArray = [
  {
    "Resolution": {"X": 0, "Y": 0},
    "Viewport": [
      {"X": 300, "Y": 60},
      {"X": 300, "Y": 100},
      {"X": 300, "Y": 60}
    ],
    "Points": [
      [0.084541063, 0.223214286, 0.917874396, 0.200892857],
      [0.084541063, 0.223214286, 0.917874396, 0.200892857],
      [0.084541063, 0.223214286, 0.917874396, 0.200892857]
    ]
  },
  {
    "Resolution": {"X": 9, "Y": 19.5, "RatioLow": 2.16, "RatioHigh": 2.18},
    "Viewport": [
      {"X": 300, "Y": 60},
      {"X": 300, "Y": 100},
      {"X": 300, "Y": 60}
    ],
    "Points": [
      [0.084541063, 0.223214286, 0.917874396, 0.200892857],
      [0.024154589, 0.295758929, 0.966183575, 0.558035714],
      [0.108695652, 0.5859375, 0.881642512, 0.608258929]
    ]
  },
  {
    "Resolution": {"X": 9, "Y": 19, "RatioLow": 2.10, "RatioHigh": 2.12},
    "Viewport": [
      {"X": 300, "Y": 60},
      {"X": 300, "Y": 100},
      {"X": 300, "Y": 60}
    ],
    "Points": [
      [0.084541063, 0.223214286, 0.917874396, 0.200892857],
      [0.024154589, 0.295758929, 0.966183575, 0.558035714],
      [0.108695652, 0.5859375, 0.881642512, 0.608258929]
    ]
  }
]


var CroppieCounter = 0
async function SetCroppie(DataURL){
  ResolutionSelection = GetResolutionSelection(DataURL, CroppieCounter)
    $(function() {
        var Element = document.getElementById("croppie-basic")
        var basic = new Croppie(Element, {
          viewport: { width: ResolutionArray[ResolutionSelection].Viewport[CroppieCounter].X, height: ResolutionArray[ResolutionSelection].Viewport[CroppieCounter].Y},
          boundary: { width: 320, height: 200 },
          showZoomer: false,
          enableResize: true
        });
        basic.bind({
          url: `${DataURL}`,
          points: [window.Points[0], window.Points[1], window.Points[2], window.Points[3]]
        })
        var SubmissionLabel = CroppieCounter
        if (CroppieController == false){
          BasicResult.removeEventListener("click", function(){
            basic.result('base64').then(function(base64) {
              ChangePrompts()
              ProcessSubmission(base64, SubmissionLabel)
              basic.destroy()
              CroppieController = false
          });
          })
          BasicResult.addEventListener("click", function(){
            basic.result('base64').then(function(base64) {
              ChangePrompts()
              ProcessSubmission(base64, SubmissionLabel)
              basic.destroy()
              CroppieController = false
          });
          })
          CroppieController = true
          CroppieCounter++
        }
      });
}

var PointsPush = []
async function GetResolutionSelection(DataURL, CroppieCounter){
  var img = new Image()
  img.onload = function(){
    var ScreenRatio = this.height / this.width
    ScreenRatio = ScreenRatio.toFixed(2)

    ResolutionSelection = 0
    for (let z = 0; z < ResolutionArray.length; z++) {
      if (ResolutionArray[z].Resolution.RatioLow <= ScreenRatio <= ResolutionArray[z].Resolution.RatioHigh){
        ResolutionSelection = z
      }
    }
    Xratio = this.width / ResolutionArray[ResolutionSelection].Resolution.X
    Yratio = this.height / ResolutionArray[ResolutionSelection].Resolution.Y
    PointsPush.push(ResolutionArray[ResolutionSelection].Points[CroppieCounter][0] * this.width)
    PointsPush.push(ResolutionArray[ResolutionSelection].Points[CroppieCounter][1] * this.height)
    PointsPush.push(ResolutionArray[ResolutionSelection].Points[CroppieCounter][2] * this.width)
    PointsPush.push(ResolutionArray[ResolutionSelection].Points[CroppieCounter][3] * this.height)
    window.Points = PointsPush
    PointsPush = []
    return ResolutionSelection
  }
  img.src = DataURL
  
}


var i = 0
var PromptArray = ["Select Question","Select Answer","Select Category"]
function ChangePrompts(){
  if (i >= 2) {
    $("#SubmissionModal").modal("hide")
    SubmissionPrompt.innerText = PromptArray[2]
    SubmissionPrompt.style.visibility = "hidden"
    ScreenshotSubmission.style.visibility = "visible"
    ModalOpener.style.visibility = "hidden"
    CroppieContainer.innerHTML = ""
    CroppieContainer.className = ""
    $("input[type=radio]:first").attr("checked", true)
    i = 0
    return
  }else{
    SubmissionPrompt.innerText = PromptArray[i]
    SetCroppie(ImageCallbackStorage)
    i++
  }
}

var VerificationContainer = document.getElementById("SubmissionVerification")
var CategoryVerification = document.getElementById("CategoryVerification")
var QuestionVerification = document.getElementById("QuestionVerification")
var AnswerVerification = document.getElementById("AnswerVerification")
function SendVerificaiton(){
  CategoryVerification.value = SubmissionArray[0]
  QuestionVerification.value = SubmissionArray[1]
  AnswerVerification.value = SubmissionArray[2]
  VerificationContainer.style.visibility = "visible"
}
var ColorVerification = ""
function SetColor(){
  var Radios = document.getElementsByName("ColorSelection")
  for (let i = 0; i < Radios.length; i++) {
    if (Radios[i].checked){
      ColorVerification = Radios[i].value
    }
    
  }
}
var AlertOnce = true
async function SendToDatabase(){
  var SubmissionCount = localStorage.getItem("SubmissionCount") == null ? 0 : parseInt(localStorage.getItem("SubmissionCount"))
  SubmissionCount++
  localStorage.setItem("SubmissionCount", SubmissionCount)

  if (AlertOnce == true){
    if( SubmissionCount < 4 || SubmissionCount % 5 == 0 ){
      alert("Please Double Check Spelling is Correct Before Submitting")
      AlertOnce = false
      SubmissionCount++
      return
    }
    AlertOnce = false
    SubmissionCount++
  }

  VerificationSubmission.disabled = true
	let response = await fetch("https://coinhuntworldtrivia.com/.netlify/functions/UploadQuestions", {
		body: JSON.stringify({
            Category: `${CategoryVerification.value}`,
            Question: `${QuestionVerification.value}`,
            Answer: `${AnswerVerification.value}`,
            Color: `${ColorVerification}`,
            UserID: `${netlifyIdentity.currentUser().id}`,
            UserEmail: `${netlifyIdentity.currentUser().email}`
        }),
    method: "POST"
	});
	if (response.status === 200){
		let data = await response.text()
    if (data == "Success"){
      VerificationContainer.style.display = "none"
      SuccessPage.style.display = "block"
      console.log(`The Process was an ${data}`)
    }else{
      if (data == "Failed. Already in Database"){
        VerificationContainer.style.display = "none"
        FailurePage.style.display = "block"
        console.log(data)
      }else{
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
