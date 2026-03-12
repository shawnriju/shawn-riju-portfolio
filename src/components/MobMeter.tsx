import { useState, useEffect } from "react";
import { useProtocol } from "./ProtocolContext";
import { DataRecognitionTest } from "./DataRecognitionTest";

const MobMeter = () => {
  const { hasMobTrophy } = useProtocol();
  const [percent, setPercent] = useState(0);
  const [isMob, setIsMob] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));
      setPercent(scrolled);
      if (scrolled >= 100 && !isMob) {
        setIsMob(true);
        setTimeout(() => setIsMob(false), 2000);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMob]);

  /* The ???% trigger is only available at 100% scroll and before the trophy is earned */
  const isTriggerActive = percent >= 100 && !hasMobTrophy;
  const showGlitch = isTriggerActive && isHovered;

  return (
    <>
      <div
        className={`fixed bottom-4 left-4 z-40 select-none ${isTriggerActive ? "cursor-pointer" : ""}`}
        onMouseEnter={() => isTriggerActive && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => isTriggerActive && setShowQuiz(true)}
      >
        <div
          className={`nier-border bg-card px-3 py-2 text-center min-w-[60px] transition-all duration-300 ${
            showGlitch ? "mob-trigger-glow" : ""
          }`}
        >
          <p className="text-[9px] tracking-widest text-muted-foreground mb-0.5">MOB</p>
          <p
            className={`text-lg font-bold tabular-nums transition-colors duration-200 ${
              isMob ? "mob-100" : ""
            } ${
              showGlitch
                ? "mob-glitch-text"
                : percent >= 100
                  ? "text-accent"
                  : ""
            }`}
          >
            {showGlitch ? "???%" : `${percent}%`}
          </p>
        </div>
      </div>

      {showQuiz && <DataRecognitionTest onClose={() => setShowQuiz(false)} />}
    </>
  );
};

export default MobMeter;
