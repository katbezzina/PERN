import express from "express";
import pool from "../dbConfig.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
    console.log("response", response);
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }

  // router.get("/test", (req, res) => {
  //   res.send({ msg: "Test route." });
});

export default router;
