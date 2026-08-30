import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, PenTool } from 'lucide-react';
import { LINKS, MOTION_EASE, WRITING } from '../content';
import { ButtonLink, Eyebrow, ExternalArrow, Reveal } from '../lib/ui';

export function Writing() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="writing" className="section section--soft writing-section" aria-labelledby="writing-title">
      <div className="shell shell--wide">
        <Reveal className="section-heading section-heading--split">
          <div>
            <Eyebrow icon={PenTool}>Technical Writing · deep dives</Eyebrow>
            <h2 id="writing-title">Technical Writing · <em>deep dives.</em></h2>
          </div>
          <p>Deep dives into browser specs, CORS behavior, request anomalies, and authorization logic gaps — backed by evidence and reproduction, not assumptions.</p>
        </Reveal>

        <div className="article-cards">
          {WRITING.map((article, index) => (
            <motion.a
              key={article.title}
              className="article-card"
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="READ"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: MOTION_EASE }}
            >
              <div className="article-card__meta"><span>I write · study {String(index + 1).padStart(2, '0')}</span><ExternalArrow /></div>
              <h3>{article.title}</h3>
              <p>{article.insight}</p>
              <span className="article-card__action"><BookOpen size={15} /> Read on Medium <span className="sr-only">(opens in a new tab)</span></span>
            </motion.a>
          ))}
        </div>
        <div className="writing-cta">
          <p>{WRITING.length} published pieces so far. Each begins with a question, tests the behavior, and documents the evidence.</p>
          <ButtonLink href={LINKS.medium} external className="button button--secondary" cursorLabel="MEDIUM"><BookOpen size={16} /> View all writing on Medium <ExternalArrow /></ButtonLink>
        </div>
      </div>
    </section>
  );
}
