import React, { useContext, useState, ChangeEvent } from "react";
import "../Style/Home.css";
import PostsCards from "../Components/PostsCards";
import { PostsContext } from "../Context/PostsContext";
import SearchBar from "../Components/SearchBar";

const Home = () => {
  const { posts } = useContext(PostsContext);
  const [inputValue, setInputValue] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  let searchedResult = posts?.filter((post) => {
    return (
      post.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
      post.description?.toLowerCase().includes(inputValue.toLowerCase()) ||
      post.createdat.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  return (
    <div className="marginTop">
      <SearchBar handleChange={handleChange} />
      {searchedResult && <PostsCards posts={searchedResult} action={false} detailsaction likeaction={false} />}
    </div>
  );
};

export default Home;
