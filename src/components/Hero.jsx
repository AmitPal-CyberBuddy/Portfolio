import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FileText, Hammer, Target } from 'lucide-react';
import { MOTION_EASE } from '../content';
import { useFitText } from '../lib/hooks';
import { ButtonLink, CountUp, Magnetic } from '../lib/ui';

/* The loading screen sweeps up at ~1.05s — hero motion starts as it lifts,
   not behind it, so the entrance choreography is always visible. */
const ENTRANCE = 1.1;

const fadeIn = (reduceMotion, delay) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: MOTION_EASE },
});

/** Headline lines rise out of an overflow mask — the editorial entrance. */
function TitleLine({ children, reduceMotion, delay }) {
  return (
    <span className="hero__title-line">
      <motion.span
        className="hero__title-inner"
        data-fit-line
        initial={reduceMotion ? false : { y: '115%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.95, delay, ease: MOTION_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero({ onOpenResume }) {
  const reduceMotion = useReducedMotion();
  const titleRef = useRef(null);
  const tiltRef = useRef(null);
  useFitText(titleRef);

  // Pointer-driven 3D tilt + tracking glow on the evidence artifact.
  // Mouse-only: touch pointers keep the panel perfectly stable.
  const onTiltMove = (event) => {
    const el = tiltRef.current;
    if (reduceMotion || event.pointerType !== 'mouse' || !el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-py * 6.5).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(px * 8.5).toFixed(2)}deg`);
    el.style.setProperty('--glow-x', `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--glow-y', `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const onTiltReset = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section id="top" className="hero section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <p className="hero__margin-text" aria-hidden="true">
        Authorized testing only · Evidence before assumptions · Local-first tooling · Est. 2024
      </p>

      <div className="shell shell--hero">
        <motion.div className="hero__mast" {...fadeIn(reduceMotion, ENTRANCE + 0.02)}>
          <span>Amit Pal — Application Security</span>
          <span>Associate Consultant (VAPT) · Ampcus Cyber</span>
          <span>Bengaluru, IN · Portfolio ’26</span>
        </motion.div>

        <h1 id="hero-title" className="hero__title" ref={titleRef}>
          <TitleLine reduceMotion={reduceMotion} delay={ENTRANCE + 0.12}>Identifying</TitleLine>
          <TitleLine reduceMotion={reduceMotion} delay={ENTRANCE + 0.21}>Vulnerabilities</TitleLine>
          <TitleLine reduceMotion={reduceMotion} delay={ENTRANCE + 0.3}><em className="outline">Before</em> <i>attackers&nbsp;do.</i></TitleLine>
        </h1>

        <div className="hero__stage">
          <motion.div className="hero__copy" {...fadeIn(reduceMotion, ENTRANCE + 0.24)}>
            <p className="hero__lead">
              Manual and automated Web &amp; API penetration testing that turns logic and
              authorization gaps into reproducible proof-of-concept evidence — clear remediation
              guidance, reduced business risk.
            </p>
            <p className="hero__body">
              I build local-first tools to make authorized security testing clearer, faster, and
              easier to document.
            </p>
            <div className="tag-row hero__tags" aria-label="Specialties">
              <span>Web &amp; API security</span>
              <span>Manual &amp; automated</span>
              <span>Evidence-led reporting</span>
            </div>
            <div className="button-row hero__actions">
              <Magnetic>
                <ButtonLink href="#focus" className="button button--primary"><Target size={16} /> See how I work <ArrowUpRight size={15} /></ButtonLink>
              </Magnetic>
              <ButtonLink href="#work"><Hammer size={16} /> Explore my tooling</ButtonLink>
              <button type="button" className="button button--ghost" onClick={onOpenResume} data-cursor="RESUME"><FileText size={16} /> Resume <ArrowUpRight size={15} /></button>
            </div>
          </motion.div>

          <motion.aside
            className="evidence-panel"
            aria-label="Example security testing evidence"
            initial={reduceMotion ? false : { opacity: 0, x: 28, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: 0.5 }}
            transition={{ duration: 0.85, delay: ENTRANCE + 0.38, ease: MOTION_EASE }}
          >
            <div
              className="evidence-tilt"
              ref={tiltRef}
              onPointerMove={onTiltMove}
              onPointerLeave={onTiltReset}
            >
              <div className="evidence-panel__top">
                <span><span className="status-dot" /> Evidence capture</span>
                <span>INT-0417</span>
              </div>
              <div className="request-line"><b>GET</b><code>/api/admin/users</code></div>
              <div className="request-meta"><span>identity: user</span><span>session: valid</span><span>role: standard</span></div>
              <div className="evidence-compare">
                <div><span>Expected</span><code>403 Forbidden</code></div>
                <div className="evidence-compare__observed"><span>Observed</span><code>200 OK</code></div>
              </div>
              <div className="evidence-panel__result"><span>Authorization logic</span><strong>Gap found — reproducible</strong></div>
              <div className="evidence-panel__footer">
                <a href="#scenario" className="evidence-panel__case-link" data-cursor="CASE STUDY">
                  This capture, decoded — § 02 One finding, end to end <span aria-hidden="true">↓</span>
                </a>
              </div>
              <span className="evidence-scan" aria-hidden="true" />
            </div>
          </motion.aside>
        </div>

        <motion.dl className="hero__index" aria-label="Key metrics" {...fadeIn(reduceMotion, ENTRANCE + 0.5)}>
          <div><dt>Hands-on labs</dt><dd><CountUp to={135} delay={ENTRANCE + 0.58} /><b>+</b><span className="sr-only">135+</span></dd></div>
          <div><dt>Studies published</dt><dd><CountUp to={3} pad={2} delay={ENTRANCE + 0.66} /><span className="sr-only">3</span></dd></div>
          <div><dt>Tools shipped</dt><dd><CountUp to={3} pad={2} delay={ENTRANCE + 0.74} /><span className="sr-only">3</span></dd></div>
          <div><dt>Library checks · VAPT</dt><dd><CountUp to={178} delay={ENTRANCE + 0.82} /><b>+</b><span className="sr-only">178+</span></dd></div>
        </motion.dl>
      </div>

      <div className="hero__signal shell" aria-hidden="true"><span /> Scroll to explore</div>
    </section>
  );
}
