import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";
import { StarBall } from "./StarBall";

interface Mission {
  id: string;
  title: string;
  codename: string;
  status: string;
  description: string;
  tech: string;
  githubUrl: string;
}

const missions: Mission[] = [
  {
    id: "site-simplify",
    title: "Site Simplify",
    codename: "WEB INTELLIGENCE",
    status: "COMPLETE",
    description: "An AI-powered web application that allows users to input a website URL and interact with its content through a conversational interface. The application scrapes and processes website content, using **LangChain** to retrieve context and enable **OpenAI models** to generate relevant responses and simplify complex information. Built with **Python** and **Streamlit**, it demonstrates the use of **Retrieval-Augmented Generation (RAG)** to enable contextual question answering over web data.",
    tech: "Python, Langchain, OpenAI API, Streamlit, ChromaDB, Beautiful Soup",
    githubUrl: "https://github.com/shawnriju/site-simplify",
  },
  {
    id: "digital-twin",
    title: "Virtual Infrastructure Monitor",
    codename: "INFRA VISION",
    status: "COMPLETE",
    description: "A digital twin system developed as part of my MSc research project at the **University of Leeds**, exploring new ways to visualize and manage virtualized infrastructure. Built using **Unity** and **VMware**, the tool represents virtual machines as interactive **3D objects**, where attributes such as colour and size indicate operational status and memory allocation. The interface also provides controls for managing virtual machines directly within the visualization environment.",
    tech: "Unity3D, C#, VMware Workstation, VWware Rest API",
    githubUrl: "https://github.com/shawnriju/Digital-Twin-Visualization-of-Virtualized-Environment",
  },
  {
    id: "career-crew",
    title: "My Career Crew",
    codename: "AGENTIC WORKFLOWS",
    status: "COMPLETE",
    description: "An AI-powered application built to support my own job search process while experimenting with **multi-agent AI workflows**. The system uses AI agents built with **CrewAI** and **LangChain** to analyze job descriptions, generate tailored resumes and cover letters, and evaluate resumes for ATS compatibility, suggesting improvements based on the provided job description. The goal of the project was to explore multi-agent workflows for automating job application tasks.",
    tech: "Python, CrewAI, LangChain, Streamlit, OpenAI API",
    githubUrl: "https://github.com/shawnriju/my-career-crew",
  },
  {
    id: "webhook-repo",
    title: "Webhook Repo",
    codename: "EVENT LISTENER",
    status: "COMPLETE",
    description: "A small learning project built to understand how **GitHub webhooks** can capture repository activity in real time. Using **Python** and **Flask**, the application listens for webhook events such as commits, pushes, and pull requests, storing the event data in **MongoDB**. The captured activity is then displayed in a simple HTML interface, showing repository events ordered by the most recent changes.",
    tech: "Python, Flask, MongoDB, GitHub Webhooks",
    githubUrl: "https://github.com/shawnriju/webhook-repo",
  },
  {
    id: "qed",
    title: "Q.E.D.",
    codename: "AR INVESTIGATION",
    status: "COMPLETE",
    description: "An augmented reality puzzle event created for Excel 2018  (Technical fest at Model Engineering College) The event was designed as a murder mystery investigation, where participants scanned real-world objects to reveal hidden clues through **AR**. The mobile application was built using **Unity3D** and **Vuforia**, combining storytelling with augmented reality to create an interactive event experience.",
    tech: "Unity3D, Vuforia",
    githubUrl: "https://github.com/shawnriju/Q.E.D1",
  },
];

const MissionSelect = ({ eagleVision }: { eagleVision: boolean }) => {
  const [selected, setSelected] = useState(0);
  const mission = missions[selected];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2 text-center">MISSION LOGS</p>
        <h2 className="text-2xl font-light tracking-wider text-center mb-12">SELECT PROJECT</h2>

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

          <div className="md:w-2/3 min-h-[500px]">
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
                  <a
                    href={mission.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 text-[10px] px-3 py-1.5 border transition-all duration-300 ${eagleVision
                      ? "border-primary text-primary hover:bg-primary/20 eagle-glow"
                      : "border-border text-foreground hover:bg-foreground hover:text-background"
                      }`}
                  >
                    <Github size={12} />
                    <span>[PROJECT_FILES]</span>
                  </a>
                </div>

                <div className="border-t border-border pt-4 relative">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] tracking-widest text-muted-foreground">BRIEFING</p>
                    {mission.id === "digital-twin" && <StarBall number={5} className="absolute top-2 right-0" />}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {mission.description.split("**").map((part, index) =>
                      index % 2 === 1 ? (
                        <span key={index} className={`font-semibold transition-colors duration-300 ${eagleVision ? "eagle-glow text-primary" : "text-foreground"}`}>
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </p>
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
