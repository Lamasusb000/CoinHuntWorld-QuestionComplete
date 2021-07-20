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
    <JSimport File="croppie.js"/>
    <div className="AlignCenter">
        <h4 className="AlignCenter">
            Add Questions
        </h4>
        <div id="TextOutput">
            <br/>
        </div>
        <button type="button" id="Modal-Opener"className="btn btn-primary" data-toggle="modal" data-target="#SubmissionModal">
            Upload File
        </button>

        <div className="modal fade" id="SubmissionModal" tabIndex="-1" role="dialog" aria-labelledby="SubmissionModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="ModalTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="ModalBody" className="modal-body">
                <input type="file" id="ScreenshotSubmission" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"/>
                <h3 id="SubmissionPrompt">
                    Select Category
                </h3>
                <div id="page">
                    <div id="croppie-basic">
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" id="basic-result" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        <form id="SubmissionVerification" style={{visibility: "hidden"}}>
            <label>
                Verify Category
                <input id="CategoryVerification"/>
            </label>
            
            <br/>
            <label>Verify Question</label>
            <input id="QuestionVerification"/>
            <br/>
            <label>Verify Answer</label>
            <input id="AnswerVerification"/>
            <br/>
            <label>Select Vault Color</label>
            <select id="ColorVerification">
                <option value="Unknown">Unknown</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Red">Red</option>
                <option value="Purple">Purple</option>
            </select>
            <br/><br/>
            <button type="button" id="FormSubmission">Submit Form</button>
        </form>
    </div>
  </Layout>
)

export default QuestionLookup
