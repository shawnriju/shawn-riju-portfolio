import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Download } from "lucide-react";

const LinkedInIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);


const textContent = [
  {
    header: "// GEOGRAPHIC_ORIGIN: >",
    body: "So I’m originally from Kerala, India, but I was born and raised in Bahrain. I was there until high school, before moving back to Kerala to finish my studies and go on to complete my bachelor’s. Even though I say I’m from Kerala, my permanent address is actually in Ahmedabad, Gujarat (due to family origins). Now, add in the few years I spent in the UK, and I’ve realized I have a pretty broad view of what 'home' actually means to me. I always thought this mix of cultures was a slightly confusing yet interesting part of my background, so I wanted to share it here."
  },
  {
    header: "// INTERESTS: >",
    body: "I’ve been a huge gamer since I was a kid, and that’s honestly where my interest in computers began. I was fascinated by how games worked, and that curiosity eventually led me into a career in software. You might have probably noticed the Nier: Automata influence here; this portfolio is a direct tribute to the game's aesthetic, with a few other anime and gaming easter eggs scattered around for you to find.\n\nEven though I spend a lot of time behind a screen, I’ve always enjoyed staying active. Whether it is sports (Badminton, Basketball, Football), bouldering, or just working out to stay fit, I’ve always believed that it is very important to keep the body healthy and active."
  },
  {
    header: "// OPERATIONAL_MINDSET: >",
    body: "I am naturally empathetic and people-oriented. I thrive in supportive, team-based environments where ideas are shared openly. I’ve always found that I do my best work when I'm part of a positive team culture, where I feel the most motivated to contribute and help everyone as best as I can."
  },
  {
    header: "// JOURNEY_TIMELINE: >",
    body: "After my B.Tech, I spent two years as a Software Engineer at Mindtree. Working remotely during the COVID period allowed me to reflect on my goals, leading me to pursue a Master’s at the University of Leeds. After graduating and working in the UK for a while, I have returned to India to explore new opportunities, continuing to learn and improve myself."
  },
  {
    header: "// FINAL_TRANSMISSION: >",
    body: "If you’ve made it this far, thank you so much for exploring my journey. Whether you want to discuss potential opportunities or just talk about the latest games, anime, or tech. \n- feel free to reach out."
  }
];

// Pre-calculate stagger delays for sequential streaming effect
let cumulativeDelay = 0.3; // Give the collapse animation time to open
const sectionsWithDelay = textContent.map((section) => {
  const words = section.body.split(/(\s+)/); // Preserve spaces and newlines
  const myDelay = cumulativeDelay;
  cumulativeDelay += (words.length * 0.005) + 0.25; // 7.5ms per word/space + 250ms pause between sections
  return { ...section, words, myDelay };
});

const ContactSection = () => {
  const [logOpen, setLogOpen] = useState(false);

  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2 text-center">COMMUNICATIONS</p>
        <h2 className="text-2xl font-light tracking-wider text-center mb-12">OPEN CHANNEL</h2>

        <div className="nier-border p-6 md:p-8 bg-card relative">

          {/* Intro Copy */}
          <div className="mb-8">
            <p className="font-mono text-sm leading-relaxed text-foreground/80">
              That’s all for the main portfolio! I really hope you enjoyed exploring the site and hunting for all the easter eggs (assuming you found them all). If you’re interested in learning a bit more about me personally, I’ve put together a section here covering my background and interests.
            </p>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setLogOpen(!logOpen)}
            className="text-xs md:text-sm tracking-widest font-bold border border-foreground/50 px-5 py-2 hover:bg-foreground hover:text-background transition-colors duration-300 mb-6"
          >
            {logOpen ? "[- CLOSE_PERSONAL_LOG ]" : "[+ ACCESS_PERSONAL_LOG ]"}
          </button>

          {/* Collapsible Personal Log */}
          <AnimatePresence>
            {logOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-border/50 pt-8 pb-4">

                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="text-foreground font-mono text-sm md:text-base font-bold mb-8"
                  >
                    // ACCESSING_PERSONAL_LOG: SHAWN_RIJU
                  </motion.p>

                  {sectionsWithDelay.map((section, idx) => (
                    <div key={idx} className="mb-8">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: section.myDelay }}
                        className="text-foreground font-mono text-xs md:text-sm font-bold mb-3"
                      >
                        {section.header}
                      </motion.p>

                      {/* Human Contrast Body (Typewriter effect using word stagger) */}
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.006, delayChildren: section.myDelay + 0.1 } }
                        }}
                        className="font-serif text-[15px] md:text-base leading-relaxed text-foreground/90 whitespace-pre-wrap"
                      >
                        {section.words.map((word, wIdx) => (
                          <motion.span
                            key={wIdx}
                            variants={{
                              hidden: { opacity: 0 },
                              visible: { opacity: 1 }
                            }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  ))}

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: cumulativeDelay }}
                    className="text-foreground font-mono text-sm md:text-base font-bold mt-12 mb-4"
                  >
                    [ LOG_END ]
                  </motion.p>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Persistent Contact Links */}
          <div className={`mt-4 pt-6 flex flex-wrap gap-4 sm:gap-8 border-border/50 ${!logOpen ? "border-t" : ""}`}>
            <a
              href="mailto:shawnriju@gmail.com"
              className="group flex items-center gap-1.5 text-xs md:text-sm tracking-widest font-mono font-bold transition-all duration-300 hover:text-[hsl(var(--ssj-gold))] hover:drop-shadow-[0_0_8px_hsl(var(--ssj-gold)/0.8)]"
            >
              <span>[</span>
              <Mail size={16} className="transition-transform group-hover:scale-110" />
              <span>EMAIL_UPLINK ]</span>
            </a>
            <a
              href="https://linkedin.com/in/shawnriju"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs md:text-sm tracking-widest font-mono font-bold transition-all duration-300 hover:text-[hsl(var(--ssj-gold))] hover:drop-shadow-[0_0_8px_hsl(var(--ssj-gold)/0.8)]"
            >
              <span>[</span>
              <LinkedInIcon size={16} className="transition-transform group-hover:scale-110" />
              <span>LINKEDIN ]</span>
            </a>
            <a
              href="https://github.com/shawnriju"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs md:text-sm tracking-widest font-mono font-bold transition-all duration-300 hover:text-[hsl(var(--ssj-gold))] hover:drop-shadow-[0_0_8px_hsl(var(--ssj-gold)/0.8)]"
            >
              <span>[</span>
              <Github size={16} className="transition-transform group-hover:scale-110" />
              <span>GITHUB_SRC ]</span>
            </a>
            <a
              href="/Resume_Shawn_BE.pdf"
              download="Shawn_Riju_Resume.pdf"
              className="group flex items-center gap-1.5 text-xs md:text-sm tracking-widest font-mono font-bold transition-all duration-300 hover:text-[hsl(var(--ssj-gold))] hover:drop-shadow-[0_0_8px_hsl(var(--ssj-gold)/0.8)]"
            >
              <span>[</span>
              <Download size={16} className="transition-transform group-hover:scale-110" />
              <span>EXPORT_RESUME ]</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
