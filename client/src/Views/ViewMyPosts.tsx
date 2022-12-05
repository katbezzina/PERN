import React, { useEffect, useState } from 'react'
// import { PostsContext } from "../Context/PostsContext"
import axios from "axios";
import Typography from "@mui/material/Typography";
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import "../Style/Home.css";
import BackButton from '../Components/BackButton';
import PostsCards from '../Components/PostsCards';
import { Posts } from '../@types';

const backendUrl = "http://localhost:5000";

const ViewMyPosts = () => {

  //organise logic in one component for easy prop handling
const [posts, setPosts] = useState<Posts | null>([]);

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
      <div className="left">
        <BackButton />
      </div>
      <Typography gutterBottom variant="h5" component="div" color="primary">
          <RiceBowlIcon />  My Posts  <RiceBowlIcon />
      </Typography>
      {posts && <PostsCards posts={posts} action detailsaction={false} />}
    </div>
  );
}

export default ViewMyPosts