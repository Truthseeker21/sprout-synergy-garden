
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  ProfileUpdateData, 
  UserPreferences, 
  NotificationSettings, 
  AuthContextType 
} from '@/types/AuthTypes';
import { 
  authenticateUser, 
  updateProfile, 
  updatePreferences, 
  updateNotifications, 
  persistUser, 
  getStoredUser, 
  removeStoredUser 
} from '@/utils/authUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const authenticatedUser = await authenticateUser(email, password);
    setUser(authenticatedUser);
    persistUser(authenticatedUser);
  };

  const logout = () => {
    setUser(null);
    removeStoredUser();
  };

  const updateUserProfile = async (data: ProfileUpdateData) => {
    if (!user) throw new Error('No user logged in');
    
    const updatedUser = await updateProfile(user, data);
    setUser(updatedUser);
    persistUser(updatedUser);
  };

  const updateUserPreferences = async (preferences: Partial<UserPreferences>) => {
    if (!user) throw new Error('No user logged in');
    
    const updatedUser = await updatePreferences(user, preferences);
    setUser(updatedUser);
    persistUser(updatedUser);
  };

  const updateNotificationSettings = async (settings: Partial<NotificationSettings>) => {
    if (!user) throw new Error('No user logged in');
    
    const updatedUser = await updateNotifications(user, settings);
    setUser(updatedUser);
    persistUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUserProfile, 
      updateUserPreferences, 
      updateNotificationSettings 
    }}>
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
