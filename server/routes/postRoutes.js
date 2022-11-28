import express from "express";
import {
  addPost,
  getAllPosts,
  getPostDetails,
  getMyPosts,
  updateMyPost,
  deleteMyPost,
} from "../controllers/postsController.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.get("/viewmyposts", jwtAuth, getMyPosts);
router.get("/allposts", getAllPosts);

router.get("/postdetails/:id", getPostDetails);

router.post("/addpost", jwtAuth, addPost);

router.put("/updatemypost/:id", jwtAuth, updateMyPost);

router.delete("/deletemypost/:id", jwtAuth, deleteMyPost);

export default router;
