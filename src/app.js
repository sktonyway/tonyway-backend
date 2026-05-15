import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import notesRouter from "./modules/notes/notes.route.js";
import todoRouter from "./modules/todos/todos.route.js";
import authRouter from "./modules/auth/auth.route.js";
import { errorHandler } from "./common/middlewares/error.middleware.js";
import { notFound } from "./common/middlewares/notFound.middleware.js";

import path from "path";
import { fileURLToPath } from "url";

export function createApp() {
  const app = express();

  // Some middlewares
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Serving static file
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  // Health route
  app.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
  });

  // Some application mount
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/notes", notesRouter);
  app.use("/api/v1/todos", todoRouter);

  // Not-found and Error Handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
