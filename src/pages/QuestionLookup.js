import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import "../components/CSS/autoCompletes.css"
import "../components/CSS/SpecialFormats.css"
import "../components/CSS/AddingQuestions.css"

const QuestionLookup = () => (
    <Layout>
        <Seo title="Question Lookup" />
        <JSimport File={"autoComplete.js"} />
        <JSimport File="Cookie.js" />
        <JSimport File={"SearchFunction.js"} />
        <div className="AlignCenter">
            <h4 className="AlignCenter">Question Search</h4>
            <p className="text-center" id="DatabaseRefresh"></p>
            <div className="autoComplete_wrapper AlignCenter">
                <input
                    id="autoComplete"
                    type="search"
                    dir="ltr"
                    spellCheck="false"
                    autoCorrect="off"
                    autoComplete="off"
                    autoCapitalize="off"
                />
            </div>
            <br />
            <br />
            <h3 className="AnswerLabel" style={{ visibility: "hidden" }}>
                Possible Answers
            </h3>
            <hr
                className="AnswerLabel bg-white WidthControl50 mb-3"
                style={{ visibility: "hidden" }}
            />
            <h4 id="AnswerResults">
                <br />
            </h4>
            <br />
            <br />
            <p>
                <br />
            </p>
            <div className="text-center mb-5 fixed-bottom">
                <button className="btn btn-primary RefreshDatabase">
                    Refresh Database Manually
                </button>
                <button
                    disabled
                    className="btn btn-primary ml-5"
                    onClick={DudeStop}
                >
                    Report Question/ Answer Pair
                </button>
            </div>
        </div>
    </Layout>
)

export default QuestionLookup

function DudeStop() {
    alert(
        "This Button is still in development. Why did you Undisable it?... Rude..."
    )
}
