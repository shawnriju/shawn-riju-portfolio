import { useState, useEffect } from "react";

const MobMeter = () => {
  const [percent, setPercent] = useState(0);
  const [isMob, setIsMob] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));
      setPercent(scrolled);
      if (scrolled >= 100 && !isMob) {
        setIsMob(true);
        setTimeout(() => setIsMob(false), 2000);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMob]);

  return (
    <div className="fixed bottom-4 left-4 z-40 select-none">
      <div className="nier-border bg-card px-3 py-2 text-center min-w-[60px]">
        <p className="text-[9px] tracking-widest text-muted-foreground mb-0.5">MOB</p>
        <p className={`text-lg font-bold tabular-nums ${isMob ? "mob-100" : ""} ${percent >= 100 ? "text-accent" : ""}`}>
          {percent}%
        </p>
      </div>
    </div>
  );
};

export default MobMeter;
