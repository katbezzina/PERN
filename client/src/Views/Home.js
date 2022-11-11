import React, { useState, useEffect } from "react";
// import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "../Style/Home.css";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts/allposts");
      const jsonDATA = await response.json();
      setPosts(jsonDATA);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="cardFlex">
      {posts &&
        posts.map((post) => {
          const { postid, title, postimage, postcode, description, createdAt } =
            post;

          return (
            //     <div key={postid}>
            //       <img srcSet={postimage} alt=""></img>
            //     </div>
            //   );
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
                  {description}
                </Typography>
                <br></br>
                <Divider />
                <br></br>
                <Typography variant="body2" color="text.secondary">
                  {createdAt.substring(0, 10)}, {postcode}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Like</Button>
                <Button size="small">Go to Details</Button>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
};

export default Home;
