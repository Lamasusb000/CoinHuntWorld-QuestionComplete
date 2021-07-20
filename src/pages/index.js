import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ImportJS from "../components/JS-Import"


const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <ImportJS File="JSONfileUpload.js"/>
    <h3>
      Road Map
    </h3>
    <ol>
    <li>
        Impliment Netlify Idendity to get users to create an account and get a Account-ID hash that will be used to track user activity (Prevent Malicious Intents)
      </li>
      <li>
        Write JS that will talk to self hosted API that will pass along information to the database
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
