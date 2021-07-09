import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import JSimport from "../components/JS-Import"



const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <JSimport File={"TestingScript.js"}/>
    <br/>
    <h2
    className="Centered"
    style={{
      fontFamily:"inherit"
    }}>
      Basic Responsive Website!
    </h2>
    <p
    className="Centered">
      Complete with a Drop Down Burger Menu!
      <br/>
      And Footer!
    </p>
    <div
    className="Main-Image">
      <StaticImage
      src="../images/StockBall.png"
      className="Main-Image"/>
    </div>
  </Layout>
)

export default IndexPage
