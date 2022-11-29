import express from "express";
import { getAllComments } from "../controllers/commentsController.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.get("/getcomments/:id", getAllComments);

export default router;
