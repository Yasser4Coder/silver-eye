import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
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
    const SERVER_URL =
      import.meta.env.VITE_SERVER_URL || "https://silvereye.clickncod.com";

    const socketInstance = io(SERVER_URL, {
      transports: ["polling", "websocket"], // Try polling first as it's more reliable
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      withCredentials: true,
      autoConnect: true,
      upgrade: true,
      rememberUpgrade: false,
    });

    // Log connection state changes
    socketInstance.on("connecting", () => {
      console.log("🔄 WebSocket connecting...");
    });

    socketInstance.on("reconnect_attempt", (attemptNumber) => {
      console.log(`🔄 WebSocket reconnection attempt ${attemptNumber}`);
    });

    socketInstance.on("reconnect_failed", () => {
      console.error("❌ WebSocket reconnection failed");
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
      console.error("Connection URL:", SERVER_URL);
      console.error("Frontend origin:", window.location.origin);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error type:", error.constructor.name);
      }
      // Log the full error object
      console.error(
        "Full error object:",
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );
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
