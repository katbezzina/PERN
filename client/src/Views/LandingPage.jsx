import React from 'react'
import NavigationMenu from '../Components/NavigationMenu'
import img from "../salad.png"
import "../Style/LandingPage.css"

const LandingPage = () => {
  return (
    <div className="landingpageBackground">
      <img src={img} alt="Logo" className="landingpageLogo" />
      <NavigationMenu/>
    </div>
  )
}

export default LandingPage