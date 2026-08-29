import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { LINKS } from '../content';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';
import { ButtonLink, Eyebrow, ExternalArrow } from '../lib/ui';

export function Contact({ onOpenResume }) {
  return (
    <section id="connect" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-grid-pattern" aria-hidden="true" />
      <div className="shell contact-layout">
        <div className="contact-copy">
          <Eyebrow icon={Mail}>Contact · collaborations welcome</Eyebrow>
          <h2 id="contact-title">Let’s make<br />security <em>clearer</em><br />together.</h2>
          <p>Need Web or API PT with clear evidence and practical remediation context? Or want to discuss browser-security tooling? Let’s connect.</p>
          <a className="email-address" href={`mailto:${LINKS.email}`} data-cursor="EMAIL"><Mail size={17} /> {LINKS.email}</a>
        </div>
        <div className="contact-actions">
          <div className="contact-primary-actions">
            <a href={`mailto:${LINKS.email}?subject=Portfolio%20contact`} className="email-cta" data-cursor="EMAIL ME"><Mail size={22} /><span>Email<br />me <ArrowUpRight size={18} /></span></a>
            <button type="button" className="email-cta" onClick={onOpenResume} data-cursor="RESUME"><FileText size={22} /><span>View<br />Resume <ArrowUpRight size={18} /></span></button>
            <ButtonLink href={LINKS.linkedin} external className="button contact-linkedin" cursorLabel="LINKEDIN"><LinkedInIcon size={16} /> Connect on LinkedIn <ExternalArrow /></ButtonLink>
          </div>
          <div className="contact-links" aria-label="More external profiles">
            <a href={LINKS.medium} target="_blank" rel="noopener noreferrer" data-cursor="MEDIUM"><BookOpen size={17} /><span>Medium <span className="sr-only">(opens in a new tab)</span></span><ExternalArrow /></a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" data-cursor="GITHUB"><GitHubIcon size={17} /><span>GitHub <span className="sr-only">(opens in a new tab)</span></span><ExternalArrow /></a>
          </div>
          <p className="contact-note"><ShieldCheck size={15} /> Static site · no tracking · no telemetry</p>
        </div>
      </div>
    </section>
  );
}
