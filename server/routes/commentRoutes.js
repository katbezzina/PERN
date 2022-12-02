import express from "express";
import {
  getAllComments,
  addComment,
  deleteMyComment,
  updateMyComment,
} from "../controllers/commentsController.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.get("/getcomments/:id", getAllComments);

router.post("/addcomment/:id", jwtAuth, addComment);

router.delete("/deletemycomment/:id", jwtAuth, deleteMyComment);

router.put("/updatemycomment/:id", jwtAuth, updateMyComment);

export default router;
