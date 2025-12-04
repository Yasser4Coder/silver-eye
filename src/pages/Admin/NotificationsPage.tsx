import { useState, useEffect } from "react";
import { Bell, Send, Trash2 } from "lucide-react";
import { createNotification, getAllNotifications, deleteNotification } from "../../api/notifications";
import type { Notification } from "../../types/notification";
import Button from "../../components/ui/Button";

export default function NotificationsPage() {
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getAllNotifications(50);
      setNotifications(response.data?.notifications || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch notifications");
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
      setSending(true);
      setError(null);
      await createNotification({ message: message.trim() });
      setMessage("");
      await fetchNotifications(); // Refresh list
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send notification");
      console.error("Failed to send notification:", err);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this notification?")) {
      return;
    }

    try {
      await deleteNotification(id);
      await fetchNotifications();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete notification");
      console.error("Failed to delete notification:", err);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-[YouMurderer] text-4xl text-red-600 tracking-wider">
          NOTIFICATIONS
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Send Notification Form */}
      <div className="bg-black/40 backdrop-blur-xl border border-red-600/30 rounded-xl p-6 mb-8">
        <h2 className="font-[YouMurderer] text-2xl text-red-600 mb-4">
          Send Notification
        </h2>
        <div className="flex gap-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message..."
            className="
              flex-1 bg-black/40 border border-red-600/30 rounded-lg p-4
              text-white placeholder-white/40 focus:outline-none
              focus:border-red-600/60 resize-none
            "
            rows={3}
            maxLength={1000}
          />
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={sending || !message.trim()}
          >
            <Send size={20} className="mr-2" />
            {sending ? "Sending..." : "Send"}
          </Button>
        </div>
        <p className="text-white/40 text-sm mt-2">
          {message.length}/1000 characters
        </p>
      </div>

      {/* Notifications List */}
      <div className="bg-black/40 backdrop-blur-xl border border-red-600/30 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-red-600/30">
          <h2 className="font-[YouMurderer] text-2xl text-red-600">
            Notification History
          </h2>
        </div>

        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-white/60">
            <Bell size={48} className="mx-auto mb-4 opacity-50" />
            <p>No notifications sent yet</p>
          </div>
        ) : (
          <div className="divide-y divide-red-600/20">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-6 hover:bg-red-600/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-white text-lg mb-2">
                      {notification.message}
                    </p>
                    <p className="text-white/60 text-sm">
                      Sent at: {formatDateTime(notification.createdAt)}
                    </p>
                    {notification.sentByUser && (
                      <p className="text-white/40 text-xs mt-1">
                        By: {notification.sentByUser.fullname || notification.sentByUser.username}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="
                      text-red-400 hover:text-red-300 transition-colors
                      flex-shrink-0 p-2
                    "
                    title="Delete notification"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

