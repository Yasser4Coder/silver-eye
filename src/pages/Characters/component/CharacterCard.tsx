import type { FC } from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.svg";

interface CharacterCardProps {
  backgroundImage?: string;
  characterName?: string;
  animateFlip?: boolean;
  onClick?: () => void;
}

const CharacterCard: FC<CharacterCardProps> = ({
  backgroundImage,
  characterName,
  animateFlip = false,
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
  `;

  const cardStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundColor: backgroundImage ? "transparent" : "black",
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
    backgroundRepeat: backgroundImage ? "no-repeat" : undefined,
  };

  const cardContent = (
    <>
      {/* Dark overlay for better visibility */}
      {backgroundImage && (
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

  if (animateFlip) {
    return (
      <motion.div
        onClick={handleClick}
        className={cardClassName}
        style={cardStyle}
        initial={{ rotateY: -180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          type: "spring",
          stiffness: 80,
          damping: 15,
        }}
        whileHover={{ scale: 1.05 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div onClick={handleClick} className={cardClassName} style={cardStyle}>
      {cardContent}
    </div>
  );
};

export default CharacterCard;
