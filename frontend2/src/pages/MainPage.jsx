// MainPage.js
import { useState, useEffect } from 'react';
import { FaRegStickyNote } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
import Navbar from '../components/Navbar';

function MainPage() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const addNote = (title, content) => {
    const newNote = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    axios.post('http://localhost:5000/notes', newNote)
      .then(response => {
        setNotes([...notes, newNote]);
        toast.success('Note added successfully!');
      })
      .catch(error => console.error('Error adding note:', error));
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/notes/${id}`)
      .then(response => {
        setNotes(notes.filter(note => note.id !== id));
        toast.error('Note deleted successfully!');
      })
      .catch(error => console.error('Error deleting note:', error));
  };

  const updateNote = (id, title, content) => {
    const updatedAt = new Date().toISOString();

    axios.put(`http://localhost:5000/notes/${id}`, { title, content, updatedAt })
      .then(response => {
        setNotes(notes.map(note => note.id === id ? { ...note, title, content, updatedAt } : note));
        setEditingNote(null);
        toast.success('Note updated successfully!');
      })
      .catch(error => console.error('Error updating note:', error));
  };

  const cancelEdit = () => {
    setEditingNote(null);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className='app-navbar'>
      <Navbar />
    </div>
      <div className="app">
      <h1>Notes Keeping App <FaRegStickyNote className='icon' /></h1>
      {editingNote ? (
        <NoteEditor
          note={editingNote}
          updateNote={updateNote}
          cancelEdit={cancelEdit}
        />
      ) : (
        <NoteForm addNote={addNote} />
      )}
      <div className='search-input-container'>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <NoteList notes={filteredNotes} deleteNote={deleteNote} setEditingNote={setEditingNote} />

      <ToastContainer />
    </div>
    </>
    
  );
};

export default MainPage;
