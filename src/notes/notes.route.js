import express from 'express'
import Note from './notes.schema.js'

const router = express.Router()

// GET route /notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ updatedAt: -1 });
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST route /notes
router.post('/', async (req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// GET route /notes/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findById(id)
        if (!note) {
            return res.status(404).json({
                message: "Note not found!"
            })
        }
        res.json(note)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// DELETE route /notes/:id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findByIdAndDelete(id)
        if (!note) {
            return res.status(404).json({
                message: "Note not found in database."
            })
        }
        res.status(200).json({ message: "Note deleted successfully." })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Update route /notes/:id
router.patch('/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id, req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!note) {
            return res.status(404).json({ message: "Note not found in database." })
        }
        res.json(note)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

export default router;