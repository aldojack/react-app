import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const data = [
  {id: "todo-0", name: "Eat", isCompleted: true},
  {id: "todo-1", name: "Sleep", isCompleted: false},
  {id: "todo-2", name: "Repeat", isCompleted: false}
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks={data}/>
  </React.StrictMode>,
)
