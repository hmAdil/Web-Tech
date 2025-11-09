import Lesson from "../models/Lesson.js";
import User from "../models/User.js";

export const getLessonsByLanguage = async (req, res) => {
  try
  {
    const lessons = await Lesson.find({language: req.params.language});
    res.json(lessons);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const addLesson = async (req, res) => {
  const {language, word, translation, example, options, answer} = req.body;
  try
  {
    const newLesson = await Lesson.create({
      language, word, translation, example, options, answer
    });
    res.status(201).json(newLesson);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const updateProgress = async (req, res) => {
  const {username, language, score} = req.body;
  try
  {
    const user = await User.findOne({username});
    if (!user) return res.status(404).json({message: "User not found"});

    user.progress.set(language, score);
    await user.save();

    res.json({message: "Progress updated", progress: user.progress});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};