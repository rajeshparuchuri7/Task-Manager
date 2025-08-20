import React, { useState } from 'react';
import TaskColumn from './TaskColumn';

const KanbanBoard = ({
  tasks,
  onTaskClick,
  onTaskMove,
  filters,
}) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    { title: 'Backlog', status: 'Backlog' },
    { title: 'In Progress', status: 'In Progress' },
    { title: 'Review', status: 'Review' },
    { title: 'Done', status: 'Done' },
  ];

  const filterTasks = (tasks) => {
    return tasks.filter((task) => {
      if (filters.assignee && task.assigneeId !== filters.assignee) {
        return false;
      }
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      return true;
    });
  };

  const getTasksForColumn = (status) => {
    return filterTasks(tasks).filter((task) => task.status === status);
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    if (status) {
      setDragOverColumn(status);
    }
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (task, newStatus) => {
    if (task.status !== newStatus) {
      onTaskMove(task, newStatus);

      // Add a subtle animation effect
      const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
      if (taskElement) {
        taskElement.classList.add('animate-pulse');
        setTimeout(() => {
          taskElement.classList.remove('animate-pulse');
        }, 500);
      }
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  return (
    <div className="flex-1 p-6 overflow-hidden">
      <div className="h-full overflow-x-auto">
        <div className="flex space-x-6 min-w-max h-full">
          {columns.map((column) => {
            const columnTasks = getTasksForColumn(column.status);
            return (
              <TaskColumn
                key={column.status}
                title={column.title}
                status={column.status}
                tasks={columnTasks}
                onTaskClick={onTaskClick}
                onDrop={handleDrop}
                onDragOver={(e) => handleDragOver(e, column.status)}
                onDragStart={handleDragStart}
                isDragOver={dragOverColumn === column.status}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
