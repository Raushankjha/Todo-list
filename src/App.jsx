import { useState, useEffect } from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import './App.css';


function App() {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);

  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }else{
      localStorage.setItem('tasks', JSON.stringify([]));
    }
  }, []);

  
  useEffect(() => {
  
    if(tasks.length !== 0){
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  function handleTask(e) {
    setTaskName(e.target.value);
  }

  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function addTask() {
    if (taskName && status) {
      const newTask = {
        id: uuidv4(),
        name: taskName,
        status: status,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskName('');
      setStatus('');
    }
  }

  function deleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  return (
    <>
      <h2>Task Management</h2>
      <input
        type="text"
        placeholder="Enter Task"
        value={taskName}
        onChange={handleTask}
      />
      <select value={status} onChange={handleStatus}>
        <option value="">Select Status</option>
        <option value="ToDo">ToDo</option>
        <option value="InProgress">InProgress</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={addTask}>Add Task</button>

      <div className="task-boxes">
        <div className="task-box">
          <h3>To Do</h3>
          <ul>
            {tasks
              .filter((task) => task.status === 'ToDo')
              .map((task) => (
                <li key={task.id}>
                  {task.name}
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
          </ul>
        </div>

        <div className="task-box">
          <h3>In Progress</h3>
          <ul>
            {tasks
              .filter((task) => task.status === 'InProgress')
              .map((task) => (
                <li key={task.id}>
                  {task.name}
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
          </ul>
        </div>

        <div className="task-box">
          <h3>Completed</h3>
          <ul>
            {tasks
              .filter((task) => task.status === 'Completed')
              .map((task) => (
                <li key={task.id}>
                  {task.name}
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
