import { useEffect } from 'react';
import {
  ChevronRight,
  Clock3,
  FileText,
  Mail,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import { LINKS, NAV_ITEMS } from '../content';

export function Header({ theme, toggleTheme, time, activeSection, menuOpen, setMenuOpen, onOpenResume }) {
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, setMenuOpen]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a href="#top" className="brand" aria-label="Amit Pal — back to top" onClick={closeMenu} data-cursor="HOME">
          <span className="brand-mark"><ShieldCheck size={17} aria-hidden="true" /></span>
          <span className="brand-name"><b>Amit</b><span>Pal</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'is-active' : ''}
              aria-current={activeSection === item.id ? 'location' : undefined}
              data-cursor={item.label.toUpperCase()}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-tools">
          <time className="header-time" aria-label={`Current time in India: ${time || 'loading'}`}>
            <Clock3 size={14} aria-hidden="true" />
            <span>{time || '—:—:—'} <em>IST</em></span>
          </time>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'light'}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            data-cursor={theme === 'dark' ? 'LIGHT' : 'DARK'}
          >
            {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
            <span className="sr-only">Toggle color theme</span>
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div className="shell mobile-nav__inner">
          <p className="mobile-nav__label">Navigate the portfolio</p>
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'is-active' : ''}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>{item.label}</span>
              <small>0{index + 1}</small>
              <ChevronRight size={18} aria-hidden="true" />
            </a>
          ))}
          <div className="mobile-nav__footer">
            <button type="button" className="theme-text-toggle" onClick={toggleTheme} tabIndex={menuOpen ? 0 : -1}>
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />} Use {theme === 'dark' ? 'light' : 'dark'} mode
            </button>
            <a href={`mailto:${LINKS.email}`} tabIndex={menuOpen ? 0 : -1}><Mail size={14} /> {LINKS.email}</a>
            <button type="button" className="theme-text-toggle" onClick={() => { onOpenResume(); closeMenu(); }} tabIndex={menuOpen ? 0 : -1}><FileText size={14} /> View Resume</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
