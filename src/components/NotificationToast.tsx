import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";
import { useEffect, useRef } from "react";

// Import sound effect
import notificationSound from "../assets/sounds/action-hits-dark-and-deep-braam-impact-184274.mp3";

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotifications();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousCountRef = useRef<number>(0);

  // Play sound when a new notification arrives
  useEffect(() => {
    // Only play sound if the count increased (new notification)
    if (notifications.length > previousCountRef.current && notifications.length > 0) {
      // Play sound for the new notification
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn("Could not play notification sound:", err);
        });
      }
    }
    previousCountRef.current = notifications.length;
  }, [notifications.length]);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(notificationSound);
    audioRef.current.volume = 0.5; // Set volume to 50%

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-md">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="
                border border-red-600/40 bg-red-600/20 backdrop-blur-sm
                rounded-xl p-4 shadow-lg shadow-red-600/20
                hover:bg-red-600/30 transition-all
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-white text-lg mb-2">
                    {notification.message}
                  </p>
                  <p className="text-white/60 text-sm">
                    {formatTime(notification.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="
                    text-white/60 hover:text-white transition-colors
                    flex-shrink-0 p-1
                  "
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

