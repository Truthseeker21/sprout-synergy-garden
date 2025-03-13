
import React from 'react';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Bell, 
  Shield, 
  Cloud,
  Save
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  
  return (
    <MainLayout title="Settings">
      <Tabs defaultValue="profile">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0">
            <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1">
              <TabsTrigger 
                value="profile" 
                className="justify-start px-3 w-full"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="justify-start px-3 w-full"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="justify-start px-3 w-full"
              >
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="storage" 
                className="justify-start px-3 w-full"
              >
                <Cloud className="h-4 w-4 mr-2" />
                Data & Storage
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1">
            <TabsContent value="profile" className="mt-0 rounded-md border p-6">
              <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Urban gardening enthusiast" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="climate-zone">Climate Zone</Label>
                  <Input id="climate-zone" placeholder="e.g. Zone 7a" />
                </div>
                <Button className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0 rounded-md border p-6">
              <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates and reminders via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive app notifications on your device</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Watering Reminders</h4>
                    <p className="text-sm text-muted-foreground">Get reminded when your plants need watering</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Community Activity</h4>
                    <p className="text-sm text-muted-foreground">Notifications about forum activity</p>
                  </div>
                  <Switch />
                </div>
                <Button className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-0 rounded-md border p-6">
              <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Profile Visibility</h4>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Garden Visibility</h4>
                    <p className="text-sm text-muted-foreground">Let others see your garden data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Collection</h4>
                    <p className="text-sm text-muted-foreground">Allow anonymous data collection for app improvement</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button className="mt-4">Save Privacy Settings</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="storage" className="mt-0 rounded-md border p-6">
              <h3 className="text-lg font-medium mb-4">Data & Storage</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Local Storage</h4>
                  <p className="text-sm text-muted-foreground mb-2">App is currently using 24MB of local storage</p>
                  <Button variant="outline" size="sm">Clear Cache</Button>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium">Backup & Restore</h4>
                  <p className="text-sm text-muted-foreground mb-2">Backup your garden data or restore from backup</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Export Data</Button>
                    <Button variant="outline" size="sm">Import Backup</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium">Data Sync</h4>
                  <p className="text-sm text-muted-foreground mb-2">Sync your data across multiple devices</p>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
