import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Shuriken icon for bullet points
const ShurikenIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" className="shrink-0 mt-0.5">
    <polygon
      points="6,0 7.5,4.5 12,6 7.5,7.5 6,12 4.5,7.5 0,6 4.5,4.5"
      fill="hsl(var(--foreground))"
      opacity="0.6"
    />
    <circle cx="6" cy="6" r="1.5" fill="hsl(var(--background))" />
  </svg>
);

interface Mission {
  id: string;
  title: string;
  codename: string;
  status: string;
  points: string[];
  tech: string;
}

const missions: Mission[] = [
  {
    id: "site-simplify",
    title: "SiteSimplify",
    codename: "WEB INTELLIGENCE",
    status: "COMPLETE",
    points: [
      "Developed an AI-Powered Web Intelligence Tool for interactive querying of website content using natural language.",
      "Implemented Retrieval-Augmented Generation (RAG) using LangChain and OpenAI API with ChromaDB vector store.",
      "Enabled real-time semantic search across scraped web content, improving relevance over keyword-based approaches.",
    ],
    tech: "Python, LangChain, Streamlit, BeautifulSoup, OpenAI API, ChromaDB",
  },
  {
    id: "vm-monitor",
    title: "VM Monitor",
    codename: "INFRA VISION",
    status: "COMPLETE",
    points: [
      "Designed and built a 3D visualization prototype of virtual machines for real-time infrastructure monitoring.",
      "Integrated VM status data from VMware into Unity3D using the VMware REST API.",
      "Created an interactive visual tool for monitoring performance, uptime, and resource usage.",
    ],
    tech: "Unity3D, VMware, VMware REST API, C#",
  },
];

const MissionSelect = ({ eagleVision }: { eagleVision: boolean }) => {
  const [selected, setSelected] = useState(0);
  const mission = missions[selected];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2 text-center">MISSION LOGS</p>
        <h2 className="text-2xl font-light tracking-wider text-center mb-12">SELECT OPERATION</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Mission list */}
          <div className="md:w-1/3 space-y-1">
            {missions.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-4 py-3 border transition-all duration-200 ${selected === i
                    ? eagleVision ? "bg-primary/10 border-primary" : "border-foreground bg-foreground text-primary-foreground"
                    : "border-border hover:border-foreground/50"
                  }`}
              >
                <p className={`text-xs tracking-wider font-medium ${selected === i && eagleVision ? "eagle-glow text-primary" : ""}`}>{m.title}</p>
                <p className={`text-[10px] mt-0.5 ${selected === i ? (eagleVision ? "text-primary/70" : "text-primary-foreground/60") : "text-muted-foreground"}`}>
                  {m.codename}
                </p>
              </button>
            ))}
          </div>

          {/* Mission briefing */}
          <div className="md:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="nier-border p-6 bg-card h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold tracking-wider">{mission.title}</h3>
                    <p className="text-[10px] text-muted-foreground tracking-wider mt-0.5">CODENAME: {mission.codename}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 border border-border text-muted-foreground">
                    {mission.status}
                  </span>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <p className="text-[10px] tracking-widest text-muted-foreground mb-3">BRIEFING</p>
                  {mission.points.map((point, i) => (
                    <div key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                      <ShurikenIcon />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border mt-4 pt-3">
                  <p className="text-[10px] tracking-widest text-muted-foreground mb-2">LOADOUT</p>
                  <div className="flex flex-wrap gap-2">
                    {mission.tech.split(", ").map((t, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 border border-border ${eagleVision ? "eagle-glow" : ""}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSelect;
