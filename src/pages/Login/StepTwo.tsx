import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import type { LoginError } from "../../api/auth";

export default function StepTwo() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setError(null);
    setFieldErrors({});
    
    // Basic validation
    if (!username.trim()) {
      setFieldErrors({ username: "Username is required" });
      return;
    }
    
    if (!password.trim()) {
      setFieldErrors({ password: "Password is required" });
      return;
    }

    setIsLoading(true);

    try {
      await login(username.trim(), password);
      navigate("/");
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      
      // Handle structured error response
      if (err && typeof err === 'object' && 'success' in err && !err.success) {
        const loginError = err as LoginError;
        
        // Handle field-specific validation errors
        if (loginError.errors && loginError.errors.length > 0) {
          const errors: Record<string, string> = {};
          loginError.errors.forEach((error) => {
            errors[error.field] = error.message;
          });
          setFieldErrors(errors);
          setError(null);
        } else {
          // Handle general error message
          setError(loginError.message || "Login failed. Please try again.");
          setFieldErrors({});
        }
      } else {
        // Handle unexpected errors
        setError("An unexpected error occurred. Please try again.");
        setFieldErrors({});
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center justify-start pt-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* TITLE */}
      <h1 className="font-[YouMurderer] text-6xl text-red-600 drop-shadow-lg mb-10 tracking-wider">
        WELCOME TO SILVER EYE
      </h1>

      {/* BLUR BOX */}
      <div
        className="
          w-[70%] 
          h-[60vh] 
          backdrop-blur-sm 
          border-l border-t border-red-700 
          shadow-[0_0_35px_rgba(255,0,0,0.25)]
          flex flex-col items-center 
          pt-16
        "
      >
        <h2 className="font-[YouMurderer] text-5xl text-red-500 mb-12">
          LOGIN
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          {/* General Error Message */}
          {error && (
            <div className="w-[38%] mb-4 p-3 bg-red-900/50 border border-red-600 rounded-sm">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="w-[38%] flex flex-col space-y-6">
            <div className="flex flex-col">
              <input
                className={`
                  w-full
                  bg-transparent
                  border ${fieldErrors.username ? 'border-red-500' : 'border-red-600'}
                  rounded-sm
                  px-4 py-3
                  text-white
                  placeholder-red-200
                  shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]
                  focus:outline-none focus:ring-2 focus:ring-red-500
                `}
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (fieldErrors.username) {
                    setFieldErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.username;
                      return newErrors;
                    });
                  }
                  if (error) setError(null);
                }}
                disabled={isLoading}
                autoComplete="username"
              />
              {fieldErrors.username && (
                <p className="text-red-400 text-xs mt-1 ml-1">{fieldErrors.username}</p>
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                className={`
                  w-full
                  bg-transparent
                  border ${fieldErrors.password ? 'border-red-500' : 'border-red-600'}
                  rounded-sm
                  px-4 py-3
                  text-white
                  placeholder-red-200
                  shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]
                  focus:outline-none focus:ring-2 focus:ring-red-500
                `}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.password;
                      return newErrors;
                    });
                  }
                  if (error) setError(null);
                }}
                disabled={isLoading}
                autoComplete="current-password"
              />
              {fieldErrors.password && (
                <p className="text-red-400 text-xs mt-1 ml-1">{fieldErrors.password}</p>
              )}
            </div>
          </div>

          <Button 
            variant="primary" 
            type="submit" 
            className="mt-10"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "LOGGING IN..." : "LOGIN"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
