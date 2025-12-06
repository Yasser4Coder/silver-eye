import type { FC } from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.svg";

interface CharacterCardProps {
  backgroundImage?: string;
  characterName?: string;
  animateFlip?: boolean; // Whether card should be flipped/visible
  isGlowing?: boolean; // Whether card is currently glowing
  shouldAnimate?: boolean; // Whether to animate the flip (true on first flip, false to maintain state)
  showCharacterBg?: boolean; // Whether to show character background (true during/after glow)
  scatterDirection?: "left" | "right" | null; // Direction for scatter animation
  numberOfFlips?: number; // Number of flips (default 3, 7th card uses 6)
  flipDuration?: number; // Duration for flip animation (default 3s, 7th card uses 6s)
  onClick?: () => void;
}

const CharacterCard: FC<CharacterCardProps> = ({
  backgroundImage,
  characterName,
  animateFlip = false,
  isGlowing = false,
  shouldAnimate = true,
  showCharacterBg = false,
  scatterDirection = null,
  numberOfFlips = 3,
  flipDuration = 3,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log("Character card clicked!");
    }
  };

  const cardClassName = `
    w-56 h-80 
    border border-red-700 
    rounded-xl flex flex-col 
    justify-between
    items-center
    py-6
    shadow-[0_0_25px_rgba(255,0,0,0.4)]
    hover:shadow-[0_0_40px_rgba(255,0,0,0.7)]
    transition-shadow duration-300
    cursor-pointer
    relative
    overflow-hidden
    ${isGlowing ? "shadow-[0_0_60px_rgba(255,0,0,0.9)] ring-4 ring-red-500/50" : ""}
  `;

  // Use character background only when showCharacterBg is true (during/after glow)
  const displayBackground = showCharacterBg ? backgroundImage : undefined;

  const cardStyle = {
    backgroundImage: displayBackground
      ? `url(${displayBackground})`
      : undefined,
    backgroundColor: displayBackground ? "transparent" : "black",
    backgroundSize: displayBackground ? "cover" : undefined,
    backgroundPosition: displayBackground ? "center" : undefined,
    backgroundRepeat: displayBackground ? "no-repeat" : undefined,
  };

  const cardContent = (
    <>
      {/* Dark overlay for better visibility - only when character bg is shown */}
      {displayBackground && (
        <div className="absolute inset-0 bg-black/50 rounded-xl z-0" />
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center">
        {/* Centered logo */}
        <div className="grow flex items-center justify-center w-full">
          <img src={logo} alt="logo" className="w-20 h-20 opacity-90" />
        </div>

        {/* Bottom text */}
        <p className="text-red-600 font-[CFAnarchy] tracking-widest text-sm">
          {characterName || "MIND PROFILING"}
        </p>
      </div>
    </>
  );

  // Generate flip keyframes based on number of flips
  const generateFlipKeyframes = () => {
    const keyframes: number[] = [-180];
    const step = 360 / numberOfFlips;
    for (let i = 1; i < numberOfFlips; i++) {
      keyframes.push(-180 + step * i);
    }
    keyframes.push(0);
    return keyframes;
  };

  const flipKeyframes =
    shouldAnimate && animateFlip ? generateFlipKeyframes() : [0];
  const flipTimes =
    shouldAnimate && animateFlip
      ? Array.from({ length: numberOfFlips + 1 }, (_, i) => i / numberOfFlips)
      : [0, 1];

  return (
    <motion.div
      onClick={handleClick}
      className={cardClassName}
      style={cardStyle}
      initial={{ rotateY: -180, opacity: 0, x: 0 }}
      animate={{
        rotateY:
          shouldAnimate && animateFlip ? flipKeyframes : animateFlip ? 0 : -180,
        opacity: scatterDirection ? 0 : animateFlip ? 1 : 0,
        scale: isGlowing ? 1.08 : 1,
        x:
          scatterDirection === "left"
            ? "-200vw"
            : scatterDirection === "right"
              ? "200vw"
              : 0,
      }}
      transition={{
        rotateY: {
          duration: shouldAnimate ? flipDuration : 0,
          times: flipTimes,
          ease: "linear",
        },
        opacity: {
          duration: scatterDirection ? 4 : shouldAnimate ? flipDuration : 0, // Fade out over 4 seconds during scatter
        },
        x: {
          duration: scatterDirection ? 4 : 0, // Slower scatter animation (4 seconds)
          ease: "easeIn",
        },
        scale: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: isGlowing ? 1.08 : animateFlip ? 1.05 : 1 }}
    >
      {cardContent}
    </motion.div>
  );
};

export default CharacterCard;
