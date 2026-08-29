import { BookOpen, Mail } from 'lucide-react';
import { LINKS } from '../content';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <span>© 2026 Amit Pal · Application Security</span>
        <div>
          <a href="#top">Back to top ↑</a><span aria-hidden="true">·</span>
          <a href="#resume">Resume</a><span aria-hidden="true">·</span>
          <a href={`mailto:${LINKS.email}`}><Mail size={13} style={{verticalAlign:'-2px'}}/> Email</a><span aria-hidden="true">·</span>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><GitHubIcon size={13} style={{verticalAlign:'-2px'}}/> GitHub</a><span aria-hidden="true">·</span>
          <a href={LINKS.medium} target="_blank" rel="noopener noreferrer"><BookOpen size={13} style={{verticalAlign:'-2px'}}/> Medium</a><span aria-hidden="true">·</span>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon size={13} style={{verticalAlign:'-2px'}}/> LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
