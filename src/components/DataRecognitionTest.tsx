import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProtocol } from "./ProtocolContext";

interface QuizOption {
  id: string;
  label: string;
  correct: boolean;
}

const OPTIONS: QuizOption[] = [
  { id: "nier", label: "Nier: Automata", correct: true },
  { id: "dbz", label: "Dragon Ball", correct: true },
  { id: "mob", label: "Mob Psycho 100", correct: true },
  { id: "op", label: "One Piece", correct: true },
  { id: "naruto", label: "Naruto", correct: false },
  { id: "assasins", label: "Assasins Creed", correct: true },
  { id: "paladins", label: "Paladins", correct: false },
  { id: "opm", label: "One Punch Man", correct: false },
  { id: "cyberpunk", label: "Cyberpunk 2077", correct: false },
  { id: "sololeveling", label: "Solo Leveling", correct: false },
  { id: "bleach", label: "Bleach", correct: false },
];

// Generate pseudo-random lightning SVG paths
const generateLightningPath = (startX: number, startY: number, endX: number, endY: number) => {
  let path = `M ${startX} ${startY}`;
  const segments = 8 + Math.floor(Math.random() * 6);
  const dx = (endX - startX) / segments;
  const dy = (endY - startY) / segments;
  for (let i = 1; i <= segments; i++) {
    const jitterX = (Math.random() - 0.5) * 80;
    const jitterY = (Math.random() - 0.5) * 40;
    path += ` L ${startX + dx * i + jitterX} ${startY + dy * i + jitterY}`;
  }
  return path;
};


//???% EXPLOSION – full-screen psychic static shatter

