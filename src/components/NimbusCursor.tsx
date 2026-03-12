import { useEffect, useRef, useCallback, useState } from "react";
import ShawnChibi from "./ShawnChibi";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useAnimationFrame,
} from "framer-motion";

/**
 * NimbusCursor — High-fidelity 2.5D golden cloud cursor
 *
 * Features:
 * - Multi-layered SVG cloud with Gold→DarkOrange gradient + Ki aura glow
 * - Real-time following (no lag) combined with decorative physics
 * - Dynamic fading spark trail when moving rapidly
 * - Continuous sine-wave Y-axis bobbing for floating feel
 * - 3D tilt (rotateX/rotateY) based on movement velocity
 * - Idle state: scale down + pulsing glow after 1s stationary
 * - Moving state: "poof" back to full size
 * - pointer-events: none so buttons stay clickable
 * - Respects prefers-reduced-motion
 */

interface Spark {
  id: number;
  x: number;
  y: number;
  scale: number;
  vx: number;
  vy: number;
}

const SPRING_CONFIG = { damping: 35, stiffness: 90, mass: 1.2 };
const TILT_SPRING = { damping: 20, stiffness: 120, mass: 0.8 };
const BOB_AMPLITUDE = 6;
const BOB_FREQUENCY = 0.002;
const IDLE_TIMEOUT = 1000;
const CLOUD_SIZE = 40;
const HALF = CLOUD_SIZE / 2;

let sparkId = 0;

