import {useContext} from 'react'
import { PostsContext } from '../Context/PostsContext'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from "@mui/material/Typography";
import BackButton from '../Components/BackButton';
import PostsCards from "../Components/PostsCards";

const ViewMyLikes = () => {

    const { myFavourites } = useContext(PostsContext)

  return  (
    <div className="marginTop">
      <div className="left">
        <BackButton />
      </div>
      <Typography gutterBottom variant="h5" component="div" color="primary">
         <FavoriteIcon/> My Favourites <FavoriteIcon/>
      </Typography>
      {myFavourites && <PostsCards posts={myFavourites} action={false} detailsaction={false} />}
    </div>
  );
}

export default ViewMyLikes