
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import UserProfileForm from '@/components/UserProfileForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Bell, Sun, Moon, Palette, Mail } from 'lucide-react';

const Profile = () => {
  const { user, updateUserPreferences, updateNotificationSettings } = useAuth();
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState({
    theme: user?.preferences?.theme || 'system',
    emailNotifications: user?.preferences?.emailNotifications || true,
    gardenReminders: user?.preferences?.gardenReminders || true,
  });
  
  const [notifications, setNotifications] = useState({
    plantWatering: user?.notifications?.plantWatering || true,
    seasonalTips: user?.notifications?.seasonalTips || true,
    communityUpdates: user?.notifications?.communityUpdates || true,
    challenges: user?.notifications?.challenges || true,
  });
  
  const handlePreferenceChange = (key: keyof typeof preferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };
  
  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };
  
  const savePreferences = async () => {
    try {
      await updateUserPreferences(preferences);
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences.",
        variant: "destructive",
      });
    }
  };
  
  const saveNotifications = async () => {
    try {
      await updateNotificationSettings(notifications);
      toast({
        title: "Notification Settings Updated",
        description: "Your notification settings have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving notification settings:', error);
      toast({
        title: "Error",
        description: "Failed to save notification settings.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <MainLayout title="Your Profile">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <UserProfileForm />
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">App Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-3 flex items-center">
                    <Palette className="h-4 w-4 mr-2" />
                    Theme
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={preferences.theme === 'light' ? 'default' : 'outline'}
                      className="flex items-center justify-center py-6"
                      onClick={() => handlePreferenceChange('theme', 'light')}
                    >
                      <Sun className="h-5 w-5 mr-2" />
                      Light
                    </Button>
                    <Button 
                      variant={preferences.theme === 'dark' ? 'default' : 'outline'}
                      className="flex items-center justify-center py-6"
                      onClick={() => handlePreferenceChange('theme', 'dark')}
                    >
                      <Moon className="h-5 w-5 mr-2" />
                      Dark
                    </Button>
                    <Button 
                      variant={preferences.theme === 'system' ? 'default' : 'outline'}
                      className="flex items-center justify-center py-6"
                      onClick={() => handlePreferenceChange('theme', 'system')}
                    >
                      <div className="flex">
                        <Sun className="h-5 w-5" />
                        <Moon className="h-5 w-5 ml-1" />
                      </div>
                      <span className="ml-2">System</span>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-t">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <Label htmlFor="emailNotifications" className="cursor-pointer">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch 
                    id="emailNotifications" 
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-t">
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    <Label htmlFor="gardenReminders" className="cursor-pointer">
                      Garden Reminders
                    </Label>
                  </div>
                  <Switch 
                    id="gardenReminders" 
                    checked={preferences.gardenReminders}
                    onCheckedChange={(checked) => handlePreferenceChange('gardenReminders', checked)}
                  />
                </div>
              </div>
              
              <Button onClick={savePreferences}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <Label htmlFor="plantWatering" className="cursor-pointer font-medium">
                      Plant Watering Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about when to water your plants
                    </p>
                  </div>
                  <Switch 
                    id="plantWatering" 
                    checked={notifications.plantWatering}
                    onCheckedChange={(checked) => handleNotificationChange('plantWatering', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <Label htmlFor="seasonalTips" className="cursor-pointer font-medium">
                      Seasonal Tips
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get tips about seasonal gardening activities
                    </p>
                  </div>
                  <Switch 
                    id="seasonalTips" 
                    checked={notifications.seasonalTips}
                    onCheckedChange={(checked) => handleNotificationChange('seasonalTips', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <Label htmlFor="communityUpdates" className="cursor-pointer font-medium">
                      Community Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about community posts and activities
                    </p>
                  </div>
                  <Switch 
                    id="communityUpdates" 
                    checked={notifications.communityUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('communityUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label htmlFor="challenges" className="cursor-pointer font-medium">
                      Challenges
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notifications about gardening challenges
                    </p>
                  </div>
                  <Switch 
                    id="challenges" 
                    checked={notifications.challenges}
                    onCheckedChange={(checked) => handleNotificationChange('challenges', checked)}
                  />
                </div>
              </div>
              
              <Button onClick={saveNotifications}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Profile;
