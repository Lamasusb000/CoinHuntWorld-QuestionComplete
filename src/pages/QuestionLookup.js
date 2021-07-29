import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import "../components/CSS/autoCompletes.css"
import "../components/CSS/AlignCenter.css"
import "../components/CSS/AddingQuestions.css"



const QuestionLookup = () => (
  <Layout>
    <Seo title="Question Lookup" />
    <JSimport File={"autoComplete.js"}/>
    <JSimport File={"SearchFunction.js"}/>
    <JSimport File="BetaTesting.js"/>
    <div className="AlignCenter">
      <h4 className="AlignCenter">
        Question Search
      </h4>
      <div className="autoComplete_wrapper AlignCenter" onLoad={Loader()}>
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

function Loader(){
  window.$autocompleteloader = true
}

export default QuestionLookup
