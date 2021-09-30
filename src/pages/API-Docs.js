import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../components/CSS/SpecialFormats.css"

function APIDocs() {
    return (
        <Layout>
            <Seo title="API Documentation" />
            <div className="WidthControl65">
                <h1 className="text-center">API Documentation</h1>
                <div className="AlternateIndent">
                    <p>Where to Access Our APIs:</p>
                    <p>Simply use our site's URL then .com/API/API-Name</p>
                    <p>What APIs We offer:</p>
                    <p>
                        We Currently offer Two APIs which are ExportJSON and
                        MassDupeCheck. ExportJSON Allows anyone to ping our
                        database and the API will return every question set
                        which includes the Question, Category, Color, every
                        reported answer for that question. The MassDupeCheck API
                        allows users with more technical experience to send a
                        JSON array with new possible answers to be approved or
                        declined all at once.
                    </p>
                    <p>ExportJSON</p>
                    <p>
                        No Input Data is required to Access the API. The API
                        will return a JSON Object Array in the following format
                        <div className="NoIndent CodeBlock">
                            Results[SetNumber] = Each Question Set
                            <br />
                            Results[SetNumber][0] = Question
                            <br />
                            Results[SetNumber][1] = Answers as Strigified Array
                            <br />
                            Results[SetNumber][2] = Vault Color
                            <br />
                            Results[SetNumber][3] = Vault Category
                            <br />
                            Results[SetNumber][4] = Timestamp (Milliseconds
                            Since Epoch)
                        </div>
                    </p>
                    <p>MassDupeCheck</p>
                    <p>
                        MassDupeCheck can Handle 1-Reasonable Amount of question
                        sets in one API call. The Bare minimum information
                        required by the API is Question and The Answer. The API
                        does require Specific formating which is below (All
                        Formated as Strings). The API will return all data
                        inputted with the only modification of changing the
                        ApprovalStatus object. False means it is a duplicate and
                        true means Possible new addition.
                        <div className="NoIndent CodeBlock">
                            SentData[SetNumber] = QuestionSet
                            <br />
                            Results[SetNumber].Question = Question
                            <br />
                            Results[SetNumber].Answer = Answer
                            <br />
                            Results[SetNumber].ApprovalStatus = ' ' (Must Be
                            Undefined)
                            <br />
                            Results[SetNumber].Category = Category (Not
                            Required)
                            <br />
                            Results[SetNumber].Color = Color (Not Required)
                        </div>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default APIDocs
