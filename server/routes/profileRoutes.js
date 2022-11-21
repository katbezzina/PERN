import express from "express";
import {
  getAllProfiles,
  postToProfile,
  //   getMyProfile,
} from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.get("/allProfiles", authMiddleware, getAllProfiles);

router.post("/postToProfile", jwtAuth, postToProfile);

// router.get("/myProfile/:userid", jwtAuth, getMyProfile);

export default router;
