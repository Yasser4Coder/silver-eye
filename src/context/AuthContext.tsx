import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  setAccessToken,
  clearTokens,
  setUser,
  getUser,
  clearUser,
} from "../utils/storage";

import { login as apiLogin } from "../api/auth";
import type { Participant } from "../types/participant";

interface AuthContextType {
  isAuthenticated: boolean;
  user: Participant | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());
  const [user, setUserState] = useState<Participant | null>(getUser());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const token = getAccessToken();
    const savedUser = getUser();
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUserState(savedUser);
    } else {
      setIsAuthenticated(false);
      setUserState(null);
    }
    
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin({ username, password });

      // Store access token and user information
      setAccessToken(response.data.accessToken);
      setUser(response.data.participant);
      
      setIsAuthenticated(true);
      setUserState(response.data.participant);
    } catch (err: any) {
      console.error("❌ AuthContext login error:", err);
      // Clear any existing auth data on error
      clearTokens();
      clearUser();
      setIsAuthenticated(false);
      setUserState(null);
      throw err;
    }
  };

  const logout = () => {
    clearTokens();
    clearUser();
    setIsAuthenticated(false);
    setUserState(null);
    navigate("/login");  
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
