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
import { checkHeader, logged } from '../../common/middlewares/auth.middleware.js'

const router = express.Router();

// some API endpoints
router.get("/", checkHeader, logged, viewNote);
router.post("/", checkHeader, logged, createNote);
router.get("/filters", checkHeader, logged, filterNotes);
router.get("/:id", checkHeader, logged, openNote);
router.patch("/:id/trash", checkHeader, logged, trashNote);
router.patch("/:id", checkHeader, logged, updateNote);
router.delete("/:id", checkHeader, logged, deleteNote);

export default router;
