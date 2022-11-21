import React, {useState, FormEvent} from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import "../Style/AddPost.css"


export default function AddPost() {

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [price, setPrice] = useState("");
  const [postcode, setPostcode] = useState("");
  const [postimage, setPostImage] = useState("")


  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = { title, username, description, price, postcode, postimage };
      const response = await fetch("http://localhost:5000/posts/mypost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response)
    } catch (err: any) {
      console.log(err.message);
    }
  }


  return (
    
  <div className="center">
      <Paper elevation={3} className="paperStyle">
        <Typography variant="h5" color="text.secondary">My Posting</Typography>
        <br/>
        <form onSubmit={onSubmitForm} className="flexible">
        {/* <label className="inputTitle">Title*</label> */}
        {/* <input
          placeholder='Title of Product'
          required
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="inputShort"
        /> */}
        <TextField
          variant="outlined"
          onChange={e => setTitle(e.target.value)}
          label="Title"
          required
          value={title}
        />
        {/* <label className="inputTitle">Username*</label>
        <input
          placeholder='Your username'
          required
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="inputShort"
        /> */}
        <TextField
          variant="outlined"
          onChange={e => setUsername(e.target.value)}
          label="Username"
          required
          value={username}
        />
        {/* <label className="inputTitle">Description*</label>
        <input
          required
          value={description}
          type="text"
          onChange={e => setDescription(e.target.value)}
          className="inputLong"
        /> */}
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
        {/* <label className="inputTitle">Price in &euro;*</label>
        <input
          placeholder='Ex: 5.60'
          required
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="inputShort"
        />  */}
        <TextField
          variant="outlined"
          onChange={e => setPostcode(e.target.value)}
          label="Postcode"
          helperText="PLZ should be 5 digits"
          type="number"
          required
          value={postcode}
        />
        {/* <label className="inputTitle">Postcode*</label>
        <input
          placeholder='5 digit postcode'
          required
          type="number"
          value={postcode}
          onChange={e => setPostcode(e.target.value)}  
          className="inputShort"
        /> */}
        <TextField
          onChange={e => setPostImage(e.target.value)}
          label="Image url"
          multiline
          maxRows={2}
          required
          value={postimage}
        />
        {/* <label className="inputTitle">Image url*</label>
        <input
          placeholder='http://__________'
          required
          type="url"
          value={postimage}
          onChange={e => setPostImage(e.target.value)}    
          className="inputShort"
        /> */}
      <button className="submitButton" onSubmit={onSubmitForm}>Submit</button>
      </form>
      </Paper>
      </div>

  );
}