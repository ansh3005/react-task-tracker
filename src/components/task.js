import React from "react";

function Task({ task, index, onDelete, onToggle }) {
  return (
    <div className="task">
      <span
        className={task.completed ? "completed" : ""}
        onClick={() => onToggle(index)}
      >
        {task.text}
      </span>
      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
}

export default Task;
