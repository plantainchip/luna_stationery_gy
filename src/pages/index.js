import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { CartProvider } from "../context/CartContext"
import CartDrawer from "../components/CartDrawer"
import AnnouncementBar from "../components/AnnouncementBar"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import CategoryBrowser from "../components/CategoryBrowser"
import PromoBanner from "../components/PromoBanner"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"

const IndexPage = ({ data }) => {
  const settings = data.settings?.frontmatter || {}
  const hero = data.hero?.frontmatter || {}
  const promo = data.promo?.frontmatter || {}
  const newsletter = data.newsletter?.frontmatter || {}
  const products = (data.products?.edges || []).map((e) => e.node.frontmatter)

  const styleSettings = settings.style_settings || {}
  const featuredProducts = products.filter((p) => p.is_featured)

  return (
    <CartProvider formspreeId={settings.formspree_id || ""}>
      <Layout>
        <CartDrawer />
        <AnnouncementBar
          messages={settings.announcement_messages || []}
          bgColor={styleSettings.announcement_bg_color}
        />
        <Navbar
          brandName={settings.brand_name}
          navLinks={settings.nav_links || []}
        />
        <Hero hero={hero} featuredProducts={featuredProducts} />
        <CategoryBrowser
          categories={settings.categories || []}
          products={products}
        />
        <PromoBanner promo={promo} />
        <Newsletter data={newsletter} />
        <Footer
          brandName={settings.brand_name}
          footerLinks={settings.footer_links || []}
          copyright={settings.copyright_text}
          bgColor={styleSettings.footer_bg_color}
        />
      </Layout>
    </CartProvider>
  )
}

export default IndexPage

export const Head = ({ data }) => {
  const settings = data.settings?.frontmatter || {}
  return (
    <Seo
      title={`${settings.brand_name || "Luna Stationery GY"} — Cute Stationery Shop`}
      description="Handcrafted stickers, prints, washi tape & charms made with love."
    />
  )
}

export const pageQuery = graphql`
  query IndexPageQuery {
    settings: markdownRemark(
      frontmatter: { templateKey: { eq: "settings" } }
    ) {
      frontmatter {
        brand_name
        formspree_id
        announcement_messages
        nav_links {
          label
          url
        }
        footer_links {
          label
          url
        }
        categories {
          name
          emoji
          slug
        }
        copyright_text
        style_settings {
          primary_color
          secondary_color
          accent_color
          announcement_bg_color
          footer_bg_color
        }
      }
    }

    hero: markdownRemark(frontmatter: { templateKey: { eq: "hero" } }) {
      frontmatter {
        badge_text
        heading
        heading_highlight
        heading_emoji
        description
        primary_button_text
        primary_button_link
        secondary_button_text
        secondary_button_link
      }
    }

    promo: markdownRemark(frontmatter: { templateKey: { eq: "promo" } }) {
      frontmatter {
        heading
        subtext
        coupon_code
        button_text
        button_link
        style {
          promo_bg_start
          promo_bg_end
        }
      }
    }

    newsletter: markdownRemark(
      frontmatter: { templateKey: { eq: "newsletter" } }
    ) {
      frontmatter {
        heading
        heading_emoji
        description
        button_text
      }
    }

    products: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "product" } } }
      sort: { frontmatter: { is_featured: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            category
            price
            price_prefix
            emoji
            card_color
            description
            is_new
            is_featured
          }
        }
      }
    }
  }
`
