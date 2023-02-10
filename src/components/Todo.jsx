import { useState, useRef, useEffect} from 'react'



function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


export default function Todo({ name, isCompleted, id, onToggle, onDelete, onEdit }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const wasEditing = usePrevious(isEditing);
  const [newName, setNewName] = useState('');
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  function handleChange(e) {
    setNewName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onEdit(id, newName);
    setNewName("");
    setIsEditing(false);
  }

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);
  


  const editingTemplate = (
    <form className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input id={id} className="todo-text" type="text" value={newName} onChange={handleChange} ref={editFieldRef} />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setIsEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" onClick={handleSubmit}>
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={isCompleted}
          onChange={() => onToggle(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setIsEditing(true)} ref={editButtonRef}>
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => onDelete(id)}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );


  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}