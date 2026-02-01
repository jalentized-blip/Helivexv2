'use client';

import { motion } from 'framer-motion';

const MoleculeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="20" r="6" stroke="currentColor" strokeWidth="2" />
    <line x1="16" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2" />
    <circle cx="36" cy="20" r="6" stroke="currentColor" strokeWidth="2" />
    <line x1="42" y1="20" x2="56" y2="10" stroke="currentColor" strokeWidth="2" />
    <circle cx="62" cy="10" r="6" stroke="currentColor" strokeWidth="2" />
    <line x1="68" y1="10" x2="82" y2="20" stroke="currentColor" strokeWidth="2" />
    <circle cx="88" cy="20" r="6" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PeptideChainIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20C10 20 20 10 30 20C40 30 50 20 50 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="20" r="3" fill="currentColor" />
    <circle cx="30" cy="20" r="3" fill="currentColor" />
    <circle cx="50" cy="20" r="3" fill="currentColor" />
    <path d="M60 20L75 20M85 20L100 20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="110" cy="20" r="5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const DNAHelixIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10C30 10 50 30 70 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 30C30 30 50 10 70 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="15" x2="25" y2="25" stroke="currentColor" strokeWidth="1" />
    <line x1="40" y1="12" x2="40" y2="28" stroke="currentColor" strokeWidth="1" />
    <line x1="55" y1="15" x2="55" y2="25" stroke="currentColor" strokeWidth="1" />
  </svg>
);

interface ScrollingBannerProps {
  backgroundColor?: string;
  textColor?: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function ScrollingBanner({
  backgroundColor = "bg-primary",
  textColor = "text-white/40",
  speed = 30,
  reverse = false,
  className = "",
}: ScrollingBannerProps) {
  // Array of icons to display
  const icons = [
    <MoleculeIcon key="m1" className="h-12 w-auto" />,
    <PeptideChainIcon key="p1" className="h-12 w-auto" />,
    <DNAHelixIcon key="d1" className="h-12 w-auto" />,
    <MoleculeIcon key="m2" className="h-12 w-auto rotate-180" />,
    <PeptideChainIcon key="p2" className="h-12 w-auto scale-x-[-1]" />,
    <DNAHelixIcon key="d2" className="h-12 w-auto opacity-70" />,
  ];

  // Duplicate for seamless loop
  const doubledIcons = [...icons, ...icons, ...icons, ...icons, ...icons, ...icons];

  return (
    <div className={`${backgroundColor} overflow-hidden py-6 border-y border-white/10 select-none ${className}`}>
      <motion.div
        className="flex whitespace-nowrap gap-24 items-center w-fit"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {doubledIcons.map((icon, index) => (
          <div key={index} className={`flex items-center gap-24 ${textColor} hover:text-white/80 transition-colors duration-500`}>
            {icon}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
