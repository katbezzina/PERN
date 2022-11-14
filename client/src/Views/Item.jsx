import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Item = () => {

    let { postid } = useParams();
    let [post, setPost] = useState();

    console.log("post", post)

    useEffect(() => {
        (async function () {
            let data = await fetch(`http://localhost:5000/posts/${postid}`).then((results) => results.json());
            setPost(data);
            console.log("data", data);
        })();
    }, [postid]);
           

//   const { title } = post;

    return (
      
        <div>
            <h1>{post.title}</h1>
        </div>
    );
}

export default Item;