import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterName: string;
  imageUrl?: string; // Image URL that will be provided later
  backstory: string;
}

export default function CharacterModal({
  isOpen,
  onClose,
  characterName,
  imageUrl,
  backstory,
}: CharacterModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isFullscreen, onClose]);

  // Handle fullscreen image
  const handleImageClick = () => {
    if (imageUrl) {
      setIsFullscreen(true);
    }
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      {/* Main Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black/95 border border-red-600/40 rounded-xl shadow-2xl shadow-red-600/20">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors p-2 hover:bg-red-600/20 rounded-full"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>

                {/* Content */}
                <div className="p-6">
                  {/* Character Name */}
                  <h2 className="text-red-600 font-[CFAnarchy] text-3xl mb-6 text-center tracking-widest">
                    {characterName}
                  </h2>

                  {/* Image */}
                  {imageUrl ? (
                    <div className="mb-6">
                      <motion.img
                        src={imageUrl}
                        alt={characterName}
                        onClick={handleImageClick}
                        className="w-full h-auto rounded-lg cursor-pointer border border-red-600/30 hover:border-red-600/60 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="mb-6 h-64 bg-black/50 border border-red-600/30 rounded-lg flex items-center justify-center">
                      <p className="text-white/40 text-sm">
                        Image will be added soon
                      </p>
                    </div>
                  )}

                  {/* Backstory */}
                  <div className="text-white/90 leading-relaxed">
                    {backstory.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fullscreen Image */}
      <AnimatePresence>
        {isFullscreen && imageUrl && (
          <>
            {/* Fullscreen Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseFullscreen}
              className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseFullscreen}
                className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors p-2 hover:bg-red-600/20 rounded-full"
                aria-label="Close fullscreen"
              >
                <X size={32} />
              </button>

              {/* Fullscreen Image */}
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={imageUrl}
                alt={characterName}
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

