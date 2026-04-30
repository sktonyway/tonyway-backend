import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ApiError from './common/utils/ApiError.js'
const app = express();

// Some middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

import notesRouter from "./modules/notes/notes.route.js";
import todoRouter from "./modules/todos/todos.route.js";
import authRouter from "./modules/auth/auth.route.js";
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/auth", authRouter);

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serving static file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((req, res, next) => {
  const err = ApiError.notFound(`Route ${req.originalUrl} is missing.`)
  next(err);
})

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error"
  })
})
export default app;
