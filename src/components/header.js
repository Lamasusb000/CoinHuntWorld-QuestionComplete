import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "../components/CSS/Header.css"
import "../components/CSS/bootstrap.min.css"

import ExternalLinks from "./Links-External"
import InternalLinks from "./Links-Internal"

import Theme from "../../site/settings/Theme.json"
import LinkLabels from "../../site/settings/HeaderLinks.json"

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
            {siteTitle}
        </Link>
          <div
          className="collapse navbar-collapse"
          id="BurgerMenu">
            <ul
            className="navbar-nav nav">
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
              <nav className="navbar navbar-fixed-top navbar-default">
                <button
                className="navbar-toggler navbar-dark"
                type="button"
                data-toggle="collapse"
                data-target="#BlogBurgerMenu"
                aria-controls="BlogBurgerMenu"
                aria-expanded="false"
                aria-label="Toggle navigation">
                  <span
                  className="navbar-toggler-icon">
                  </span>
                </button>
                <p className="navbar-brand mr-auto">
                  {LinkLabels.InternalLinks}
                </p>
                <div
                className="collapse navbar-collapse"
                id="BlogBurgerMenu">
                  <ul className="navbar-nav nav">
                    <InternalLinks/>
                  </ul>
                </div>
              </nav>
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

export default Header
