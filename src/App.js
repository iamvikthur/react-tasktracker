import { useState } from "react"
import Header from "./components/Header";
import Tasks from './components/Tasks';
import './App.css'
import AddTask from "./components/AddTask";

function App() {
  const defaultTasks = [
    {
        id: 1,
        text: "Project Planning",
        date: "25, Feb 2021",
        reminder: true
    },
    {
        id: 2,
        text: "Project Analysis",
        date: "25, Mar 2021",
        reminder: true
    },
    {
        id: 3,
        text: "Project Design",
        date: "25, Apr 2021",
        reminder: true
    },
    {
        id: 4,
        text: "Project Implementation",
        date: "25, May 2021",
        reminder: true
    }
  ]

  const [tasks, setTasks] = useState(defaultTasks)
  const [showForm, setShowForm] = useState(false)

  // delete task
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task ?')){
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task)
    )
  }

  // add new task
  const addTask = (task) => {
    const id = Date.now()

    const newTask = {...task, id}

    setTasks([...tasks, newTask])
  }

  return (
    <div className="container">
      <Header formIsOpen={showForm} onToggle={ () => setShowForm(!showForm) } />
      { showForm && <AddTask addTask={addTask} />}
      {tasks.length ? <Tasks onToggle={toggleReminder} onDelete={deleteTask} tasks={tasks} /> : "No Tasks To Show"}
    </div>
  );
}

export default App;
