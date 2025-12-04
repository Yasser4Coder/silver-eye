import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Don't show login form if already authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && <StepOne key="step1" next={() => setStep(2)} />}
        {step === 2 && <StepTwo key="step2" />}
      </AnimatePresence>
    </div>
  );
}
