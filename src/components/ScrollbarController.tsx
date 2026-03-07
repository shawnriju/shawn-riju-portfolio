import { useEffect } from "react";

const ScrollbarController = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "scrollbar-dynamic";

    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

      let color: string;
      if (progress < 0.25) {
        color = "hsl(var(--muted-foreground))"; // Gray - Base
      } else if (progress < 0.5) {
        color = "hsl(var(--nier-gold))"; // Gold - SSJ
      } else if (progress < 0.75) {
        color = "hsl(var(--ssb-blue))"; // Blue - SSB
      } else {
        color = "hsl(var(--ui-white))"; // White - Ultra Instinct
      }

      style.textContent = `::-webkit-scrollbar-thumb { background: ${color} !important; }`;
    };

    document.head.appendChild(style);
    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      style.remove();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return null;
};

export default ScrollbarController;
