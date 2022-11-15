import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import "../Style/AddPost.css"

interface State {
  amount: string;
}

export default function AddPost() {
  const [values, setValues] = React.useState<State>({
    amount: '',
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const [selectedImage, setSelectedImage] = useState(null);


  return (
    <Grid className="d-flex">
      <Paper className="paperStyle">
        <Typography variant="h5" color="text.secondary">My Posting</Typography>
        <br/>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
        <TextField
          label="Title"
          id="title"
          sx={{ m: 1 }} required
          maxLength="255"
          />
        <TextField
          label="Username"
          id="username"
          sx={{ m: 1 }} required
          maxLength="255"
          />
       <TextField
          id="description"
          label="Description of products"
          multiline required sx={{ m: 1 }} rows={4}
          />
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount" required>Price</InputLabel>
          <OutlinedInput
            id="price"
            type="number"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">&euro;</InputAdornment>}
            label="Price"
            required
          />
        </FormControl>
        <TextField
          label="Postcode"
          id="postcode"
          sx={{ m: 1 }} required
          maxLength="6"
          type="number"
        />

      {selectedImage && (
        <div>
        <img alt="" width={"100px"} src={URL.createObjectURL(selectedImage)} maxLength="1000"/>
        <br />
        <Button onClick={()=>setSelectedImage(null)} size="small">Remove</Button>
        </div>
      )}
      <br />
      <br /> 
      <Button>
      <input
        maxLength="1000"
        type="file"
        name="myImage"
        onChange={(event) => {
          // console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
            />
        </Button>
        </FormControl>
        <Button>
          <input type="submit" className="submitButton"></input>
        </Button>
      </div>
      </Box>
      </Paper>
      </Grid>
  );
}