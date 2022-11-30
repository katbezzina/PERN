import { createContext, useState, useEffect } from "react";
import axios from "axios";

const backendUrl = "http://localhost:5000";

export const PostsContext = createContext();

export const PostsContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  //only use state once!

  const getPosts = async () => {
    try {
      let response = await fetch(`${backendUrl}/posts/allposts`);
      let jsonDATA = await response.json();
      setPosts(jsonDATA);
    } catch (error) {
      console.log(error.message);
    }
  };

  //passing a parameter to the fucntion
  const getCountedFavourites = async (postid) => {
    try {
      let response = await fetch(
        `${backendUrl}/favourites/countfavourites/${postid}`
      );
      let jsonDATA = await response.json();
      return jsonDATA;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMyFavourites = async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        method: "GET",
      };
      const data = await axios.get(
        `${backendUrl}/favourites/myfavourites`,
        options
      );
      if (data.data) {
        console.log("myfavourites", data.data);
        setFavourites(data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{ posts, favourites, getMyFavourites, getCountedFavourites }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};
