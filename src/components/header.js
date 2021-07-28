import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "../components/CSS/Header.css"
import "../components/CSS/bootstrap.min.css"

import ExternalLinks from "./Links-External"
import EXTlinks from "../../site/settings/HeaderLinks.json"

import Theme from "../../site/settings/Theme.json"
import LinkLabels from "../../site/settings/HeaderLinks.json"

import SiteMetadata from "../../site/settings/SiteMetadata.json"

const Header = ({ siteTitle }) => (
  <header
    style={{
      color: `${Theme.TextColor}`,
      backgroundColor: `${Theme.HeaderColor}`,
      fontFamily: `${Theme.Font}`
    }}>
      <nav 
      className="navbar navbar-light">
        <button
        className="navbar-toggler navbar-dark"
        type="button"
        data-toggle="collapse"
        data-target="#BurgerMenu"
        aria-controls="BurgerMenu"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span
          className="navbar-toggler-icon">
          </span>
        </button>
        <Link
          to="/"
          className="navbar-brand mr-auto">
            {SiteMetadata.SiteName}
        </Link>
          <div
          className="collapse navbar-collapse"
          id="BurgerMenu">
            <ul
            className="navbar-nav nav">
              {CheckForEXTlinks()}
              <li className="nav-item">
                <Link to="/QuestionLookup" className="nav-link">
                  Question Search
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AddQuestions" className="nav-link">
                  Add Questions
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AddQuestionsV2" className="nav-link">
                  Add Questions (Testing Feature: Smart Jumping)
                </Link>
              </li>
            </ul>
          </div>
      </nav>
  </header>
)
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

function CheckForEXTlinks(){
  if(EXTlinks.LinkSet.length > 0){
    return (
      <nav className="navbar navbar-fixed-top navbar-default">
      <button
      className="navbar-toggler navbar-dark"
      type="button"
      data-toggle="collapse"
      data-target="#SocialBurgerMenu"
      aria-controls="SocialBurgerMenu"
      aria-expanded="false"
      aria-label="Toggle navigation">
        <span
        className="navbar-toggler-icon">
        </span>
      </button>
      <p className="navbar-brand mr-auto">
        {LinkLabels.ExternalLinks}
      </p>
      <div
      className="collapse navbar-collapse"
      id="SocialBurgerMenu">
        <ul className="navbar-nav nav">
          <ExternalLinks/>
        </ul>
      </div>
    </nav>
    )
  }
}

export default Header
