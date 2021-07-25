import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import "../components/CSS/autoCompletes.css"
import "../components/CSS/AlignCenter.css"
import "../components/CSS/ImageRadioButton.css"



const QuestionLookup = () => (
  <Layout>
    <Seo title="Filtered Lookup" />
    <JSimport File={"autoComplete.js"}/>
    <JSimport File={"SearchFunction.js"}/>
    <JSimport Defer={false} File="BetaTesting.js"/>
    <div className="AlignCenter">
        <p>This is in development currently. Regular additions will be taking place</p>
      <h4 className="AlignCenter">
        Question Search
      </h4>
      <div class="autoComplete_wrapper AlignCenter">
        <input id="autoComplete" type="search" dir="ltr" spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="off"/>
      </div>
      <br/><br/>
      <h3 id="AnswerResults">
        <br/>
      </h3>
      <br/><br/>
      <p>
        <br/>
      </p>
    </div>
  </Layout>
)

export default QuestionLookup
