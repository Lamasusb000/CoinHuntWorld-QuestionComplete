import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ImportJS from "../components/JS-Import"


const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <ImportJS File="JSONfileUpload.js"/>
  </Layout>
)

export default IndexPage
