import { motion } from "framer-motion";
import { StarBall } from "./StarBall";

const IntroSection = ({ eagleVision }: { eagleVision: boolean }) => (
    <section id="intro" className="py-20 section-enter">
        <div className="max-w-4xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">UNIT DESIGNATION</p>
                <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-2">SHAWN RIJU</h1>
                <h2 className="text-xl md:text-2xl font-light tracking-wide text-muted-foreground mb-4 uppercase">Software Engineer</h2>
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs tracking-widest text-muted-foreground uppercase">Status: Active</span>
                </div>

                <div className="w-24 h-px bg-border mx-auto mb-8" />

                <p className="text-sm leading-relaxed text-muted-foreground flex items-center justify-center flex-wrap gap-2 max-w-xl mx-auto mb-10">
                    <span>
                        Software engineer with professional experience in backend development and data systems, primarily using{" "}
                        <span className={`transition-colors duration-300 ${eagleVision ? "text-primary eagle-glow font-medium" : ""}`}>C#, .NET, and SQL</span>.
                        Graduated with an MSc in{" "}
                        <span className={`transition-colors duration-300 ${eagleVision ? "text-primary eagle-glow font-medium" : ""}`}>Advanced Computer Science (Cloud Computing)</span>, from the University of Leeds.
                    </span>
                    <StarBall number={2} />
                </p>

                <div className="flex flex-col gap-6 max-w-xl mx-auto mt-12 w-full text-left">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border/30 pb-4 group relative">
                        <div className={`absolute -inset-x-4 inset-y-0 bg-primary/5 opacity-0 transition-opacity duration-300 ${eagleVision ? "group-hover:opacity-100" : ""}`} />
                        <div className="flex items-center gap-3 mb-3 md:mb-0 relative z-10">
                            <div className="w-2 h-2 border border-foreground/50 flex items-center justify-center shrink-0">
                                <div className="w-1 h-1 bg-foreground/50 transition-transform group-hover:scale-0"></div>
                            </div>
                            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase whitespace-nowrap">Primary_Loadout</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-3 text-sm font-mono tracking-widest uppercase relative z-10 pl-5 md:pl-0 md:justify-end">
                            <span className={`transition-colors duration-300 ${eagleVision ? "eagle-glow text-primary font-medium" : ""}`}>C#</span>
                            <span className="text-muted-foreground/30 text-xs">//</span>
                            <span className={`transition-colors duration-300 ${eagleVision ? "eagle-glow text-primary font-medium" : ""}`}>.NET</span>
                            <span className="text-muted-foreground/30 text-xs">//</span>
                            <span className={`transition-colors duration-300 ${eagleVision ? "eagle-glow text-primary font-medium" : ""}`}>SQL</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border/30 pb-4 group relative">
                        <div className={`absolute -inset-x-4 inset-y-0 bg-primary/5 opacity-0 transition-opacity duration-300 ${eagleVision ? "group-hover:opacity-100" : ""}`} />
                        <div className="flex items-center gap-3 mb-3 md:mb-0 relative z-10">
                            <div className="w-2 h-2 border border-foreground/50 flex items-center justify-center shrink-0">
                                <div className="w-1 h-1 bg-foreground/50 transition-transform group-hover:scale-0"></div>
                            </div>
                            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase whitespace-nowrap">Secondary_Loadout</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-3 text-sm font-mono tracking-widest uppercase relative z-10 pl-5 md:pl-0 md:justify-end">
                            <span className={`transition-colors duration-300 ${eagleVision ? "eagle-glow text-primary font-medium" : ""}`}>Python</span>
                            <span className="text-muted-foreground/30 text-xs">//</span>
                            <span className={`transition-colors duration-300 ${eagleVision ? "eagle-glow text-primary font-medium" : ""}`}>React</span>
                            <span className="text-muted-foreground/30 text-xs">//</span>
                            <span className={`transition-colors duration-300 ${eagleVision ? "eagle-glow text-primary font-medium" : ""}`}>AI TOOLS</span>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    </section>
);

export default IntroSection;
