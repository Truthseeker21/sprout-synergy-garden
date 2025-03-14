
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulated login - replace with actual authentication
    if (email === 'admin@agrigrow.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        email: 'admin@agrigrow.com',
        name: 'Admin',
        isAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem('auth_user', JSON.stringify(adminUser));
    } else if (email === 'user@agrigrow.com' && password === 'user123') {
      const regularUser = {
        id: '2',
        email: 'user@agrigrow.com',
        name: 'User',
        isAdmin: false,
      };
      setUser(regularUser);
      localStorage.setItem('auth_user', JSON.stringify(regularUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
