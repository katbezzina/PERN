import { createContext, useState, useEffect, ReactNode } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Post, Posts } from "../@types";

const backendUrl = "http://localhost:5000";

// type Post = { postid: number, title: string, description: string, price?: string, postcode?: string, postimage?: string, createdat: string, username? : string, avatar? : string  }

// type Posts = Post[]

export type PostsContextValue = {
  post: Post | null
  posts: Posts | null
  myFavourites: Posts | null
  favouritecount: number | null
  getAPost: () => void
  getPosts: () => void
  getCountedFavouritesForOnePost: (postid: number) => Promise<{jsonDATA: string}>
  getMyFavourites: () => void
}

const initialAuth: PostsContextValue = {
  post: null,
  posts: null,
  myFavourites: null,
  favouritecount: null,
  getAPost: () => { throw new Error ('post details failed to fetch')},
  getPosts: () => { throw new Error('posts not fetched.'); },
  getCountedFavouritesForOnePost: () => { throw new Error('counted favourites for one post not fetched.'); },
  getMyFavourites: () => { throw new Error('user favourites not fetched.'); }
}

export const PostsContext = createContext<PostsContextValue>(initialAuth);

export const PostsContextProvider = ({ children }: { children: ReactNode }) => {
   let { id }: any = useParams();
  const [post, setOnePost] = useState<Post | null>(null);
  const [posts, setPosts] = useState([]);
  const [myFavourites, setMyFavourites] = useState([]);
    let [favouritecount, setFavouriteCount] = useState(null);
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
      let message = 'Error: Count of favourites for post'
      if (error instanceof Error) message = error.message
      console.log(message);
    }
  };

    const getAPost = async () => {
    try {
      let data = await fetch(`${backendUrl}/posts/postdetails/${id}`).then((results) => results.json());
      setOnePost(data)
      const { count }: any = await getCountedFavouritesForOnePost(id)
      setFavouriteCount(count);
    } catch(error) {
      let message = 'Error: Did not manage to get post details'
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
        setMyFavourites(data.data);
      }
    } catch (error) {
      let message = 'Error: User favourites error'
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
        post,
        favouritecount,
        getPosts,
        getMyFavourites,
        getCountedFavouritesForOnePost,
        getAPost
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
