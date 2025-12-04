import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { NotificationProvider } from "./context/NotificationContext";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <NotificationProvider>
          <AppLayout>
            <AppRouter />
          </AppLayout>
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  );
}
