// MainPage.js
import { useState, useEffect } from 'react';
import { FaRegStickyNote } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
import Navbar from '../components/Navbar';
import '../index.css';

function MainPage() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes from the backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes', { withCredentials: true });

        if (Array.isArray(response.data)) {
          setNotes(response.data);
        } else {
          console.error('Invalid response format:', response.data);
          setNotes([]); // Prevent crashes
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  // Add Note
  const addNote = async (title, content) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/notes/create',
        { title, content },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        const newNotes = await axios.get('http://localhost:5000/api/notes', { withCredentials: true });
        setNotes(newNotes.data);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/notes/${id}`, { withCredentials: true });

      if (response.status === 200) {
        setNotes(notes.filter(note => note.id !== id));
        toast.error('Note deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Update Note
  const updateNote = async (id, title, content) => {
    try {
      const updatedAt = new Date().toISOString();

      const response = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        { title, content, updatedAt },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setNotes(notes.map(note => (note.id === id ? { ...note, title, content, updatedAt } : note)));
        setEditingNote(null);
        toast.success('Note updated successfully!');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const cancelEdit = () => {
    setEditingNote(null);
  };

  // Search Filter
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className="app">
        <h1>Notes Keeping App <FaRegStickyNote className='icon' /></h1>

        {editingNote ? (
          <NoteEditor note={editingNote} updateNote={updateNote} cancelEdit={cancelEdit} />
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
}

export default MainPage;
