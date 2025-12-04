import type { FC } from "react";
import logo from "../../../assets/logo.svg";

const CharacterCard: FC = () => {
  const handleClick = () => {
    console.log("Character card clicked!");
  };

  return (
    <div
      onClick={handleClick}
      className="
        w-56 h-80 
        bg-black border border-red-700 
        rounded-xl flex flex-col 
        justify-between
        items-center
        py-6
        shadow-[0_0_25px_rgba(255,0,0,0.4)]
        hover:shadow-[0_0_40px_rgba(255,0,0,0.7)]
        transition-shadow duration-300
        cursor-pointer
      "
    >
      {/* Centered logo */}
      <div className="grow flex items-center justify-center w-full">
        <img
          src={logo}
          alt="logo"
          className="w-20 h-20 opacity-90"
        />
      </div>

      {/* Bottom text */}
      <p className="text-red-600 font-[CFAnarchy] tracking-widest text-sm">
        MIND PROFILING
      </p>
    </div>
  );
};

export default CharacterCard;
