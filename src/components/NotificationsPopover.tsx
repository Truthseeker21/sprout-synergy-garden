
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Sample notifications for demonstration
const sampleNotifications = [
  {
    id: '1',
    type: 'reminder',
    message: 'Time to water your tomato plants!',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'challenge',
    message: 'You completed the Spring Planting Challenge!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'community',
    message: 'Sarah commented on your garden post',
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    message: 'New gardening tips available for May',
    time: '3 days ago',
    read: true,
  },
];

const NotificationsPopover = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <div className="h-2 w-2 rounded-full bg-blue-500"></div>;
      case 'challenge':
        return <div className="h-2 w-2 rounded-full bg-green-500"></div>;
      case 'community':
        return <div className="h-2 w-2 rounded-full bg-yellow-500"></div>;
      case 'system':
        return <div className="h-2 w-2 rounded-full bg-purple-500"></div>;
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-500"></div>;
    }
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 ${!notification.read ? 'bg-muted/50' : ''} hover:bg-muted/30 cursor-pointer transition-colors`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>
        <Separator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
