import React from "react"
import ProductCard from "./ProductCard"

const Hero = ({ hero, featuredProducts = [] }) => {
  const topFeatured = featuredProducts.slice(0, 4)

  return (
    <section className="hero">
      <div className="hero__content">
        {hero.badge_text && (
          <span className="hero__badge">{hero.badge_text}</span>
        )}
        <h1 className="hero__heading">
          {hero.heading}
          <br />
          <em>{hero.heading_highlight}</em>{" "}
          {hero.heading_emoji}
        </h1>
        <p className="hero__description">{hero.description}</p>
        <div className="hero__buttons">
          <a href={hero.primary_button_link} className="btn btn--primary">
            {hero.primary_button_text}
          </a>
          <a href={hero.secondary_button_link} className="btn btn--outline">
            {hero.secondary_button_text}
          </a>
        </div>
      </div>

      <div className="hero__products">
        {topFeatured.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Hero
