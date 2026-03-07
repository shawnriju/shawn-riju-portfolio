import { motion } from "framer-motion";

const AboutSection = ({ eagleVision }: { eagleVision: boolean }) => (
  <section id="about" className="py-20 section-enter">
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">UNIT DESIGNATION</p>
        <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-6">SHAWN RIJU</h1>
        <div className="w-24 h-px bg-border mx-auto mb-6" />
        <p className="text-sm leading-relaxed text-muted-foreground max-w-xl mx-auto mb-4">
          Software Engineer with experience across{" "}
          <span className={eagleVision ? "eagle-glow" : ""}>AI systems</span>, data platforms, and marketing operations.
          Armed with an M.Sc. in{" "}
          <span className={eagleVision ? "eagle-glow" : ""}>Advanced Computer Science (Cloud Computing)</span>{" "}
          from the University of Leeds.
        </p>
        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-muted-foreground">
          <a href="mailto:shawnriju@gmail.com" className="hover:text-foreground transition-colors border-b border-border pb-0.5">
            shawnriju@gmail.com
          </a>
          <a href="https://linkedin.com/in/shawnriju" target="_blank" rel="noopener" className="hover:text-foreground transition-colors border-b border-border pb-0.5">
            LinkedIn
          </a>
          <a href="https://github.com/shawnriju" target="_blank" rel="noopener" className="hover:text-foreground transition-colors border-b border-border pb-0.5">
            GitHub
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
