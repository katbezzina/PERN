import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import "../Style/NavigationMenu.css";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const backendUrl = "http://localhost:5000";

function DeleteMyPost() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
  let { id } = useParams();
  let [posts, setPost] = useState([]);

  const deleteThisPost = async () => {
      try {
        const options = {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          method: 'DELETE',
        }
        const data = await axios.delete(`${backendUrl}/posts/deletemypost/${id}`, options);
        if (data.data) {
          console.log("deletepost", data.data)
          setPost(data.data);
        } 
      }
      catch (error) {
        console.log('error', error)
      }
  }

  return (
    <>
      <Button onClick={handleOpen}><DeleteIcon fontSize="small" color='secondary'/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you would like to delete this post?
          </Typography>
          <br />
          <br />
          <div className="buttons">
            <button
              onClick={handleClose}
              className="noUnderline registerButton"
            >
              No
            </button>
            <Link to="/Login">
              <button onClick={deleteThisPost} className="noUnderline loginButton">
                Delete anyway!
              </button>
            </Link>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default DeleteMyPost;