import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Create socket connection - connect to server (not /api endpoint)
    // For local dev: http://localhost:3000
    // For production: https://silver-eye.onrender.com
    const SERVER_URL = import.meta.env.VITE_SERVER_URL || 
                      (import.meta.env.DEV ? "http://localhost:3000" : "https://silver-eye.onrender.com");
    
    const socketInstance = io(SERVER_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketInstance.on("connect", () => {
      console.log("✅ WebSocket connected");
      setConnected(true);
      
      // Join timer room
      socketInstance.emit("join:timer");
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ WebSocket disconnected");
      setConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      setConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

