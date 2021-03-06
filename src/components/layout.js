/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import "../components/CSS/Main.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import Theme from "../../site/settings/Theme.json"
import { Helmet } from "react-helmet"

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
            <Helmet>
                <style type="text/css">
                    {`
            a, a:hover{
              color:${Theme.LinkColor}
            }
            `}
                </style>
            </Helmet>
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1.5vh 1.0875rem 1.45rem`,
                    backgroundColor: `${Theme.BodyColor}`,
                    color: `${Theme.TextColor}`,
                    fontFamily: `${Theme.Font}`,
                }}
                className="FilledBody"
            >
                <main
                    style={{
                        color: "inherit",
                        minHeight: "92vh",
                    }}
                    id="MainBody"
                >
                    {children}
                </main>
            </div>
            <Footer />
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
