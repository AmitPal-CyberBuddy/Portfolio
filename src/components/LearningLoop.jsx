import { motion, useReducedMotion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { LOOP_STEPS, MOTION_EASE } from '../content';
import { Eyebrow } from '../lib/ui';

export function LearningLoop() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="learning" className="section loop-section" aria-labelledby="loop-title">
      <div className="shell">
        <div className="section-heading loop-heading">
          <Eyebrow icon={Lightbulb}>How I learn and apply</Eyebrow>
          <h2 id="loop-title">The loop</h2>
          <p className="intro-lead">Learn, practice, apply, then build and share. It is how I have grown into the work—and how I keep improving it.</p>
          <div className="loop-badges" aria-label="Continuous learning credentials">
            <span className="badge">API Sec University</span>
            <span className="badge">PortSwigger Labs</span>
            <span className="badge">TryHackMe</span>
            <span className="badge">135+ labs</span>
          </div>
        </div>
        <ol className="loop-grid">
          {LOOP_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.number}
                className={`loop-card loop-card--${step.tone}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: MOTION_EASE }}
              >
                <div className="loop-card__head"><span>{step.number}</span><Icon size={18} aria-hidden="true" /></div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
                <small>{step.meta}</small>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
