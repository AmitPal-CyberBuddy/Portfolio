import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { MOTION_EASE, SIGNALS } from '../content';
import { SectionHeader } from '../lib/ui';

const QUOTES = [
  {
    label: 'From a SaaS assessment',
    text: '“Your team’s professionalism and clarity made the difference. The report was not just findings — it was a clear path to fix things.”',
    attribution: 'Client confidentiality protected',
  },
  {
    label: 'VAPT engagement closure',
    text: '“From navigating complex findings to supporting us through every step of the remediation process, your team’s professionalism, patience, and expertise made all the difference. Amit, you were our go-to person throughout this journey — always available when we needed guidance. We look forward to continuing this partnership for future security assessments.”',
    attribution: 'Client confidentiality protected',
  },
  {
    label: 'Web & API PT closure',
    text: '“A heartfelt thank you to Amit and the entire team for the exceptional support throughout this engagement. The professionalism, patience, and diligence shown by you and everyone working in the background has been truly appreciated.”',
    attribution: 'Client confidentiality protected',
  },
];

export function Signals() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section signals-section" aria-labelledby="signals-title">
      <div className="shell shell--wide">
        <SectionHeader
          index="08"
          icon={TrendingUp}
          eyebrow="Beyond any single engagement"
          meta="Habits · verified in writing"
          titleId="signals-title"
          title={<>Growth <em>signals.</em></>}
          aside="Recognition and transition are only part of the picture. These are the habits I bring to day-to-day delivery."
        />

        <div className="signals-ledger">
          {SIGNALS.map(([label, title, detail, Icon], index) => (
            <motion.article
              key={label}
              className="signal-step"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: MOTION_EASE }}
            >
              <span className="signal-step__num">0{index + 1}</span>
              <div className="signal-step__label"><Icon size={15} aria-hidden="true" /> {label}</div>
              <div className="signal-step__body"><h3>{title}</h3><p>{detail}</p></div>
            </motion.article>
          ))}
        </div>

        <div className="impact-quotes">
          {QUOTES.map((quote, index) => (
            <motion.blockquote
              key={quote.label}
              className={`impact-quote impact-quote--${index + 1}`}
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.05 * index, ease: MOTION_EASE }}
            >
              <span className="impact-quote__label">{quote.label}</span>
              <p>{quote.text}</p>
              <footer>{quote.attribution}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
