import React from 'react'
import "../Style/TopButton.css"

const ScrollToTop = () => {

    function toTop() {
        window.scrollTo({top: 0, behavior:'smooth'})
    }

  return (
    <button className="topButton" onClick={toTop}>^</button>
  )
}

export default ScrollToTop