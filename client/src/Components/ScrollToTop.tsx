import React from 'react'
import "../Style/TopButton.css"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTop = () => {

    function toTop() {
        window.scrollTo({top: 0, behavior:'smooth'})
    }

  return (
    <button className="topButton" onClick={toTop}><ArrowUpwardIcon/></button>
  )
}

export default ScrollToTop