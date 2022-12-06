import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import "../Style/CommentsSection.css";
import { AuthContext } from "../Context/AuthContext";
import DeleteMyComment from "./DeleteMyComment";
import { Comments } from "../@types";
// import UpdateMyComment from "./UpdateMyComment";


const backendUrl = "http://localhost:5000";



const CommentsSection = ({deleteThisComment}: {deleteThisComment: () => Promise<void>}) => {
  let { id } = useParams();
  const {user} = useContext(AuthContext)
  const [comments, setComments] = useState<Comments>([]);

    useEffect(() => {
        (async function () {
            let data = await fetch(`${backendUrl}/comments/getcomments/${id}`).then((results) => results.json());
            setComments(data);
        })();
    }, [id]);


  return (
      <div > 
          {comments && comments.map((comment) => {
              const {username, message, messagecreatedat, avatar, commentid} = comment;
              return (
                  <div key={commentid}>
                    <div className="row" key={commentid}>
                          <Avatar srcSet={avatar} aria-label="" alt=""/>
                          <div>
                            <Typography variant="body1" color="text.secondary">{message}</Typography>
                            <Typography variant="body2" className="usernameSize">{username}, {messagecreatedat.substring(0, 19)}</Typography>
                            
                            <br />
                            
                        </div>
                    {user && (user.id === comment.usersid) ? <DeleteMyComment commentid={commentid} onClickAction={deleteThisComment} /> : null}
                    </div>
                  </div>
              )
          }) }
    </div>
  )
}

export default CommentsSection