import React, {useState, useContext, ChangeEvent, FormEvent} from 'react'
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
import Alert from '@mui/material/Alert';
import { AuthContext } from "../Context/AuthContext.tsx";
import { Link, useNavigate } from "react-router-dom";

import "../Style/LoginRegistration.css"
interface State {
    password: string
    email: string
    error: string
}

const Login = () => {
    
  const [values, setValues] = useState({
        password: '',
        email: '',
        error: '',
        showPassword: false,
    })

  const navigate = useNavigate();
  const { login } = useContext(AuthContext)

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const { success, error } = await login(values.email, values.password)
    try {
      if (success) {
        navigate("/MyProfile");
      }
      else {
        error && setValues({ ...values, error: error })
      }
    } catch (e) {
      setValues({ ...values, error: "e.message" })
    }
  }

  // Toggle Password

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
              <form onSubmit={handleSubmit}>
                <FormControl variant="outlined" fullWidth required>
                <TextField label='Email address' variant="outlined" style={btnstyle} type="email" onChange={handleChange('email')} fullWidth required />
                <FormControl >
                    <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        required
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
                </FormControl>
              <Button type='submit' color='primary' variant="contained" style={btnstyle} onSubmit={handleSubmit} fullWidth>Login</Button>
            </form>
            {values.error && <Alert severity="warning">{values.error}</Alert>}
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