import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import "../components/CSS/Leaderboards.css"


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
    <table class="Leaderboards"><tr><td>Rank</td><td>User</td><td>Submission Count</td></tr><tr><td>1</td><td>9baf3029-bd1f-4b4c-915f-097b17f94214</td><td>237</td></tr><tr><td>2</td><td>Inital Database Upload</td><td>231</td></tr><tr><td>3</td><td>d7a3b626-2208-4cc6-adf6-7d14da55c870</td><td>100</td></tr><tr><td>4</td><td>114788c7-07f2-4f37-a6b2-cf5e83b9bac8</td><td>82</td></tr><tr><td>5</td><td>ac4b5f31-8e80-4a21-9dbd-0cb659942487</td><td>16</td></tr><tr><td>6</td><td>MrTurtlesGame</td><td>14</td></tr><tr><td>7</td><td>c668def1-247b-42d1-8d7b-3e9f281cd39d</td><td>13</td></tr><tr><td>8</td><td>114aa3d9-8e98-415e-ba63-a4bf00c7cdd9</td><td>6</td></tr><tr><td>9</td><td>b5afad62-e60c-45b2-8872-8255238d1396</td><td>5</td></tr></table>
  </Layout>
)

export default IndexPage
