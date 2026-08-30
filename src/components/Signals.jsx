import { TrendingUp } from 'lucide-react';
import { SIGNALS } from '../content';
import { Eyebrow } from '../lib/ui';

export function Signals() {
  return (
    <section className="section signals-section" aria-labelledby="signals-title">
      <div className="shell shell--wide">
        <div className="signals-heading">
          <Eyebrow icon={TrendingUp}>Beyond any single engagement</Eyebrow>
          <h2 id="signals-title">Growth signals</h2>
          <p>Recognition and transition are only part of the picture. These are the habits I bring to day-to-day delivery.</p>
        </div>
        <div className="signals-list">
          {SIGNALS.map(([label, title, detail, Icon], index) => (
            <article key={label} className="signal-row">
              <span className="signal-row__num">0{index + 1}</span>
              <div className="signal-row__label"><Icon size={15} /> {label}</div>
              <div><h3>{title}</h3><p>{detail}</p></div>
            </article>
          ))}
        </div>
        <div className="impact-quotes">
          <blockquote className="impact-quote">
            <span className="impact-quote__label">From a SaaS assessment</span>
            <p>“Your team’s professionalism and clarity made the difference. The report was not just findings — it was a clear path to fix things.”</p>
            <footer>Client confidentiality protected</footer>
          </blockquote>
          <blockquote className="impact-quote">
            <span className="impact-quote__label">VAPT engagement closure</span>
            <p>“From navigating complex findings to supporting us through every step of the remediation process, your team’s professionalism, patience, and expertise made all the difference. Amit, you were our go-to person throughout this journey — always available when we needed guidance. We look forward to continuing this partnership for future security assessments.”</p>
            <footer>Client confidentiality protected</footer>
          </blockquote>
          <blockquote className="impact-quote">
            <span className="impact-quote__label">Web & API PT closure</span>
            <p>“A heartfelt thank you to Amit and the entire team for the exceptional support throughout this engagement. The professionalism, patience, and diligence shown by you and everyone working in the background has been truly appreciated.”</p>
            <footer>Client confidentiality protected</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
