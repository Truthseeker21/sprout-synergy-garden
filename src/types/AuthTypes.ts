
export interface User {
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

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  gardenReminders: boolean;
}

export interface NotificationSettings {
  plantWatering: boolean;
  seasonalTips: boolean;
  communityUpdates: boolean;
  challenges: boolean;
}

export interface ProfileUpdateData {
  name: string;
  email: string;
  bio?: string;
  location?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: ProfileUpdateData) => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => Promise<void>;
}
