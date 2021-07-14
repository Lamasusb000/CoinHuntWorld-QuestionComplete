import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import JsCdn from "../components/JS-CDN"
import "../components/CSS/AlignCenter.css"
import "../components/CSS/croppie.css"



const QuestionLookup = () => (
  <Layout>
    <Seo title="Home" />
    <JsCdn URL="https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js"/>
    <JSimport File="HandleOCR.js"/>
    <div className="AlignCenter">
        <h4 className="AlignCenter">
            Add Questions
        </h4>
        <input type="file" id="ScreenshotSubmission" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"/>
        <br/><br/>
        <div id="TextOutput">
            <br/>
        </div>
    </div>
  </Layout>
)

export default QuestionLookup
