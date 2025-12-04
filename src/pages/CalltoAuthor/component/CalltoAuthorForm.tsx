"use client";

import { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useAuth } from "../../../hooks/useAuth";
import { createAuthorRequest } from "../../../api/admin";

export default function CalltoAuthorForm() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      setError("User information not available. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createAuthorRequest(user.id, message || undefined);
      setSuccess(true);
      setMessage(""); // Clear the form
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to submit author request. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full gap-6"
    >
      {/* Message input */}
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message (optional)"
        disabled={loading}
        className="
          w-full
          max-w-md
          bg-transparent
          border border-red-700
          text-red-500
          placeholder:text-red-700
        "
      />

      {/* Success message */}
      {success && (
        <div className="text-green-400 text-sm text-center max-w-md">
          ✓ Author request submitted successfully! Your request is pending approval.
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-red-400 text-sm text-center max-w-md">
          ✗ {error}
        </div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        disabled={loading}
        className="
          px-10 py-3
          bg-red-600
          hover:bg-red-700
          disabled:bg-red-800
          disabled:cursor-not-allowed
          text-white
          rounded-md
          font-[YouMurderer]
          tracking-widest
        "
      >
        {loading ? "SUBMITTING..." : "CALL AN AUTHOR"}
      </Button>
    </form>
  );
}
