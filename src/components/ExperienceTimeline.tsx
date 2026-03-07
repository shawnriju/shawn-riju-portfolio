import { motion } from "framer-motion";

// Log Pose compass icon (One Piece inspired)
const LogPoseIcon = ({ active }: { active?: boolean }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" className="shrink-0">
    <circle cx="16" cy="16" r="14" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="11" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
    <circle cx="16" cy="16" r="2" fill={active ? "hsl(var(--nier-gold))" : "hsl(var(--muted-foreground))"} />
    {/* Compass needle */}
    <line x1="16" y1="5" x2="16" y2="14" stroke={active ? "hsl(var(--nier-gold))" : "hsl(var(--foreground))"} strokeWidth="1.5" />
    <line x1="16" y1="18" x2="16" y2="27" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
    {/* Cardinal marks */}
    <line x1="16" y1="3" x2="16" y2="5" stroke="hsl(var(--foreground))" strokeWidth="1" />
    <line x1="16" y1="27" x2="16" y2="29" stroke="hsl(var(--foreground))" strokeWidth="1" />
    <line x1="3" y1="16" x2="5" y2="16" stroke="hsl(var(--foreground))" strokeWidth="1" />
    <line x1="27" y1="16" x2="29" y2="16" stroke="hsl(var(--foreground))" strokeWidth="1" />
  </svg>
);

interface TimelineEntry {
  title: string;
  org: string;
  location: string;
  period: string;
  points: string[];
  tech?: string;
}

const entries: TimelineEntry[] = [
  {
    title: "Marketing Project Coordinator",
    org: "Leeds University Union",
    location: "Leeds, United Kingdom",
    period: "March 2025 – October 2025",
    points: [
      "Managed multiple marketing campaigns using Asana and built automated data workflows using Zapier.",
      "Liaised with internal teams, external vendors, and student stakeholders across 5+ high-profile campus initiatives.",
      "Developed comprehensive project briefs and event strategies, applying data insights to refine strategy and improve ROI.",
    ],
  },
  {
    title: "Software Engineer",
    org: "Mindtree",
    location: "Bangalore, India",
    period: "October 2020 – September 2022",
    points: [
      "Optimized T-SQL architecture for a US banking client, achieving a 50% improvement in query run times.",
      "Engineered 20+ SQL Views and Tables for Tableau reporting, cutting data retrieval time by 40%.",
      "Refactored C# backend services, increasing unit test coverage by 30% using xUnit.",
      "Facilitated 6+ production deployments across QA, Pre-Prod, and Live environments.",
      "Maintained a velocity of 8–10 story points per sprint in an Agile environment.",
    ],
    tech: "C#, ASP.NET MVC, Entity Framework, MSSQL Server, Angular, xUnit, JIRA, SSRS",
  },
  {
    title: "International Welcome Team Assistant",
    org: "University of Leeds",
    location: "Leeds, United Kingdom",
    period: "June 2023 – June 2024",
    points: [
      "Led welcoming events for 100+ students, fostering inclusivity, cultural awareness, and community engagement.",
    ],
  },
];

const ExperienceTimeline = ({ eagleVision }: { eagleVision: boolean }) => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2 text-center">THE GRAND LINE</p>
        <h2 className="text-2xl font-light tracking-wider text-center mb-12">VOYAGE LOG</h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {entries.map((entry, i) => (
            <motion.div
              key={i}
              className="relative pl-14 pb-12 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Log Pose node */}
              <div className="absolute left-0 top-0 -translate-x-[0px]">
                <LogPoseIcon active={i === 0} />
              </div>

              <div className="nier-border p-5 bg-card">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold tracking-wider">{entry.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{entry.org} — {entry.location}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 sm:mt-0 shrink-0">{entry.period}</span>
                </div>
                <ul className="space-y-2">
                  {entry.points.map((point, j) => (
                    <li key={j} className="text-xs leading-relaxed text-muted-foreground flex gap-2">
                      <span className="text-foreground shrink-0 mt-0.5">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {entry.tech && (
                  <p className="text-xs mt-3 pt-3 border-t border-border text-muted-foreground">
                    <span className="text-foreground">Tech: </span>
                    {entry.tech.split(", ").map((t, k) => (
                      <span key={k} className={eagleVision ? "eagle-glow" : ""}>{t}{k < entry.tech!.split(", ").length - 1 ? ", " : ""}</span>
                    ))}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
