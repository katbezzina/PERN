import express from "express";
import pool from "../dbConfig.js";

const router = express.Router();

router.post("/mypost", async (req, res) => {
  try {
    const { title, username, description, price, postcode, postimage } =
      req.body;
    const newPost = await pool.query(
      "INSERT INTO user_posts (title, username, description, price, postcode, postimage) VALUES($1, $2, $3, $4, $5, $6) RETURNING * ",
      [title, username, description, price, postcode, postimage]
    );
    console.log(req.body);
    res.json(newPost.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
