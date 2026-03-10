import React from "react"

const PromoBanner = ({ promo }) => {
  const bgStart = promo.style?.promo_bg_start || "#F9A8D4"
  const bgEnd = promo.style?.promo_bg_end || "#FBCFE8"

  return (
    <section
      className="promo-banner"
      style={{
        background: `linear-gradient(135deg, ${bgStart} 0%, ${bgEnd} 100%)`,
      }}
    >
      <div className="promo-banner__content">
        <h2 className="promo-banner__heading">{promo.heading}</h2>
        <p className="promo-banner__subtext">{promo.subtext}</p>
        <span className="promo-banner__code">{promo.coupon_code}</span>
      </div>
      <a href={promo.button_link} className="promo-banner__cta">
        {promo.button_text}
      </a>
    </section>
  )
}

export default PromoBanner
