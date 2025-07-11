import React from 'react';

function Tasklist({ tasks, toggleComplete, deleteTask }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span>{task.title}</span>
          </div>
          <span>{new Date(task.dueDate).toLocaleString()}</span>
          <button className="delete-btn" onClick={() => deleteTask(task.id)}>
            &#10006;
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tasklist;
