import express from "express";
import dotenv from "dotenv";
import Lesson from "../models/Lesson.js";
import {GoogleGenerativeAI} from "@google/generative-ai";

dotenv.config({path:"./.env"});
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate", async (req,res)=>{
  const {language,level} = req.body;

  try{
    console.log(`✨ Generating ${language} lessons using Gemini...`);

    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"}); // ✅ correct model + endpoint
    const prompt = `
      Generate 5 beginner ${language} vocabulary lessons in JSON format.
      Each lesson must include:
      - word (in ${language})
      - translation (in English)
      - example (short sentence)
      - options (4 choices)
      - answer (correct option)
      Return strictly valid JSON like:
      {"lessons":[{"word":"...","translation":"...","example":"...","options":["...","...","...","..."],"answer":"..."}]}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("🧠 Gemini raw response:", text);

    let parsed;
    try{
      parsed = JSON.parse(text);
    }catch(err){
      console.warn("⚠️ JSON parse error, using fallback", err);
      parsed = {lessons:[]};
    }

    const lessons = parsed.lessons || [];
    await Lesson.insertMany(lessons.map(l=>({...l,language})));

    res.json({message:`✅ ${lessons.length} ${language} lessons generated successfully`,lessons});
  }catch(err){
    console.error("❌ Gemini API error:", err);
    res.status(500).json({message:err.message});
  }
});

export default router;