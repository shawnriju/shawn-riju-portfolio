import { AnimatePresence, motion } from "framer-motion";

interface SmokeTransitionProps {
  isActive: boolean;
}

const SmokeTransition = ({ isActive }: SmokeTransitionProps) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-muted-foreground/20"
              style={{
                width: 40 + Math.random() * 80,
                height: 40 + Math.random() * 80,
              }}
              initial={{
                opacity: 0.7,
                scale: 0.3,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
              }}
              animate={{
                opacity: 0,
                scale: 1.5 + Math.random(),
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.3,
                ease: "easeOut",
                delay: Math.random() * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmokeTransition;
