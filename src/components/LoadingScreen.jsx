import { useEffect } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { MOTION_EASE } from '../content';

export function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const bar = useTransform(progress, [0, 100], [0, 1]);
  const count = useTransform(progress, (value) => String(Math.round(value)).padStart(3, '0'));

  useEffect(() => {
    const controls = animate(progress, 100, { duration: reduceMotion ? 0 : 0.85, ease: MOTION_EASE });
    return () => controls.stop();
  }, [progress, reduceMotion]);

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
      <div className="loader__bar"><motion.span style={{ scaleX: bar }} /></div>
      <div className="loader__bottom">
        <span>Web · API · VAPT · tooling</span>
        <span>Loading experience <b className="loader__count" aria-hidden="true"><motion.span>{count}</motion.span>%</b></span>
      </div>
    </motion.div>
  );
}
