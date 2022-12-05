import React from 'react'
import { NavLink } from "react-router-dom";
// import img from "../salad.png";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import "../Style/LandingPage.css"

const LandingPage = () => {
  return (
    <div className="landingpageBackground d-flex">
      {/* <div>
        <img src={img} alt="Logo" className="landingpageLogo" />
      </div> */}
      <NavLink to="/Home">
        <Button color="primary" variant="contained" endIcon={<SendIcon />}>FoodCare</Button>
      </NavLink>
    </div>
  )
}

export default LandingPage