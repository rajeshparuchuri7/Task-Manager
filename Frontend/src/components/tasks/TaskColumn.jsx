import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({
  title,
  status,
  tasks,
  onTaskClick,
  onDrop,
  onDragOver,
  onDragStart,
  isDragOver,
}) => {
  const getColumnColor = (status) => {
    switch (status) {
      case 'Backlog':
        return 'bg-gray-50 border-gray-300';
      case 'In Progress':
        return 'bg-blue-50 border-blue-300';
      case 'Review':
        return 'bg-amber-50 border-amber-300';
      case 'Done':
        return 'bg-green-50 border-green-300';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskData = e.dataTransfer.getData('task');
    if (taskData) {
      const task = JSON.parse(taskData);
      onDrop(task, status);
    }
  };

  return (
    <div
      className="flex-1 min-w-72 max-w-xs"
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      <div
        className={`rounded-lg border-2 transition-colors duration-200 ${
          isDragOver ? 'border-blue-500 bg-blue-50' : getColumnColor(status)
        } h-full`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <span className="bg-white text-gray-600 text-sm font-medium px-2 py-1 rounded-full border">
              {tasks.length}
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {tasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => onDragStart(task)}
                className="select-none"
              >
                <TaskCard task={task} onClick={() => onTaskClick(task)} />
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No tasks in {title.toLowerCase()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;
