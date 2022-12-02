import React, { useState, useContext, ChangeEvent} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from "../Context/AuthContext"
import "../Style/NavigationMenu.css"

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

// export type UpdateUsernameAndAvatar = {
//   updateUsernameAndAvatar: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
// }

const UpdateProfile = ( ) => {
    const {user, getUser} = useContext(AuthContext)
    const [username, setUsername] = useState(user?.username ? user.username : "")
    const [avatar, setAvatar] = useState(user?.avatar ? user.avatar : "")

    //may also use PointerEvent for touch screens
    const updateUsernameAndAvatar = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        try {
            const backendUrl = "http://localhost:5000"
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({username, avatar}),
            }
             const response =  await fetch(`${backendUrl}/users/updateUsernameAndAvatar`, options)
            const { success } = await response.json()
            console.log("success update", success)
            if (success) {
                getUser()
            }
        }
        catch (error) {
            console.log('error', error)
        }
    }

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    setAvatar(e.target.value);
  }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
    <div>
      <Button onClick={handleOpen} ><EditIcon fontSize="small" color='secondary'/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update your profile
            </Typography>
            <br />
            <br />
            <TextField label='Your new username' onChange={handleUsernameChange} value={username} fullWidth />
            <br />
            <br />
            <TextField label='Your new avatar' onChange={handleAvatarChange} value={avatar} fullWidth multiline
            maxRows={3} />
            <br />
            <br />
            <div className="buttons">
              <button onClick={handleClose} className="noUnderline registerButton">Close</button>
              <button onClick={e => updateUsernameAndAvatar(e)} className="noUnderline loginButton">Update</button>
            </div>
        </Box>
      </Modal>
    </div>

        
  )
}

export default UpdateProfile