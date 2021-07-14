import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ImportJS from "../components/JS-Import"


const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <ImportJS File="JSONfileUpload.js"/>
	<img src="https://api.netlify.com/api/v1/badges/ff689e6b-7919-45be-aea5-69df18e249cf/deploy-status" alt="Deploy status badge"></img>
  </Layout>
)

export default IndexPage
