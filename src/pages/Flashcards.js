import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import "../components/CSS/Leaderboards.css"

const Flashcards = () => (
    <Layout>
        <Seo title="Home" />
        <JSimport File="Cookie.js" />
        <JSimport File="Flashcards.js" />

        <div className="WidthControl80 text-white FormStart">
            <h3 className="text-center">
                Welcome To The Flash Card Practice Area!
            </h3>
            <p className="text-center">Let's Get Started Below</p>
        </div>
        <div className="WidthControl50 text-dark FormStart">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label
                        className="input-group-text"
                        htmlFor="FlashCardSelection"
                    >
                        Criteria
                    </label>
                </div>
                <select className="custom-select" id="FlashCardSelection">
                    <option disabled defaultValue="true">
                        -- Choose an Option --{" "}
                    </option>
                    <option value="Blue">Blue Vaults</option>
                    <option value="Green">Green Vaults</option>
                    <option value="Yellow">Yellow Vaults</option>
                    <option value="Red">Red Vaults</option>
                    <option value="Purple">Purple Vaults</option>
                </select>
                <div className="input-group-append">
                    <button
                        id="TriviaStart"
                        type="button"
                        className="btn btn-primary"
                    >
                        Start Trivia
                    </button>
                </div>
            </div>
        </div>
        <div
            className="WidthControl50 text-dark FlashCard"
            style={{ display: "none" }}
        >
            <div className="card">
                <div className="card-header row">
                    <h5 className="col-6 mb-0">Trivia Flash Cards</h5>
                    <h5 id="TriviaCriteria" className="col-6 mb-0 text-right">
                        Loading...
                    </h5>
                </div>
                <div className="card-body AlignCenter">
                    <h5 id="TriviaCategory" className="card-title">
                        Loading...
                    </h5>
                    <div id="TriviaQuestion" className="card-text">
                        Loading...
                    </div>
                    <br />
                    <div
                        id="TriviaAnswer"
                        className="card-text"
                        style={{ visibility: "hidden" }}
                    >
                        Loading...
                    </div>
                    <br />
                    <button
                        id="RevealAnswer"
                        type="button"
                        disabled={true}
                        className="btn btn-primary mr-2 FlashcardButton"
                    >
                        Reveal Answer
                    </button>
                    <button
                        id="NextQuestion"
                        type="button"
                        disabled={true}
                        className="btn btn-primary FlashcardButton NextQuestion"
                    >
                        Next Question
                    </button>
                    <button
                        id="TriviaRestart"
                        type="button"
                        style={{ display: "none", margin: "auto" }}
                        className="btn btn-primary"
                    >
                        Restart
                    </button>
                </div>
                <div id="TriviaCount" className="card-footer text-right">
                    Loading...
                </div>
            </div>
        </div>
    </Layout>
)

export default Flashcards
