import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

const backendUrl = "http://localhost:5000";

type Post = { postid: number, title: string, description: string, number?: string, price?: number, postcode?: number, postimage?: string, createdat: string }

type Posts = Post[]

export type PostsContextValue = {
  posts: Posts | null
  myFavourites: Posts | null
  getPosts: () => void
  getCountedFavouritesForOnePost: (postid: number) => Promise<{jsonDATA: string}>
  getMyFavourites: () => void
}

const initialAuth: PostsContextValue = {
  posts: null,
  myFavourites: null,
  getPosts: () => { throw new Error('posts not fetched.'); },
  getCountedFavouritesForOnePost: () => { throw new Error('counted favourites for one post not fetched.'); },
  getMyFavourites: () => { throw new Error('user favourites not fetched.'); }
}

export const PostsContext = createContext<PostsContextValue>(initialAuth);

export const PostsContextProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState([]);
  const [myFavourites, setMyFavourites] = useState([]);
  //only use state once!

  const getPosts = async () => {
    try {
      let response = await fetch(`${backendUrl}/posts/allposts`);
      let jsonDATA = await response.json();
      setPosts(jsonDATA);
    } catch (error) {
      let message = 'Did not manage to get posts'
      if (error instanceof Error) message = error.message
      console.log(message);
    }
  };

  //passing a parameter to the fucntion
  const getCountedFavouritesForOnePost = async (postid: number) => {
    try {
      let response = await fetch(
        `${backendUrl}/favourites/countfavourites/${postid}`
      );
      let jsonDATA = await response.json();
      return jsonDATA;
    } catch (error) {
      let message = 'count of favourites for post error'
      if (error instanceof Error) message = error.message
      console.log(message);
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
        setMyFavourites(data.data);
      }
    } catch (error) {
      let message = 'favourites for user error'
      if (error instanceof Error) message = error.message
      console.log(message);
    }
  };

  useEffect(() => {
    getPosts();
    getMyFavourites();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        myFavourites,
        getPosts,
        getMyFavourites,
        getCountedFavouritesForOnePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
