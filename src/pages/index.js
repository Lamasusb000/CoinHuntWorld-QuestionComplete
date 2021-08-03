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
    <h2 className="AlignCenter">
      Welcome To The CHW Trivia Beta Site!
    </h2>
    <div className="WidthControl50">
      <p className="AlignCenter">Coded For The Community By MrTurtlesGame</p>
      <hr/>
      <p className="Indent2">
        This site is a community created tool to be used to assist in your adventures on the CoinHuntWorld App! CoinHuntWorld is a geolocation game where users travel around the real world to places around their cities to collect keys and answer questions to collect REAL Crypto!
      </p>
      <p className="Indent2">
        Sometimes Within the game hunters recieve questions that are so bizzare even Google can't help them solve it but with a community sourced database hosted here any hunter can help their fellow hunters solve their most complex questions with a simple search from our database!
      </p>
      <p className="Indent2">
        Remember! Cheating is not fun and please be safe hunting the crypto and most of all... Have fun!
      </p>
    </div>
    <br/><br/><br/><br/>
    <div id="LeaderBoard"/>
  </Layout>
)

export default IndexPage
