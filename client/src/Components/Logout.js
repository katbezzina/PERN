import React, { useState, useContext } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
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

function Logout(props) {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ListItemIcon onClick={handleOpen}>Logout</ListItemIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you would like to log out?
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
              <button onClick={logout} className="noUnderline loginButton">
                Logout anyway!
              </button>
            </Link>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Logout;
