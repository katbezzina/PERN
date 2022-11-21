import express from "express";
import {
  getAllProfiles,
  viewProfile,
} from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.get("/allProfiles", authMiddleware, getAllProfiles);

router.post("/viewProfile", jwtAuth, viewProfile);

export default router;
