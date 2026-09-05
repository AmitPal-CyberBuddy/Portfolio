import { BookOpen, Mail } from 'lucide-react';
import { LINKS } from '../content';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell shell--wide site-footer__inner">
        <span className="site-footer__sig">© 2026 Amit Pal · Application Security <em>— test deliberately, validate impact.</em></span>
        <nav className="site-footer__links" aria-label="Footer links">
          <a href="#top">Back to top ↑</a>
          <a href="#resume">Resume</a>
          <a href={`mailto:${LINKS.email}`}><Mail size={13} style={{ verticalAlign: '-2px' }} /> Email</a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><GitHubIcon size={13} style={{ verticalAlign: '-2px' }} /> GitHub</a>
          <a href={LINKS.medium} target="_blank" rel="noopener noreferrer"><BookOpen size={13} style={{ verticalAlign: '-2px' }} /> Medium</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon size={13} style={{ verticalAlign: '-2px' }} /> LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}
