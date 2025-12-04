import type { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ChallengeCardProps {
  title: string;
  chapterId: string;
  challengeId: string;
  solved?: boolean;
}

const ChallengeCard: FC<ChallengeCardProps> = ({
  title,
  chapterId,
  challengeId,
  solved,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/chapters/${chapterId}/challenge/${challengeId}`)
      }
      className={`
        cursor-pointer
        flex items-center justify-center gap-2
        rounded-[2px] border-[1px]
        
        w-[558px] h-[60px]
        px-[45px] py-[15px]

        transition-transform duration-300 hover:scale-[1.03]

        ${
          solved
            ? "bg-[#5e0d0d] border-[#701010] shadow-[0_0_20px_rgba(255,0,0,0.25)]"
            : "bg-[#46464633] border-red-900 shadow-[0_0_15px_rgba(255,0,0,0.25)]"
        }
      `}
    >
      <span
        className={`
          font-[YouMurderer] tracking-widest
          text-2xl md:text-3xl
          ${solved ? "text-white" : "text-red-500"}
        `}
      >
        {solved ? `${title} – SOLVED` : title}
      </span>
    </div>
  );
};

export default ChallengeCard;
