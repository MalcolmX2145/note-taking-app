import { useEffect, useState } from 'react';
import uuid from 'react-uuid'; 
import '../App.css';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

const MainPage = () => {
    // states.
    const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
    const [activeNote, setActiveNote] = useState(false);

    // store the data in browser
    useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    // function for adding a new note
    const onAddNote = () => {
    const newNote = {
        id: uuid(),
        title: "Untitled Note",
        content: "",
        lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    }

    // function to delete an existing note
    const onDeleteNote = (idToDelete) => {
    // if the note.id is not equal to the id in the argument (idToDelete) it will return false which will filter out the note.
    setNotes(notes.filter((note) => note.id !== idToDelete)); 
    }

    // function to give the Main component access the the active note stored in state
    const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
    }

    // function to update an active note
    const onUpdateNote = (updatedNote) => {
        const updatedNotesArr = notes.map((note) => {
        if (note.id === updatedNote.id) {
            return updatedNote;
        }

        return note;
        });

        setNotes(updatedNotesArr);
    };
    return (
        <div className="App">
        <Sidebar notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
        </div>
    )
}

export default MainPage