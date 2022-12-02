import {useContext} from 'react'
import { PostsContext } from '../Context/PostsContext'
import Card from "@mui/material/Card";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import BackButton from '../Components/BackButton';

const ViewMyLikes = () => {

    const { myFavourites } = useContext(PostsContext)

  return  (
    <div className="marginTop">
      <div className="left">
        <BackButton />
      </div>
      <Typography gutterBottom variant="h5" component="div" color="primary">
          My <FavoriteIcon/> <FavoriteIcon/> <FavoriteIcon/>
      </Typography>
      <div className="cardsFlex">
        {myFavourites &&
          myFavourites.map((favourite) => {
            const {
              postid,
              title,
              postimage,
              description,
              price, postcode
            } = favourite;

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
                </Card>
            );
          })}
      </div>
    </div>
  );
}

export default ViewMyLikes