import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChallengeForm from "./component/ChallengeForm";
import Button from "../../components/ui/Button";
import { getChallengeDetails } from "../../api/chapters";

export default function ChallengeFormPage() {
  const { chapterId, challengeId } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId) {
        setError("Challenge ID is missing");
        setLoading(false);
        return;
      }

      const challengeIdNum = parseInt(challengeId, 10);
      if (isNaN(challengeIdNum)) {
        setError(`Invalid challenge ID: ${challengeId}`);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getChallengeDetails(challengeIdNum);
        setChallenge(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching challenge:", err);
        setError(err?.response?.data?.message || "Failed to load challenge");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-600">
        <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-400">
        <p>Error: {error || "Challenge not found"}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center text-red-600 py-8 px-4 select-none">
      <div className="absolute top-20 left-6 z-50 p-6">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </div>

      <h1 className="font-[CFAnarchy] text-5xl tracking-widest mb-6 text-center">
        {challenge.name || `Challenge ${challengeId}`}
      </h1>

      {/* Send entire story to ChallengeForm */}
      <ChallengeForm
        chapterId={chapterId!}
        challengeId={challengeId!}
        storyScript={challenge.story?.storyScript || ""}
        challengeDescription={challenge.description}
        challengePhoto={challenge.photo}
        isSolved={challenge.submissionStatus?.solved || false}
      />
    </div>
  );
}
