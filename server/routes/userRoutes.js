import express from "express";
// import sequelize from "../dbConfig.js";
import pool from "../dbConfig.js";

const router = express.Router();

// //GET route to query users table with Sequelize
// router.get("/all", async (req, res) => {
//   try {
//     const response = await sequelize.query("SELECT * FROM users");
//     res.json(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

//USING POOL

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
