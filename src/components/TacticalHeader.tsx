import { motion } from "framer-motion";

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
        <nav className="relative flex items-center justify-center gap-1 py-2">
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
