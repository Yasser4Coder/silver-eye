import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { ChapterWithStatus } from "../../../api/chapters";

interface ChapterCardProps {
  chapter: ChapterWithStatus;
}

const ChapterCard: FC<ChapterCardProps> = ({ chapter }) => {
  const navigate = useNavigate();
  const isOpen = chapter.status?.isOpen ?? false;
  const chapterName = chapter.chapterId || `Chapter ${chapter.chapterNumber}`;
  const hasImage = chapter.chapterImage;

  const handleClick = () => {
    if (isOpen) {
      navigate(`/chapters/${chapter.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-black/60 border rounded-xl 
        w-full md:w-md
        h-40 md:h-56
        flex flex-col items-center justify-center
        shadow-[0_0_30px_rgba(255,0,0,0.25)] backdrop-blur-sm
        overflow-hidden
        relative
        ${
          isOpen
            ? "border-red-900 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,0,0,0.35)]"
            : "border-red-950/50 cursor-not-allowed opacity-60"
        }
      `}
    >
      {/* Chapter Image Background */}
      {hasImage && isOpen && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${chapter.chapterImage})` }}
        />
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

      {/* Chapter Name */}
      <span className="font-[CFAnarchy] text-2xl md:text-3xl tracking-widest relative z-10 text-center px-4">
        {chapterName}
      </span>

      {/* Status indicator */}
      {!isOpen && (
        <span className="text-xs text-red-400 mt-2 relative z-10">
          {chapter.status?.status === "upcoming" ? "Coming Soon" : "Locked"}
        </span>
      )}
    </div>
  );
};

export default ChapterCard;
