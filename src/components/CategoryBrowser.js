import React, { useState } from "react"
import ProductCard from "./ProductCard"

const CategoryBrowser = ({ categories = [], products = [] }) => {
  const [active, setActive] = useState("all")

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => {
          const cat = categories.find((c) => c.slug === active)
          if (!cat) return false
          const slug = p.category
          return slug === active || slug === cat.slug
        })

  return (
    <section className="category-section" id="shop">
      <div className="category-section__label">Browse by category</div>
      <h2 className="category-section__heading">
        What are you looking <em>for?</em>
      </h2>

      <div className="category-pills">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`category-pill ${
              active === cat.slug ? "category-pill--active" : ""
            }`}
            onClick={() => setActive(cat.slug)}
          >
            {cat.emoji && <span>{cat.emoji}</span>}
            {cat.name}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map((product, i) => (
          <ProductCard key={i} product={product} variant="grid" />
        ))}
      </div>
    </section>
  )
}

export default CategoryBrowser
