import React from "react"
import "../components/CSS/Footer.css"
import ContactInfo from "../components/ContactInfo"
import Theme from "../../site/settings/Theme.json"
import { graphql, StaticQuery } from "gatsby"

const Footer = () => (
    <div
    className="Footer-Container"
    style={{
        backgroundColor: `${Theme.FooterColor}`,
        color: `${Theme.TextColor}`,
        fontFamily: `${Theme.Font}`
    }}>
        <ContactInfo/>
        <StaticQuery
                query={graphql`
                {
                    allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/site/settings/"}}) {
                      edges {
                        node {
                          html  
                          frontmatter {
                            title
                          }
                        }
                      }
                    }
                  }         
            `}
            render={data => (
                <div
                className="Right-Column">
                    <h2>{data.allMarkdownRemark.edges[0].node.frontmatter.title}</h2>
                    <div dangerouslySetInnerHTML={{__html: data.allMarkdownRemark.edges[0].node.html}}/>
                </div>
            )}>
            </StaticQuery>
    </div>
)




export default Footer