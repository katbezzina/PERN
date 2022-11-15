import * as React from 'react';
import { useState } from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


import "../Style/AddPost.css"


export default function AddPost() {

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [price, setPrice] = useState("");
  const [postcode, setPostcode] = useState("");
  const [postimage, setPostImage] = useState("")


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { title, username, description, price, postcode, postimage };
      const response = await fetch("http://localhost:5000/posts/mypost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response)
    } catch (err) {
      console.log(err.message);
    }
  }


  return (

      <Paper elevation={3} className="paperStyle">
        <Typography variant="h5" color="text.secondary">My Posting</Typography>
        <br/>
      <form onSubmit={onSubmitForm} className="flexible">
        <label className="inputTitle">Title*</label>
        <input
          placeholder='Title of Product'
          required
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="inputShort"
        />
        <label className="inputTitle">Username*</label>
        <input
          placeholder='Your username'
          required
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="inputShort"
        />
        <label className="inputTitle">Description*</label>
        <input
          required
          value={description}
          type="text"
          onChange={e => setDescription(e.target.value)}
          className="inputLong"
        />
        <label className="inputTitle">Price in &euro;*</label>
        <input
          placeholder='Ex: 5.60'
          required
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="inputShort"
        /> 
        <label className="inputTitle">Postcode*</label>
        <input
          placeholder='5 digit postcode'
          required
          type="number"
          value={postcode}
          onChange={e => setPostcode(e.target.value)}  
          className="inputShort"
        />
        <label className="inputTitle">Image url*</label>
        <input
          placeholder='http://__________'
          required
          type="url"
          value={postimage}
          onChange={e => setPostImage(e.target.value)}    
          className="inputShort"
        />
      <button className="submitButton" onSubmit={onSubmitForm}>Submit</button>
      </form>
      </Paper>

  );
}