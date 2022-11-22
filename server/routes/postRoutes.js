import express from "express";
import {
  addPost,
  getAllPosts,
  getPostDetails,
} from "../controllers/postsController.js";

const router = express.Router();

router.get("/allposts", getAllPosts);

router.get("/:id", getPostDetails);

//to add middleware
router.post("/mypost", addPost);

export default router;
