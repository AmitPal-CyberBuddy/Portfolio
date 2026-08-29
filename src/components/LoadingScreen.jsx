import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { MOTION_EASE } from '../content';

export function LoadingScreen() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%', transition: { duration: 0.7, ease: MOTION_EASE } }}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loader__top"><span><ShieldCheck size={15} /> Amit Pal · application security</span><span>2026</span></div>
      <div className="loader__main"><span>Amit</span><strong>Pal</strong><em>Test deliberately · validate impact.</em></div>
      <div className="loader__bar"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.85, ease: MOTION_EASE }} /></div>
      <div className="loader__bottom"><span>Web · API · VAPT · tooling</span><span>Loading experience</span></div>
    </motion.div>
  );
}
