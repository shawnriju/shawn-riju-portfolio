import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { StarBall } from "./StarBall";

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
  paragraphs: string[];
  tech?: string;
}

const entries: TimelineEntry[] = [
  {
    title: "Software Engineer",
    org: "Mindtree",
    location: "Bangalore, India",
    period: "October 2020 — September 2022",
    paragraphs: [
      "Began my time at Mindtree by completing the **Orchard Training Program**, an intensive three-month program focused on core software development practices and enterprise technologies.",
      "Following training, I joined a client team working on backend services and a reporting platform for a US banking client. My work involved developing and optimizing **T-SQL queries**, **database structures**, and backend services built with **C#** and **ASP.NET MVC**, improving reporting pipelines and overall query performance.",
      "Working within an **Agile team**, I collaborated with developers, QA engineers, and stakeholders to deliver features, resolve production issues, and support deployments across multiple environments."
    ],
  },
  {
    title: "Digital Projects Coordinator — Communications & Marketing",
    org: "Leeds University Union",
    location: "Leeds, United Kingdom",
    period: "March 2025 - October 2025",
    paragraphs: [
      "Worked within the MarComms team at Leeds University Union to coordinate digital campaigns and projects across the organisation. As part of this role, I collaborated with stakeholders from retail outlets, the student job agency, events teams, and internal IT staff to deliver initiatives across multiple digital platforms.",
      "This involved working with the IT team during the planning and revamp of the student job agency’s web portal, **helping improve accessibility** while keeping the design aligned with brand guidelines. I built surveys using **SurveyMonkey** and automated parts of the feedback workflow with **Zapier**, and also helped non-technical colleagues extract and adapt **HTML snippets** for sponsored content used in **Mailchimp newsletters**.",
      "My contributions to the team were recognised with the Leeds University Union **Shining Star** Award, a peer-nominated recognition for impactful work within the marketing team."
    ],
  },
  {
    title: "Catering Assistant → Catering Supervisor (Part-time)",
    org: "Old Bar, Leeds University Union",
    location: "Leeds, United Kingdom",
    period: "May 2023 — March 2025",
    paragraphs: [
      "Started as a Catering Assistant at Old Bar and was later promoted to **Catering Supervisor**, taking on responsibility for coordinating kitchen operations during busy service periods.",
      "The role involved managing kitchen teams through **high-volume shifts**, ensuring orders were delivered efficiently while maintaining hygiene standards, proper kitchen practices, and strong customer satisfaction. The fast-paced environment required constant **coordination, communication, and quick problem-solving**.",
      "My work and reliability in the role were recognised when I was voted **Best Catering Assistant of the Year** (2024)."
    ],
  },
  {
    title: "International Welcome Team Assistant (Part-time)",
    org: "University of Leeds",
    location: "Leeds, United Kingdom",
    period: "June 2023 — June 2024",
    paragraphs: [
      "Supported the International Welcome Team in organising and running **orientation events** designed to help new international students settle into university life.",
      "The role involved coordinating activities, assisting large groups of students during events, and helping create a welcoming environment for students from **diverse cultural and academic backgrounds**.",
      "Working with students from many different countries helped strengthen my **communication, coordination, and people-facing skills**, while also improving my cultural awareness and ability to work effectively in diverse environments."
    ],
  },
];

const TimelineItem = ({ entry, i, eagleVision }: { entry: TimelineEntry; i: number; eagleVision: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
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

      <div
        className="nier-border p-5 bg-card cursor-pointer group hover:bg-secondary/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
          <div>
            <h3 className="text-sm font-semibold tracking-wider group-hover:text-primary transition-colors flex items-center gap-2">
              {entry.title}
              {entry.title.includes("Software Engineer") && <StarBall number={3} />}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{entry.org} — {entry.location}</p>
          </div>
          <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
            <span className="text-xs text-muted-foreground shrink-0">{entry.period}</span>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-3 mt-4 pt-2 border-t border-border/30">
                {entry.paragraphs.map((paragraph, j) => (
                  <p key={j} className="text-sm leading-relaxed text-foreground/90">
                    {paragraph.split("**").map((part, index) =>
                      index % 2 === 1 ? (
                        <span key={index} className={`font-semibold transition-colors duration-300 ${eagleVision ? "eagle-glow text-primary" : "text-foreground"}`}>
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </p>
                ))}
                {entry.title.includes("Software Engineer") && (
                  <div className="flex justify-end pt-2">
                    <StarBall number={4} />
                  </div>
                )}
              </div>
              {entry.tech && (
                <p className="text-xs mt-4 pt-3 border-t border-border/50 text-foreground/70">
                  <span className="text-muted-foreground">Tech: </span>
                  {entry.tech.split(", ").map((t, k) => (
                    <span key={k} className={eagleVision ? "eagle-glow text-foreground" : "text-foreground"}>{t}{k < entry.tech!.split(", ").length - 1 ? ", " : ""}</span>
                  ))}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.div
            className="flex justify-center items-center w-full -mb-2 mt-1 h-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-1 text-muted-foreground/60">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="text-[8px]"
                  animate={{
                    y: [0, 2, 3, 2, 0],
                    opacity: [0.3, 0.8, 1, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                >
                  ▼
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};

const ExperienceTimeline = ({ eagleVision }: { eagleVision: boolean }) => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2 text-center">DATA_LOG: THE GRAND LINE VOYAGE</p>
        <h2 className="text-2xl font-light tracking-wider text-center mb-12">EXPERIENCE</h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {/* Technical Experience Section */}
          <div className="mb-8 pl-14">
            <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">// Technical Experience</h3>
          </div>
          {entries.slice(0, 2).map((entry, i) => (
            <TimelineItem key={i} entry={entry} i={i} eagleVision={eagleVision} />
          ))}

          {/* Additional Professional Experience Section */}
          <div className="mt-0 mb-8 pl-14">
            <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">// Additional Professional Experience</h3>
          </div>
          {entries.slice(2).map((entry, i) => (
            <TimelineItem key={i + 2} entry={entry} i={i + 2} eagleVision={eagleVision} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
