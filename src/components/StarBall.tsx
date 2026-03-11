import { useProtocol } from "./ProtocolContext";

export const StarBall = ({ number, className = "" }: { number: number; className?: string }) => {
  const { protocolActive, foundBalls, findBall } = useProtocol();
  const found = foundBalls.includes(number);

  // If protocol isn't active, hide.
  // If tutorial ball (1) hasn't been found, hide all other balls.
  if (!protocolActive) return null;
  if (number > 1 && !foundBalls.includes(1)) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        findBall(number);
      }}
      disabled={found}
      className={`relative flex items-center justify-center shrink-0 w-6 h-6 rounded-full border border-[#B8860B] bg-[#B8860B]/10 backdrop-blur-sm transition-all duration-300 z-50 ${
        found ? 'opacity-0 scale-50 pointer-events-none' : 'hover:bg-[#B8860B]/20 hover:scale-110 shadow-[0_0_6px_rgba(184,134,11,0.5)] cursor-pointer cursor-crosshair animate-pulse'
      } ${className}`}
      title={found ? `Signal ${number} Acquired` : `Collect Signal ${number}`}
    >
      <div className="absolute inset-0 bg-[#B8860B] opacity-[0.15] rounded-full animate-ping pointer-events-none"></div>
      <span className="text-[10px] text-[#B8860B] font-bold font-mono tracking-tighter leading-none pointer-events-none mt-[1px] ml-[1px]">{number}★</span>
    </button>
  );
};
