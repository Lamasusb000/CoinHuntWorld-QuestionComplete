document.getElementById("ScreenshotSubmission").addEventListener("change", ImageToURL);

function ImageToURL() {
    const preview = document.querySelector('img');
    const file = document.getElementById('ScreenshotSubmission').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      ProcessSubmission(reader.result)
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
    document.getElementById("TextOutput").innerText = text;
  })
}