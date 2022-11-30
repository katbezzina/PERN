import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from "@mui/material/Divider";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import "../Style/ItemCard.css";
import BackButton from "../Components/BackButton"
import CommentsSection from "../Components/CommentsSection";
import InputComment from "../Components/InputComment";
import { AuthContext } from "../Context/AuthContext";
import { PostsContext } from "../Context/PostsContext";

// import MoreVertIcon from '@mui/icons-material/MoreVert';

const backendUrl = "http://localhost:5000";

const Item = () => {

  const { user } = useContext(AuthContext)
  const { getCountedFavourites } = useContext(PostsContext)

  //Fetching details

  let { id } = useParams();
  let [posts, setPost] = useState([]);
  let [favouritecount, setFavouriteCount] = useState(null);
  
    useEffect(() => {
        (async function () {
            let data = await fetch(`${backendUrl}/posts/postdetails/${id}`).then((results) => results.json());
          setPost(data);
          //we passaed a parameter in the context
          const { count } = await getCountedFavourites(id)
          setFavouriteCount(count);
            // console.log("Post data", data);
        })();
    }, []);

//Styling card
// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
    
    const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                        price,
                        username,
                      avatar,
                        // message, messagecreatedat
                    } = post;
    
                    return (
 
      
    <Card sx={{ maxWidth: 800 }} key={postid}>
    <BackButton />
      <CardHeader
        avatar={
          <Avatar srcSet={avatar} aria-label="" />
        }
        title={username}
        subheader={createdat}
      />
      <CardMedia
        component="img"
        height="194"
        image={postimage}
        alt=""
      />
        <CardContent>
        <Typography variant="h5" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="alignRight">
          <FmdGoodIcon fontSize="small" /> {postcode}
        </Typography>
        {favouritecount ?              
        <Typography variant="h7" color="text.secondary">
          &hearts; { favouritecount }
        </Typography> :
        <Typography variant="h7" color="text.secondary">
          &hearts; {" "}0
          </Typography>}
        <br></br>
        <br></br>
        <Divider />
        <br></br>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <br></br>
        <Divider />
        <br></br>
        <Typography variant="body2" color="text.secondary" className="alignRight" fontSize="medium">
        &euro; {price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" color="text.secondary" >Comments</Typography>
          <br />
          {user ? <InputComment postid={postid} /> : null}
          <br />
          <br />                  
          <CommentsSection />
        </CardContent>
      </Collapse>
    </Card>
                    );
                })}
        </div>
    );
}


export default Item;