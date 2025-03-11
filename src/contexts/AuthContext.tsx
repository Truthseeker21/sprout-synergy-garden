
import React, { createContext, useContext, useState } from 'react';

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

  const login = async (email: string, password: string) => {
    // Simulated login - replace with actual authentication
    if (email === 'admin@agrigrow.com' && password === 'admin123') {
      setUser({
        id: '1',
        email: 'admin@agrigrow.com',
        name: 'Admin',
        isAdmin: true,
      });
    } else if (email === 'user@agrigrow.com' && password === 'user123') {
      setUser({
        id: '2',
        email: 'user@agrigrow.com',
        name: 'User',
        isAdmin: false,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
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
