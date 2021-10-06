import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BlueVault from "../images/VaultBlue.png"
import HappyCubie from "../images/HappyCubie.png"
import { Link } from "gatsby"

const NotFoundPage = () => (
    <Layout>
        <Seo title="404: Not found" />
        <div className="text-center">
            <h1>Seems like you got lost</h1>
            <p>While you're here lets enjoy a Disco Party</p>
        </div>
        <div className="container DiscoContainer">
            <div className="row">
                <div className="col">
                    <img className="Disco" src={BlueVault} />
                </div>
                <div className="col">
                    <img className="Disco" src={BlueVault} />
                </div>
                <div className="col">
                    <img className="Disco" src={BlueVault} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <img className="Disco" src={BlueVault} />
                </div>
                <div className="col DiscoDance">
                    <img src={HappyCubie} />
                </div>
                <div className="col">
                    <img className="Disco" src={BlueVault} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <img className="Disco" src={BlueVault} />
                </div>
                <div className="col">
                    <img className="Disco" src={BlueVault} />
                </div>
                <div className="col">
                    <img className="Disco" src={BlueVault} />
                </div>
            </div>
        </div>
        <div className="text-center mt-4">
            <Link className="btn btn-primary" to="/">
                Return To Home
            </Link>
        </div>
    </Layout>
)

export default NotFoundPage
