

export const getTaskBadgeStatus = (task) => {
  if (task.status === 'Done') {
    return 'On Track';
  }

  const dueDate = new Date(task.dueDate);
  const now = new Date();
  const timeDiff = dueDate.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  if (hoursDiff < 0) {
    return 'Overdue';
  } else if (hoursDiff <= 24) {
    return 'At Risk';
  } else {
    return 'On Track';
  }
};

export const getBadgeColor = (status) => {
  switch (status) {
    case 'On Track':
      return 'bg-green-100 text-green-800';
    case 'At Risk':
      return 'bg-yellow-100 text-yellow-800';
    case 'Overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-700';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'Low':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
