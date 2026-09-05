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

/**
 * Chapter header — a dossier-style section opening.
 * A monospace index row (number · label · trailing meta) sits on a hairline,
 * followed by a full-bleed display headline and an optional serif aside.
 */
export function SectionHeader({ index, icon, eyebrow, meta, titleId, title, aside }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.header
      className="section-head"
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: MOTION_EASE }}
    >
      <div className="section-head__meta">
        <div className="section-head__index">
          <b>{index}</b>
          <i aria-hidden="true" />
          <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
        </div>
        {meta && <span className="section-head__note">{meta}</span>}
      </div>
      <div className="section-head__body">
        <h2 id={titleId}>{title}</h2>
        {aside && <p className="section-head__aside">{aside}</p>}
      </div>
    </motion.header>
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
