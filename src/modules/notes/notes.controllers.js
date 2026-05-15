import { asyncHandler } from "../../utils/AsyncHandlers.js";
import Note from "./notes.schema.js";
import ApiResponse from "../../utils/ApiResponse.js";

const createNote = asyncHandler(async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
  });
  const savedNote = await newNote.save();
  res.status(201).json(savedNote);
});

const viewNote = asyncHandler(async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.status(200).json(notes);
});

const openNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).json({
      message: "Note not found!",
    });
  }
  res.json(note).status(200);
});

const deleteNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const note = await Note.findByIdAndDelete(id);
  if (!note) {
    return res.status(404).json({
      message: "Note not found in database.",
    });
  }
  res.status(200).json({ message: "Note deleted sucessfully." });
});

const updateNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const note = await Note.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!note) {
    return res.status(404).json({ message: "Note not found in database." });
  }
  res.json(note);
});

const trashNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const note = await Note.findByIdAndUpdate(id, { isTrash: true });
  res.json(note);
});

const filterNotes = asyncHandler(async (req, res) => {
  const { term } = req.query;
  const filtered = await Note.find({
    $or: [
      { title: { $regex: term, $options: "i" } },
      { content: { $regex: term, $options: "i" } },
    ],
  });
  res.json(filtered).status(200);
});

export {
  createNote,
  viewNote,
  openNote,
  deleteNote,
  updateNote,
  trashNote,
  filterNotes,
};
