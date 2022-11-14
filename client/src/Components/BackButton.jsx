import React from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import "../Style/ItemCard.css";


function BackButton() {
    let navigate = useNavigate();
    return (
      <>
        <button className="backButton" onClick={() => navigate(-1)}>
          <KeyboardArrowLeftIcon fontSize="large"/>
        </button>
      </>
    );
  }
  
  export default BackButton;