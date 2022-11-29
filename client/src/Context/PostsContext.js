import React, { createContext, useState, useEffect } from "react";

const backendUrl = "http://localhost:5000";

export const PostsContext = createContext();

export const PostsContextProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      let response = await fetch(`${backendUrl}/posts/allposts`);
      let jsonDATA = await response.json();
      setPosts(jsonDATA);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts }}>
      {props.children}
    </PostsContext.Provider>
  );
};
