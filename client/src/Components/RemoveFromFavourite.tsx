import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "../Style/NavigationMenu.css";
import { PostsContext } from "../Context/PostsContext";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const backendUrl = "https://foodcare.vercel.app";

function RemoveFromFavourite({ postid }: {postid: number}) {

    const {getMyFavourites} = useContext(PostsContext)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
    const removeLike = async () => {
      try {
        const options = {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          method: 'DELETE',
        }
        //postid is coming from the props not from the back-end
        await fetch(`${backendUrl}/favourites/deletemyfavourite/${postid}`, options);
        getMyFavourites()
      }
    catch (error) {
      let message = 'Error: removing favourite failed'
      if (error instanceof Error) message = error.message
      console.log(message);
    }
    }
  

    return (
    <>
      <Button onClick={handleOpen}>Remove</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you would like to remove from favourites?
          </Typography>
          <br />
          <br />
          <div className="buttons">
            <button
              onClick={handleClose}
              className="noUnderline loginButton"
            >
              No, thanks
            </button>

              <button onClick={removeLike} className="noUnderline registerButton">
                Yes, please
              </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default RemoveFromFavourite;