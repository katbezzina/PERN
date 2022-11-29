// import React, { createContext, useState, useEffect } from "react";

// const backendUrl = "http://localhost:5000";

// export const CommentsContext = createContext();

// export const CommentsContextProvider = (props) => {
//   const [comments, setComments] = useState([]);

//   const getComments = async () => {
//     try {
//       const body = { c_postid }
//       const response = await fetch(`${backendUrl}/comments/getcomments`, {
//         method: "GET",
//         body: JSON.stringify(body),
//       });
//         setComments(response);
//         console.log("comments", response)
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     getComments();
//   }, []);

//   // console.log("contextposts", posts);

//   return (
//     <CommentsContext.Provider value={{ comments, getComments, setComments }}>
//       {props.children}
//     </CommentsContext.Provider>
//   );
// };
