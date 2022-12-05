import express from "express";
import {
  getAllUsers,
  // getUserById,
  register,
  login,
  // getProfile,
  getMyUserProfile,
  updateUsernameAndAvatar,
  // verification,
} from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validInfo from "../middleware/validInfo.js";
import { jwtAuth } from "../middleware/passport.js";
// import pool from "../dbConfig.js";
// import sequelize from "../dbConfig.js";

const router = express.Router();

router.get("/all", getAllUsers);

//adding a validation middleware
router.post("/register", validInfo, register);
router.post("/login", validInfo, login);

router.get("/me", jwtAuth, getMyUserProfile);
router.put("/updateUsernameAndAvatar", jwtAuth, updateUsernameAndAvatar);

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
