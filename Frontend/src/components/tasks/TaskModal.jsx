import React, { useState, useEffect } from 'react';
import { X, Calendar, User, MessageCircle, Send, Trash2, Edit2 } from 'lucide-react';
import { mockUsers } from '../../pages/utils/mockData';
import { getTaskBadgeStatus, getBadgeColor, getPriorityColor, formatDate } from '../../pages/utils/taskUtils';

const TaskModal = ({ task, isOpen, onClose, onSave, onDelete }) => {
  const [editedTask, setEditedTask] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
      setIsEditing(false);
    }
  }, [task]);

  if (!isOpen || !task || !editedTask) return null;

  const handleSave = () => {
    if (editedTask) {
      onSave({
        ...editedTask,
        updated: new Date().toISOString(),
      });
      setIsEditing(false);
      onClose();
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && editedTask) {
      const comment = {
        id: Date.now().toString(),
        taskId: editedTask.id,
        authorId: '1', // Mock current user
        authorName: 'John Doe',
        body: newComment.trim(),
        created: new Date().toISOString(),
      };

      setEditedTask({
        ...editedTask,
        comments: [...(editedTask.comments || []), comment],
      });
      setNewComment('');
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.body);
  };

  const handleSaveComment = (commentId) => {
    if (editedTask && editCommentText.trim()) {
      setEditedTask({
        ...editedTask,
        comments: editedTask.comments?.map(c =>
          c.id === commentId ? { ...c, body: editCommentText.trim() } : c
        ) || [],
      });
      setEditingCommentId(null);
      setEditCommentText('');
    }
  };

  const handleDeleteComment = (commentId) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        comments: editedTask.comments?.filter(c => c.id !== commentId) || [],
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentText('');
  };

  const handleDelete = () => {
    if (onDelete && task) {
      onDelete(task.id);
      onClose();
    }
  };

  const badgeStatus = getTaskBadgeStatus(editedTask);
  const badgeColor = getBadgeColor(badgeStatus);
  const priorityColor = getPriorityColor(editedTask.priority);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
              {badgeStatus}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {onDelete && (
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete task"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900">{editedTask.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              {isEditing ? (
                <textarea
                  value={editedTask.description || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Add a description..."
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {editedTask.description || 'No description provided.'}
                </p>
              )}
            </div>

            {/* Priority / Assignee / Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                {isEditing ? (
                  <select
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                ) : (
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${priorityColor}`}>
                    {editedTask.priority}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                {isEditing ? (
                  <select
                    value={editedTask.assigneeId}
                    onChange={(e) => {
                      const selectedUser = mockUsers.find(u => u.id === e.target.value);
                      setEditedTask({
                        ...editedTask,
                        assigneeId: e.target.value,
                        assigneeName: selectedUser?.name || '',
                      });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {mockUsers.map((user) => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">{editedTask.assigneeName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editedTask.dueDate.split('T')[0]}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value + 'T00:00:00.000Z' })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">{formatDate(editedTask.dueDate)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Comments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Comments ({editedTask.comments?.length || 0})
                </h3>
              </div>

              <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                {editedTask.comments?.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4 group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{comment.authorName}</span>
                        <span className="text-sm text-gray-500">{formatDate(comment.created)}</span>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditComment(comment)}
                          className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                          title="Edit comment"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                          title="Delete comment"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    {editingCommentId === comment.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editCommentText}
                          onChange={(e) => setEditCommentText(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          rows={3}
                        />
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleSaveComment(comment.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 whitespace-pre-wrap">{comment.body}</p>
                    )}
                  </div>
                ))}

                {(!editedTask.comments || editedTask.comments.length === 0) && (
                  <p className="text-gray-500 text-center py-4">No comments yet.</p>
                )}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddComment();
                  }}
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Created: {formatDate(editedTask.created)} | Updated: {formatDate(editedTask.updated)}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
