import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award } from "lucide-react";
import { StarBall } from "./StarBall";

import shiningStarImg from "@/assets/achievements/shining-star.jpeg";
import cateringAwardImg from "@/assets/achievements/catering-award.jpeg";

interface Commendation {
  title: string;
  description: string;
  image?: string;
  logId?: string;
  imageClass?: string;
}

const academicRecords = [
  {
    degree: "M.Sc., Advanced Computer Science (Cloud Computing)",
    school: "University of Leeds",
    year: "November 2023",
    points: ["Graduated with Distinction"],
  },
  {
    degree: "B.Tech, Computer Science and Engineering",
    school: "Govt. Model Engineering College",
    year: "August 2020",
    points: ["Chaired the Debate Club for a year"],
  },
];

const commendations: Commendation[] = [
  {
    title: "Shining Star Award",
    description: "Organisation-wide peer-nominated award for impactful contributions to the Marketing team at Leeds University Union.",
    image: shiningStarImg,
    logId: "SHINING_STAR",
    imageClass: "object-[center_35%]",
  },
  {
    title: "Best Catering Assistant 2024",
    description: "Unanimously voted by colleagues for reliability, teamwork, and consistency in a fast-paced environment.",
    image: cateringAwardImg,
    logId: "CA_OF_THE_YEAR",
    imageClass: "object-[center_65%]",
  },
];

const EducationSection = ({ eagleVision }: { eagleVision: boolean }) => {
  const [activeCommendation, setActiveCommendation] = useState<Commendation | null>(null);

  return (
    <section id="education" className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2 text-center">DATA ARCHIVES</p>
        <h2 className="text-2xl font-light tracking-wider text-center mb-16">EDUCATION & HONORS</h2>

        <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] relative">

          {/* Column 1: Academic Records */}
          <div className="space-y-6">
            <p className="text-[10px] tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
              <span className={eagleVision ? "eagle-glow" : ""}>ACADEMIC_RECORDS</span>
            </p>
            <div className="space-y-6">
              {academicRecords.map((edu, i) => (
                <motion.div
                  key={i}
                  className="nier-border p-5 bg-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <p className="text-[10px] tracking-widest text-muted-foreground mb-2">{edu.year}</p>
                  <h3 className={`text-sm font-semibold tracking-wider mb-1 ${eagleVision ? "eagle-glow text-primary" : ""}`}>{edu.degree}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{edu.school}</p>
                  {edu.points.map((point, k) => (
                    <div key={k} className="text-xs leading-relaxed text-foreground/80 flex items-start gap-2">
                      <span className="text-muted-foreground translate-y-[2px]">&gt;</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-border/50 h-full" />

          {/* Column 2: Commendations */}
          <div className="space-y-6">
            <p className="text-[10px] tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
              <span className={eagleVision ? "eagle-glow" : ""}>COMMENDATIONS // HONORS</span>
            </p>
            <div className="space-y-4">
              {commendations.map((comm, i) => (
                <motion.div
                  key={i}
                  className={`nier-border p-4 bg-card cursor-pointer group transition-all duration-300 relative overflow-hidden ${eagleVision ? "hover:border-primary hover:bg-primary/5" : "hover:border-foreground/50 hover:bg-foreground/5"
                    }`}
                  onClick={() => setActiveCommendation(comm)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {/* Subtle glitch hover effect container */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none mix-blend-overlay transition-opacity"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}>
                  </div>

                  <div className="flex items-start gap-3 relative z-10 group-hover:-translate-y-0.5 transition-transform">
                    <div className={`shrink-0 p-2 border border-border mt-1 transition-colors ${eagleVision ? "group-hover:border-primary group-hover:text-primary eagle-glow" : "group-hover:border-foreground"
                      }`}>
                      <Award size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className={`text-sm tracking-wider font-semibold mb-1 transition-colors ${eagleVision ? "group-hover:text-primary eagle-glow" : ""
                        }`}>{comm.title}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        {comm.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Intel Modal */}
      <AnimatePresence>
        {activeCommendation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setActiveCommendation(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative bg-background p-1 nier-border-thin shadow-2xl overflow-hidden max-w-lg w-full ${eagleVision ? "eagle-vision" : ""}`}
            >
              <div className="border border-border p-4 sm:p-6 bg-card relative">
                <button
                  onClick={() => setActiveCommendation(null)}
                  className={`absolute top-4 right-4 z-10 p-1 border border-transparent hover:border-foreground transition-colors ${eagleVision ? "hover:border-primary hover:text-primary" : ""}`}
                >
                  <X size={16} />
                </button>

                <div className="mb-4 pr-8 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] tracking-widest text-muted-foreground">SYSTEM_MSG</p>
                    <h3 className={`text-sm font-semibold tracking-wider ${eagleVision ? "eagle-glow text-primary" : ""}`}>{activeCommendation.title}</h3>
                  </div>
                  {activeCommendation.title === "Shining Star Award" && <StarBall number={7} />}
                </div>

                <div className="relative border border-border bg-black/5 aspect-[4/3] overflow-hidden group">
                  {/* System Overlay (Scanline/Grain) */}
                  <div className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 3px)' }} />

                  {activeCommendation.image ? (
                    <img
                      src={activeCommendation.image}
                      alt={activeCommendation.title}
                      className={`w-full h-full object-cover ${activeCommendation.imageClass || "object-center"} grayscale-[30%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-xs text-muted-foreground font-mono">NO_IMAGE_DATA_FOUND</p>
                    </div>
                  )}

                  {/* Corner brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-foreground/50 z-20" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-foreground/50 z-20" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-foreground/50 z-20" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-foreground/50 z-20" />
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex justify-between items-center">
                  <p className="text-xs text-muted-foreground max-w-[70%]">{activeCommendation.description}</p>
                  <p className="text-[10px] font-mono tracking-widest text-right shrink-0">
                    // LOG_ID:<br />{activeCommendation.logId}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EducationSection;
