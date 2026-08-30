import { motion, useReducedMotion } from 'framer-motion';
import { Route } from 'lucide-react';
import { JOURNEY, MOTION_EASE } from '../content';
import { Eyebrow, Reveal } from '../lib/ui';

export function Journey() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="journey" className="section section--soft journey-section" aria-labelledby="journey-title">
      <div className="shell journey-layout">
        <Reveal className="section-intro journey-intro">
          <Eyebrow icon={Route}>Journey · Nov 2023 → now</Eyebrow>
          <h2 id="journey-title">From research to <em>security.</em></h2>
          <p className="intro-lead">My move into VAPT was shaped by research, deliberate learning, hands-on practice, and a desire to take on technical work.</p>
          <p>The timeline shows a clear thread: attention to detail, consistent delivery, and growing ownership.</p>
        </Reveal>
        <ol className="journey-timeline">
          {JOURNEY.map((item, index) => (
            <motion.li
              key={item.date}
              className={item.current ? 'is-current' : ''}
              initial={reduceMotion ? false : { opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: MOTION_EASE }}
            >
              <div className="journey-timeline__marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
              <p className="journey-timeline__date">{item.date}</p>
              <h3>{item.title}</h3>
              <h4>{item.role}</h4>
              <p>{item.detail}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
