import axios from "axios";
import {
  type LoginPayload,
  type LoginSuccessResponse,
  type LoginErrorResponse,
} from "../types/auth";

const API = "https://silvereye.clickncod.com/api";

export interface LoginError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  status?: number;
}

// test this functions
export async function login(
  payload: LoginPayload
): Promise<LoginSuccessResponse> {
  try {
    const res = await axios.post<LoginSuccessResponse | LoginErrorResponse>(
      `${API}/auth/login`,
      payload,
      {
        withCredentials: true,
      }
    );

    // Check if the response indicates failure
    if (!res.data.success) {
      const errorResponse = res.data as LoginErrorResponse;
      const error: LoginError = {
        success: false,
        message: errorResponse.message,
        errors: errorResponse.errors,
      };
      throw error;
    }

    return res.data as LoginSuccessResponse;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      // Handle axios errors (network, 400, 500, etc.)
      const response = err.response?.data;

      // If the backend sent a structured error response
      if (
        response &&
        typeof response === "object" &&
        "success" in response &&
        !response.success
      ) {
        const errorResponse = response as LoginErrorResponse;
        const error: LoginError = {
          success: false,
          message: errorResponse.message || "Login failed",
          errors: errorResponse.errors,
          status: err.response?.status,
        };
        throw error;
      }

      // Generic error handling
      const error: LoginError = {
        success: false,
        message:
          response?.message || err.message || "Login failed. Please try again.",
        status: err.response?.status,
      };
      throw error;
    }

    // If it's already our custom error format, re-throw it
    if (err && typeof err === "object" && "success" in err) {
      throw err;
    }

    // Unknown error
    const error: LoginError = {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
    throw error;
  }
}

export async function getProfile() {
  return axios.get(`${API}/auth/profile`);
}
