import express from "express";
import {
  getAllComments,
  addComment,
  deleteMyComment,
} from "../controllers/commentsController.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.get("/getcomments/:id", getAllComments);

router.post("/addcomment/:id", jwtAuth, addComment);

router.delete("/deletemycomment/:id", jwtAuth, deleteMyComment);

export default router;
