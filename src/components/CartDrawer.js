import React, { useState } from "react"
import { useCart } from "../context/CartContext"

const INITIAL_FORM = { name: "", email: "", phone: "", address: "", notes: "" }

const CartDrawer = () => {
  const {
    items,
    drawerOpen,
    itemCount,
    subtotal,
    formspreeId,
    removeItem,
    updateQty,
    clearCart,
    setDrawer,
  } = useCart()

  const [step, setStep] = useState("cart")
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const orderSummaryText = items
    .map((i) => `${i.title} x${i.quantity} ($${(i.price * i.quantity).toFixed(2)})`)
    .join(", ")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formspreeId) {
      setError("Order form is not configured yet. Please contact the shop owner.")
      return
    }

    setSubmitting(true)
    setError("")

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      notes: form.notes,
      order_items: orderSummaryText,
      order_total: `$${subtotal.toFixed(2)}`,
      item_count: itemCount,
      _subject: `New Order — $${subtotal.toFixed(2)} (${itemCount} items)`,
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSubmitted(true)
        clearCart()
        setForm(INITIAL_FORM)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setDrawer(false)
    if (submitted) {
      setStep("cart")
      setSubmitted(false)
    }
  }

  const handleBackToCart = () => {
    setStep("cart")
    setError("")
  }

  return (
    <>
      <div
        className={`cart-overlay ${drawerOpen ? "cart-overlay--visible" : ""}`}
        onClick={handleClose}
        role="presentation"
      />
      <aside className={`cart-drawer ${drawerOpen ? "cart-drawer--open" : ""}`}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            {submitted ? "Order Placed!" : step === "checkout" ? "Checkout" : "Your Cart"}
          </h2>
          <button className="cart-drawer__close" onClick={handleClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="cart-drawer__body">
          {submitted ? (
            <div className="cart-empty">
              <span className="cart-empty__emoji">🎉</span>
              <p className="cart-empty__text">
                Thank you for your order! We'll be in touch soon.
              </p>
              <button className="btn btn--primary" onClick={handleClose}>
                Continue Shopping
              </button>
            </div>
          ) : step === "checkout" ? (
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="checkout-form__summary">
                <div className="checkout-form__summary-label">Order Summary</div>
                {items.map((item) => (
                  <div className="checkout-form__summary-row" key={item.title}>
                    <span>
                      {item.emoji} {item.title} x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="checkout-form__summary-total">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <label className="checkout-form__label">
                Name *
                <input
                  className="checkout-form__input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="checkout-form__label">
                Email *
                <input
                  className="checkout-form__input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="checkout-form__label">
                Phone
                <input
                  className="checkout-form__input"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                />
              </label>
              <label className="checkout-form__label">
                Shipping Address *
                <textarea
                  className="checkout-form__textarea"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={3}
                />
              </label>
              <label className="checkout-form__label">
                Order Notes
                <textarea
                  className="checkout-form__textarea"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Special requests, gift wrapping, etc."
                />
              </label>

              {error && <div className="checkout-form__error">{error}</div>}

              <button
                className="btn btn--primary cart-drawer__checkout-btn"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Placing Order..." : `Place Order — $${subtotal.toFixed(2)}`}
              </button>
              <button
                className="btn btn--outline cart-drawer__back-btn"
                type="button"
                onClick={handleBackToCart}
              >
                ← Back to Cart
              </button>
            </form>
          ) : items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__emoji">🛒</span>
              <p className="cart-empty__text">Your cart is empty</p>
              <button className="btn btn--primary" onClick={handleClose}>
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {items.map((item) => (
                  <li className="cart-item" key={item.title}>
                    <div
                      className="cart-item__icon"
                      style={{ background: item.card_color || "#EDE9FE" }}
                    >
                      {item.emoji}
                    </div>
                    <div className="cart-item__details">
                      <div className="cart-item__title">{item.title}</div>
                      <div className="cart-item__price">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="cart-item__controls">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQty(item.title, item.quantity - 1)}
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="cart-item__qty">{item.quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQty(item.title, item.quantity + 1)}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeItem(item.title)}
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart-drawer__footer">
                <div className="cart-drawer__subtotal">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button
                  className="btn btn--primary cart-drawer__checkout-btn"
                  onClick={() => {
                    setStep("checkout")
                    setError("")
                  }}
                >
                  Checkout ({itemCount} {itemCount === 1 ? "item" : "items"})
                </button>
                <button
                  className="btn btn--outline cart-drawer__clear-btn"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  )
}

export default CartDrawer
