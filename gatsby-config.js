module.exports = {
  pathPrefix: `/luna_stationery_gy`,
  siteMetadata: {
    title: `Luna Stationery GY`,
    description: `Cute stationery shop — handcrafted stickers, prints, washi tape & charms made with love.`,
    siteUrl: `https://maitri.me/luna_stationery_gy`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/content/products`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `home`,
        path: `${__dirname}/content/home`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `settings`,
        path: `${__dirname}/content/settings`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/static/img`,
      },
    },
  ],
}
