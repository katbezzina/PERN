import express from "express";
import {
  addFavourite,
  deleteMyFavourite,
  getMyFavourites,
  countFavourites,
} from "../controllers/favourtiesController.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.post("/addfavourite/:id", jwtAuth, addFavourite);

router.delete("/deletemyfavourite/:id", jwtAuth, deleteMyFavourite);

router.get("/myfavourites", jwtAuth, getMyFavourites);

router.get("/countfavourites/:id", countFavourites);

export default router;
