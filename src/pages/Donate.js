import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import JSimport from "../components/JS-Import"

import "../components/CSS/SpecialFormats.css"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <JSimport File="NetlifyFunctions.js"/>
    <h2 className="AlignCenter">
        Welcome To The Donation Page!
    </h2>
    <hr/>
    <div className="AlignCenter WidthControl80 AutoCap">
        <div className="AlignLeft">
            <h3>
                The Team Behind CHW Trivia
            </h3>
            <p>
                Currently the team is just a 20 year old college student named Junior (MrTurtlesGame) who writes all the code and a few friends on the internet who help him along his way who he would not be here without.
            </p>
            <hr/>
            <h3>
                History Behind CHW Trivia
            </h3>
            <p>
                This Website started as a way to quickly research question given within the Game but quickly evolved into a community that strives to collect every datapoint we can through our streamline data collection process
            </p>
            <hr/>
            <h3>
                Why You should donate
            </h3>
            <p>
                My (Junior's) Ultimate goal was to create a community resource that would allow people to have access to data that has real monetary value to assist others with their challenges. 
            </p>
            <p>
                Along with my friends we wanted to make the tool before someone else could so we could make what is best for the community which includes our free APIs non-Ad driven website all of which are unfortunately... Not free
            </p>
            <p>
                in order to prevent CHW Trivia being forced to either shut down/ start serving ads to our viewers the site is going to be dependent on Donations. Speaking for myself and what I can assume many others... People hate Ads and if the site becomes forced to serve them to stay alive it would only become another nail in the coffin
            </p>
            <h3>
                If you can Please Consider Donating Below
            </h3>
            <p>
                Coinbase Commerce runs our POS through Crypto Network Transactions. Which any crypto wallet platform can send to (Including Coinbase, Ledger, Trust, and of course, Uphold)
                <br/>
                if you cannot afford to donate but still want to help? Brave is a awesome way to support creators. You can donate automatically by simply using our website (Android and PC only)
            </p>
            <a className="donate-with-crypto AlignCenter"
            href="https://commerce.coinbase.com/checkout/baa6c9f9-0571-44e1-83b4-f7999d97a85f">
                <button type="button" class="btn btn-primary">
                    
                </button>
            </a>
            <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"/>
        </div>
    </div>
  </Layout>
)

export default IndexPage
