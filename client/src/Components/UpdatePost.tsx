import React, {useState, ChangeEvent} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';

import "../Style/NavigationMenu.css"
import { Post } from '../@types';

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

//pass post (not postid) as props to select that particular post
const UpdatePost = ({ post }: {post: Post} )=> {

    const [title, setTitle] = useState(post?.title ? post.title : "");
    const [description, setDescription] = useState(post?.description ? post.description : "");
    const [price, setPrice] = useState(post?.price ? post.price : "");
    const [postcode, setPostcode] = useState(post?.postcode ? post.postcode : "");
    const [postimage, setPostImage] = useState(post?.postimage ? post.postimage : "");

    const updateMyPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const backendUrl = "https://foodcare.vercel.app"
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({title, description, price, postcode, postimage}),
            }
             const response =  await fetch(`${backendUrl}/posts/updatemypost/${post.postid}`, options)
            const { success } = await response.json()
          console.log("success update", success)
          window.location.reload();
        }
        catch (error) {
            console.log('error', error)
        }
    }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }
    
  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    setPrice(e.target.value);
      }
    
  function handlePostcodeChange(e: ChangeEvent<HTMLInputElement>) {
    setPostcode(e.target.value);
      }
    
  function handlePostImageChange(e: ChangeEvent<HTMLInputElement>) {
    setPostImage(e.target.value);
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
            Update your post
            </Typography>
            <br />
            <br />
        <TextField
          variant="outlined" fullWidth
          onChange={handleTitleChange}
          label="Title"
          required
          value={title}
                    />
                    <br />
                    <br />
        <TextField
          onChange={handleDescriptionChange}
          label="Description" fullWidth
          multiline
          maxRows={3}
          required
          value={description}
                    />
                    <br />
                    <br />
        <TextField
          label="Price"
          type="number"
          required fullWidth
          helperText="Ex: 1.23"
          value={price}
          onChange={handlePriceChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">&euro;</InputAdornment>,
          }}
                        
                    />
                    <br />
        <TextField
          variant="outlined"
          onChange={handlePostcodeChange}
          label="Postcode"
          helperText="PLZ should be 5 digits"
          type="number"
          required fullWidth
          value={postcode}
                    />
                    <br />
        <TextField
          onChange={handlePostImageChange}
          label="Image url"
          multiline
          maxRows={2}
          required fullWidth
          value={postimage}
                    />
                    <br />
            <br />
            <br />
            <div className="buttons">
              <button onClick={handleClose} className="noUnderline registerButton">Close</button>
              <button onClick={e => updateMyPost(e)} className="noUnderline loginButton">Update</button>
            </div>
        </Box>
      </Modal>
    </div>

        
  )
}

export default UpdatePost