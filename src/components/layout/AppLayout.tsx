import eleccastlefin from "../../assets/eleccastlefin.svg";
import NotificationToast from "../NotificationToast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
  className="h-screen bg-cover bg-center relative"
  style={{ backgroundImage: `url(${eleccastlefin})` }}
>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Notification Toast */}
      <NotificationToast />
    </div>
  );
}
