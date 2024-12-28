
const Sidebar = ({notes, onAddNote, onDeleteNote, setActiveNote, activeNote}) => {
  // Sorting the notes from descending order (last updated at the top)
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>

      <div className="app-sidebar-notes">
      {sortedNotes.map((note) => (
        <div className={`app-sidebar-note ${note.id === activeNote && "active"}`} key={note.id} onClick={() => setActiveNote(note.id)}>
          <div className="sidebar-note-title">
            <strong>{note.title}</strong>
            <button onClick={() => onDeleteNote(note.id)}>Delete</button>
          </div>

          <p>{note.content && note.content.substr(0, 100) + '...'}</p>

          <small className="note-meta">
            Last modified {new Date(note.lastModified).toLocaleDateString('en-KE')} at{' '}
            {new Date(note.lastModified).toLocaleTimeString('en-KE', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </small>
        </div>
))}

             </div>
             
    </div>
  )
}

export default Sidebar