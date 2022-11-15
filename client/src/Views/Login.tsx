import React, {useState} from 'react'
import { Grid,Paper, TextField, Button, Typography } from '@mui/material'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Link } from "react-router-dom";

import "../Style/LoginRegistration.css"

const Login = () => {
    
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange =
    (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
    // const paperStyle={padding :20, width:280}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid className="d-flex">
            <Paper className="paperStyle">
                <Grid>
                     {/* <Avatar color='primary'></Avatar> */}
                    <Typography variant="h5" color="text.secondary">Login</Typography>
                    <br/>
                </Grid>
                <TextField label='Username' placeholder='Enter username' variant="outlined" style={btnstyle} fullWidth required />
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth required >
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                        }
                    label="Password"
                    />
                </FormControl>
                {/* <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" style={btnstyle} fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                        size="small"
                    />
                    }
                    label="Show password"
                    color="secondary"
                 /> */}
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Login</Button>
                <br></br>
                <br></br>
                <Typography > Don't have an account?{" "}
                 <Link to="/Register" >
                     Register 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login