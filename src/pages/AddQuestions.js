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
        <button type="button" id="Modal-Opener" className="btn btn-primary" data-toggle="modal" data-target="#SubmissionModal">
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
                <button type="button" className="btn btn-secondary RestartPage">Restart Process</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" id="basic-result" className="btn btn-primary">Submit Snip</button>
            </div>
            </div>
        </div>
        </div>
        <form autoComplete="off" id="SubmissionVerification" style={{
            visibility: "hidden",
            textAlign: "left",
            margin: "auto",
            width: "50%"}}>
            <div className="form-group">
                <label htmlFor="CategoryVerification">Verify Category</label>
                <input type="text" className="form-control" id="CategoryVerification"/>
            </div>
            <div className="form-group">
                <label htmlFor="QuestionVerification">Verify Question</label>
                <input type="text" className="form-control" id="QuestionVerification"/>
            </div>
            <div className="form-group">
                <label htmlFor="AnswerVerification">Verify Answer</label>
                <input type="text" className="form-control" id="AnswerVerification"/>
            </div>
            <div className="form-group">
                <label htmlFor="QuestionVerification">Select Vault Color</label>
                <select className="form-control" id="ColorVerification" defaultValue="">
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Red">Red</option>
                    <option value="Purple">Purple</option>
                </select>
                <small className="form-text">If You Do Not Remember, The Countdown Timer Color is Also The Vault Color</small>
                <small id="ImageCallback" style={{textDecoration: "underline", cursor: "pointer"}} className="form-text" data-toggle="modal" data-target="#ImageReviewModal">Click Here To Check Again</small>
            </div>
            <button className="btn btn-primary"type="button" id="FormSubmission">Submit Form</button>
        </form>

        <div className="modal fade" id="ImageReviewModal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <img id="ImageReviewerObj" alt="ReviewImage"/>
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>

        <div style={{display: "none"}} id="SuccessPage">
            <h1>
                You have Successfully Submitted a Question!
            </h1>
            <button type="button" className="btn btn-primary RestartPage">
                Submit Another Question!
            </button>
        </div>

        <div style={{display: "none"}} id="FailurePage">
            <h1>
                The Question is Already in our Database. <br/> Please Try Again
            </h1>
            <button type="button" className="btn btn-primary RestartPage">
                Submit Another Question!
            </button>
        </div>

        <div style={{display: "none"}} id="ErrorPage">
            <h1>
                Something Went Wrong. Please Reach out to a Dev
            </h1>
            <button type="button" className="btn btn-primary RestartPage">
                Submit Another Question!
            </button>
        </div>
    </div>
  </Layout>
)

export default QuestionLookup