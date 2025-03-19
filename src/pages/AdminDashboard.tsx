
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Settings, Database, LineChart, 
  FileText, Bell, ShieldAlert, Loader2 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for admin dashboard
const userStats = {
  total: 1245,
  active: 876,
  new: 124,
  growth: 18
};

const contentStats = {
  plants: 342,
  articles: 156,
  tips: 210,
  videos: 78
};

const systemStats = {
  uptime: '99.8%',
  storage: 68,
  requests: '4.2k/day',
  avgResponseTime: '120ms'
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleTabChange = (value: string) => {
    setIsLoading(true);
    setActiveTab(value);
    
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleAction = (action: string) => {
    console.log(`Admin action: ${action}`);
    // In a real app, this would perform the requested action
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary">Admin Control Panel</h1>
            <p className="text-sm text-muted-foreground">Manage your AgriGrow platform</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="self-start sm:self-auto">
            Logout
          </Button>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.total}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +{userStats.growth}% from last month
                      </p>
                      <Progress className="h-1 mt-3" value={72} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Content Items</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{contentStats.plants + contentStats.articles + contentStats.tips}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Across all categories
                      </p>
                      <Progress className="h-1 mt-3" value={85} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">System Status</CardTitle>
                      <Settings className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStats.uptime}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Current uptime
                      </p>
                      <Progress className="h-1 mt-3" value={99} />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { user: 'Sarah Chen', action: 'Created a new plant guide', time: '10 minutes ago' },
                          { user: 'Mark Johnson', action: 'Flagged a community post', time: '32 minutes ago' },
                          { user: 'Admin', action: 'System update completed', time: '1 hour ago' },
                          { user: 'Priya Sharma', action: 'Deleted account', time: '3 hours ago' },
                          { user: 'System', action: 'Backup completed successfully', time: '6 hours ago' },
                        ].map((activity, i) => (
                          <div key={i} className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">{activity.user}</span> {activity.action}
                              </p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="users" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Total Users</h3>
                        <p className="text-2xl font-bold">{userStats.total}</p>
                      </div>
                      <Users className="h-8 w-8 text-primary/80" />
                    </div>
                    <Button 
                      className="mt-4 w-full" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('viewUsers')}
                    >
                      View All
                    </Button>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Active Users</h3>
                        <p className="text-2xl font-bold">{userStats.active}</p>
                      </div>
                      <Users className="h-8 w-8 text-green-500" />
                    </div>
                    <Button 
                      className="mt-4 w-full" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('viewActiveUsers')}
                    >
                      View Active
                    </Button>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">New Users</h3>
                        <p className="text-2xl font-bold">{userStats.new}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                    <Button 
                      className="mt-4 w-full" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('viewNewUsers')}
                    >
                      View New
                    </Button>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">User Growth</h3>
                        <p className="text-2xl font-bold">+{userStats.growth}%</p>
                      </div>
                      <LineChart className="h-8 w-8 text-purple-500" />
                    </div>
                    <Button 
                      className="mt-4 w-full" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('viewUserGrowth')}
                    >
                      View Analytics
                    </Button>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        className="flex justify-between items-center" 
                        onClick={() => handleAction('createUser')}
                      >
                        <span>Create User</span>
                        <Users className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        className="flex justify-between items-center" 
                        variant="outline"
                        onClick={() => handleAction('sendNotification')}
                      >
                        <span>Send Notification</span>
                        <Bell className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        className="flex justify-between items-center" 
                        variant="outline"
                        onClick={() => handleAction('manageRoles')}
                      >
                        <span>Manage Roles</span>
                        <ShieldAlert className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        className="flex justify-between items-center" 
                        variant="outline"
                        onClick={() => handleAction('exportUsers')}
                      >
                        <span>Export Data</span>
                        <Database className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="content" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Plants & Seeds</h3>
                        <p className="text-2xl font-bold">{contentStats.plants}</p>
                      </div>
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-lg">🌱</span>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 w-full" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('managePlants')}
                    >
                      Manage
                    </Button>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Articles</h3>
                        <p className="text-2xl font-bold">{contentStats.articles}</p>
                      </div>
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-lg">📝</span>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 w-full" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('manageArticles')}
                    >
                      Manage
                    </Button>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Tips & Techniques</h3>
                        <p className="text-2xl font-bold">{contentStats.tips}</p>
                      </div>
                      <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-yellow-600 text-lg">💡</span>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 w-full" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('manageTips')}
                    >
                      Manage
                    </Button>
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Videos</h3>
                        <p className="text-2xl font-bold">{contentStats.videos}</p>
                      </div>
                      <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-lg">🎬</span>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 w-full" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('manageVideos')}
                    >
                      Manage
                    </Button>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Content Operations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        className="flex justify-between items-center" 
                        onClick={() => handleAction('createContent')}
                      >
                        <span>Create Content</span>
                        <FileText className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        className="flex justify-between items-center" 
                        variant="outline"
                        onClick={() => handleAction('moderateComments')}
                      >
                        <span>Moderate Comments</span>
                        <Users className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        className="flex justify-between items-center" 
                        variant="outline"
                        onClick={() => handleAction('featuredContent')}
                      >
                        <span>Featured Content</span>
                        <Settings className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        className="flex justify-between items-center" 
                        variant="outline"
                        onClick={() => handleAction('contentAnalytics')}
                      >
                        <span>Content Analytics</span>
                        <LineChart className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="system" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">System Uptime</h3>
                        <p className="text-2xl font-bold">{systemStats.uptime}</p>
                      </div>
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </div>
                    </div>
                    <Progress className="h-1 mt-4" value={99.8} />
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Storage Usage</h3>
                        <p className="text-2xl font-bold">{systemStats.storage}%</p>
                      </div>
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-lg">💾</span>
                      </div>
                    </div>
                    <Progress className="h-1 mt-4" value={systemStats.storage} />
                  </Card>
                  
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">API Requests</h3>
                        <p className="text-2xl font-bold">{systemStats.requests}</p>
                      </div>
                      <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-lg">📊</span>
                      </div>
                    </div>
                    <Progress className="h-1 mt-4" value={75} />
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Operations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        className="flex justify-between items-center" 
                        onClick={() => handleAction('systemBackup')}
                      >
                        <span>Create Backup</span>
                        <Database className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        className="flex justify-between items-center" 
                        variant="outline"
                        onClick={() => handleAction('systemLogs')}
                      >
                        <span>View System Logs</span>
                        <FileText className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        className="flex justify-between items-center" 
                        variant="outline"
                        onClick={() => handleAction('systemSettings')}
                      >
                        <span>System Settings</span>
                        <Settings className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        className="flex justify-between items-center" 
                        variant="outline"
                        onClick={() => handleAction('systemMaintenance')}
                      >
                        <span>Maintenance Mode</span>
                        <ShieldAlert className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
