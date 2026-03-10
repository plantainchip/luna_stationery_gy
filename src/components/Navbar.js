import React from "react"
import { useCart } from "../context/CartContext"

const Navbar = ({ brandName = "Blush & Bloom", navLinks = [] }) => {
  const { itemCount, toggleDrawer } = useCart()
  const parts = brandName.split("&")
  const hasAmpersand = parts.length > 1

  return (
    <nav className="navbar">
      <a href="/" className="navbar__logo">
        {hasAmpersand ? (
          <>
            {parts[0].trim()} &amp; <em>{parts[1].trim()}</em>
          </>
        ) : (
          brandName
        )}
      </a>

      <ul className="navbar__links">
        {navLinks.map((link, i) => (
          <li key={i}>
            <a className="navbar__link" href={link.url}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button className="navbar__cart" onClick={toggleDrawer}>
        Cart ({itemCount})
      </button>

      <button className="navbar__menu-toggle" aria-label="Menu">
        ☰
      </button>
    </nav>
  )
}

export default Navbar
