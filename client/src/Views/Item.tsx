import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from "@mui/material/Divider";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import "../Style/ItemCard.css";
import BackButton from "../Components/BackButton"

// import MoreVertIcon from '@mui/icons-material/MoreVert';

const Item = () => {

  //Fetching details

    let { id } = useParams();
    let [posts, setPost] = useState([]);

    useEffect(() => {
        (async function () {
            let data = await fetch(`http://localhost:5000/posts/${id}`).then((results) => results.json());
            setPost(data);
            // console.log("data", data);
        })();
    }, []);

//Styling card
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
    
    const [expanded, setExpanded] = React.useState(false);

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
                    } = post;
    
                    return (
 
      
    <Card sx={{ maxWidth: 800 }} key={postid}>
    <BackButton />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepPurple[700] }} aria-label="">
            U
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={username}
        subheader={createdat.substring(0, 10)}
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
        <Typography variant="body2" color="text.secondary">
          <FmdGoodIcon fontSize="small" /> {postcode}
        </Typography>
        </Typography>
        <br></br>
        <Divider />
        <br></br>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <br></br>
        <Divider />
        <br></br>
        <Typography variant="body2" color="text.secondary" className="alignRight">
        &euro; {price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
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
          <Typography paragraph color="text.secondary">Comments</Typography>
          <Typography paragraph>

          </Typography>
          <Typography paragraph>

          </Typography>
          <Typography paragraph>
          </Typography>
          <Typography>

          </Typography>
        </CardContent>
      </Collapse>
    </Card>
                    );
                })}
        </div>
    );
}


export default Item;