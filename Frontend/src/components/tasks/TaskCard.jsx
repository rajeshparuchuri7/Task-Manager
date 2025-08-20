import React from 'react';
import { Calendar, User, MessageCircle } from 'lucide-react';
import { getTaskBadgeStatus, getBadgeColor, getPriorityColor, formatDate } from '../../pages/utils/taskUtils';

const TaskCard = ({ task, onClick, isDragging }) => {
  const badgeStatus = getTaskBadgeStatus(task);
  const badgeColor = getBadgeColor(badgeStatus);
  const priorityColor = getPriorityColor(task.priority);

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-200 ${
        isDragging ? 'rotate-2 shadow-lg scale-105 opacity-80' : 'hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">
          {task.title}
        </h3>
        <div className="ml-2 flex-shrink-0">
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${priorityColor}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center space-x-1">
          <User className="h-3 w-3" />
          <span>{task.assigneeName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
          {badgeStatus}
        </span>
        
        <div className="flex items-center space-x-1 text-gray-400">
          <MessageCircle className="h-3 w-3" />
          <span className="text-xs">{task.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
