"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        // Convert timestamp strings back to Date objects
        const notificationsWithDates = parsed.map((notif: any) => ({
          ...notif,
          timestamp: new Date(notif.timestamp)
        }));
        setNotifications(notificationsWithDates);
      } catch (error) {
        console.error('Error parsing notifications:', error);
      }
    }

    // Add some sample notifications for demonstration
    if (savedNotifications === null) {
      const sampleNotifications: Omit<Notification, 'id' | 'timestamp' | 'read'>[] = [
        {
          title: "Welcome to Nexora!",
          message: "Thank you for joining our community. Start exploring our amazing products!",
          type: "success"
        },
        {
          title: "Flash Sale Alert",
          message: "Up to 80% off on electronics. Don't miss out on these amazing deals!",
          type: "info"
        },
        {
          title: "Order Update",
          message: "Your order #12345 has been shipped and is on its way to you.",
          type: "info"
        }
      ];

      sampleNotifications.forEach(notification => {
        addNotification(notification);
      });
    }
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => {
      const newNotifications = [newNotification, ...prev];
      localStorage.setItem('notifications', JSON.stringify(newNotifications));
      return newNotifications;
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const newNotifications = prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      );
      localStorage.setItem('notifications', JSON.stringify(newNotifications));
      return newNotifications;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const newNotifications = prev.map(notif => ({ ...notif, read: true }));
      localStorage.setItem('notifications', JSON.stringify(newNotifications));
      return newNotifications;
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      markAsRead, 
      markAllAsRead, 
      unreadCount 
    }}>
      {children}
    </NotificationContext.Provider>
  );
} 