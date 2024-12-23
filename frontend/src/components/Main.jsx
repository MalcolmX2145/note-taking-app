import ReactMarkdown from 'react-markdown';

const Main = ({activeNote, onUpdateNote}) => {
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote, // spread out the keys of active note to maintain the fields that were not changed 
      [key]: value, // updates either title or content depending on what is updated
      lastModified: Date.now(),
    });
  };

  // checks is activeNote is false to show that there are no active notes in application
  if (!activeNote) return <div className="no-active-note">No notes selected</div>;


  return (
    <div className="app-main">
      <div className="app-main-note-edit">
      <input
          type="text"
          id="title"
          value={activeNote.title}
          placeholder="Note Title"
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
      <textarea
          id="body"
          value={activeNote.content}
          placeholder="Write your note here..."
          onChange={(e) => onEditField("content", e.target.value)}
        />
      </div>

      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">{activeNote.content}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Main