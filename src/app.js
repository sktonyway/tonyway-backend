import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

// -------------------------------------------------------------------------
// These are directly imported from index.js previously which would cause issue
// So these would be filtered later
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// ----------------------------------------------------------------------------

export default app;
