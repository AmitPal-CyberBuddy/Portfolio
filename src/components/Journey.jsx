import { motion, useReducedMotion } from 'framer-motion';
import { Route } from 'lucide-react';
import { JOURNEY, MOTION_EASE } from '../content';
import { Reveal, SectionHeader } from '../lib/ui';

export function Journey() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="journey" className="section journey-section" aria-labelledby="journey-title">
      <div className="shell">
        <SectionHeader
          index="06"
          icon={Route}
          eyebrow="Journey — the thread so far"
          meta="Nov 2023 → now"
          titleId="journey-title"
          title={<>From research to <em>security.</em></>}
          aside="My move into VAPT was shaped by research, deliberate learning, hands-on practice, and a desire to take on technical work."
        />

        <div className="journey-layout">
          <Reveal className="journey-intro">
            <p className="journey-intro__text">
              The timeline shows a clear thread: attention to detail, consistent delivery, and
              growing ownership — from structured research to leading end-to-end engagements.
            </p>
            <div className="journey-current">
              <span className="journey-current__label">Position today</span>
              <strong>Associate Consultant · VAPT</strong>
              <span>Ampcus Cyber · Bengaluru</span>
            </div>
          </Reveal>

          <ol className="journey-timeline">
            {JOURNEY.map((item, index) => (
              <motion.li
                key={item.date}
                className={item.current ? 'is-current' : ''}
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: MOTION_EASE }}
              >
                <div className="journey-timeline__marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
                <p className="journey-timeline__date">{item.date}{item.current && <em> · now</em>}</p>
                <h3>{item.title}</h3>
                <h4>{item.role}</h4>
                <p>{item.detail}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
