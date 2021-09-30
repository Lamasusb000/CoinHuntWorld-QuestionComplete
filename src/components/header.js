import * as React from "react"
import { Link } from "gatsby"
import "../components/CSS/Header.css"
import "../components/CSS/bootstrap.min.css"
import netlifyIdentity from "netlify-identity-widget"

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
                        {CheckForIntLinks()}
                        <li
                            className="list-item d-grid gap-2 btn-group-vertical"
                            style={{ width: "fit-content" }}
                        >
                            <Link to="/Donate" className="btn btn-primary">
                                Donate
                            </Link>
                            <button
                                onClick={NetlifyOpen}
                                type="button"
                                className="btn btn-primary NetlifyOpen"
                                id="SigninButton"
                            >
                                Open Account
                            </button>
                        </li>
                    </ul>
                </div>
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

function CheckForIntLinks() {
    if (Links.InternalLinks.length > 0) {
        return (
            <nav className="navbar navbar-fixed-top navbar-default">
                <button
                    className="navbar-toggler navbar-dark"
                    type="button"
                    data-toggle="collapse"
                    data-target="#ToolBurgerMenu"
                    aria-controls="ToolBurgerMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <p className="navbar-brand mr-auto">Tools</p>
                <div className="collapse navbar-collapse" id="ToolBurgerMenu">
                    <ul className="navbar-nav nav">{InternalLinks()}</ul>
                </div>
            </nav>
        )
    }
}
function InternalLinks() {
    if (Links.InternalLinks.length > 0) {
        return (
            <ul className="navbar-nav mr-auto">
                {Links.InternalLinks.map((LinkSet, index) => (
                    <li key={LinkSet.LinkName} className="nav-item">
                        <Link to={"/" + LinkSet.LinkURL} className="nav-link">
                            {LinkSet.LinkName}

                            {CheckIfNew(LinkSet.New)}
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }
}
function CheckIfNew(New) {
    if (New) {
        return <span className="ml-2 badge badge-primary">New</span>
    } else {
        return
    }
}
function ExternalLinks() {
    return (
        <ul className="navbar-nav mr-auto">
            {Links.LinkSet.map((LinkSet, index) => (
                <li key={LinkSet.LinkName} className="nav-item">
                    <a href={LinkSet.LinkURL} className="nav-link">
                        {LinkSet.LinkName}
                    </a>
                </li>
            ))}
        </ul>
    )
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
                    <ul className="navbar-nav nav">{ExternalLinks()}</ul>
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
