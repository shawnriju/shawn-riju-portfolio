import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "about", label: "PROFILE" },
  { id: "experience", label: "LOG" },
  { id: "projects", label: "MISSIONS" },
  { id: "skills", label: "ARSENAL" },
  { id: "education", label: "ARCHIVES" },
  { id: "contact", label: "COMMS" },
];

interface TacticalHeaderProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  eagleVision: boolean;
  onToggleEagle: () => void;
}


const TacticalHeader = ({ activeSection, onNavigate, eagleVision, onToggleEagle }: TacticalHeaderProps) => {
  const [nimbusPos, setNimbusPos] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeEl = navRef.current?.querySelector(`[data-section="${activeSection}"]`);
    if (activeEl) {
      const rect = (activeEl as HTMLElement).getBoundingClientRect();
      const parentRect = navRef.current!.getBoundingClientRect();
      setNimbusPos({
        x: rect.left - parentRect.left + rect.width / 2 - 14,
        y: -24,
      });
    }
  }, [activeSection]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground tracking-widest">SYS://</span>
            <span className="text-sm font-semibold tracking-wider">SHAWN RIJU</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleEagle}
              className={`text-xs tracking-wider px-3 py-1 border transition-all duration-300 ${
                eagleVision
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "border-border hover:bg-secondary"
              }`}
            >
              {eagleVision ? "◉ EAGLE VISION" : "○ EAGLE VISION"}
            </button>
            <span className="text-xs text-muted-foreground">v2.0</span>
          </div>
        </div>

        {/* Nav */}
        <nav ref={navRef} className="relative flex items-center justify-center gap-1 py-2">
          <motion.div
            className="absolute"
            animate={{ x: nimbusPos.x, y: nimbusPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <NimbusCloud />
          </motion.div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              data-section={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 text-xs tracking-widest transition-all duration-200 border ${
                activeSection === item.id
                  ? "border-foreground bg-foreground text-primary-foreground"
                  : "border-transparent hover:border-border"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="h-px bg-border" />
    </header>
  );
};

export default TacticalHeader;
