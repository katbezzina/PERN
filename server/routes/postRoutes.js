import express from "express";
import pool from "../dbConfig.js";
// import Posts from "../models/posts.js";

const router = express.Router();

// router.get("/allposts", async (req, res) => {
//   try {
//     const posts = await Posts.findAll();
//     res.send(posts);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

router.get("/allposts", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM user_posts");
    console.log("response", response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
