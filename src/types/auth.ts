import type { Participant } from "./participant";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginSuccessResponse {
  success: true;
  message: string;
  data: {
    participant: Participant;
    accessToken: string;
  };
}

export interface LoginErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  role?: string;
}
