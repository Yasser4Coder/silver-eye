import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSocket } from "./SocketContext";
import type { Notification } from "../types/notification";

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { socket, connected } = useSocket();

  // Listen for new notifications via WebSocket
  useEffect(() => {
    if (!socket || !connected) return;

    const handleNewNotification = (notification: Notification) => {
      addNotification(notification);
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [socket, connected]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
    
    // Auto-remove notification after 10 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 10000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

