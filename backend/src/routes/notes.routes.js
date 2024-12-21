import express from "express"
import { createNote, getNotes, getNoteById, deleteNote, updateNote } from "../controllers/notes.controller.js"


const router = express.Router()


router.get('/', getNotes)
router.post('/create', createNote)
router.get('/note/:id', getNoteById)
router.put('/update/:id', updateNote)
router.delete('/delete/:id', deleteNote)

export default router