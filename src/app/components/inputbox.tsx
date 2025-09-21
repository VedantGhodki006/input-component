"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, FileText, Image } from "lucide-react";

interface InteractiveInputProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onAddPhoto?: () => void;
  onAddDocument?: () => void;
  gradientColors?: string[];
  shadowColor?: string;
}

export default function InteractiveInput({
  placeholder = "Ask me anything",
  onSubmit,
  onAddPhoto,
  onAddDocument,
  gradientColors = ["#3B82F6", "#2563EB", "#3B82F6"],
  shadowColor = "rgba(59, 130, 246, 0.25)",
}: InteractiveInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = () => {
    if (!value.trim()) return;
    if (onSubmit) onSubmit(value.trim());
    setValue("");

    // Trigger plane animation
    setIsSending(true);
    setTimeout(() => setIsSending(false), 1400); // match animation duration
  };

  return (
   
      <div className="w-full max-w-2xl px-4 relative">
        {/* Gradient Border */}
        <motion.div
          animate={{
            background: isFocused
              ? `linear-gradient(90deg, ${gradientColors.join(", ")})`
              : "transparent",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="p-[1.5px] rounded-2xl"
        >
          <motion.div
            className="flex items-center rounded-2xl px-3 py-2 bg-white border border-gray-200 shadow-md relative"
            animate={{
              boxShadow: isFocused
                ? `0 8px 20px ${shadowColor}`
                : "0 4px 10px rgba(0,0,0,0.08)",
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          >
            {/* Add + Button */}
            <div className="relative">
              <motion.button
                onClick={() => setShowAddOptions(!showAddOptions)}
                className="flex items-center justify-center p-3 mr-3 text-blue-500 font-bold text-2xl"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Add item"
                animate={{ rotate: showAddOptions ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                +
              </motion.button>

              {/* Dropdown options (upwards) */}
              <AnimatePresence>
                {showAddOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg w-36 z-20 overflow-hidden"
                  >
                    <motion.button
                      onClick={onAddPhoto}
                      whileHover={{ backgroundColor: "rgba(59,130,246,0.05)" }}
                      className="w-full flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Image size={16} />
                      Photos
                    </motion.button>
                    <motion.button
                      onClick={onAddDocument}
                      whileHover={{ backgroundColor: "rgba(59,130,246,0.05)" }}
                      className="w-full flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FileText size={16} />
                      Documents
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 text-lg outline-none bg-transparent text-gray-800 placeholder-transparent transition-colors duration-300"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />

              {/* Placeholder with bouncing dots */}
              {!value && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center gap-1">
                  <span>{placeholder}</span>
                  <span className="flex gap-[2px] ml-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400"
                        animate={{
                          y: [0, -2, 0],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: i * 0.35,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            {/* Send Button */}
            <motion.button
              onClick={handleSubmit}
              className="relative p-3 ml-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {!isSending ? (
                  <motion.div
                    key="plane-idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="plane-anim"
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    animate={{
                      x: [0, 30, 0, -30, 0],
                      y: [0, -40, -80, -40, 0],
                      rotate: [0, 20, 40, 60, 0],
                      opacity: [1, 1, 1, 1, 1],
                      clipPath: [
                        "circle(100% at 50% 50%)",
                        "circle(60% at 50% 50%)",
                        "circle(100% at 50% 50%)",
                      ],
                    }}
                    transition={{
                      duration: 1.3,
                      ease: "easeInOut",
                    }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    
  );
}
