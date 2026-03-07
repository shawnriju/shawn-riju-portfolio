import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GoalExplosion = () => (
  <motion.div
    className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 2, delay: 0.5 }}
  >
    {/* Central flash */}
    <motion.div
      className="absolute w-20 h-20 bg-accent"
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 8, opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ borderRadius: 0 }}
    />
    {/* Particles */}
    {Array.from({ length: 20 }).map((_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      const dist = 150 + Math.random() * 200;
      return (
        <motion.div
          key={i}
          className="absolute w-3 h-3"
          style={{ backgroundColor: i % 3 === 0 ? "hsl(var(--nier-gold))" : i % 3 === 1 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8 + Math.random() * 0.5, ease: "easeOut" }}
        />
      );
    })}
    {/* Text */}
    <motion.p
      className="absolute text-3xl font-bold tracking-widest text-foreground"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
    >
      GOAL!
    </motion.p>
  </motion.div>
);

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowExplosion(true);
    setSubmitted(true);
    setTimeout(() => setShowExplosion(false), 3000);
  };

  return (
    <section id="contact" className="py-20">
      <AnimatePresence>{showExplosion && <GoalExplosion />}</AnimatePresence>

      <div className="max-w-lg mx-auto px-4">
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2 text-center">COMMUNICATIONS</p>
        <h2 className="text-2xl font-light tracking-wider text-center mb-12">OPEN CHANNEL</h2>

        {submitted ? (
          <motion.div
            className="nier-border p-8 bg-card text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-sm tracking-wider mb-2">TRANSMISSION RECEIVED</p>
            <p className="text-xs text-muted-foreground">Message delivered successfully. Stand by for response.</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="nier-border p-6 bg-card space-y-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <label className="text-[10px] tracking-widest text-muted-foreground block mb-1.5">CALLSIGN</label>
              <input
                type="text"
                required
                className="w-full bg-background border border-border px-3 py-2 text-xs focus:outline-none focus:border-foreground transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-muted-foreground block mb-1.5">FREQUENCY</label>
              <input
                type="email"
                required
                className="w-full bg-background border border-border px-3 py-2 text-xs focus:outline-none focus:border-foreground transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-muted-foreground block mb-1.5">MESSAGE</label>
              <textarea
                required
                rows={4}
                className="w-full bg-background border border-border px-3 py-2 text-xs focus:outline-none focus:border-foreground transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 border border-foreground bg-foreground text-primary-foreground text-xs tracking-widest hover:bg-transparent hover:text-foreground transition-all duration-300"
            >
              TRANSMIT
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
