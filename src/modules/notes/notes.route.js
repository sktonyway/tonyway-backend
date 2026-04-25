import express from "express";

import {
  createNote,
  deleteNote,
  openNote,
  trashNote,
  updateNote,
  viewNote,
  filterNotes,
} from "./notes.controllers.js";

const router = express.Router();

// some API endpoints
router.get("/", viewNote);
router.post("/", createNote);
router.get("/filters", filterNotes);
router.get("/:id", openNote);
router.patch("/:id/trash", trashNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
