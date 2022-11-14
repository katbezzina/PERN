import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Item = () => {

    let { id } = useParams();
    let [posts, setPost] = useState(null);

    console.log("post", posts)

    useEffect(() => {
        (async function () {
            let data = await fetch(`http://localhost:5000/posts/${id}`).then((results) => results.json());
            setPost(data);
            console.log("data", data);
        })();
    }, []);

//       const getPost = async () => {
//     try {
//       let response = await fetch(`http://localhost:5000/posts/${id}`);
//       let jsonDATA = await response.json();
//       setPost(jsonDATA);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     getPost();
//   }, []);
           



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
      
                        <div>
                            <h1>{title}</h1>

            
        
        
                        </div>
                    );
                })}
        </div>
    );
}


export default Item;