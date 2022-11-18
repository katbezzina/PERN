import React, { useContext, useState } from "react";
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
import SearchBar from "../Components/SearchBar";

const Home = () => {
  const { posts } = useContext(PostsContext);
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  let searchedResult = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(inputValue.toLowerCase()) |
      post.description.toLowerCase().includes(inputValue.toLowerCase()) |
      post.createdat.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  return (
    <div className="marginTop">
      <SearchBar handleChange={handleChange} />
      <div className="cardFlex">
        {searchedResult &&
          searchedResult.map((post) => {
            const {
              postid,
              title,
              postimage,
              postcode,
              description,
              createdat,
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
                  <Link to={`${postid}`} className="noUnderline">
                    <Button size="small">Go to Details</Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
