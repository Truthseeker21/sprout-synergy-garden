
import { User, ProfileUpdateData, UserPreferences, NotificationSettings } from '@/types/AuthTypes';

// Mock admin user
const adminUser: User = {
  id: '1',
  email: 'admin@agrigrow.com',
  name: 'Admin',
  isAdmin: true,
  bio: 'Administrator of AgriGrow platform',
  location: 'San Francisco, CA',
  preferences: {
    theme: 'system',
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

// Mock regular user
const regularUser: User = {
  id: '2',
  email: 'user@agrigrow.com',
  name: 'User',
  isAdmin: false,
  bio: 'Passionate urban gardener',
  location: 'Portland, OR',
  preferences: {
    theme: 'light',
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

// Authenticate user with email and password
export const authenticateUser = async (email: string, password: string): Promise<User> => {
  // Simulated login - replace with actual authentication
  if (email === 'admin@agrigrow.com' && password === 'admin123') {
    return adminUser;
  } else if (email === 'user@agrigrow.com' && password === 'user123') {
    return regularUser;
  } else {
    throw new Error('Invalid credentials');
  }
};

// Update user profile
export const updateProfile = async (user: User, data: ProfileUpdateData): Promise<User> => {
  // Simulating an async operation
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({ ...user, ...data });
    }, 500);
  });
};

// Update user preferences
export const updatePreferences = async (user: User, preferences: Partial<UserPreferences>): Promise<User> => {
  return new Promise<User>((resolve) => {
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
      resolve(updatedUser);
    }, 500);
  });
};

// Update notification settings
export const updateNotifications = async (user: User, settings: Partial<NotificationSettings>): Promise<User> => {
  return new Promise<User>((resolve) => {
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
      resolve(updatedUser);
    }, 500);
  });
};

// Persist user to local storage
export const persistUser = (user: User): void => {
  localStorage.setItem('auth_user', JSON.stringify(user));
};

// Get user from local storage
export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('auth_user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('auth_user');
    }
  }
  return null;
};

// Remove user from local storage
export const removeStoredUser = (): void => {
  localStorage.removeItem('auth_user');
};