const PsychicExplosion = ({ onComplete }: { onComplete: () => void }) => {
  const [bolts, setBolts] = useState<string[]>([]);

  useEffect(() => {
    // Continuously regenerate lightning bolts for the flash effect
    const interval = setInterval(() => {
      const newBolts = Array.from({ length: 6 }, () =>
        generateLightningPath(
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        )
      );
      setBolts(newBolts);
    }, 120);

    const timer = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "#000" }}
    >
      {/* Radial purple burst */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 0.9, 0.6, 1, 0.7], scale: [0.3, 1.5, 1.2, 1.8, 2.5] }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(147,51,234,0.7) 0%, rgba(88,28,135,0.4) 40%, rgba(0,0,0,0.95) 80%)",
        }}
      />

      {/* Static noise overlay */}
      <div className="absolute inset-0 mob-static-noise opacity-40 mix-blend-screen" />

      {/* Lightning bolts */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {bolts.map((d, i) => (
          <motion.path
            key={`${i}-${d.slice(0, 20)}`}
            d={d}
            stroke={i % 2 === 0 ? "#fff" : "#a855f7"}
            strokeWidth={i % 3 === 0 ? "0.4" : "0.2"}
            fill="none"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1], pathLength: 1 }}
            transition={{ duration: 0.15, ease: "linear" }}
            style={{
              filter: `drop-shadow(0 0 ${i % 2 === 0 ? 4 : 8}px ${i % 2 === 0 ? "#fff" : "#a855f7"})`,
            }}
          />
        ))}
      </svg>

      {/* White flash */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0, 0.3, 0, 0.8, 0] }}
        transition={{ duration: 1.5, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.7] }}
      />

      {/* Text overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-20 text-center px-4"
      >
        <motion.h2
          className="text-5xl md:text-7xl font-black tracking-widest text-white mb-6"
          animate={{
            textShadow: [
              "0 0 20px #a855f7, 0 0 40px #a855f7",
              "0 0 60px #fff, 0 0 80px #a855f7",
              "0 0 20px #a855f7, 0 0 40px #a855f7",
            ]
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          ???%
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-mono text-sm md:text-lg tracking-wider text-purple-300"
          style={{ textShadow: "0 0 10px #a855f7" }}
        >
          // [CRITICAL_SYNC]: PSYCHIC_LIMITER_REMOVED: POWER&gt;9000.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};


//MAIN QUIZ MODAL

export const DataRecognitionTest = ({ onClose }: { onClose: () => void }) => {
  const { unlockMobTrophy } = useProtocol();
  const [selected, setSelected] = useState<string[]>([]);
  const [validating, setValidating] = useState(false);
  const [explosion, setExplosion] = useState(false);
  const [failed, setFailed] = useState(false);

  // Shuffle options once on mount
  const shuffledOptions = useMemo(
    () => [...OPTIONS].sort(() => Math.random() - 0.5),
    []
  );

  const handleSelect = (id: string) => {
    if (validating) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setFailed(false);
  };

  const handleVerify = () => {
    setValidating(true);
    setFailed(false);

    setTimeout(() => {
      const correctIds = OPTIONS.filter((o) => o.correct).map((o) => o.id);
      const allCorrectSelected = correctIds.every((id) => selected.includes(id));
      const noWrongSelected = selected.every(
        (id) => OPTIONS.find((o) => o.id === id)?.correct
      );

      if (allCorrectSelected && noWrongSelected) {
        setExplosion(true);
      } else {
        setFailed(true);
        setValidating(false);
      }
    }, 800);
  };

  const handleExplosionComplete = useCallback(() => {
    unlockMobTrophy();
    onClose();
  }, [unlockMobTrophy, onClose]);

  /* ── Explosion state ── */
  if (explosion) {
    return (
      <AnimatePresence>
        <PsychicExplosion onComplete={handleExplosionComplete} />
      </AnimatePresence>
    );
  }

  /* ── Quiz Modal ── */
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 font-mono select-none"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-background border border-purple-500/40 text-foreground w-full max-w-2xl relative overflow-hidden"
          style={{ boxShadow: "0 0 40px rgba(147,51,234,0.2), 0 0 80px rgba(147,51,234,0.1)" }}
        >
          {/* CRT scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            }}
          />

          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6 border-b border-purple-500/30 pb-4">
              <div>
                <h2
                  className="text-base md:text-lg font-bold tracking-widest"
                  style={{ color: "#a855f7", textShadow: "0 0 10px rgba(168,85,247,0.5)" }}
                >
                  // SYSTEM_INTEGRITY: DATA_RECOGNITION_TEST
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">
                  To verify full synchronization, identify all external media
                  influences detected within this Unit's interface.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-purple-400 transition-colors px-2 py-1 text-sm font-mono hover:bg-purple-500/10"
              >
                [X]
              </button>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-6 max-h-[50vh] overflow-y-auto pr-1">
              {shuffledOptions.map((option) => {
                const isSelected = selected.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full text-left px-4 py-2.5 border transition-all duration-200 text-sm tracking-wide ${isSelected
                      ? "border-purple-500 bg-purple-500/15 text-purple-300"
                      : "border-border/50 hover:border-purple-500/40 hover:bg-purple-500/5 text-foreground"
                      }`}
                  >
                    <span className="inline-block w-7 font-bold" style={{ color: "#a855f7" }}>
                      {isSelected ? "[x]" : "[ ]"}
                    </span>
                    {option.label}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-purple-500/20">
              <div className="text-[10px] tracking-widest text-muted-foreground">
                STATUS: {validating ? (
                  <span className="text-purple-400 animate-pulse">ANALYZING...</span>
                ) : (
                  "AWAITING_INPUT"
                )}
                {failed && (
                  <span className="text-red-400 ml-2 animate-pulse">
                    [ERROR: MISMATCH_DETECTED]
                  </span>
                )}
              </div>

              <button
                onClick={handleVerify}
                disabled={validating || selected.length === 0}
                className={`px-6 py-2 border font-bold text-sm tracking-widest transition-all duration-300 ${validating || selected.length === 0
                  ? "border-muted/40 text-muted-foreground/50 cursor-not-allowed"
                  : "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  }`}
                style={
                  !(validating || selected.length === 0)
                    ? { boxShadow: "0 0 15px rgba(147,51,234,0.3)" }
                    : undefined
                }
              >
                {validating ? "VERIFYING..." : "VERIFY_DATA"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
