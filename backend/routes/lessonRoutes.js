import express from "express";
import {
  getLessonsByLanguage,
  addLesson,
  updateProgress
} from "../controllers/lessonController.js";

const router = express.Router();

router.get("/:language", getLessonsByLanguage);
router.post("/", addLesson);
router.post("/progress", updateProgress);

export default router;