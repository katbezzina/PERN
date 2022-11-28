import React, { useEffect, useState } from 'react'
// import { PostsContext } from "../Context/PostsContext"
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import "../Style/Home.css";
import BackButton from '../Components/BackButton';

const backendUrl = "http://localhost:5000";

const ViewMyPosts = () => {
const [posts, setPosts] = useState([]);

  const getMyPosts = async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        method: "GET",
      };
      const data = await axios.get(`${backendUrl}/posts/viewmyposts`, options);
      if (data.data) {
        console.log("myposts", data.data);
        setPosts(data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
    
    useEffect(() => {
        getMyPosts();
    }, []);



  return  (
    <div className="marginTop">
      <div></div>
      <BackButton className="left"/>
      <Typography gutterBottom variant="h5" component="div" color="primary">
          My Posts
      </Typography>
      <div className="cardsFlex">
        {posts &&
          posts.map((post) => {
            const {
              postid,
              title,
              postimage,
              description,
              createdat,
              price, postcode
            } = post;

            return (
              <Card sx={{ maxWidth: 345 }} key={postid}>

                <CardMedia
                  component={"img"}
                  alt=""
                  height="140"
                  image={postimage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {createdat.substring(0, 10)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="alignRight">
                    <FmdGoodIcon fontSize="small" /> {postcode}
                  </Typography>
                  <br></br>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                  <br></br>
                  <Divider />
                  <br></br>
                  <Typography variant="body2" color="text.secondary" className="alignRight" fontSize="medium">
                     &euro; {price}
                  </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Edit</Button>
                </CardActions>
                </Card>
            );
          })}
      </div>
    </div>
  );
}

export default ViewMyPosts