import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const genAI = new GoogleGenerativeAI(process.env.API_SECRET);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
  return res.render("index");
});

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;
  const result = await model.generateContent(prompt);
  return res.status(200).json({ result: result.response.text() });
});

app.listen(3000, (req, res) => {
  console.log("server started on http://localhost:3000");
});
