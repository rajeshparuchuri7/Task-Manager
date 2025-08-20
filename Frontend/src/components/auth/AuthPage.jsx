import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
        {/* Left side (Info Section) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="text-center">
            {/* <div className="flex items-center justify-center mb-8">
              <CheckSquare className="h-16 w-16 text-blue-600" />
            </div> */}
            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Team Task Board
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
          </div>
        </div>

        {/* Right side (Login/Signup Form) */}
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
};

export default AuthPage;
