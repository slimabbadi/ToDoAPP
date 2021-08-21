import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "doctor visit",
      date: "feb 5th at 1pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at school",
      date: "feb 6th at 9am",
      reminder: false,
    },
    {
      id: 3,
      text: "Shopping",
      date: "feb 6th at 3pm",
      reminder: false,
    },
  ])

  // add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])



  }
  // remove task from UI
  const deleteTask = (id) => {

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle remider
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: !task.reminder } : task)))
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
      {tasks.length > 0 ? (<Tasks tasks={tasks} onreminder={toggleReminder} ondelete={deleteTask} />) : ("no tasks")}
    </div>
  );
}

export default App;
