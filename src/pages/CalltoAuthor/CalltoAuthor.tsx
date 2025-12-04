"use client";

import { motion } from "framer-motion";
import CalltoAuthorForm from "./component/CalltoAuthorForm";

export default function CalltoAuthor() {
  return (
    <div
      className="
        h-[calc(100vh-90px)]
        flex items-center justify-center
        select-none
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-[55%]               /* ⬅️ bigger width */
          h-[45vh]              /* ⬅️ bigger height */
          backdrop-blur-md
          border border-red-800/40
          shadow-[0_0_35px_rgba(255,0,0,0.28)]
          rounded-xl
          flex flex-col items-center justify-center
          p-12
        "
      >
        <h1
          className="
            text-red-600
            text-5xl            
            font-[YouMurderer]
            tracking-widest
            mb-12
          "
        >
          CALL AN AUTHOR
        </h1>

        <CalltoAuthorForm />
      </motion.div>
    </div>
  );
}
