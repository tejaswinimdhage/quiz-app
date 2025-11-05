import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import quizRouter from "./routes/quiz.route.js";

dotenv.config();

const app = express();

app.use(express.json());
// app.use(cors());

app.use("/api/quizzes", quizRouter);

const __dirName = path.resolve();
if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirName, "/frontend/dist")));
    app.get("*"), (req, res) => {
        res.sendFiles(path.resolve(path.resolve(__dirName, "frontend", "dist", "index.html")))
    }
}

app.listen(5000, () => {
    connectDB();
    const baseURL = process.env.REACT_APP_API_BASE_URL
    console.log(`Server Started at ${baseURL}`, baseURL)
})
// app.get("/", (req, res) => res.send("Backend is running"));
