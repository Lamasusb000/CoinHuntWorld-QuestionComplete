import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
    <Layout>
        <Seo title="404: Not found" />
        <h1>Sorry There Bud</h1>
        <h3>
            The Page You Tried To Find Does Not Exist
            <br />
            Just Tweet Me Angry and I'll See What's Wrong
        </h3>
    </Layout>
)

export default NotFoundPage
