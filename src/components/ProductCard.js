import React from "react"
import { useCart } from "../context/CartContext"

const ProductCard = ({ product, variant = "hero" }) => {
  const { addItem } = useCart()
  const {
    title,
    price,
    emoji,
    card_color,
    is_new,
    description,
    price_prefix,
  } = product

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(product)
  }

  if (variant === "grid") {
    return (
      <div className="product-grid-card">
        <div
          className="product-grid-card__image-wrap"
          style={{ background: card_color || "#EDE9FE" }}
        >
          <span className="product-grid-card__emoji">{emoji}</span>
          <button
            className="product-grid-card__heart"
            aria-label={`Add ${title} to cart`}
            onClick={handleAdd}
          >
            +
          </button>
        </div>
        <div className="product-grid-card__info">
          <div className="product-grid-card__title">{title}</div>
          {description && (
            <div className="product-grid-card__desc">{description}</div>
          )}
          <div className="product-grid-card__footer">
            <span className="product-grid-card__price">
              {price_prefix && `${price_prefix} `}${price.toFixed(2)}
            </span>
            <button
              className="product-grid-card__add"
              aria-label={`Add ${title} to cart`}
              onClick={handleAdd}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="product-card"
      style={{ background: card_color || "#EDE9FE" }}
      onClick={handleAdd}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleAdd(e)}
    >
      {is_new && <span className="product-card__badge">NEW</span>}
      <span className="product-card__emoji">{emoji}</span>
      <div className="product-card__title">{title}</div>
      <div className="product-card__price">
        {price_prefix && `${price_prefix} `}${price.toFixed(2)}
      </div>
      <button
        className="product-card__add-btn"
        aria-label={`Add ${title} to cart`}
        onClick={handleAdd}
      >
        + Add
      </button>
    </div>
  )
}

export default ProductCard
