import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  FileText,
  Hammer,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { MOTION_EASE } from '../content';
import { ButtonLink, Eyebrow } from '../lib/ui';

export function Hero({ onOpenResume }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="top" className="hero section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell hero__layout">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: MOTION_EASE }}
        >
          <Eyebrow icon={ShieldCheck}>Amit Pal · Associate Consultant (VAPT) at Ampcus Cyber</Eyebrow>
          <h1 id="hero-title" className="hero__title">
            <span>Identifying</span>
            <span>Vulnerabilities</span>
            <span>Before Attackers Do</span>
            <strong>Manual and automated Web &amp; API testing — evidence before assumptions.</strong>
          </h1>
          <p className="hero__lead">High-impact Web &amp; API penetration testing that turns logic and authorization gaps into reproducible proof-of-concept evidence, clear remediation guidance, and reduced business risk.</p>
          <p className="hero__body">I build local-first tools to make authorized security testing clearer, faster, and easier to document.</p>
          <div className="tag-row hero__tags" aria-label="Specialties">
            <span>Web &amp; API security</span>
            <span>Manual &amp; automated</span>
            <span>Evidence-led reporting</span>
          </div>
          <div className="button-row">
            <ButtonLink href="#focus" className="button button--primary"><Target size={16} /> See how I work <ArrowUpRight size={15} /></ButtonLink>
            <ButtonLink href="#work"><Hammer size={16} /> Explore my tooling</ButtonLink>
            <button type="button" className="button button--secondary" onClick={onOpenResume} data-cursor="RESUME"><FileText size={16} /> View My Resume <ArrowUpRight size={15} /></button>
          </div>
          <div className="stats-bar" aria-label="Key metrics">
            <div><strong>135+</strong> hands-on labs</div>
            <div><strong>3</strong> published articles</div>
            <div><strong>3</strong> security projects</div>
          </div>
        </motion.div>

        <motion.aside
          className="evidence-panel"
          aria-label="Example security testing evidence"
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: MOTION_EASE }}
        >
          <div className="evidence-panel__top">
            <span><span className="status-dot" /> Evidence capture</span>
            <span>INT-0417</span>
          </div>
          <div className="request-line"><b>GET</b><code>/api/admin/users</code></div>
          <div className="request-meta"><span>identity: user</span><span>session: valid</span></div>
          <div className="evidence-compare">
            <div><span>Expected</span><code>403 Forbidden</code></div>
            <div className="evidence-compare__observed"><span>Observed</span><code>200 OK</code></div>
          </div>
          <div className="evidence-panel__result"><span>Authorization logic</span><strong>Gap found</strong></div>
          <div className="evidence-panel__footer">Manual &amp; automated validation · evidence before assumptions</div>
        </motion.aside>
      </div>
      <div className="hero__signal shell" aria-hidden="true"><span /> Scroll to explore</div>
    </section>
  );
}
