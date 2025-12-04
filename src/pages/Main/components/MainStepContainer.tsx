import { motion } from "framer-motion";
import { type ReactNode } from "react";

export default function MainStepContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        w-full max-w-4xl
        h-full           
        bg-black/40 backdrop-blur-xl
        border border-red-700
        shadow-xl shadow-red-900/50
        rounded-xl 
        p-8 md:p-14
        text-center
        flex flex-col
        
      "
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2">
        {children}
      </div>
    </motion.div>
  );
}
