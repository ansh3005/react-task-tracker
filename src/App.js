import React, { useState, useEffect } from 'react';
import Tasklist from './components/Tasklist';
import './App.css';
import emailjs from '@emailjs/browser';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask || !dueDate || !userEmail) {
      alert('Please enter task, due date, and email!');
      return;
    }

    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      dueDate: dueDate,
      completed: false
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    setDueDate('');

    emailjs.send(
      'service_7vdw6ir',
      'template_90u79zo',
      {
        task_title: newTask,
        task_due: new Date(dueDate).toLocaleString(),
        to_email: userEmail,
      },
      'taxo85YyG6halUyzX'
    )
    .then(
      (response) => console.log('Email sent!', response.status, response.text),
      (err) => console.error('Failed to send email:', err)
    );
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-tracker">
      <h1>Task Tracker</h1>

      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task..."
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Select due date"
      />

      <input
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="Recipient email..."
      />

      <button onClick={addTask}>Add</button>

      <Tasklist
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
