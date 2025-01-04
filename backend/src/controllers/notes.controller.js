import prisma from "../utils/prisma.js"

// create note
export const createNote = async(req, res) => {
    try{
        const { title, content } = req.body

        const newNote = await prisma.note.create({
            data: {
                title,
                content,
                createdAt: new Date(),
                updatedAt: new Date(),
                user: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        })

        return res.status(201).json({ message: "Note created successfully" })
    }
    catch(err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// get note
export const getNotes = async(req, res) => {
    try{
        const {userId, ...userNotes} = await prisma.note.findMany({
            where: { userId: req.user.id }
        })

        if(!userNotes){
            return res.status(404).json({ message: "You don't have any notes" })
        }

        res.status(200).json({ userNotes })
    }
    catch(err) {
        console.error(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// get note by id
export const getNoteById = async(req, res) => {
    try{
        const noteId = parseInt(req.params.id, 10)

        if(isNaN(noteId)){
            return res.status(400).json({ message: "Invalid note id" })
        }

        const {userId, ...note} = await prisma.note.findUnique({
            where: { id: noteId }
        })

        if(!note) {
            return res.status(404).json({ message: "This not does not exist" })
        }

        return res.status(400).json({ note })
    }
    catch(err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// update note
export const updateNote = async(req, res) => {
    try{
        const noteId = parseInt(req.params.id, 10)
        const userId = req.user.id

        const note = await prisma.note.findUnique({
            where: { id: noteId }
        })

        // check if not exist
        if(!note) {
            return res.status(404).json({ message: "This not does not exist" })
        }

        // check if the the user id matches the user
        if(note.userId != userId) {
            return res.status(403).json({ message: "You don't have acsess to edit this note" })
        }

        const { title, content } = req.body

        const updatedNote = await prisma.note.update({
            where: { id: note.id },
            data: {
                title,
                content,
                updatedAt: new Date()
            }
        })

        res.status(200).json({ message: "Note updated successfully" })
    }
    catch(err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// delete note
export const deleteNote = async(req, res) => {
    try{
        const noteId = parseInt(req.params.id, 10)
        const userId = req.user.id

        const note = await prisma.note.findUnique({
            where: { id: noteId }
        })

        // check if not exist
        if(!note) {
            return res.status(404).json({ message: "This not does not exist" })
        }

        // check if the the user id matches the user
        if(note.userId != userId) {
            return res.status(403).json({ message: "You don't have acsess to delete this note" })
        } 

        const deletedNote = await prisma.note.delete({
            where: { id: noteId }
        })

        res.status(200).json({ message: "Note deleted successfully" })
    }
    catch(err) {
        res.status(500).json("Internal Server Error")
    }
}