import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CardActions from "@mui/material/CardActions";
import UpdatePost from './UpdatePost';
import DeleteMyPost from './DeleteMyPost';
import { Link } from "react-router-dom";
import { Posts } from "../@types";


const PostsCards = ({posts, action, detailsaction}: {posts: Posts, action: boolean, detailsaction: boolean}) => {

  return  (
      <div className="cardsFlex">
        {posts &&
          posts.map((post) => {
            const {
              postid,
              title,
              postimage,
              description,
              createdat,
              price, postcode
            } = post;

            return (
              <Card sx={{ maxWidth: 345 }} key={postid}>

                <CardMedia
                  component={"img"}
                  alt=""
                  height="140"
                  image={postimage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {createdat.substring(0, 10)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="alignRight">
                    <FmdGoodIcon fontSize="small" /> {postcode}
                  </Typography>
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
                {action && <CardActions >
                  <UpdatePost post={post} /> {"   "} <DeleteMyPost postid={postid} />
                </CardActions>}
                {detailsaction &&
                 <CardActions >
                  <Link to={`${postid}`} className="noUnderline">
                    <Button size="small">Go to Details</Button>
                  </Link>
                 </CardActions>}
            </Card>
            );
          })}
      </div>
  );
}

export default PostsCards