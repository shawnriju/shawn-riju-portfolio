import { motion, AnimatePresence } from "framer-motion";
import { useProtocol } from "./ProtocolContext";

export const ShenronSummon = () => {
   const { summoning } = useProtocol();

   return (
      <AnimatePresence>
         {summoning && (
            <div className="fixed inset-0 z-[100] bg-[#111]/80 flex flex-col items-center justify-center pointer-events-none backdrop-blur-sm">
               
               <motion.div
                  initial={{ x: -1000, y: 500, scale: 0.5, opacity: 0 }}
                  animate={{ x: [ -500, 0, 500, 1000 ], y: [ 300, -50, 200, -500 ], scale: [0.8, 1.2, 1.5, 2], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3.5, ease: "easeInOut" }}
                  className="absolute"
               >
                  {/* Stylized geometric dragon head SVG */}
                  <svg width="600" height="600" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_20px_#22c55e]">
                     {/* Back Loop */}
                     <path d="M 200,350 C 50,350 50,150 200,150 C 350,150 350,250 200,250 C 150,250 150,300 200,300" stroke="#064e3b" strokeWidth="48" strokeLinecap="round"/>
                     <path d="M 200,350 C 50,350 50,150 200,150 C 350,150 350,250 200,250 C 150,250 150,300 200,300" stroke="#22c55e" strokeWidth="40" strokeLinecap="round"/>
                     <path d="M 200,350 C 50,350 50,150 200,150 C 350,150 350,250 200,250 C 150,250 150,300 200,300" stroke="#fde047" strokeWidth="15" strokeDasharray="15 15" strokeLinecap="round" transform="translate(10, 10)"/>

                     {/* Front Loop */}
                     <path d="M 200,300 C 250,300 250,200 200,200 C 100,200 100,50 200,50" stroke="#064e3b" strokeWidth="48" strokeLinecap="round"/>
                     <path d="M 200,300 C 250,300 250,200 200,200 C 100,200 100,50 200,50" stroke="#22c55e" strokeWidth="40" strokeLinecap="round"/>
                     <path d="M 200,300 C 250,300 250,200 200,200 C 100,200 100,50 200,50" stroke="#fde047" strokeWidth="15" strokeDasharray="15 15" strokeLinecap="round" transform="translate(10, 10)"/>

                     {/* Spikes */}
                     <path d="M 200,350 C 50,350 50,150 200,150 C 350,150 350,250 200,250 C 150,250 150,300 200,300" stroke="#14532d" strokeWidth="12" strokeDasharray="5 20" transform="translate(-20, -20)"/>
                     <path d="M 200,300 C 250,300 250,200 200,200 C 100,200 100,50 200,50" stroke="#14532d" strokeWidth="12" strokeDasharray="5 20" transform="translate(-20, -20)"/>

                     {/* Arms */}
                     <path d="M 120,200 L 70,220 M 70,220 L 50,200 M 70,220 L 50,240 M 70,220 L 40,220" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                     <circle cx="50" cy="200" r="3" fill="#fff" />
                     <circle cx="50" cy="240" r="3" fill="#fff" />
                     <circle cx="40" cy="220" r="3" fill="#fff" />

                     <path d="M 280,200 L 330,220 M 330,220 L 350,200 M 330,220 L 350,240 M 330,220 L 360,220" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                     <circle cx="350" cy="200" r="3" fill="#fff" />
                     <circle cx="350" cy="240" r="3" fill="#fff" />
                     <circle cx="360" cy="220" r="3" fill="#fff" />

                     {/* Head Base & Mane */}
                     <path d="M 200,40 L 150,0 L 160,40 L 120,20 L 150,60 L 110,70 L 160,80 Z" fill="#166534"/>
                     <path d="M 200,40 L 250,0 L 240,40 L 280,20 L 250,60 L 290,70 L 240,80 Z" fill="#166534"/>
                     <polygon points="200,20 160,80 240,80" fill="#22c55e" stroke="#064e3b" strokeWidth="2" strokeLinejoin="round"/>
                     <polygon points="160,80 240,80 220,130 180,130" fill="#22c55e" stroke="#064e3b" strokeWidth="2" strokeLinejoin="round"/>
                     <polygon points="180,100 220,100 210,140 190,140" fill="#15803d" stroke="#064e3b" strokeWidth="2" strokeLinejoin="round"/>

                     {/* Horns */}
                     <g stroke="#78350f" strokeLinecap="round">
                        <path d="M 180,40 Q 150,10 130,30" strokeWidth="12"/>
                        <path d="M 160,25 L 140,15" strokeWidth="6"/>
                        <path d="M 220,40 Q 250,10 270,30" strokeWidth="12"/>
                        <path d="M 240,25 L 260,15" strokeWidth="6"/>
                     </g>

                     {/* Eyes */}
                     <path d="M 175,85 L 190,95 L 175,95 Z" fill="#ef4444" />
                     <path d="M 225,85 L 210,95 L 225,95 Z" fill="#ef4444" />
                     <circle cx="185" cy="92" r="2" fill="#000" />
                     <circle cx="215" cy="92" r="2" fill="#000" />

                     {/* Whiskers */}
                     <g stroke="#6ee7b7" strokeWidth="3">
                        <path d="M 190,130 Q 80,180 120,300" />
                        <path d="M 210,130 Q 320,180 280,300" />
                     </g>
                  </svg>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 text-center space-y-4 max-w-2xl px-6"
               >
                  <motion.p className="text-[#FFD700] font-mono text-xl md:text-2xl font-bold tracking-widest drop-shadow-[0_0_10px_#FFD700]">
                     // [SYSTEM]: YOUR WISH HAS BEEN GRANTED.
                  </motion.p>
                  <motion.p 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
                     className="text-[#FFD700] font-mono text-lg md:text-xl tracking-wider"
                  >
                     // CONGRATULATIONS: SHENRON TROPHY UNLOCKED.
                  </motion.p>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
};
