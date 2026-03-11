import { motion } from "framer-motion";
import { useProtocol } from "./ProtocolContext";

const NAV_ITEMS = [
  { id: "intro", label: "PROFILE" },
  { id: "experience", label: "XP_LOG" },
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
  const { foundBalls } = useProtocol();
  const isComplete = foundBalls.length === 7;

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-background/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-2 relative">
            <span className="text-xs text-muted-foreground tracking-widest">SYS://</span>
            <span className="text-sm font-semibold tracking-wider mr-2">SHAWN RIJU</span>
            {isComplete && (
               <div className="group relative" title="[ QUEST_COMPLETE: SHENRON_TROPHY_ATTAINED ]">
                 <motion.svg 
                   initial={{ scale: 0, opacity: 0, rotateY: 180 }} 
                   animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                   transition={{ type: "spring", stiffness: 200, damping: 15 }}
                   className="w-3.5 h-3.5 drop-shadow-[0_0_6px_rgba(184,134,11,0.6)] relative z-10" 
                   viewBox="-5 -5 110 110" fill="none"
                 >
                   {/* 3D Extrusion Backdrop */}
                   <path d="M 10 20 H 90 L 30 80 H 90 L 80 95 H 0 L 60 35 H 0 Z" fill="#8B6508" transform="translate(6, 6)" />
                   
                   {/* Main Z Face */}
                   <path d="M 10 20 H 90 L 30 80 H 90 L 80 95 H 0 L 60 35 H 0 Z" fill="#B8860B" stroke="#FFD700" strokeWidth="3" strokeLinejoin="miter" />
                   
                   {/* Highlights */}
                   <path d="M 15 26 H 75" stroke="#FFF5CC" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
                   <path d="M 35 84 H 75" stroke="#FFF5CC" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
                 </motion.svg>
               </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleEagle}
              className={`text-xs tracking-wider px-3 py-1 border transition-all duration-300 ${eagleVision
                ? "bg-primary/10 border-primary text-primary eagle-glow"
                : "border-border hover:bg-secondary"
                }`}
            >
              {eagleVision ? "◉ EAGLE VISION" : "○ EAGLE VISION"}
            </button>
            <span className="text-xs text-muted-foreground hidden sm:inline-block">v2.0</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="relative flex items-center justify-center gap-1 py-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              data-section={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 text-xs tracking-widest transition-all duration-200 border ${activeSection === item.id
                ? eagleVision ? "bg-primary/10 border-primary text-primary eagle-glow" : "border-foreground bg-foreground text-primary-foreground"
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
