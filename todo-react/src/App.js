import './App.css';
import { useState ,useEffect} from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    const loadData = async()=>{
      const res = await loadTasks()
      setTasks(res)
    }
    loadData()
  },[])

  // fetch tasks
  const loadTasks= async() =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // add Task
  const addTask = async(task) => {
    const res = await fetch(`http://localhost:5000/tasks`,{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks,data])
  }



  // remove task from UI
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:"DELETE",
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // fetch tasks
  const fetchTask= async(id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
  //toggle remider
  const toggleReminder = async(id) => {

    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle,reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:"PUT",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(updatedTask),
    })
    const data = await res.json()

    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)))
  }


  return (
    <div className="Container">
      <Header
        title={"the Classic TO-DO"}
        onAdd={() => {
          setShowAddTask(!showAddTask)
        }}
        showAddTask={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onreminder={toggleReminder} ondelete={deleteTask} />) : <h2>no tasks</h2>}
    </div>
  );
}

export default App;
