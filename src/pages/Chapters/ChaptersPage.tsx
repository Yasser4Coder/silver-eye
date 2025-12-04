import { useEffect, useState } from "react";
import ChapterCard from "./components/ChapterCard";
import { getAllChapters } from "../../api/chapters";
import type { ChapterWithStatus } from "../../api/chapters";

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<ChapterWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        const data = await getAllChapters();
        // Only show open chapters to participants
        const openChapters = data.filter((chapter) => chapter.status?.isOpen);
        setChapters(openChapters);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching chapters:", err);
        setError(err?.response?.data?.message || "Failed to load chapters");
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-600">
        <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-400">
        <p>Error: {error}</p>
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
      {chapters.length > 0 ? (
        <div
          className="
            w-full max-w-4xl
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-2
            gap-6
          "
        >
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      ) : (
        <div className="text-center text-red-400">
          <p className="text-xl">No chapters available at the moment.</p>
          <p className="text-sm mt-2">Check back later for new chapters!</p>
        </div>
      )}

      <h2
        className="
          font-[CFAnarchy]
          text-4xl sm:text-5xl
          tracking-widest
          mt-6
          text-center
        "
      >
        MIND PROFILING
      </h2>
    </div>
  );
}
