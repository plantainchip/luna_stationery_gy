exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemarkFrontmatter {
      templateKey: String
      title: String
      category: String
      price: Float
      emoji: String
      image: String
      card_color: String
      description: String
      is_new: Boolean
      is_featured: Boolean
      badge_text: String
      heading: String
      heading_highlight: String
      primary_button_text: String
      primary_button_link: String
      secondary_button_text: String
      secondary_button_link: String
      subtext: String
      coupon_code: String
      button_text: String
      button_link: String
      brand_name: String
      formspree_id: String
      copyright_text: String
      primary_color: String
      secondary_color: String
      accent_color: String
      announcement_bg_color: String
      footer_bg_color: String
      promo_bg_start: String
      promo_bg_end: String
      announcement_messages: [String]
      nav_links: [MarkdownRemarkFrontmatterNavLinks]
      footer_links: [MarkdownRemarkFrontmatterFooterLinks]
      categories: [MarkdownRemarkFrontmatterCategories]
    }
    type MarkdownRemarkFrontmatterNavLinks {
      label: String
      url: String
    }
    type MarkdownRemarkFrontmatterFooterLinks {
      label: String
      url: String
    }
    type MarkdownRemarkFrontmatterCategories {
      name: String
      emoji: String
      slug: String
    }
  `)
}
