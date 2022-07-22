import type { GatsbyConfig } from "gatsby";

const siteConfig = {
  author: "Zain Ul Hassan",
  title: "Dreamers Lab",
  description: "Free open-source content for everyone.",
  url: "https://www.dreamerslab.org",
  image: "/banner.png",
  siteLanguage: "en_US",
  pathPrefix: "/",

  themeColor: "#5c7cfa",
  backgroundColor: "#dee2e6",
  favicon: "src/content/images/logo.svg",

  twitter: "ZainUlH00805492",
};

const config: GatsbyConfig = {
  graphqlTypegen: true,
  pathPrefix: siteConfig.pathPrefix === "/" ? "" : siteConfig.pathPrefix,
  siteMetadata: {
    author: siteConfig.author,
    title: siteConfig.title,
    description: siteConfig.description,
    siteUrl: siteConfig.url,
    image: siteConfig.image,
    siteLanguage: siteConfig.siteLanguage,
    twitter: siteConfig.twitter,
  },
  plugins: [
    `gatsby-plugin-mantine`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: `transparent`,
              wrapperStyle: `margin-left: 0!important; margin-right: 0!important;`,
              tracedSVG: true,
              disableBgImage: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `extensions`,
        path: `${__dirname}/src/content/extensions`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tutorials`,
        path: `${__dirname}/src/content/tutorials`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contributors`,
        path: `${__dirname}/src/content/contributors`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/content/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Open Sans\:300,400,500,600,700,800,900`,
          `JetBrains Mono\:400,600,700`,
        ],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteConfig.title,
        short_name: siteConfig.title,
        description: siteConfig.description,
        start_url: siteConfig.pathPrefix,
        background_color: siteConfig.backgroundColor,
        theme_color: siteConfig.themeColor,
        display: "standalone",
        icon: siteConfig.favicon,
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};

export default config;
