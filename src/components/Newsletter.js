import React from "react"

const Newsletter = ({ data }) => (
  <section className="newsletter">
    <h2 className="newsletter__heading">
      {data.heading} {data.heading_emoji}
    </h2>
    <p className="newsletter__description">{data.description}</p>
    <form
      className="newsletter__form"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="newsletter__input"
        type="email"
        placeholder="your@email.com"
        aria-label="Email address"
      />
      <button className="newsletter__submit" type="submit">
        {data.button_text}
      </button>
    </form>
  </section>
)

export default Newsletter
