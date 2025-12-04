import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as apiLogin, getProfile } from "../api/auth";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../utils/storage";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAccessToken());
  const navigate = useNavigate();

  // Load initial profile (if tokens exist)
  useEffect(() => {
    (async () => {
      try {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if (accessToken || refreshToken) {
          try {
            const res = await getProfile();
            setUser(res.data);
            setIsAuthenticated(true);
          } catch {
            setUser(null);
            setIsAuthenticated(false);
            clearTokens();
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Login
  const login = async (username: string, password: string) => {
    try {
      const res = await apiLogin({ username, password });

      // Save tokens (refreshToken is stored in httpOnly cookie, not in response)
      setTokens(res.data.accessToken, '');

      // Fetch user profile
      const profile = await getProfile();
      setUser(profile.data);
      setIsAuthenticated(true);

      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      clearTokens();
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  };

  // Logout
  const logout = () => {
    clearTokens();
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
