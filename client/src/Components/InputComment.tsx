import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import  "../Style/CommentsSection.css"

const backendUrl = "http://localhost:5000";

const InputComment = ({postid}: any) => {

const [message, setMessage] = useState("")

const onSubmitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const body = { message };
      const response = await fetch(`${backendUrl}/comments/addcomment/${postid}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      window.location.reload();
      console.log("add comment", response)
  
    } catch (error) {
      let message = 'comment input error'
      if (error instanceof Error) message = error.message
      console.log(message);
    }
  }

  return (
      <div>
       <form className="commentRow">
        <TextField
          variant="standard" className="commpentInput"
          onChange={e => setMessage(e.target.value)}
          multiline
          maxRows={3}
          label="Add comment"
          value={message}
              />
         <Button variant="outlined" onClick={onSubmitForm} className="commentButton"><SendIcon fontSize="small" /></Button>
       </form>
      </div>
  )
}

export default InputComment