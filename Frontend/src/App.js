import React, { useState, useEffect } from 'react';
import { mockTasks } from './pages/utils/mockData';  
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/landing/LandingPage';
import LoadingSpinner from './components/common/LoadingSpinner';
import Header from './components/layout/Header';
import FilterPanel from './components/filters/FilterPanel';
import KanbanBoard from './components/tasks/KanbanBoard';
import TaskModal from './components/tasks/TaskModal';
import CreateTaskModal from './components/tasks/CreateTaskModal';
import ProfileModal from './components/profile/ProfileModal';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [isMovingTask, setIsMovingTask] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskBoardTasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('taskBoardTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleTaskMove = (task, newStatus) => {
    setIsMovingTask(true);
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === task.id
          ? { ...t, status: newStatus, updated: new Date().toISOString() }
          : t
      )
    );
    
    // Simulate a brief loading state for the move animation
    setTimeout(() => {
      setIsMovingTask(false);
    }, 300);
  };

  const handleTaskSave = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
  };

  const handleTaskCreate = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: Date.now().toString(),
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      comments: [],
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Team Task Manager..." />
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        onCreateTask={() => setShowCreateModal(true)}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
        onShowProfile={() => setShowProfile(true)}
      />
      
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        onClose={() => setShowFilters(false)}
        isOpen={showFilters}
      />

      {isMovingTask && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <LoadingSpinner size="sm" />
            <span className="text-sm">Moving task...</span>
          </div>
        </div>
      )}

      <KanbanBoard
        tasks={tasks}
        onTaskClick={handleTaskClick}
        onTaskMove={handleTaskMove}
        filters={filters}
      />

      <TaskModal
        task={selectedTask}
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setSelectedTask(null);
        }}
        onSave={handleTaskSave}
        onDelete={handleTaskDelete}
      />

      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleTaskCreate}
      />

      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;


