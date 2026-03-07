import { motion, MotionValue } from "framer-motion";

interface ShawnChibiProps {
    armAngle: MotionValue<number>;
    className?: string;
}

const ShawnChibi = ({ armAngle, className }: ShawnChibiProps) => {
    return (
        <svg
            className={className}
            width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible', display: 'block' }}
        >
            <g id="chibi-character">
                {/* Legs/Pants (Orange Gi) */}
                <path d="M 30 85 C 20 85, 20 95, 50 95 L 50 95 C 80 95, 80 85, 70 85 Z" fill="#FF7300" />
                <path d="M 36 72 L 64 72 L 68 88 L 32 88 Z" fill="#FF7300" />

                {/* Blue Belt */}
                <path d="M 34 70 L 66 70 L 64 75 L 36 75 Z" fill="#203060" />
                <path d="M 45 70 L 51 77 L 46 85 L 42 75 Z" fill="#203060" />

                {/* Torso / Gi Top (Orange) */}
                <path d="M 37 58 C 34 68, 34 73, 36 73 L 64 73 C 66 73, 66 68, 63 58 Z" fill="#FF8C00" />

                {/* Blue Undershirt (V-neck) */}
                <path d="M 40 48 L 60 48 L 50 62 Z" fill="#203060" />

                {/* Left Sleeve (Orange) */}
                <path d="M 37 58 L 27 68 L 31 73 L 40 64 Z" fill="#FF7300" />
                {/* Right Sleeve (Orange) */}
                <path d="M 63 58 L 73 68 L 69 73 L 60 64 Z" fill="#FF7300" />

                {/* Left Arm (Resting on leg) */}
                <path d="M 29 70 L 22 82" stroke="#C58C66" strokeWidth="5" strokeLinecap="round" />
                <circle cx="22" cy="82" r="2.5" fill="#C58C66" />
                {/* Left Blue Wristband */}
                <path d="M 20 78 L 26 75 L 24 72 L 18 75 Z" fill="#203060" />

                {/* Neck */}
                <rect x="45" y="48" width="10" height="12" fill="#B37A56" rx="3" />

                {/* Head Base */}
                <circle cx="50" cy="36" r="21" fill="#C58C66" />

                {/* Ears */}
                <circle cx="29" cy="38" r="4" fill="#C58C66" />
                <circle cx="71" cy="38" r="4" fill="#C58C66" />

                {/* Hair - Dark wavy */}
                {/* Back hair */}
                <path d="M 28 35 C 24 15, 45 5, 50 5 C 55 5, 76 15, 72 35 C 74 25, 68 12, 50 12 C 32 12, 26 25, 28 35 Z" fill="#1A1918" />
                {/* Volume curls */}
                <circle cx="50" cy="14" r="9" fill="#1A1918" />
                <circle cx="41" cy="17" r="10" fill="#1A1918" />
                <circle cx="59" cy="17" r="10" fill="#1A1918" />
                <circle cx="33" cy="24" r="9" fill="#1A1918" />
                <circle cx="67" cy="24" r="9" fill="#1A1918" />

                {/* Front Fringe */}
                <path d="M 27 34 C 38 21, 46 25, 51 28 C 55 24, 63 21, 73 34 C 65 20, 35 20, 27 34 Z" fill="#1A1918" />

                {/* Eyebrows */}
                <path d="M 37 31 Q 41 29 45 32" stroke="#1A1918" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 63 31 Q 59 29 55 32" stroke="#1A1918" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Eyes (Happy squint) */}
                <path d="M 37 38 Q 41 35 45 38" stroke="#1A1918" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 63 38 Q 59 35 55 38" stroke="#1A1918" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Nose */}
                <path d="M 49 42 L 50 44 L 51 42" stroke="#A76D49" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                {/* Big Smile showing teeth */}
                <path d="M 42 46 Q 50 54 58 46 Q 50 50 42 46 Z" fill="#ffffff" stroke="#1A1918" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M 44 48 Q 50 52 56 48 Z" fill="#ff8aa8" />

                {/* Blush */}
                <circle cx="34" cy="44" r="4" fill="#ff6666" opacity="0.3" />
                <circle cx="66" cy="44" r="4" fill="#ff6666" opacity="0.3" />
            </g>

            {/* Dynamic Right Arm for Pointing */}
            {/* 
        The right shoulder originates roughly around x=68, y=65.
      */}
            <motion.g
                id="arm"
                style={{ transformOrigin: "68px 65px", rotate: armAngle }}
            >
                {/* Arm segment */}
                <path d="M 68 65 L 88 65" stroke="#C58C66" strokeWidth="5.5" strokeLinecap="round" />
                {/* Right Blue Wristband */}
                <rect x="81" y="62" width="4" height="6" fill="#203060" transform="rotate(-10 83 65)" />
                {/* Hand/fist */}
                <circle cx="89" cy="65" r="3.5" fill="#C58C66" />
                {/* Pointing Finger */}
                <path d="M 88 63.5 L 96 63.5" stroke="#C58C66" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
        </svg>
    );
};

export default ShawnChibi;
