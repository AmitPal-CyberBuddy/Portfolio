import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
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

/**
 * Metrics that count up when scrolled into view. The animated digits are
 * aria-hidden — pair with a `.sr-only` final value so screen readers get one
 * stable announcement instead of every intermediate number.
 */
export function CountUp({ to, pad = 0, duration = 1.35, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduceMotion || !inView) return undefined;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: MOTION_EASE,
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration, delay]);

  // Reduced motion derives the final value at render — zero animation, zero effects.
  const shown = reduceMotion ? to : value;
  const rounded = Math.round(shown);
  const text = to >= 1000 ? rounded.toLocaleString('en-US') : String(rounded).padStart(pad, '0');
  return <span ref={ref} aria-hidden="true">{text}</span>;
}

const MAGNETIC_SPRING = { stiffness: 170, damping: 15, mass: 0.35 };

/**
 * Subtle magnetic hover for high-value controls (desktop fine-pointer only).
 * The pull uses spring physics so small pointer movements feel physical, and
 * it disengages entirely for touch, small screens, and reduced motion.
 */
export function Magnetic({ children, strength = 0.22, className = 'magnetic' }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, MAGNETIC_SPRING);
  const springY = useSpring(y, MAGNETIC_SPRING);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setCanHover(query.matches && window.innerWidth > 1024);
    sync();
    query.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      query.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  const active = canHover && !reduceMotion;

  return (
    <motion.span
      ref={ref}
      className={className}
      style={active ? { x: springX, y: springY } : undefined}
      onPointerMove={active ? (event) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      } : undefined}
      onPointerLeave={active ? () => { x.set(0); y.set(0); } : undefined}
    >
      {children}
    </motion.span>
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
          <motion.i
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: MOTION_EASE }}
            style={{ transformOrigin: 'left' }}
          />
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
