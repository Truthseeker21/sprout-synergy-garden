
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  bio?: string;
  location?: string;
  avatar?: string;
  preferences?: UserPreferences;
  notifications?: NotificationSettings;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  gardenReminders: boolean;
}

interface NotificationSettings {
  plantWatering: boolean;
  seasonalTips: boolean;
  communityUpdates: boolean;
  challenges: boolean;
}

interface ProfileUpdateData {
  name: string;
  email: string;
  bio?: string;
  location?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: ProfileUpdateData) => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => Promise<void>;
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
        bio: 'Administrator of AgriGrow platform',
        location: 'San Francisco, CA',
        preferences: {
          theme: 'system' as const,
          emailNotifications: true,
          gardenReminders: true,
        },
        notifications: {
          plantWatering: true,
          seasonalTips: true,
          communityUpdates: true,
          challenges: true,
        }
      };
      setUser(adminUser);
      localStorage.setItem('auth_user', JSON.stringify(adminUser));
    } else if (email === 'user@agrigrow.com' && password === 'user123') {
      const regularUser = {
        id: '2',
        email: 'user@agrigrow.com',
        name: 'User',
        isAdmin: false,
        bio: 'Passionate urban gardener',
        location: 'Portland, OR',
        preferences: {
          theme: 'light' as const,
          emailNotifications: true,
          gardenReminders: true,
        },
        notifications: {
          plantWatering: true,
          seasonalTips: true,
          communityUpdates: false,
          challenges: true,
        }
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

  const updateUserProfile = async (data: ProfileUpdateData) => {
    if (!user) throw new Error('No user logged in');
    
    // In a real app, you would make an API call here
    // Simulating an async operation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        resolve();
      }, 500);
    });
  };

  const updateUserPreferences = async (preferences: Partial<UserPreferences>) => {
    if (!user) throw new Error('No user logged in');
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const updatedUser = { 
          ...user, 
          preferences: { 
            ...(user.preferences || { 
              theme: 'system', 
              emailNotifications: true, 
              gardenReminders: true 
            }), 
            ...preferences 
          } 
        };
        setUser(updatedUser);
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        resolve();
      }, 500);
    });
  };

  const updateNotificationSettings = async (settings: Partial<NotificationSettings>) => {
    if (!user) throw new Error('No user logged in');
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const updatedUser = { 
          ...user, 
          notifications: { 
            ...(user.notifications || { 
              plantWatering: true, 
              seasonalTips: true, 
              communityUpdates: true, 
              challenges: true 
            }), 
            ...settings 
          } 
        };
        setUser(updatedUser);
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        resolve();
      }, 500);
    });
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
