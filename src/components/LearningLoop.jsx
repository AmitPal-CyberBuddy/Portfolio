import { motion, useReducedMotion } from 'framer-motion';
import { Lightbulb, RotateCcw } from 'lucide-react';
import { LOOP_STEPS, MOTION_EASE } from '../content';
import { Eyebrow, SectionHeader } from '../lib/ui';

export function LearningLoop() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="learning" className="section section--soft loop-section" aria-labelledby="loop-title">
      <div className="shell shell--wide">
        <SectionHeader
          index="07"
          icon={Lightbulb}
          eyebrow="How I learn and apply"
          meta="A repeating cycle"
          titleId="loop-title"
          title={<>The loop <em>never closes.</em></>}
          aside="Learn, practice, apply, then build and share. It is how I have grown into the work — and how I keep improving it."
        />

        <div className="loop-ribbon" aria-hidden="true">
          <span>01 learn</span><i>→</i>
          <span>02 practice</span><i>→</i>
          <span>03 apply</span><i>→</i>
          <span>04 build &amp; share</span><i>→</i>
          <span className="loop-ribbon__return">back to 01 <RotateCcw size={13} /></span>
        </div>

        <div className="loop-badges" aria-label="Continuous learning credentials">
          <span className="badge">APIsec University</span>
          <span className="badge">PortSwigger Labs</span>
          <span className="badge">TryHackMe</span>
          <span className="badge">135+ labs</span>
        </div>

        <ol className="loop-rail">
          {LOOP_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.number}
                className={`loop-step loop-step--${step.tone}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: MOTION_EASE }}
              >
                <span className="loop-step__num">{step.number}</span>
                <div className="loop-step__head">
                  <h3>{step.title}</h3>
                  <Icon size={17} aria-hidden="true" />
                </div>
                <p>{step.detail}</p>
                <small>{step.meta}</small>
              </motion.li>
            );
          })}
        </ol>

        <Eyebrow icon={RotateCcw}>Then again — every engagement feeds the next.</Eyebrow>
      </div>
    </section>
  );
}
