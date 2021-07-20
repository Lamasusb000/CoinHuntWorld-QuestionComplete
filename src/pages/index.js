import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"


const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h3>
      Road Map
    </h3>
    <ol>
      <li>
        Make Croppie.js More user friendly
      </li>
      <li>
        Impliment netlifyIdentity Signup/ login/  Logout buttons (Currently just console based)
      </li>
      <li>
        Create Database Addition Success/ Failure Pages
      </li>
      <li>
        Add Search Box Filtering by Color/Category
        <ul>
          <li>
            Just needs to get HTML, CSS and JS written. Database already has Indexes implimented
          </li>
        </ul>
      </li>
    </ol>
    <br/><br/>
    <p>Site Deployment Status</p>
	  <img src="https://api.netlify.com/api/v1/badges/ff689e6b-7919-45be-aea5-69df18e249cf/deploy-status" alt="Deploy status badge"></img>
  </Layout>
)

export default IndexPage
