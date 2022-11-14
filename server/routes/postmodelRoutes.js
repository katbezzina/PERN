import express from "express";
import pool from "../dbConfig.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    let postid = req.params.id;
    const response = await pool.query(
      "SELECT * FROM user_posts WHERE postid = $1",
      [postid]
    );
    // console.log("response", response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
