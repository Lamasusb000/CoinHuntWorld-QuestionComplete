var ScreenshotSubmission = document.getElementById("ScreenshotSubmission")
var ModalOpener = document.getElementById("Modal-Opener")
var SubmissionPrompt = document.getElementById("SubmissionPrompt")
var CroppieContainer = document.getElementById("croppie-basic")
var ColorVerification = document.getElementById("ColorVerification")
var VerificationSubmission = document.getElementById("FormSubmission")



window.removeEventListener("load", StartPage)
window.addEventListener("load",StartPage)


var OneTimeLoad = false
function StartPage(){
  if(OneTimeLoad == false){
    var OneTimeLoad = true
    SubmissionPrompt.style.visibility = "hidden"
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

function ProcessSubmission(DataURL){
Tesseract.recognize(
    `${DataURL}`,
    'eng',
    { logger: m => LogPercent(m) }
  ).then(({ data: { text } }) => {
    var TextArray = text.split(`\n`)
    FormatSubmission(TextArray)
  })
}
var SubmissionArray = []
function FormatSubmission(Submission){
  var TempObj = []
  for (let i = 0; i < Submission.length; i++) {
    if (Submission[i] != "") {
      TempObj.push(Submission[i])
    }
  }
  TempObj = TempObj.join(" ")
  SubmissionArray.push(TempObj)
  if(SubmissionArray.length == 3){
    SendVerificaiton()
  }
}

var BasicResult = document.getElementById("basic-result")
var CroppieController = false
function SetCroppie(DataURL){
    $(function() {
        var basic = $('#croppie-basic').croppie({
          viewport: {
            width: 300,
            height: 100
          }
        });
        basic.croppie('bind', {
          url: `${DataURL}`
        });
        if (CroppieController == false){
          BasicResult.addEventListener("click", function(){
            basic.croppie("result",'base64').then(function(base64) {
              ChangePrompts()
              ProcessSubmission(base64)
          });
          })
          CroppieController = true
          Object.freeze(CroppieController)
        }
      });
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
    i = 0
    return
  }else{
    SubmissionPrompt.innerText = PromptArray[i]
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

function SendToDatabase(){
  var SendingData = []
  SendingData.Category = CategoryVerification.value
  SendingData.Question = QuestionVerification.value
  SendingData.Answer = AnswerVerification.value
  SendingData.Color = ColorVerification.value
  console.log(SendingData)
}

function ReviewImage() {
  document.getElementById("ImageReviewerObj").src = ImageCallbackStorage
}

StartPage()