import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"


const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h2>
      Welcome To The CHW Trivia Beta Site!
    </h2>
    <p>
      The General Goal currently is User engagement refining to allow ease of use in those tense trivia Moments.
      <br/>
      This is Unfortunately the only Page of the Site for Those without Beta Access But be sure to <a href="https://discord.gg/ggk9CAF5">Ask for permission to the Beta!</a>

    </p>
    <h3>
      Road Map
    </h3>
    <ol>
      <li>
        Add Search Box Filtering by Color/Category
        <ul>
          <li>
            Just needs to get HTML, CSS and JS written. Database already has Indexes implimented
          </li>
        </ul>
      </li>
      <li>
        Make some general UI Improvements
      </li>
    </ol>
    <br/><br/>
    <p>Site Deployment Status</p>
	  <img src="https://api.netlify.com/api/v1/badges/ff689e6b-7919-45be-aea5-69df18e249cf/deploy-status" alt="Deploy status badge"></img>
  </Layout>
)

export default IndexPage
