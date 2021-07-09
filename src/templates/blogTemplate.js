import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"
import "../components/CSS/Markdown-Pages.css"


export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter } = markdownRemark
  const { html } = markdownRemark
  return (
    <Layout>
        <Seo title={frontmatter.title}/>
        <h1
        className="Title"
        style={{
          color: "inherit"
        }}>
            {frontmatter.title}
        </h1>
        <h4
        className="Title">
            {frontmatter.subtitle} - {frontmatter.date}
        </h4>
        <hr/>
        <div
        className="Page-Body"
        dangerouslySetInnerHTML={{__html: html}}/>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        subtitle
      }
    }
  }
`