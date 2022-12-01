import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import "../Style/CommentsSection.css";

const backendUrl = "http://localhost:5000";

const CommentsSection = () => {
let { id } = useParams();
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
                            <Typography variant="h7" color="text.secondary">{message}</Typography>
                            <Typography variant="body2" className="usernameSize">{username}, {messagecreatedat.substring(0,19)}</Typography>
                            <br/>
                          </div>
                    </div>
                  </div>
              )
          }) }
    </div>
  )
}

export default CommentsSection