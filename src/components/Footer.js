import React from "react"

const Footer = ({ brandName = "Blush & Bloom", footerLinks = [], copyright, bgColor }) => {
  const parts = brandName.split("&")
  const hasAmpersand = parts.length > 1

  return (
    <footer
      className="footer"
      style={bgColor ? { background: bgColor } : undefined}
    >
      <div className="footer__brand">
        {hasAmpersand ? (
          <>
            {parts[0].trim()} &amp; <em>{parts[1].trim()}</em> ✦
          </>
        ) : (
          <>{brandName} ✦</>
        )}
      </div>

      <ul className="footer__links">
        {footerLinks.map((link, i) => (
          <li key={i}>
            <a className="footer__link" href={link.url}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="footer__copyright">{copyright}</p>
    </footer>
  )
}

export default Footer
