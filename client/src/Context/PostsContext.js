import React, { createContext, useState, useEffect } from "react";

export const PostsContext = createContext();

export const PostsContextProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      let response = await fetch("http://localhost:5000/posts/allposts");
      let jsonDATA = await response.json();
      setPosts(jsonDATA);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // console.log("contextposts", posts);

  return (
    <PostsContext.Provider value={{ posts }}>
      {props.children}
    </PostsContext.Provider>
  );
};
