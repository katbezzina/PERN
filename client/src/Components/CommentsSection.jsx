import React, { useState, useEffect, useContext, DetailedHTMLProps, HTMLAttributes } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import "../Style/CommentsSection.css";
import { AuthContext } from "../Context/AuthContext";
import DeleteMyComment from "./DeleteMyComment";
// import UpdateMyComment from "./UpdateMyComment";


const backendUrl = "http://localhost:5000";


// type Comment = { message: String, messagecreatedat: String, username: String, avatar: String, commentid: Number, key: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> }

// type Comments = Comment[]

const CommentsSection = ({commentid, deleteThisComment, updateThisComment}) => {
  let { id } = useParams();
  const {user} = useContext(AuthContext)
  const [comments, setComments] = useState([]);

    useEffect(() => {
        (async function () {
            let data = await fetch(`${backendUrl}/comments/getcomments/${id}`).then((results) => results.json());
            setComments(data);
        })();
    }, []);


  return (
      <div > 
          {comments && comments.map((comment) => {
              const {username, message, messagecreatedat, avatar, commentid} = comment;
              return (
                  <div key={commentid}>
                    <div className="row" key={commentid}>
                          <Avatar srcSet={avatar} aria-label="" />
                          <div>
                            <Typography variant="body1" color="text.secondary">{message}</Typography>
                            <Typography variant="body2" className="usernameSize">{username}, {messagecreatedat.substring(0, 19)}</Typography>
                            
                            <br />
                            
                        </div>
                    {user && (user.id === comment.usersid) ? <DeleteMyComment commentid={commentid} onClick={deleteThisComment} /> : null}
                    {/* {user && (user.id === comment.usersid) ? <UpdateMyComment commentid={commentid} onClick={updateThisComment} /> : null } */}
                    </div>
                  </div>
              )
          }) }
    </div>
  )
}

export default CommentsSection