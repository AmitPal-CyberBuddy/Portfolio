import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, PenTool } from 'lucide-react';
import { LINKS, MOTION_EASE, WRITING } from '../content';
import { ButtonLink, ExternalArrow, SectionHeader } from '../lib/ui';

export function Writing() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="writing" className="section section--soft writing-section" aria-labelledby="writing-title">
      <div className="shell shell--wide">
        <SectionHeader
          index="05"
          icon={PenTool}
          eyebrow="Technical writing — deep dives"
          meta="03 studies · on Medium"
          titleId="writing-title"
          title={<>Research, <em>written down.</em></>}
          aside="Deep dives into browser specs, CORS behavior, request anomalies, and authorization logic gaps — backed by evidence and reproduction, not assumptions."
        />

        <div className="article-index">
          {WRITING.map((article, index) => (
            <motion.a
              key={article.title}
              className="article-row"
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="READ"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: MOTION_EASE }}
            >
              <span className="article-row__num">Study {String(index + 1).padStart(2, '0')}</span>
              <span className="article-row__body">
                <h3>{article.title}</h3>
                <p>{article.insight}</p>
              </span>
              <span className="article-row__action"><BookOpen size={15} aria-hidden="true" /> Read <ExternalArrow /></span>
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
