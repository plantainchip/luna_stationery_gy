import React from "react"

const AnnouncementBar = ({ messages = [], bgColor }) => {
  const doubled = [...messages, ...messages]

  return (
    <div
      className="announcement-bar"
      style={bgColor ? { background: bgColor } : undefined}
    >
      <div className="announcement-bar__track">
        {doubled.map((msg, i) => (
          <span className="announcement-bar__item" key={i}>
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementBar
