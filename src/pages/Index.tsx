import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import TacticalHeader from "@/components/TacticalHeader";
import IntroSection from "@/components/IntroSection";
import { useProtocol } from "@/components/ProtocolContext";
import { motion, AnimatePresence } from "framer-motion";
import { StarBall } from "@/components/StarBall";
import ResumeModal from "@/components/ResumeModal";

// Lazy-loaded components for better bundle size
const ExperienceTimeline = lazy(() => import("@/components/ExperienceTimeline"));
const MissionSelect = lazy(() => import("@/components/MissionSelect"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const NimbusCursor = lazy(() => import("@/components/NimbusCursor"));
const ShenronSummon = lazy(() => import("@/components/ShenronSummon").then(m => ({ default: m.ShenronSummon })));
const MobMeter = lazy(() => import("@/components/MobMeter"));
const ScrollbarController = lazy(() => import("@/components/ScrollbarController"));

const SECTIONS = ["intro", "experience", "projects", "skills", "education", "contact"];

const Index = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [eagleVision, setEagleVision] = useState(() => {
    return sessionStorage.getItem("eagleVision") === "true";
  });
  // const [smokeActive, setSmokeActive] = useState(false);
  const { protocolActive, toggleProtocol, foundBalls, tutorialDismissed } = useProtocol();

  const isComplete = foundBalls.length === 7;
  const nimbusCursorActive = protocolActive && !isComplete;
  const showTutorial = protocolActive && !tutorialDismissed;

  const handleNavigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView();
    setActiveSection(id);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Manage global body class for hiding default cursor when Nimbus is active via Protocol Shenron
  useEffect(() => {
    if (nimbusCursorActive) {
      document.body.classList.add("nimbus-active");
    } else {
      document.body.classList.remove("nimbus-active");
    }
  }, [nimbusCursorActive]);

  return (
    <div className={`min-h-screen text-foreground transition-colors duration-500 ${eagleVision ? "eagle-vision" : ""}`}>
      <Suspense fallback={null}>
        <ShenronSummon />
      </Suspense>
      <div className={`eagle-vision-overlay transition-all duration-500 ${eagleVision ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-hidden="true" />
      <Suspense fallback={null}>
        {nimbusCursorActive && <NimbusCursor />}
      </Suspense>
      <Suspense fallback={null}>
        <ScrollbarController />
      </Suspense>
      <TacticalHeader
        activeSection={activeSection}
        onNavigate={handleNavigate}
        eagleVision={eagleVision}
        onToggleEagle={() => {
          setEagleVision(!eagleVision)
          sessionStorage.setItem("eagleVision", (!eagleVision).toString());
        }}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <Suspense fallback={null}>
        <MobMeter />
      </Suspense>

      <main className="pt-24 pb-16 max-w-6xl mx-auto px-4">
        <IntroSection eagleVision={eagleVision} />
        <div className="w-full h-px bg-border my-4" />

        <Suspense fallback={<div className="h-20 flex items-center justify-center font-mono text-[10px] tracking-widest text-muted-foreground">LOADING_CORE_DATA...</div>}>
          <ExperienceTimeline eagleVision={eagleVision} />
          <div className="w-full h-px bg-border my-4" />
          <MissionSelect eagleVision={eagleVision} />
          <div className="w-full h-px bg-border my-4" />
          <SkillsSection eagleVision={eagleVision} />
          <div className="w-full h-px bg-border my-4" />
          <EducationSection eagleVision={eagleVision} />
          <div className="w-full h-px bg-border my-4" />
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 relative flex flex-col md:flex-row items-center justify-center min-h-[80px]">
        <p className="text-[10px] tracking-widest text-muted-foreground">
          SYS://SHAWN_RIJU — ALL SYSTEMS NOMINAL — {new Date().getFullYear()}
        </p>

        <div className="md:absolute right-4 bottom-auto pt-6 md:pt-0 flex items-center justify-end z-[60]">
          <div className="relative flex flex-col items-center md:items-end">
            <AnimatePresence>
              {showTutorial && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: 20 }}
                  animate={{ opacity: 1, y: -45, x: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute bottom-4 right-0 md:mb-8 md:max-w-max w-[260px] md:w-auto p-3 nier-border bg-card whitespace-normal md:whitespace-nowrap flex flex-col md:flex-row items-center gap-4 text-center md:text-left shadow-xl"
                >
                  <p className="text-[10px] md:text-xs font-mono tracking-widest text-[#B8860B] font-bold">
                    // OBJECTIVE: COLLECT_7_SIGNALS. CLICK_TO_BEGIN_DETECTION -{`>`}
                  </p>
                  <StarBall number={1} />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={toggleProtocol}
              className={`text-[10px] flex items-center justify-center gap-1.5 tracking-widest font-mono transition-colors duration-300 px-3 py-1.5 border ${protocolActive
                ? isComplete
                  ? "text-[#B8860B] border-[#B8860B] drop-shadow-[0_0_8px_rgba(184,134,11,0.5)]"
                  : "text-[#B8860B] border-[#B8860B]"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/30"
                }`}
            >
              {!isComplete && protocolActive && (
                <div className="w-3 h-3 rounded-full flex items-center justify-center bg-[#B8860B]/20 shadow-[0_0_6px_rgba(184,134,11,0.5)]">
                  <span className="text-[6px] text-[#B8860B] font-bold">★</span>
                </div>
              )}
              {isComplete ? "[ PROTOCOL_COMPLETE ]" : protocolActive ? `[ PROTOCOL_SHENRON_ACTIVE ] [ ${foundBalls.length}/7 ]` : "[ ACTIVATE_PROTOCOL_SHENRON ]"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
