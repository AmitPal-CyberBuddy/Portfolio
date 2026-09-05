import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FileText, Hammer, Target } from 'lucide-react';
import { MOTION_EASE } from '../content';
import { ButtonLink } from '../lib/ui';

const fadeIn = (reduceMotion, delay) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: MOTION_EASE },
});

export function Hero({ onOpenResume }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="top" className="hero section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <p className="hero__margin-text" aria-hidden="true">
        Authorized testing only · Evidence before assumptions · Local-first tooling · Est. 2024
      </p>

      <div className="shell shell--hero">
        <motion.div className="hero__mast" {...fadeIn(reduceMotion, 0.02)}>
          <span>Amit Pal — Application Security</span>
          <span>Associate Consultant (VAPT) · Ampcus Cyber</span>
          <span>Bengaluru, IN · Portfolio ’26</span>
        </motion.div>

        <motion.h1 id="hero-title" className="hero__title" {...fadeIn(reduceMotion, 0.1)}>
          <span>Identifying</span>
          <span>Vulnerabilities</span>
          <span><em className="outline">Before</em> <i>attackers&nbsp;do.</i></span>
        </motion.h1>

        <div className="hero__stage">
          <motion.div className="hero__copy" {...fadeIn(reduceMotion, 0.24)}>
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
              <ButtonLink href="#focus" className="button button--primary"><Target size={16} /> See how I work <ArrowUpRight size={15} /></ButtonLink>
              <ButtonLink href="#work"><Hammer size={16} /> Explore my tooling</ButtonLink>
              <button type="button" className="button button--ghost" onClick={onOpenResume} data-cursor="RESUME"><FileText size={16} /> Resume <ArrowUpRight size={15} /></button>
            </div>
          </motion.div>

          <motion.aside
            className="evidence-panel"
            aria-label="Example security testing evidence"
            initial={reduceMotion ? false : { opacity: 0, x: 28, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: 0.5 }}
            transition={{ duration: 0.85, delay: 0.38, ease: MOTION_EASE }}
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
          </motion.aside>
        </div>

        <motion.dl className="hero__index" aria-label="Key metrics" {...fadeIn(reduceMotion, 0.5)}>
          <div><dt>Hands-on labs</dt><dd>135<b>+</b></dd></div>
          <div><dt>Studies published</dt><dd>03</dd></div>
          <div><dt>Tools shipped</dt><dd>03</dd></div>
          <div><dt>Catalog tests</dt><dd>2,006</dd></div>
        </motion.dl>
      </div>

      <div className="hero__signal shell" aria-hidden="true"><span /> Scroll to explore</div>
    </section>
  );
}
