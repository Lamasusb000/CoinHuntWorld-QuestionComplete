import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import JsCdn from "../components/JS-CDN"
import "../components/CSS/SpecialFormats.css"
import "../components/CSS/croppie.css"

import VaultBlue from "../images/VaultBlue.png"
import VaultGreen from "../images/VaultGreen.png"
import VaultYellow from "../images/VaultYellow.png"
import VaultRed from "../images/VaultRed.png"
import VaultPurple from "../images/VaultPurple.png"



const QuestionLookup = () => (
  <Layout>
    <Seo title="Home" />
    <JsCdn URL="https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js"/>
    <JSimport File="HandleOCRV2.js"/>
    <JSimport File="croppie.js"/>
    <JSimport File="BetaTesting.js"/>
    <div className="AlignCenter">
        <h4 className="AlignCenter">
            Add Questions
        </h4>
        <div id="TextOutput">
            <br/>
        </div>
        <button type="button" id="Modal-Opener" className="btn btn-primary">
            Upload File
        </button>

        <div className="modal fade" id="SubmissionModal" tabIndex="-1" role="dialog" aria-labelledby="SubmissionModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="ModalTitle">Let's Upload Your Question</h5>
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
                <textarea type="text" className="form-control" id="QuestionVerification"/>
            </div>
            <div className="form-group">
                <label htmlFor="AnswerVerification">Verify Answer</label>
                <input type="text" className="form-control" id="AnswerVerification"/>
            </div>
            <div className="form-group PictureList">
                <p>Select Vault Color</p>
                <label>
                    <input type="radio" name="ColorSelection" value="Blue"/>
                    <img src={VaultBlue} className="VaultSelection" alt="Blue Vault"/>
                </label>
                <label>
                    <input type="radio" name="ColorSelection" value="Green"/>
                    <img src={VaultGreen} className="VaultSelection" alt="Green Vault"/>
                </label>
                <label>
                    <input type="radio" name="ColorSelection" value="Yellow"/>
                    <img src={VaultYellow} className="VaultSelection" alt="Yellow Vault"/>
                </label>
                <label>
                    <input type="radio" name="ColorSelection" value="Red"/>
                    <img src={VaultRed} className="VaultSelection" alt="Red Vault"/>
                </label>
                <label>
                    <input type="radio" name="ColorSelection" value="Purple"/>
                    <img src={VaultPurple} className="VaultSelection" alt="Purple Vault"/>
                </label>
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

        <div style={{display: "none"}} id="CreateAccount">
            <h2>
                You Have To Create an Account With us First.
            </h2>
            <p>Once Signed Up Just Give A Quick Refresh</p>
            <button type="button" className="btn btn-primary Signup">
                Signup/ Login Here!
            </button>
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
            <span>
                Error Code: 
                <span id="ErrorCode">
                    This
                </span>
            </span>
            <br/>
            <button type="button" className="btn btn-primary RestartPage">
                Submit Another Question!
            </button>
        </div>
    </div>
  </Layout>
)

export default QuestionLookup