import express from "express";
import {
  createSongController,
  deleteMusicController,
  searchSongController,
  songController,
} from "../controller/musicController.js";

const router = express.Router();

router.get("/search", searchSongController);

router.delete("/delete/:id", deleteMusicController);

router.post("/", createSongController);

router.get("/", songController);

export default router;
