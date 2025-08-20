import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('authUser');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({ ...parsedUser, token });
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would call your API
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      token: 'mock-jwt-token'
    };
    
    setUser(mockUser);
    localStorage.setItem('authToken', mockUser.token);
    localStorage.setItem('authUser', JSON.stringify({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name
    }));
  };

  const signup = async (email, password, name) => {
    // Mock signup - in real app, this would call your API
    const mockUser = {
      id: Date.now().toString(),
      email,
      name,
      token: 'mock-jwt-token'
    };
    
    setUser(mockUser);
    localStorage.setItem('authToken', mockUser.token);
    localStorage.setItem('authUser', JSON.stringify({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name
    }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


