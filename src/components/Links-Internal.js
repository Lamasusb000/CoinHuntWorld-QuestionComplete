import React from "react"
import { StaticQuery, graphql } from "gatsby"

const ComponentName = () => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/src/markdown-pages/"}}) {
          edges {
            node {
              frontmatter {
                slug
                title
                date(formatString: "DD MMMM, YYYY")
              }
            }
          }
        }
      }
    `}
    render={data => (
        <ul
        className="navbar-nav mr-auto">
          {data.allMarkdownRemark.edges.map((Page) => (
              <li
              className="nav-item">
                  <a
                  href={Page.node.frontmatter.slug}
                  className="nav-link">
                      {Page.node.frontmatter.title}
                  </a>
              </li>
          ))}
        </ul>
    )}
  ></StaticQuery>
)

export default ComponentName