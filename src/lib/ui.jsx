import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MOTION_EASE } from '../content';

export function Reveal({ children, className, delay = 0, amount = 0.18 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ icon: Icon, children }) {
  return (
    <div className="eyebrow">
      {Icon && <Icon size={14} aria-hidden="true" />}
      <span>{children}</span>
    </div>
  );
}

export function ExternalArrow() {
  return <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />;
}

export function ButtonLink({ href, children, className = 'button button--secondary', external = false, cursorLabel, ...props }) {
  return (
    <a
      href={href}
      className={className}
      data-cursor={cursorLabel || (external ? 'OPEN' : 'GO')}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
