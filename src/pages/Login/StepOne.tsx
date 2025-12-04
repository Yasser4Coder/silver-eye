import { motion } from "framer-motion";
import Button from "../../components/ui/Button";

interface StepOneProps {
  next: () => void;
}

export default function StepOne({ next }: StepOneProps) {
  return (
    <motion.div
      className="h-screen w-full relative flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="font-[CFAnarchy] text-6xl text-red-600 drop-shadow-lg mb-10 tracking-wider">
        Silver Eye
      </h1>
      <h1 className="font-[CFAnarchy] text-6xl text-red-600 drop-shadow-lg mb-10 tracking-wider">
        mind profiling
      </h1>

      <Button variant="primary" onClick={next} className="mt-18">
        LOGIN
      </Button>
    </motion.div>
  );
}
