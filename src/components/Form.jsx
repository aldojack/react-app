import { useState } from "react";
export default function Form({addTask}){

  const [input, setInput] = useState('')
  const [error, setError] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    if(input)
    {
      addTask(input)
      setInput('');
      setError('');
    }
    else{
      setError("Enter a value, cannot accept empty value")
    }
  }

  function onChange(e){
    const value = e.target.value
    setInput(value)
  }
    return (
        <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          onChange={onChange}
          value={input}
          />
          {error && <p id="error-msg">{error}</p>}
        <button type="submit" className="btn btn__primary btn__lg" onClick={handleSubmit}>
          Add
        </button>
      </form>
    )
}