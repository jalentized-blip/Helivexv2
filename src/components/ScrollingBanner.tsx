'use client';

import { motion } from 'framer-motion';

const aminoAcidChains = [
  "Gly-Pro-Arg-Pro-Gly-Ser-Ala-Cys",
  "Ala-Val-Leu-Ile-Pro-Phe-Trp-Tyr",
  "Cys-Met-Ser-Thr-Asn-Gln-Asp-Glu",
  "Lys-Arg-His-Gly-Ala-Val-Leu-Ile",
  "Ser-Thr-Tyr-Cys-Met-Asn-Gln-Gln",
  "Pro-Phe-Trp-Lys-Arg-His-Asp-Glu",
  "Val-Leu-Ile-Gly-Ala-Ser-Thr-Cys",
];

export default function ScrollingBanner() {
  // Duplicate the array to ensure seamless looping
  const doubledChains = [...aminoAcidChains, ...aminoAcidChains];

  return (
    <div className="bg-primary overflow-hidden py-4 border-y border-white/10 select-none">
      <motion.div
        className="flex whitespace-nowrap gap-12 items-center"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {doubledChains.map((chain, index) => (
          <div key={index} className="flex items-center gap-6">
            <span className="text-white/90 text-sm font-mono font-bold tracking-widest">
              {chain}
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
