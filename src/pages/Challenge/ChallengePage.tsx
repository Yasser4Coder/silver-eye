import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChallengeCard from "./component/ChallengeCard";
import Button from "../../components/ui/Button";
import { getChapterChallenges } from "../../api/chapters";
import type { ChapterWithStatus } from "../../api/chapters";
import type { Challenge } from "../../types/challenge";

export default function ChallengePage() {
  const { chapterId, challengeId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<ChapterWithStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      if (!chapterId) {
        setError("Chapter ID is missing");
        setLoading(false);
        return;
      }
      
      const chapterIdNum = parseInt(chapterId, 10);
      if (isNaN(chapterIdNum)) {
        setError(`Invalid chapter ID: ${chapterId}`);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getChapterChallenges(chapterIdNum);
        setChapter(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching chapter:", err);
        setError(err?.response?.data?.message || "Failed to load chapter");
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId]);

  // Get all challenges from all stories
  const getAllChallenges = (): Challenge[] => {
    if (!chapter?.stories) return [];
    
    const challenges: Challenge[] = [];
    chapter.stories.forEach((story) => {
      if (story.challengeItems) {
        challenges.push(...story.challengeItems);
      }
    });
    
    return challenges.sort((a, b) => (a.id || 0) - (b.id || 0));
  };

  const challengeList = getAllChallenges();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-600">
        <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-400">
        <p>Error: {error || "Chapter not found"}</p>
      </div>
    );
  }

  if (challengeId) {
    const challenge = challengeList.find((c) => c.id?.toString() === challengeId);
    const story = chapter.stories?.find((s) => 
      s.challengeItems?.some((c) => c.id?.toString() === challengeId)
    );

    return (
      <div className="w-full h-full flex flex-col items-center text-red-600 py-8 px-4 select-none">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-red-400 hover:text-red-200 underline"
        >
          ← Back
        </button>

        <h1 className="font-[CFAnarchy] text-5xl tracking-widest mb-4 text-center">
          {chapter.chapterId || `Chapter ${chapter.chapterNumber}`}
        </h1>

        <h2 className="font-[CFAnarchy] text-4xl tracking-widest text-center mb-10">
          {challenge?.name || "Challenge"}
        </h2>

        <div className="
          bg-black/50 border border-red-900 rounded-xl p-10 max-w-3xl
          shadow-[0_0_40px_rgba(255,0,0,0.35)] backdrop-blur-md
        ">
          {story && (
            <div className="mb-8">
              <p className="text-lg text-red-300 whitespace-pre-line leading-relaxed">
                {story.storyScript}
              </p>
            </div>
          )}
          
          {challenge?.description && (
            <div className="mt-8 pt-8 border-t border-red-800">
              <p className="text-lg text-red-200 whitespace-pre-line leading-relaxed">
                {challenge.description}
              </p>
            </div>
          )}
          
          <div className="mt-8 pt-8 border-t border-red-800">
            <p className="text-xl text-center text-red-300">
              Challenge submission form will appear here...
            </p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div
      className="
        w-full h-full
        flex flex-col items-center
        text-red-600 select-none
        py-8 px-4
        gap-10
      "
    >
      <h1
        className="
          font-[CFAnarchy]
          text-4xl sm:text-5xl
          tracking-widest
          text-center
        "
      >
        {chapter.chapterId || `Chapter ${chapter.chapterNumber}`}
      </h1>
      <div className="absolute top-24 left-6 p-6">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </div>
      <div
        className="
          w-full
          flex flex-col
          items-center
          gap-6
        "
      >
        {challengeList.length > 0 ? (
          challengeList.map((c) => {
            const isSolved = c.submissionStatus?.solved || false;
            return (
              <div key={c.id} className="w-full max-w-[558px]">
                <ChallengeCard
                  title={c.name}
                  chapterId={chapterId!}
                  challengeId={c.id?.toString() || ""}
                  solved={isSolved}
                />
              </div>
            );
          })
        ) : (
          <p className="text-red-400">No challenges available</p>
        )}
      </div>

      <h2
  className="
    font-[CFAnarchy]
    text-4xl sm:text-5xl
    tracking-widest
    mt-6
    text-center
    mt-auto
  "
>
  MIND PROFILING
</h2>

    </div>
  );
}
