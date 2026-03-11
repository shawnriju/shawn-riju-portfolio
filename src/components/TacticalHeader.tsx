import { motion } from "framer-motion";

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
  nimbusActive: boolean;
  onToggleNimbus: () => void;
}

const TacticalHeader = ({ activeSection, onNavigate, eagleVision, onToggleEagle, nimbusActive, onToggleNimbus }: TacticalHeaderProps) => {
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
              onClick={onToggleNimbus}
              className={`flex items-center gap-2 text-xs tracking-wider px-3 py-1 border transition-all duration-300 ${nimbusActive
                ? eagleVision ? "bg-primary/10 border-primary text-primary eagle-glow" : "bg-foreground text-primary-foreground border-foreground"
                : "border-border hover:bg-secondary"
                }`}
              title="Toggle Nimbus Cursor"
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${nimbusActive ? "bg-[#FF8C00] shadow-[0_0_8px_#FFD700]" : "bg-muted"}`}>
                <span className={`text-[8px] ${nimbusActive ? "text-[#FF0000]" : "text-muted-foreground"}`}>★</span>
              </div>
              <span>NIMBUS</span>
            </button>
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
