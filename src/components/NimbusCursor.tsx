import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

let particleId = 0;

const NimbusCursor = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const timeoutRef = useRef<number>(0);
  const lastEmit = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setIsMoving(false), 150);

      const now = Date.now();
      if (now - lastEmit.current > 40) {
        lastEmit.current = now;
        const id = particleId++;
        setParticles((prev) => [
          ...prev.slice(-20),
          { id, x: e.clientX, y: e.clientY, opacity: 0.6, scale: 1 },
        ]);

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 600);
      }
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", handleMove);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMove);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Particle trail */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full nimbus-particle"
          style={{
            left: p.x - 4,
            top: p.y - 4,
            width: 8,
            height: 8,
            background: `hsl(var(--nier-gold) / 0.5)`,
          }}
        />
      ))}

      {/* Cloud cursor */}
      <svg
        width="32"
        height="24"
        viewBox="0 0 28 20"
        className="absolute transition-opacity duration-150"
        style={{
          left: pos.x - 16,
          top: pos.y - 12,
          opacity: isMoving ? 1 : 0.3,
        }}
      >
        <ellipse cx="14" cy="12" rx="12" ry="7" fill="hsl(var(--nier-gold))" opacity="0.9" />
        <ellipse cx="8" cy="10" rx="6" ry="5" fill="hsl(var(--nier-gold))" opacity="0.8" />
        <ellipse cx="20" cy="10" rx="6" ry="5" fill="hsl(var(--nier-gold))" opacity="0.8" />
        <ellipse cx="14" cy="8" rx="8" ry="5" fill="hsl(var(--nier-gold))" />
        <path d="M6 12 Q10 9 14 12 Q18 15 22 12" stroke="hsl(var(--nier-dark))" strokeWidth="0.5" fill="none" opacity="0.4" />
      </svg>
    </div>
  );
};

export default NimbusCursor;
