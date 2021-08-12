import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"
import "../components/CSS/Leaderboards.css"

const IndexPage = () => (
    <Layout>
        <Seo title="Home" />
        <JSimport File="NetlifyFunctions.js" />
        <JSimport File="Cookie.js" />
        <JSimport File="Leaderboards.js" />
        <h2 className="AlignCenter">Welcome To The CHW Trivia Beta Site!</h2>
        <div className="WidthControl50">
            <p className="AlignCenter">
                Coded For The Community By MrTurtlesGame
            </p>
            <hr />
            <p className="Indent2">
                This site is a community created tool to be used to assist in
                your adventures on the CoinHuntWorld App! CoinHuntWorld is a
                geolocation game where users travel around the real world to
                places around their cities to collect keys and answer questions
                to collect REAL Crypto!
            </p>
            <p className="Indent2">
                Sometimes Within the game hunters recieve questions that are so
                bizzare even Google can't help them solve it but with a
                community sourced database hosted here any hunter can help their
                fellow hunters solve their most complex questions with a simple
                search from our database!
            </p>
            <p className="Indent2">
                Remember! Cheating is not fun and please be safe hunting the
                crypto and most of all... Have fun!
            </p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div id="LeaderBoard">
            <div id="Leaderboard">
                <table className="table text-white">
                    <thead>
                        <tr>
                            <td>Rank</td>
                            <td>User</td>
                            <td>Submission Count</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="Rank1">Loading...</td>
                            <td id="User1">Loading...</td>
                            <td id="Count1">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank2">Loading...</td>
                            <td id="User2">Loading...</td>
                            <td id="Count2">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank3">Loading...</td>
                            <td id="User3">Loading...</td>
                            <td id="Count3">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank4">Loading...</td>
                            <td id="User4">Loading...</td>
                            <td id="Count4">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank5">Loading...</td>
                            <td id="User5">Loading...</td>
                            <td id="Count5">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank6">Loading...</td>
                            <td id="User6">Loading...</td>
                            <td id="Count6">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank7">Loading...</td>
                            <td id="User7">Loading...</td>
                            <td id="Count7">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank8">Loading...</td>
                            <td id="User8">Loading...</td>
                            <td id="Count8">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank9">Loading...</td>
                            <td id="User9">Loading...</td>
                            <td id="Count9">Loading...</td>
                        </tr>
                        <tr>
                            <td id="Rank10">Loading...</td>
                            <td id="User10">Loading...</td>
                            <td id="Count10">Loading...</td>
                        </tr>
                    </tbody>
                </table>
                <p
                    id="JoinLeaderboard"
                    className="text-center Underline CursorClick"
                >
                    Click Here To Set You Leaderboard Name
                </p>
            </div>
        </div>
    </Layout>
)

export default IndexPage
