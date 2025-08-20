import React, { useState } from 'react';
import { 
  CheckSquare, 
  Users, 
  Clock, 
  MessageCircle, 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin 
} from 'lucide-react';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const features = [
    {
      icon: <CheckSquare className="h-8 w-8 text-blue-600" />,
      title: "Kanban Board Management",
      description: "Organize tasks across Backlog, In Progress, Review, and Done columns with intuitive drag-and-drop functionality."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Team Collaboration",
      description: "Assign tasks to team members, add comments, and track progress together in real-time."
    },
    {
      icon: <Clock className="h-8 w-8 text-amber-600" />,
      title: "Smart Deadline Tracking",
      description: "Automatic status badges show On Track, At Risk, and Overdue tasks to keep projects on schedule."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-purple-600" />,
      title: "Task Comments",
      description: "Communicate directly on tasks with threaded comments, keeping all discussions organized and accessible."
    }
  ];

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-8">
                <CheckSquare className="h-16 w-16 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Team Task Manager
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Streamline your team's workflow with our intuitive Kanban board
              </p>
              <div className="space-y-4 text-left max-w-md">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Drag & drop task management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Real-time status tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Team collaboration tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span className="text-gray-700">Priority and deadline management</span>
                </div>
              </div>
              <button
                onClick={() => setShowAuth(false)}
                className="mt-8 text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
            {isLogin ? (
              <LoginForm onToggleMode={() => setIsLogin(false)} />
            ) : (
              <SignupForm onToggleMode={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Team Task Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setShowAuth(true);
                }}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setShowAuth(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Manage Tasks Like a
              <span className="text-blue-600 block">Professional Team</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your team's productivity with our intuitive Kanban board. 
              Track progress, collaborate seamlessly, and never miss a deadline again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setIsLogin(false);
                  setShowAuth(true);
                }}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  setIsLogin(true);
                  setShowAuth(true);
                }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive task management solution provides all the tools your team needs to stay organized and productive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Team's Productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who have streamlined their workflow with Team Task Manager.
          </p>
          <button
            onClick={() => {
              setIsLogin(false);
              setShowAuth(true);
            }}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <CheckSquare className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Team Task Manager</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/rajeshparchuri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/rajeshparchuri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/rajeshparchuri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Rajesh Parchuri. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
