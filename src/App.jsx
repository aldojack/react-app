import { useState, useRef, useEffect } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import { nanoid } from "nanoid";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.isCompleted,
  Completed: (task) => task.isCompleted
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {

  const listHeadingRef = useRef(null);
  const [tasks, setTasks] = useState(() => {
    const initialValue = localStorage.getItem('todo-items')
    
    return initialValue !== null ? JSON.parse(initialValue) : []
  });
  const [filter, setFilter] = useState('All');
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => <Todo {...task} key={task.id} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask}/>);
  const filterList = FILTER_NAMES.map(name => <FilterButton name={name} key={name} isPressed={name === filter} setFilter={setFilter}/>);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    localStorage.setItem('todo-items', JSON.stringify(tasks));
  },[tasks])

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  

  function addTask(name) {
    const newTask = {
      id: `todo-${nanoid()}`,
      name,
      isCompleted: false
    }

    setTasks([...tasks, newTask])
  }

  function editTask(id, newName) {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (id === task.id) {
          return { ...task, name: newName }
        }
        return task;
      })
    })
  }

  function toggleTask(id) {

    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (id === task.id ) {
          return { ...task, isCompleted: !task.isCompleted }
        }
          return task;
      })
    })
  }

  function deleteTask(id) {
    setTasks(prevTasks => {
      return prevTasks.filter(task => {
        return task.id != id
      })
    })
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}
