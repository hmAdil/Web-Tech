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

import Lesson from "../models/Lesson.js";

router.post("/seed/french", async(req,res) => {
  try{
    const count = await Lesson.countDocuments({language:"French"});
    if(count>0) return res.json({message:"French lessons already exist"});
    await Lesson.insertMany([
      {language:"French",word:"Bonjour",translation:"Hello",example:"Bonjour, comment ça va ?",options:["Hello","Goodbye","Please","Thanks"],answer:"Hello"},
      {language:"French",word:"Merci",translation:"Thank you",example:"Merci beaucoup !",options:["Thank you","Sorry","Hello","Please"],answer:"Thank you"},
      {language:"French",word:"Au revoir",translation:"Goodbye",example:"Au revoir, à demain !",options:["Goodbye","Welcome","Morning","Thanks"],answer:"Goodbye"},
      {language:"French",word:"S'il vous plaît",translation:"Please",example:"Une table pour deux, s'il vous plaît.",options:["Please","Excuse me","Sorry","Welcome"],answer:"Please"}
    ]);
    res.json({message:"Seeded French lessons"});
  }catch(err){
    res.status(500).json({message:err.message});
  }
});

export default router;