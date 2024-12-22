import { useState } from 'react';
import uuid from 'react-uuid'; 
import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';



const App = () => {
  // states.
const [notes, setNotes] = useState([]);
const [activeNote, setActiveNote] = useState(false);

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

const getActiveNote = () => {
  return notes.find((note) => note.id === activeNote);
}

  return (
    <div className="App">
      <Sidebar notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
      <Main activeNote={getActiveNote()}/>
    </div>
  )
}

export default App