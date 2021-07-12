import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

import Autocomplete from "../components/AutoComplete"



const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h4>
      Question Search!
    </h4>
    <Autocomplete/>
    <div id="AutofillAnswer"/>
  </Layout>
)

export default IndexPage
