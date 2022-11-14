import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "../Style/Home.css";
import { PostsContext } from "../Context/PostsContext";

const Home = () => {
  const { posts } = useContext(PostsContext);

  return (
    <div className="cardFlex">
      {posts &&
        posts.map((post) => {
          const {
            postid,
            title,
            postimage,
            postcode,
            description,
            createdat,
            id,
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
                  {description}
                </Typography>
                <br></br>
                <Divider />
                <br></br>
                <Typography variant="body2" color="text.secondary">
                  {createdat.substring(0, 10)}, {postcode}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`${id}`}>
                  <Button size="small">Go to Details</Button>
                </Link>
                <Button size="small">Like</Button>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
};

export default Home;
