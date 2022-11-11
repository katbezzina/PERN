import express from "express";
import Posts from "../models/posts.js";

const router = express.Router();

router.get("/allposts", async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.send(posts);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
