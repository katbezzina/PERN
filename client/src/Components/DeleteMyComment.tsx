import React from 'react'
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

const backendUrl = "http://localhost:5000";

const DeleteMyComment = ({ commentid }: any) => {
    
    const deleteThisComment = async () => {
      try {
        const options = {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          method: 'DELETE',
        }
         await fetch(`${backendUrl}/comments/deletemycomment/${commentid}`, options);
         window.location.reload();
      }
      catch (error) {
        console.log('error', error)
      }
    }
    
  return (
    <div><Button onClick={deleteThisComment}><DeleteIcon fontSize="small" color='secondary' /></Button></div>
  )
}

export default DeleteMyComment