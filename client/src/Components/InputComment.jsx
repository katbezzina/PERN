import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from "react-router-dom";

import  "../Style/CommentsSection.css"

const backendUrl = "http://localhost:5000";

const InputComment = () => {

const [message, setMessage] = useState("")
let { id } = useParams();
    
const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { message };
      const response = await fetch(`${backendUrl}/comments/addcomment/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      console.log(response)
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
      <div>
       <form onSubmit={onSubmitForm} className="commentRow">
        <TextField
          variant="standard" className="commpentInput"
          onChange={e => setMessage(e.target.value)}
          label="Add comment"
          value={message}
              />
         <Button variant="outlined" onSubmit={onSubmitForm} className="commentButton"><SendIcon fontSize="small" /></Button>
        </form>
      </div>
  )
}

export default InputComment