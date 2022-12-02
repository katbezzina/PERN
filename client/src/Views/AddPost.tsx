import React, {useState, FormEvent} from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import { useNavigate } from "react-router-dom";

import "../Style/AddPost.css"

const backendUrl = "http://localhost:5000";

export default function AddPost() {

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [postcode, setPostcode] = useState("");
  const [postimage, setPostImage] = useState("")

   const navigate = useNavigate();

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = { title, description, price, postcode, postimage };
      const response = await fetch(`${backendUrl}/posts/addpost`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      navigate("/MyPosts");
      console.log(response)
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    
  <div className="center">
      <Paper elevation={3} className="paperStyle">
        <Typography variant="h5" color="text.secondary"><RiceBowlIcon /> My Posting <RiceBowlIcon /></Typography>
        <br/>
        <form onSubmit={onSubmitForm} className="flexible">
        <TextField
          variant="outlined"
          onChange={e => setTitle(e.target.value)}
          label="Title"
          required
          value={title}
        />
        <TextField
          onChange={e => setDescription(e.target.value)}
          label="Description"
          multiline
          maxRows={3}
          required
          value={description}
        />
        <TextField
          label="Price"
          type="number"
          required
          helperText="Ex: 1.23"
          value={price}
          onChange={e => setPrice(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">&euro;</InputAdornment>,
          }}
        />
        <TextField
          variant="outlined"
          onChange={e => setPostcode(e.target.value)}
          label="Postcode"
          helperText="PLZ should be 5 digits"
          type="number"
          required
          value={postcode}
        />
        <TextField
          onChange={e => setPostImage(e.target.value)}
          label="Image url"
          multiline
          maxRows={2}
          required
          value={postimage}
        />
      <button className="submitButton" onSubmit={onSubmitForm}>Submit</button>
      </form>
      </Paper>
      </div>

  );
}