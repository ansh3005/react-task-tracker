import React from "react";
import Task from "./Task";

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
