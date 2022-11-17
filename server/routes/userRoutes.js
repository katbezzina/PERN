import express from "express";
import {
  getAllUsers,
  getUserById,
  register,
  login,
} from "../controllers/usersController.js";
// import pool from "../dbConfig.js";
// import sequelize from "../dbConfig.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", register);
router.post("/login", login);

// //GET route to query users table with Sequelize
// router.get("/all", async (req, res) => {
//   try {
//     const response = await sequelize.query("SELECT * FROM users");
//     res.json(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

export default router;
