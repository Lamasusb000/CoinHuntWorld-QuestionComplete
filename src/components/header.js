import * as React from "react"
import { Link } from "gatsby"
import "../components/CSS/Header.css"
import "../components/CSS/bootstrap.min.css"
import netlifyIdentity from "netlify-identity-widget"

import ExternalLinks from "./Links-External"
import Links from "../../site/settings/HeaderLinks.json"

import Theme from "../../site/settings/Theme.json"

import SiteMetadata from "../../site/settings/SiteMetadata.json"

function Header() {
    React.useEffect(() => {
        CheckLogin()
    })
    return (
        <header
            style={{
                color: `${Theme.TextColor}`,
                backgroundColor: `${Theme.HeaderColor}`,
                fontFamily: `${Theme.Font}`,
            }}
        >
            <nav className="navbar navbar-light">
                <button
                    className="navbar-toggler navbar-dark"
                    type="button"
                    data-toggle="collapse"
                    data-target="#BurgerMenu"
                    aria-controls="BurgerMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/" className="navbar-brand mr-auto">
                    {SiteMetadata.SiteName}
                </Link>
                <div className="collapse navbar-collapse" id="BurgerMenu">
                    <ul className="navbar-nav nav">
                        {CheckForEXTlinks()}
                        {InternalLinks()}
                    </ul>
                </div>
                <button
                    onClick={NetlifyOpen}
                    type="button"
                    className="btn btn-primary NetlifyOpen"
                    id="SigninButton"
                >
                    Open Account
                </button>
            </nav>
        </header>
    )
}
function CheckLogin() {
    netlifyIdentity.init({})
    if (netlifyIdentity.currentUser()) {
        document.getElementById("SigninButton").innerText = "Open Account"
    } else {
        document.getElementById("SigninButton").innerText = "Sign-in"
    }
}
function InternalLinks() {
    if (Links.InternalLinks.length > 0) {
        return (
            <ul className="navbar-nav mr-auto">
                {Links.InternalLinks.map((LinkSet, index) => (
                    <li className="nav-item">
                        <Link to={"/" + LinkSet.LinkURL} className="nav-link">
                            {LinkSet.LinkName}
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }
}

function CheckForEXTlinks() {
    if (Links.LinkSet.length > 0) {
        return (
            <nav className="navbar navbar-fixed-top navbar-default">
                <button
                    className="navbar-toggler navbar-dark"
                    type="button"
                    data-toggle="collapse"
                    data-target="#SocialBurgerMenu"
                    aria-controls="SocialBurgerMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <p className="navbar-brand mr-auto">{Links.ExternalLinks}</p>
                <div className="collapse navbar-collapse" id="SocialBurgerMenu">
                    <ul className="navbar-nav nav">
                        <ExternalLinks />
                    </ul>
                </div>
            </nav>
        )
    }
}

var NetlifyInitialized = undefined
function NetlifyOpen() {
    if (!NetlifyInitialized) {
        netlifyIdentity.init({})
        NetlifyInitialized = true
    }
    netlifyIdentity.open()
    console.log("The Onclick Was Sent")
}

export default Header
