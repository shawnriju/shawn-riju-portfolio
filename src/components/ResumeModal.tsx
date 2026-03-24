import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setProgress(0);
      const startTime = Date.now();
      const duration = 1500; // 1.5 seconds for "within 2 seconds"

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
        setProgress(currentProgress);

        if (currentProgress < 100) {
          requestAnimationFrame(updateProgress);
        } else {
          setTimeout(() => setLoading(false), 300);
        }
      };

      requestAnimationFrame(updateProgress);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const stats = [
    { label: "LOCATION", value: "India" },
    { label: "DEGREE", value: "M.Sc. with Distinction" },
    { label: "ROLE", value: "Software Engineer" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-full max-h-[90vh] bg-card nier-border flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <h2 className="text-[10px] md:text-sm font-mono tracking-[0.2em] font-bold text-foreground flex items-center gap-2">
                // UNIT_RECORD_00: SHAWN_RIJU
              </h2>
              <button
                onClick={onClose}
                className="p-1 px-3 hover:bg-foreground hover:text-background transition-all border border-border flex items-center gap-2 text-[10px] font-bold tracking-widest"
              >
                <span>[ X ]</span>
                <span className="hidden sm:inline">CLOSE_UNIT</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card p-8 space-y-6"
                  >
                    <div className="text-[10px] tracking-[0.5em] text-foreground font-bold uppercase overflow-hidden">
                      <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        className="inline-block"
                      >
                        RETRIEVING_DATA... {progress}%
                      </motion.span>
                    </div>
                    <div className="w-64 h-0.5 bg-muted relative">
                      <div
                        className="absolute top-0 left-0 h-full bg-foreground transition-all duration-75 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-[8px] tracking-widest text-muted-foreground font-mono animate-pulse">
                      AUTHENTICATING_USER_SPECIFICATIONS...
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col md:flex-row overflow-hidden w-full h-full"
                  >
                    {/* Left Column: Stats */}
                    <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-border bg-muted/10 space-y-8 overflow-y-auto">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-bold">Unit Specifications</p>
                          <div className="flex-1 h-px bg-border" />
                        </div>

                        <div className="space-y-6">
                          {stats.map((stat) => (
                            <div key={stat.label} className="group cursor-default">
                              <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-medium mb-1 group-hover:text-foreground transition-colors">{stat.label}</p>
                              <p className="text-sm font-mono tracking-wider font-bold group-hover:translate-x-1 transition-transform inline-block">
                                {stat.value}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-border/50">
                          <div className="text-[9px] leading-relaxed text-muted-foreground bg-muted/20 p-3 italic relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-border/50" />
                            Proven track record of reliable full-stack deployment and production-ready solutions.
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-border/30">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[8px] tracking-widest text-muted-foreground uppercase font-mono">System Diagnostic</p>
                          <div className="flex gap-1">
                            <div className="w-1 h-1 bg-foreground/40" />
                            <div className="w-1 h-1 bg-foreground/20" />
                            <div className="w-1 h-1 bg-foreground/10" />
                          </div>
                        </div>
                        <div className="space-y-2 font-mono text-[8px] text-muted-foreground/60 uppercase">
                          <div className="flex justify-between">
                            <span>Core_Integrity</span>
                            <span className="text-foreground">Nominal</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Synapse_Load</span>
                            <span className="text-foreground">Stable</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Neural_Link</span>
                            <span className="text-foreground">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: PDF Viewer */}
                    <div className="w-full md:w-2/3 h-full bg-[#f2ede4] relative overflow-hidden">
                      <iframe
                        src="/Resume_Shawn_BE.pdf#toolbar=0&view=FitH"
                        className="w-full h-full border-none opacity-90"
                        style={{ filter: "sepia(25%) contrast(1.05) brightness(0.98)" }}
                        title="Shawn Riju Resume"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-border bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-[8px] md:text-[9px] tracking-[0.2em] text-muted-foreground font-mono">
                DATA_ID: 2026.SR.00.BETA // ENCRYPTED_CONNECTION_ESTABLISHED
              </div>

              <a
                href="/Resume_Shawn_BE.pdf"
                download="Shawn_Riju_Resume.pdf"
                className="flex items-center gap-3 px-8 py-3 border border-foreground bg-foreground text-background text-[10px] md:text-xs tracking-[0.3em] font-bold hover:bg-transparent hover:text-foreground transition-all group relative overflow-hidden"
              >
                <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                [ EXPORT_PDF ]
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
