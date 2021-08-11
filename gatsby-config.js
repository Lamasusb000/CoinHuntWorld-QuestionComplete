const SiteMetadataJSON = require("./site/settings/SiteMetadata.json")

module.exports = {
  siteMetadata: {
    title: SiteMetadataJSON.SiteName,
    description: `Gatsby Website Template (with a CMS)`,
    author: `Usbaldo Lamas Jr.`,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "page-settings",
        path: `${__dirname}/site/settings`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/${SiteMetadataJSON.Icon}`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
