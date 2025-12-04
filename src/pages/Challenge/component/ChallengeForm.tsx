"use client";

import { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { motion } from "framer-motion";
import { submitChallengeAnswer } from "../../../api/chapters";

interface ChallengeFormProps {
  chapterId: string;
  challengeId: string;
  storyScript?: string;
  challengeDescription?: string;
  challengePhoto?: string | null;
  isSolved?: boolean;
}

export default function ChallengeForm({
  chapterId: _chapterId,
  challengeId,
  storyScript,
  challengeDescription,
  challengePhoto,
  isSolved = false
}: ChallengeFormProps) {

  const [_file, setFile] = useState<File | null>(null);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    remainingAttempts?: number;
  } | null>(null);

  const handleFakeFileClick = () => {
    document.getElementById("hidden-file-input")?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSolved) {
      setSubmitResult({
        success: false,
        message: "This challenge has already been solved. You cannot submit again."
      });
      return;
    }

    const answerText = answer.trim();
    if (!answerText) {
      setSubmitResult({
        success: false,
        message: "Please enter an answer"
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const challengeIdNum = parseInt(challengeId, 10);
      if (isNaN(challengeIdNum)) throw new Error("Invalid challenge ID");

      const result = await submitChallengeAnswer(challengeIdNum, answerText);

      setSubmitResult({
        success: result.success,
        message: result.message,
        remainingAttempts: result.data.remainingAttempts
      });

      if (result.success && result.data.isCorrect) {
        setAnswer("");
      }
    } catch (error: any) {
      console.error("Error submitting answer:", error);
      setSubmitResult({
        success: false,
        message: error?.response?.data?.message || "Failed to submit answer. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        w-[70%]
        h-[70vh]
        backdrop-blur-sm
        border-l border-t border-red-700
        shadow-[0_0_35px_rgba(255,0,0,0.25)]
        flex flex-col
        px-12 py-10
      "
    >
      <div
        className="
          flex-1
          overflow-y-auto
          pr-4
          text-gray-200
          font-[Yomogi]
          text-lg
          leading-relaxed
        "
      >

        {storyScript && (
          <div className="max-w-4xl mb-8">
            <div className="
              bg-black/50 
              border border-red-900 
              rounded-xl 
              p-6 
              shadow-[0_0_40px_rgba(255,0,0,0.35)]
              whitespace-pre-line
              text-red-300
              leading-relaxed
            ">
              {storyScript}
            </div>
          </div>
        )}


        {challengeDescription && (
          <div className="max-w-4xl mb-6">
            <p className="whitespace-pre-line mb-4">
              {challengeDescription}
            </p>

            {/* Photo */}
            {challengePhoto && (
              <div className="mt-4">
                <Button
                 
                  onClick={() => window.open(challengePhoto!, "_blank")}
                >
                  ⬇ OPEN PHOTO
                </Button>
              </div>
            )}

          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="
          mt-6
          flex flex-col gap-4
          w-full max-w-md
          justify-center
        "
      >
        {!isSolved && (
          <>
            <Button
              type="button"
              onClick={handleFakeFileClick}
              variant="secondary"
              className="
                w-fit
              "
            >
              FILE
            </Button>

            <input
              id="hidden-file-input"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </>
        )}

        {isSolved && (
          <div className="p-4 rounded-md bg-green-900/50 border border-green-700 text-green-300 mb-4">
            <p className="font-bold text-lg">✓ CHALLENGE SOLVED!</p>
            <p className="text-sm mt-1">You cannot submit again.</p>
          </div>
        )}

        {!isSolved && (
          <>
            <Input
              type="text"
              placeholder="Enter your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isSubmitting}
              className="
                bg-transparent
                text-red-500
                border border-red-600
                placeholder:text-red-700
                w-full
                py-2
                text-sm
                disabled:opacity-50
              "
            />

            {submitResult && (
              <div
                className={`
                  p-3 rounded-md text-sm
                  ${submitResult.success
                    ? "bg-green-900/50 border border-green-700 text-green-300"
                    : "bg-red-900/50 border border-red-700 text-red-300"
                  }
                `}
              >
                <p>{submitResult.message}</p>
                {submitResult.remainingAttempts !== undefined && (
                  <p className="mt-1 text-xs">
                    Remaining attempts: {submitResult.remainingAttempts}
                  </p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="
                w-fit
          
              "
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
            </Button>
          </>
        )}
      </form>
    </motion.div>
  );
}
