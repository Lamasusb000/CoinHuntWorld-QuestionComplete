import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"


const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <JSimport File="NetlifyFunctions.js"/>
    <JSimport File="Cookie.js"/>
    <JSimport File="Leaderboards.js"/>
    <h2>
      Welcome To The CHW Trivia Beta Site!
    </h2>
    <p>
      The General Goal currently is User engagement refining to allow ease of use in those tense trivia Moments.
      <br/>
      This is Unfortunately the only Page of the Site for Those without Beta Access But be sure to <a href="https://discord.gg/ggk9CAF5">Ask for permission to the Beta!</a>
    </p>
    <button type="button" className="btn btn-primary NetlifyOpen">Beta Tester Signin</button>
    <br/><br/>
    <p>Site Deployment Status</p>
	  <img src="https://api.netlify.com/api/v1/badges/ff689e6b-7919-45be-aea5-69df18e249cf/deploy-status" alt="Deploy status badge"></img>
    <div id="LeaderBoard"/>
  </Layout>
)

export default IndexPage
