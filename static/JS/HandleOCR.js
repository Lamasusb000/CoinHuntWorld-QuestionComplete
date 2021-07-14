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



function ProcessSubmission(DataURL){
Tesseract.recognize(
    `${DataURL}`,
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    document.getElementById("TextOutput").innerText = text;
  })
}