const NimbusCursor = () => {
  // Raw mouse position (real-time)
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Still use springs, but ONLY for calculating velocity and trailing effects, NOT for the main cloud position.
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  // Spark trail state
  const [sparks, setSparks] = useState<Spark[]>([]);

  // Hover state detection
  const [isHovering, setIsHovering] = useState(false);

  // Character pointing angle
  const pointerAngle = useMotionValue(0);
  const springPointerAngle = useSpring(pointerAngle, { damping: 20, stiffness: 200 });

  // Velocity tracking for tilt
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  // Tilt springs
  const tiltX = useSpring(velocityY, TILT_SPRING); // velY drives rotateX
  const tiltY = useSpring(velocityX, TILT_SPRING); // velX drives rotateY

  // Clamp tilt (rotateX: ±15°, rotateY: ±20°)
  const rotateX = useTransform(tiltX, [-800, 800], [15, -15]);
  const rotateY = useTransform(tiltY, [-800, 800], [-20, 20]);

  // Bobbing offset (continuously animated)
  const bobY = useMotionValue(0);

  // Ki focal dot state
  const kiFocalScale = useSpring(1, { damping: 20, stiffness: 300 });
  const kiFocalOpacity = useSpring(0.85, { damping: 15, stiffness: 200 });

  // Idle state controls
  const idleScale = useMotionValue(1);
  const idleGlow = useMotionValue(0.6);
  const springScale = useSpring(idleScale, { damping: 15, stiffness: 200 });
  const springGlow = useSpring(idleGlow, { damping: 12, stiffness: 80 });

  // Refs
  const lastMoveTime = useRef(Date.now());
  const prevPos = useRef({ x: -200, y: -200 });
  const idleTimerRef = useRef<number>(0);
  const isIdleRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const pulseAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const sparkIntervalRef = useRef(0);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const enterIdle = useCallback(() => {
    if (isIdleRef.current) return;
    isIdleRef.current = true;
    idleScale.set(0.75);

    // Start gentle glow pulse loop
    const doPulse = () => {
      pulseAnimRef.current = animate(idleGlow, [0.3, 0.8, 0.3], {
        duration: 2,
        ease: "easeInOut",
        onComplete: () => {
          if (isIdleRef.current) doPulse();
        },
      });
    };
    doPulse();
  }, [idleScale, idleGlow]);

  const exitIdle = useCallback(() => {
    if (!isIdleRef.current) return;
    isIdleRef.current = false;
    pulseAnimRef.current?.stop();
    idleScale.set(1.15); // "poof" overshoot
    idleGlow.set(0.8);
    // Settle back to normal
    setTimeout(() => {
      idleScale.set(1);
      idleGlow.set(0.6);
    }, 180);
  }, [idleScale, idleGlow]);

  // Mouse tracking
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(now - lastMoveTime.current, 1);
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;

      // Velocity (px/frame-ish)
      const vx = (dx / dt) * 16;
      const vy = (dy / dt) * 16;
      const speed = Math.sqrt(vx * vx + vy * vy);

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      velocityX.set(vx * 50);
      velocityY.set(vy * 50);

      prevPos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = now;

      // Generate Trail Sparks if moving fast enough
      if (speed > 5 && now - sparkIntervalRef.current > 30) {
        sparkIntervalRef.current = now;
        const id = sparkId++;
        setSparks((prev) => [
          ...prev.slice(-15),
          {
            id,
            x: e.clientX - HALF + 12 + Math.random() * 20,
            y: e.clientY - HALF + 12 + Math.random() * 20,
            scale: Math.random() * 0.5 + 0.5,
            vx: -vx * 0.2 + (Math.random() - 0.5) * 2,
            vy: -vy * 0.2 + (Math.random() - 0.5) * 2
          },
        ]);

        setTimeout(() => {
          setSparks((prev) => prev.filter((p) => p.id !== id));
        }, 600);
      }

      // Check for hover over interactive elements
      const target = e.target as HTMLElement;
      let clickableEl: HTMLElement | null = null;
      if (target && typeof target.closest === 'function') {
        clickableEl = target.closest(
          'a, button, input, select, textarea, label, [role="button"], .cursor-pointer'
        ) as HTMLElement | null;
        setIsHovering(!!clickableEl);
      }

      // Dynamic Pointing Calculation
      if (clickableEl) {
        const rect = clickableEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const targetDx = cx - e.clientX;
        const targetDy = cy - e.clientY;
        const angle = Math.atan2(targetDy, targetDx) * (180 / Math.PI);

        // Prevent spring rotation jumping by adjusting the angle relative to current
        const currentAngle = pointerAngle.get();
        const diff = ((angle - currentAngle + 180) % 360) - 180;
        pointerAngle.set(currentAngle + diff);
      } else {
        // Return to default resting angle gracefully (0)
        const currentAngle = pointerAngle.get();
        const diff = ((0 - currentAngle + 180) % 360) - 180;
        pointerAngle.set(currentAngle + diff);
      }

      // Exit idle on movement
      exitIdle();

      // Reset idle timer
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        velocityX.set(0);
        velocityY.set(0);
        enterIdle();
      }, IDLE_TIMEOUT);
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMove);
      clearTimeout(idleTimerRef.current);
      pulseAnimRef.current?.stop();
    };
  }, [mouseX, mouseY, velocityX, velocityY, enterIdle, exitIdle]);

  // Continuous bobbing via sine wave
  useAnimationFrame((t) => {
    if (reducedMotionRef.current) {
      bobY.set(0);
      return;
    }
    bobY.set(Math.sin(t * BOB_FREQUENCY) * BOB_AMPLITUDE);
  });

  // React to hover: brighten + scale the focal dot on interactive elements
  useEffect(() => {
    if (isHovering) {
      kiFocalScale.set(1.6);
      kiFocalOpacity.set(1);
    } else {
      kiFocalScale.set(1);
      kiFocalOpacity.set(0.85);
    }
  }, [isHovering, kiFocalScale, kiFocalOpacity]);

  // Composite Y from raw mouse + bob (for zero lag main cloud)
  const compositeY = useTransform(
    [mouseY, bobY],
    ([sy, by]: number[]) => (sy as number) + (by as number) - HALF
  );
  const compositeX = useTransform(mouseX, (v) => v - HALF);

  // Glow filter opacity
  const glowOpacity = useTransform(springGlow, (v) => v);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999 }}
    >

      {/* Spark Trail */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ opacity: 0.8, scale: spark.scale, x: spark.x, y: spark.y }}
          animate={{
            opacity: 0,
            scale: 0,
            x: spark.x + spark.vx * 20,
            y: spark.y + spark.vy * 20 + 20 // drift down slightly
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FFD700",
            boxShadow: "0 0 8px #FF8C00",
          }}
        />
      ))}

      {/* Main Cloud */}
      <motion.div
        style={{
          position: "absolute",
          left: compositeX,
          top: compositeY,
          scale: springScale,
          rotateX,
          rotateY,
          transformPerspective: 600,
          willChange: "transform",
        }}
      >
        {/* Ki Aura outer glow */}
        <motion.div
          animate={{
            opacity: isHovering && !isIdleRef.current ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: -12,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(255, 215, 0, 0.6) 0%, rgba(255, 140, 0, 0.3) 50%, transparent 70%)",
            filter: "blur(8px)",
            opacity: glowOpacity,
          }}
        />

        {/* Character Model */}
        <motion.div
          style={{
            position: "absolute",
            width: 32,
            height: 32,
            left: "50%",
            bottom: "55%", // Sits on top center lobe
            x: "-50%",
            pointerEvents: "none",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))",
            zIndex: 10
          }}
        >
          <ShawnChibi armAngle={springPointerAngle} />
        </motion.div>

        {/* Multi-layered SVG Cloud */}
        <svg
          width={CLOUD_SIZE}
          height={CLOUD_SIZE}
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            {/* Primary gold gradient */}
            <linearGradient id="nimbus-grad-main" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="40%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>

            {/* Highlight gradient for top lobe */}
            <radialGradient
              id="nimbus-highlight"
              cx="0.4"
              cy="0.3"
              r="0.5"
            >
              <stop offset="0%" stopColor="#FFF5CC" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>

            {/* Underside shadow gradient */}
            <linearGradient
              id="nimbus-shadow"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#FF8C00" stopOpacity="0" />
              <stop offset="100%" stopColor="#CC6600" stopOpacity="0.5" />
            </linearGradient>

            {/* Ki Aura drop-shadow filter */}
            <filter id="nimbus-ki-aura" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feFlood floodColor="#FFD700" floodOpacity="0.4" result="gold" />
              <feComposite in="gold" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#nimbus-ki-aura)">
            {/* Layer 1: Base / bottom cloud mass */}
            <ellipse
              cx="28"
              cy="34"
              rx="22"
              ry="10"
              fill="url(#nimbus-grad-main)"
              opacity="0.85"
            />

            {/* Layer 2: Underside shadow for depth */}
            <ellipse
              cx="28"
              cy="37"
              rx="18"
              ry="6"
              fill="url(#nimbus-shadow)"
              opacity="0.6"
            />

            {/* Layer 3: Left lobe */}
            <ellipse
              cx="17"
              cy="28"
              rx="11"
              ry="10"
              fill="url(#nimbus-grad-main)"
              opacity="0.9"
            />

            {/* Layer 4: Right lobe */}
            <ellipse
              cx="39"
              cy="28"
              rx="11"
              ry="10"
              fill="url(#nimbus-grad-main)"
              opacity="0.9"
            />

            {/* Layer 5: Top center lobe (highest point) */}
            <ellipse
              cx="28"
              cy="22"
              rx="14"
              ry="11"
              fill="url(#nimbus-grad-main)"
            />

            {/* Layer 6: Top highlight for 2.5D shine */}
            <ellipse
              cx="25"
              cy="19"
              rx="10"
              ry="7"
              fill="url(#nimbus-highlight)"
            />

            {/* Layer 7: Small accent puff — top-left */}
            <ellipse
              cx="14"
              cy="24"
              rx="6"
              ry="5"
              fill="#FFD700"
              opacity="0.5"
            />

            {/* Layer 8: Small accent puff — top-right */}
            <ellipse
              cx="42"
              cy="24"
              rx="6"
              ry="5"
              fill="#FFD700"
              opacity="0.5"
            />

            {/* Layer 9: Inner contour line for definition */}
            <path
              d="M10 32 Q16 25 22 28 Q28 18 34 28 Q40 25 46 32"
              stroke="#CC6600"
              strokeWidth="0.6"
              fill="none"
              opacity="0.3"
            />

            {/* Layer 10: Top highlights line */}
            <path
              d="M18 21 Q23 15 28 18 Q33 15 38 21"
              stroke="#FFF5CC"
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
            />
          </g>
        </svg>
      </motion.div>

      {/* Ki Focal Dot — the true click hotspot, rendered on top of the cloud */}
      <motion.div
        style={{
          position: "absolute",
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FFF 40%, #FFD700 100%)",
          scale: kiFocalScale,
          opacity: kiFocalOpacity,
          boxShadow: "0 0 6px 2px rgba(255, 215, 0, 0.7), 0 0 12px 4px rgba(255, 140, 0, 0.4)",
          zIndex: 10,
          willChange: "transform, opacity",
        }}
      />
    </motion.div>
  );
};

export default NimbusCursor;
