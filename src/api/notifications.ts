import api from "./axiosInstance";
import type { Notification, CreateNotificationRequest } from "../types/notification";

export interface GetAllNotificationsResponse {
  success: boolean;
  message: string;
  data: {
    notifications: Notification[];
    count: number;
  };
}

export interface CreateNotificationResponse {
  success: boolean;
  message: string;
  data: {
    notification: Notification;
  };
}

export async function getAllNotifications(limit?: number): Promise<GetAllNotificationsResponse> {
  const params = limit ? { limit } : {};
  const res = await api.get("/notifications", { params });
  return res.data;
}

export async function createNotification(
  data: CreateNotificationRequest
): Promise<CreateNotificationResponse> {
  const res = await api.post("/notifications", data);
  return res.data;
}

export async function deleteNotification(id: number): Promise<void> {
  await api.delete(`/notifications/${id}`);
}

