import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import Logout from "../Components/Logout"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import "../Style/MyProfile.css"


// interface Profile {
//     avatar: string
//     username: string
//     name: string
//     email: string
// }

const MyProfile = () => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const backendUrl= "http://localhost:5000"
        const options = {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          method: 'GET',
        }
        const data = await axios.get(`${backendUrl}/profiles/myProfile`, options);
        if (data.data) {
          console.log("userprofile", data.data)
          setProfile(data.data);
        }
      }
      catch (error) {
        console.log('error', error)
      }
    }
    getProfile()
  }, []);

  return (
  <div className="profileCard">
  {profile &&
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader color="secondary"
        avatar={
          <Avatar srcSet={profile.avatar} aria-label="" />
        }
        title={profile.name}
      />
          <CardContent>
              <Divider />
            <div className="centred">

              <br />
              <br />
              <Typography variant="h3" color="primary">
                Welcome, {profile.username}!
              </Typography>
              <br />
              <br />
              <Typography variant="body1" color="secondary">
                The purpose of this website is to avoid food waste on a local level with little effort, while you save money, the planet and your tummy!
                <br />
                <br />
                We would like to thank you for your contributions to this community {"=)"}
              </Typography>
            </div>
                          <br />
              <br />
              <Divider />
          </CardContent>
          <CardActions disableSpacing>
            <Logout />
          </CardActions>
        </Card>
      }
      </div>
  )
}

export default MyProfile