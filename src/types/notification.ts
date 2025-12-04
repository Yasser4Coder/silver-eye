export interface Notification {
  id: number;
  message: string;
  sentBy: number | null;
  sentByUser?: {
    id: number;
    fullname: string;
    username: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationRequest {
  message: string;
}

