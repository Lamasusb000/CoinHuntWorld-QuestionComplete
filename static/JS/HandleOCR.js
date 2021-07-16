document.getElementById("ScreenshotSubmission").addEventListener("change", ImageToURL);

function ImageToURL() {
    const file = document.getElementById('ScreenshotSubmission').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      SetCroppie(reader.result)
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }
function LogPercent(Log){
    if (Log.status == "recognizing text"){
        document.getElementById("TextOutput").innerText = `${(Log.progress * 100).toFixed(2)}% Done`
    }
}


function ProcessSubmission(DataURL){
Tesseract.recognize(
    `${DataURL}`,
    'eng',
    { logger: m => LogPercent(m) }
  ).then(({ data: { text } }) => {
    var TextArray = text.split(`\n`)
    console.log(TextArray)
  })
}

function SetCroppie(DataURL){
    $(function() {
        var basic = $('#demo-basic').croppie({
          viewport: {
            width: 300,
            height: 100
          }
        });
        basic.croppie('bind', {
          url: `${DataURL}`
        });
        document.getElementById("basic-result").addEventListener("click", function(){
          basic.croppie("result",'base64').then(function(base64) {
            ProcessSubmission(base64)
        });
        })
      });
}