import { useContext } from "react";
import Avatar from '@mui/material/Avatar';
import Logout from "../Components/Logout"
import UpdateProfile from "../Components/UpdateProfile"
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import "../Style/MyProfile.css"
import { AuthContext } from "../Context/AuthContext"
import { Link } from "react-router-dom";

const MyProfile = () => {

  const {user} = useContext(AuthContext)


  return (
  <div className="profileCard">
  {user &&
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader color="secondary"
        avatar={
          <Avatar srcSet={user.avatar} aria-label="" />
        }
            title={user.name}
          />
          <UpdateProfile />
          <CardContent>
            <Divider />
            <div className="centred">
              <br />
              <br />
              <Typography variant="h3" color="primary">
                Welcome, {user.username}!
              </Typography>
              <br />
              <br />
              <Typography variant="h6" color="secondary">
                Save money. Save your tummy. <br /> Save the planet.
              </Typography>
            </div>
              <br />
            <br />
            <div className="spacearound">
            <Link to="/MyPosts" >
              <Button>my posts</Button>
            </Link>
            <Link to="/MyFavourites" >
              <Button>my favourites</Button>
            </Link>
            </div>
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