import { ArrowUpRight, BookOpen, FileText, Mail, ShieldCheck } from 'lucide-react';
import { LINKS } from '../content';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';

export function Contact({ onOpenResume }) {
  return (
    <section id="connect" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-grid-pattern" aria-hidden="true" />
      <div className="shell shell--wide contact-layout">
        <header className="contact-head">
          <div className="section-head__meta">
            <div className="section-head__index">
              <b>10</b>
              <i aria-hidden="true" />
              <span className="eyebrow"><Mail size={14} aria-hidden="true" /><span>Contact — collaborations welcome</span></span>
            </div>
            <span className="section-head__note">Bengaluru · open to remote collaboration</span>
          </div>
          <h2 id="contact-title">
            Let’s make <em>security</em> clearer <em className="outline">together.</em>
          </h2>
        </header>

        <p className="contact-lead">
          Need Web or API PT with clear evidence and practical remediation context?
          Or want to discuss browser-security tooling? Let’s connect.
        </p>

        <a className="contact-emailline" href={`mailto:${LINKS.email}?subject=Portfolio%20contact`} data-cursor="EMAIL ME">
          <Mail size={22} aria-hidden="true" />
          <span>{LINKS.email}</span>
          <ArrowUpRight size={26} aria-hidden="true" />
        </a>

        <div className="connect-ledger" aria-label="Ways to connect">
          <button type="button" className="connect-row" onClick={onOpenResume} data-cursor="RESUME">
            <span className="connect-row__num">01</span>
            <span className="connect-row__label">Resume</span>
            <span className="connect-row__detail">Full experience — viewable in-browser</span>
            <FileText size={17} aria-hidden="true" />
          </button>
          <a className="connect-row" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="LINKEDIN">
            <span className="connect-row__num">02</span>
            <span className="connect-row__label">LinkedIn</span>
            <span className="connect-row__detail">Connect professionally<span className="sr-only"> (opens in a new tab)</span></span>
            <LinkedInIcon size={17} aria-hidden="true" />
          </a>
          <a className="connect-row" href={LINKS.github} target="_blank" rel="noopener noreferrer" data-cursor="GITHUB">
            <span className="connect-row__num">03</span>
            <span className="connect-row__label">GitHub</span>
            <span className="connect-row__detail">Tools and source, open by default<span className="sr-only"> (opens in a new tab)</span></span>
            <GitHubIcon size={17} aria-hidden="true" />
          </a>
          <a className="connect-row" href={LINKS.medium} target="_blank" rel="noopener noreferrer" data-cursor="MEDIUM">
            <span className="connect-row__num">04</span>
            <span className="connect-row__label">Medium</span>
            <span className="connect-row__detail">Three evidence-led studies<span className="sr-only"> (opens in a new tab)</span></span>
            <BookOpen size={17} aria-hidden="true" />
          </a>
        </div>

        <p className="contact-note"><ShieldCheck size={15} aria-hidden="true" /> Static site · no tracking · no telemetry</p>
      </div>
    </section>
  );
}
