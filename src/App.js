import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Tasks from './components/Tasks';
import './App.css'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {

  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {

    const getTasks = async () => {
      const tasks = await fetchTasks();

      setTasks(tasks)
    }

    getTasks()
  }, [])

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    if (window.confirm('Are you sure you want to delete this task ?')){
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const toggleReminder = async (id) => {
    const singleTask = await fetchTask(id)
    const updatedTask = { ...singleTask, reminder: !singleTask.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  }

  // add new task
  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks', { 
      method: 'POST', 
      body: JSON.stringify(task), 
      headers: { 'Content-type': 'application/json'} 
    })

    const newTask = await res.json()

    setTasks([...tasks, newTask])
  }

  return (
    <Router>
      <div className="container">
        <Header formIsOpen={showForm} onToggle={ () => setShowForm(!showForm) } />
        { showForm && <AddTask addTask={addTask} />}
        <Routes>
          <Route path="/" element={ 
            <>
              {tasks.length ? <Tasks onToggle={toggleReminder} onDelete={deleteTask} tasks={tasks} /> : "No Tasks To Show"}
            </>
           } />
          <Route path="about" element={ <About /> } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
