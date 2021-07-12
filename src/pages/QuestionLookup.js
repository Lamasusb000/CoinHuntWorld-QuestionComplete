import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import "../components/CSS/autoCompletes.css"



const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <JSimport File={"autoComplete.js"}/>
    <JSimport File={"SearchFunction.js"}/>
    <h4>
      Question Search
    </h4>
    <div class="autoComplete_wrapper">
        <input id="autoComplete" type="search" dir="ltr" spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="off"/>
    </div>
    <button value="Clear Search Box" onClick="ClearBox()"/>
    <br/><br/><br/>
    <h3 id="AnswerResults"/>
  </Layout>
)

export default IndexPage
