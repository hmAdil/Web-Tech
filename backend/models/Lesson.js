import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  language: {type: String, required: true},
  word: {type: String, required: true},
  translation: {type: String, required: true},
  example: {type: String},
  options: [{type: String}],
  answer: {type: String},
});

export default mongoose.model("Lesson", lessonSchema);