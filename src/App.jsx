import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  ChevronRight,
  Clock3,
  ExternalLink,
  Fingerprint,
  Hammer,
  Layers3,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Moon,
  PenTool,
  Route,
  Search,
  ShieldCheck,
  Sun,
  Target,
  TerminalSquare,
  X,
  Zap,
} from 'lucide-react';

const LINKS = {
  github: 'https://github.com/AmitPal-CyberBuddy',
  linkedin: 'https://www.linkedin.com/in/amitpal-wb/',
  medium: 'https://amitpxl.medium.com/',
  cyberbuddyLive: 'https://amitpal-cyberbuddy.github.io/CyberBuddy/',
  cyberbuddyRepo: 'https://github.com/AmitPal-CyberBuddy/CyberBuddy',
  vaptLive: 'https://amitpal-cyberbuddy.github.io/VAPT-Checklist/',
  vaptRepo: 'https://github.com/AmitPal-CyberBuddy/VAPT-Checklist',
  scriptSentry: 'https://github.com/AmitPal-CyberBuddy/ScriptSentry',
  email: 'amitpal.secure@gmail.com',
};

const NAV_ITEMS = [
  { id: 'work', label: 'Projects' },
  { id: 'focus', label: 'Focus' },
  { id: 'writing', label: 'Writing' },
  { id: 'learning', label: 'Loop' },
  { id: 'journey', label: 'Journey' },
  { id: 'now', label: 'Now' },
  { id: 'resume', label: 'Resume' },
  { id: 'connect', label: 'Contact' },
];

const WRITING = [
  {
    title: 'CORS Misconfiguration: When Reflecting the Origin Is Not the Whole Story',
    insight: 'Reflection is not exploitation. Proving authenticated impact matters.',
    link: 'https://amitpxl.medium.com/cors-misconfiguration-when-reflecting-the-origin-is-not-the-whole-story-956e2e6e18bc',
  },
  {
    title: "HTTP Request Smuggling vs Pipelining: Why They're Often Confused",
    insight: "Why double responses in Repeater aren't always smuggling.",
    link: 'https://amitpxl.medium.com/http-request-smuggling-vs-http-request-pipelining-why-theyre-often-confused-44ffe6e528eb',
  },
  {
    title: 'How I Broke Client-Side Encryption By Frontend JavaScript Analysis',
    insight: 'Frontend JavaScript is an attack surface, not just UI.',
    link: 'https://amitpxl.medium.com/how-i-broke-encrypted-requests-by-reading-frontend-javascript-b016c5b9078d',
  },
];

const FOCUS_STEPS = [
  ['Scope & recon', 'Map the real attack surface before testing starts.'],
  ['Web & API testing', 'Test manually first; scanners do not understand every workflow.'],
  ['Validate impact', 'Confirm a finding is reproducible, meaningful, and safe to report.'],
  ['Clear reporting', 'Turn evidence into a practical path to remediation.'],
];

const LOOP_STEPS = [
  {
    number: '01',
    title: 'Learn',
    icon: BookOpen,
    tone: 'violet',
    detail: 'Structured API-security learning, followed by self-directed study until I understand the underlying model.',
    meta: 'APIsec University · documentation · research',
  },
  {
    number: '02',
    title: 'Practice',
    icon: TerminalSquare,
    tone: 'blue',
    detail: 'I reproduce issues in labs before applying the underlying ideas to authorized work.',
    meta: '135+ labs · PortSwigger · TryHackMe',
  },
  {
    number: '03',
    title: 'Apply',
    icon: Target,
    tone: 'green',
    detail: 'End-to-end VAPT across web applications and APIs, where structured practice meets real-world constraints.',
    meta: 'Web apps · API collections · authorized testing',
  },
  {
    number: '04',
    title: 'Build & share',
    icon: Hammer,
    tone: 'gold',
    detail: 'Friction from real work becomes tools, research notes, and writing grounded in what I verified.',
    meta: 'CyberBuddy · VAPT Checklist · Medium',
  },
];

const JOURNEY = [
  {
    date: 'Nov 2023',
    title: 'I started in research',
    role: 'Ampcus Cyber · Lead Generation Executive',
    detail: 'I started with research and analysis: OSINT, market research, target profiling, and structured information. That attention to detail became a foundation for security work.',
  },
  {
    date: '2024 → early 2025',
    title: 'Consistent work, recognized',
    role: 'Rewards & Recognition',
    detail: 'The work I delivered in 2024 was recognized at Ampcus Cyber’s Rewards & Recognition in early 2025.',
  },
  {
    date: 'Feb 2026',
    title: 'I transitioned into VAPT',
    role: 'Security Analyst · VAPT Team',
    detail: 'I moved into hands-on technical work: research and analysis, deliberate learning, then cybersecurity testing.',
    current: true,
  },
  {
    date: 'Q1 2026',
    title: 'Recognized for ownership',
    role: 'Performer of the Quarter · VAPT',
    detail: 'Soon after transitioning, I focused on learning quickly and taking ownership. The recognition reflects that approach, not just an award.',
  },
];

const SIGNALS = [
  ['I build', 'Tools I ship independently', 'CyberBuddy is live, and VAPT Checklist is moving through release-candidate QA. Both began with friction I encountered during real engagements.', Hammer],
  ['I go deeper', 'Where specifications meet behavior', 'I research how browsers behave in practice: CORS, JWT, CSP, client-side crypto, and script-level analysis.', Search],
  ['I share', 'Writing grounded in verification', 'My Medium articles are grounded in testing and reproduction, with tools that help demonstrate the point.', PenTool],
];

const NOW_ITEMS = [
  {
    label: 'Building',
    detail: 'VAPT Checklist — a local-first, context-aware workspace in v1.0.0-r29 release-candidate QA.',
    href: LINKS.vaptLive,
    action: 'Live preview',
    tone: 'green',
    icon: Hammer,
  },
  {
    label: 'Writing',
    detail: 'Browser security and real impact: CORS, JWT, CSP, and client-side crypto.',
    href: LINKS.medium,
    action: 'Read on Medium',
    tone: 'orange',
    icon: PenTool,
  },
  {
    label: 'Maintaining',
    detail: 'CyberBuddy — a local-first, browser-based security suite with seven live tools.',
    href: LINKS.cyberbuddyLive,
    action: 'Live preview',
    tone: 'violet',
    icon: ShieldCheck,
  },
  {
    label: 'Learning next',
    detail: 'Next: mobile penetration testing, expanding from Web and API security into the mobile attack surface.',
    href: '#learning',
    action: 'See the loop',
    tone: 'gold',
    icon: Lightbulb,
  },
];

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const MOTION_EASE = [0.16, 1, 0.3, 1];

function Reveal({ children, className, delay = 0, amount = 0.18 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(query.matches && !reduceMotion.matches && window.innerWidth > 1024);
    sync();
    query.addEventListener('change', sync);
    reduceMotion.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      query.removeEventListener('change', sync);
      reduceMotion.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { ...point };
    const ring = { ...point };
    let frame;

    const onMove = (event) => { point.x = event.clientX; point.y = event.clientY; };
    const onOver = (event) => {
      const trigger = event.target.closest?.('[data-cursor]');
      setHovering(Boolean(trigger));
      setLabel(trigger?.getAttribute('data-cursor') || '');
    };
    const animate = () => {
      dot.x += (point.x - dot.x) * 0.34;
      dot.y += (point.y - dot.y) * 0.34;
      ring.x += (point.x - ring.x) * 0.13;
      ring.y += (point.y - ring.y) * 0.13;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    document.documentElement.classList.add('custom-cursor-on');
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver);
    animate();
    return () => {
      document.documentElement.classList.remove('custom-cursor-on');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="cursor-system" aria-hidden="true">
      <span ref={dotRef} className="cursor-dot" />
      <span ref={ringRef} className={`cursor-ring ${hovering ? 'is-hovering' : ''}`}><span>{label}</span></span>
    </div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%', transition: { duration: 0.7, ease: MOTION_EASE } }}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loader__top"><span><ShieldCheck size={15} /> Amit Pal · application security</span><span>2026</span></div>
      <div className="loader__main"><span>Amit</span><strong>Pal</strong><em>Test deliberately · validate impact.</em></div>
      <div className="loader__bar"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.85, ease: MOTION_EASE }} /></div>
      <div className="loader__bottom"><span>Web · API · VAPT · tooling</span><span>Loading experience</span></div>
    </motion.div>
  );
}

function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function useCurrentTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date()));
    };
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a1019' : '#f4f7fb');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))];
}

function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[visible.length - 1].target.id);
      },
      { rootMargin: '-32% 0px -58% 0px', threshold: 0 },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

function ExternalArrow() {
  return <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />;
}

function Eyebrow({ icon: Icon, children }) {
  return (
    <div className="eyebrow">
      {Icon && <Icon size={14} aria-hidden="true" />}
      <span>{children}</span>
    </div>
  );
}

function ButtonLink({ href, children, className = 'button button--secondary', external = false, cursorLabel, ...props }) {
  return (
    <a
      href={href}
      className={className}
      data-cursor={cursorLabel || (external ? 'OPEN' : 'GO')}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

function Header({ theme, toggleTheme, time, activeSection, menuOpen, setMenuOpen }) {
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
            <a href="#" aria-disabled="true" style={{pointerEvents:"none",opacity:0.55}} tabIndex={menuOpen ? 0 : -1}><Award size={14} /> Download CV (PDF)</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="top" className="hero section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell hero__layout">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: MOTION_EASE }}
        >
          <Eyebrow icon={ShieldCheck}>Amit Pal · Security Analyst (VAPT) at Ampcus Cyber</Eyebrow>
          <h1 id="hero-title" className="hero__title">
            <span>I secure Web Apps</span>
            <span>&amp; APIs.</span>
            <strong>Finding logic flaws before attackers do.</strong>
          </h1>
          <p className="hero__lead">Finding high-impact logic flaws in Web Applications &amp; APIs — backed by proof-of-concept evidence, practical remediation guidance, and reduced business risk.</p>
          <p className="hero__body">I build local-first tools to make authorized security testing clearer, faster, and easier to document.</p>
          <div className="tag-row hero__tags" aria-label="Specialties">
            <span>Web &amp; API security</span>
            <span>Manual validation</span>
            <span>Evidence-led reporting</span>
          </div>
          <div className="hero-evidence-preview" aria-label="Quick evidence preview">
            <div className="preview-label">INT-0417 · Authorization logic gap</div>
            <div className="preview-compare"><span>Expected</span><code>403 Forbidden</code><span>Observed</span><code>200 OK</code></div>
            <p className="preview-note">User identity valid · endpoint did not re-check role elevation.</p>
          </div>
          <div className="button-row">
            <ButtonLink href="#work" className="button button--primary"><Hammer size={16} /> View selected work <ArrowUpRight size={15} /></ButtonLink>
            <ButtonLink href="#writing"><BookOpen size={16} /> Read research notes</ButtonLink>
            <ButtonLink href="#" className="button button--secondary is-disabled" aria-label="Resume download coming soon" aria-disabled="true" style={{pointerEvents:"none",opacity:0.55}}><Award size={16} /> Download CV (PDF) <ArrowUpRight size={15} /></ButtonLink>
          </div>
          <div className="stats-bar" aria-label="Key metrics">
            <div><strong>135+</strong> labs (PortSwigger / TryHackMe)</div>
            <div><strong>623</strong> validated checklist items</div>
            <div><strong>7</strong> live tools built</div>
          </div>
        </motion.div>

        <motion.aside
          className="evidence-panel"
          aria-label="Example security testing evidence"
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: MOTION_EASE }}
        >
          <div className="evidence-panel__top">
            <span><span className="status-dot" /> Evidence capture</span>
            <span>INT-0417</span>
          </div>
          <div className="request-line"><b>GET</b><code>/api/admin/users</code></div>
          <div className="request-meta"><span>identity: user</span><span>session: valid</span></div>
          <div className="evidence-compare">
            <div><span>Expected</span><code>403 Forbidden</code></div>
            <div className="evidence-compare__observed"><span>Observed</span><code>200 OK</code></div>
          </div>
          <div className="evidence-panel__result"><span>Authorization logic</span><strong>Gap found</strong></div>
          <div className="evidence-panel__footer">Manual validation · evidence before assumptions</div>
        </motion.aside>
      </div>
      <div className="hero__signal shell" aria-hidden="true"><span /> Scroll to explore</div>
    </section>
  );
}

function Focus() {
  return (
    <>
      <section id="focus" className="section section--soft" aria-labelledby="focus-title">
        <div className="shell focus-layout">
          <Reveal className="section-intro focus-intro">
            <Eyebrow icon={Target}>Focus · what I do</Eyebrow>
            <p className="role-badge"><span className="status-dot" /><span>Current role</span><b>Security Analyst (VAPT) · Ampcus Cyber · Feb 2026 → now</b></p>
            <h2 id="focus-title">Practical<br /><em>appsec.</em></h2>
            <p className="intro-lead">I am a Security Analyst in VAPT at Ampcus Cyber. I assess web applications and APIs by understanding the system, testing it responsibly, and validating real impact.</p>
            <p>VAPT — Vulnerability Assessment and Penetration Testing — is the practice of finding, validating, and clearly explaining security issues that need attention.</p>
            <div className="trust-note"><Fingerprint size={16} /><span>Authorized, evidence-led security testing.</span></div>
          </Reveal>

          <Reveal className="focus-content" delay={0.08}>
            <div className="panel panel--accent">
              <Eyebrow icon={Layers3}>How I test · end to end</Eyebrow>
              <ol className="process-list">
                {FOCUS_STEPS.map(([title, detail], index) => (
                  <li key={title}>
                    <span>0{index + 1}</span>
                    <div><h3>{title}</h3><p>{detail}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="focus-bottom-grid">
              <div className="panel">
                <Eyebrow icon={ShieldCheck}>What I focus on</Eyebrow>
                <div className="tag-row">
                  <span>Web App Security</span><span>API Security</span><span>Auth &amp; logic</span><span>OWASP Top 10</span><span>Research &amp; tooling</span>
                </div>
              </div>
              <div className="panel">
                <Eyebrow icon={Lightbulb}>Beyond tool output</Eyebrow>
                <p>I combine hands-on testing with focused tools, research, and clear write-ups—so observations become reproducible evidence and practical next steps.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section id="scenario" className="section section--soft scenario-section" aria-labelledby="scenario-title">
        <div className="shell scenario-layout">
          <Reveal className="section-intro scenario-intro">
            <Eyebrow icon={ShieldCheck}>Case study · anonymized</Eyebrow>
            <h2 id="scenario-title">The authorization gap<br /><em>in your banner.</em></h2>
            <p className="intro-lead">Breaking down the logic flaw shown in the evidence banner: expected 403, observed 200. How it happens, why it matters, and what to check next.</p>
          </Reveal>
          <Reveal className="scenario-body" delay={0.08}>
            <div className="panel">
              <h3>What I observed</h3>
              <p><code>GET /api/admin/users</code> returned <code>200 OK</code> with identity <code>user</code> — no role elevation required. The endpoint did not re-validate authorization after session establishment.</p>
            </div>
            <div className="panel panel--accent">
              <h3>Why it is high-impact</h3>
              <p>Access to admin user listings exposes PII, roles, and session identifiers — not a disclosure glitch, but a logic gap with direct data exposure. Remediation: enforce server-side authorization checks at the endpoint, not just at the route level.</p>
            </div>
            <div className="panel">
              <h3>How I validated</h3>
              <p>Manual replay in Repeater with valid session, no privilege change, repeated across three endpoints. Evidence captured with request/response pairs — reproducible by the client without custom tooling.</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="approach-band" aria-label="How I work">
        <div className="shell approach-band__inner">
          <Eyebrow icon={Route}>How I work</Eyebrow>
          <p><Search size={15} /> Test <i>→</i> <Hammer size={15} /> Build <i>→</i> <Lightbulb size={15} /> Research <i>→</i> <PenTool size={15} /> Write</p>
          <span>From testing to practical next steps.</span>
        </div>
      </section>
    </>
  );
}

function ProjectDataVisual({ type, image, alt }) {
  const reduceMotion = useReducedMotion();
  const isLive = type === 'live';
  const metrics = isLive
    ? [['07', 'checks live'], ['NO ACCOUNT', 'no sign-up']]
    : [['623', 'validated items'], ['25', 'categories']];
  const rows = isLive
    ? [['CORS validation', 'evidence led'], ['Headers audit', 'policy signals'], ['JWT workbench', 'local only']]
    : [['Adaptive scope', 'context first'], ['Manual validation', 'reproducible'], ['Coverage state', 'honest gaps']];

  return (
    <figure className={`project-media project-media--${isLive ? 'live' : 'release'}`}>
      <div className="project-visual-frame">
        <motion.img
          src={asset(image)}
          alt={alt}
          loading="lazy"
          decoding="async"
          animate={reduceMotion ? { scale: 1, x: '0%' } : { scale: [1.03, 1.11, 1.03], x: ['-1.5%', '1.5%', '-1.5%'] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="project-visual-frame__scrim" aria-hidden="true" />
        <div className="project-data" role="group" aria-label={isLive ? 'CyberBuddy live tool data' : 'VAPT Checklist release candidate data'}>
          <div className="project-data__top"><span><i /> {isLive ? 'CyberBuddy // live' : 'VAPT checklist // release candidate'}</span><span>{isLive ? 'Local-first' : 'v1.0.0 RC'}</span></div>
          <div className="project-data__metrics">
            {metrics.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <div className="project-data__rows">
            {rows.map(([label, value], index) => (
              <div key={label}><span>0{index + 1}</span><b>{label}</b><small>{value}</small></div>
            ))}
          </div>
          <div className="project-data__footer"><span>{isLive ? 'Authorized testing only' : 'Local-first workspace'}</span><span>{isLive ? 'Evidence-grade' : 'Browser & visual QA'}</span></div>
        </div>
        <motion.span
          className="project-scanline"
          aria-hidden="true"
          animate={reduceMotion ? { top: '0%' } : { top: ['-2%', '102%'] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 5.5, repeat: Infinity, repeatDelay: 2.5, ease: 'linear' }}
        />
      </div>
      <figcaption><span>{isLive ? 'Live · 7 tools' : 'v1.0.0 release candidate'}</span><span>{isLive ? 'Local-first browser security' : 'Context-aware VAPT workspace'}</span></figcaption>
    </figure>
  );
}

function ProjectCard({ type, title, eyebrow, summary, detail, image, alt, tags, primaryLink, primaryLabel, secondaryLink, secondaryLabel, reverse = false }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className={`project-card ${reverse ? 'project-card--reverse' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, ease: MOTION_EASE }}
    >
      <div className="project-card__copy">
        <Eyebrow icon={type === 'live' ? Zap : Layers3}>{eyebrow}</Eyebrow>
        <h3>{title}</h3>
        <p className="project-card__lead">{summary}</p>
        <p>{detail}</p>
        <div className="tag-row project-card__tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="button-row">
          <ButtonLink href={primaryLink} external className={`button button--primary ${type === 'live' ? 'button--violet' : 'button--green'}`}><ExternalLink size={16} /> {primaryLabel}</ButtonLink>
          <ButtonLink href={secondaryLink} external><GitHubIcon size={16} /> {secondaryLabel}</ButtonLink>
        </div>
      </div>
      <ProjectDataVisual type={type} image={image} alt={alt} />
    </motion.article>
  );
}

function Work() {
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="shell">
        <Reveal className="section-heading section-heading--split">
          <div>
            <Eyebrow icon={Hammer}>Projects · independent security work</Eyebrow>
            <h2 id="work-title">Custom Tooling · <br /><em>local-first utilities.</em></h2>
          </div>
          <p>Local-first utilities built for authorized testing and rapid evidence capture — designed to make investigation, evidence, and security conversations clearer.</p>
        </Reveal>

        <div className="project-stack">
          <ProjectCard
            type="live"
            eyebrow="CyberBuddy · featured live product"
            title="CyberBuddy"
            summary="Seven browser-based security checks in one evidence-led, local-first suite."
            detail="I built CyberBuddy because manual checks for clickjacking, headers, CORS, JWT, and CSRF are scattered or slow. It saves time during assessments by unifying evidence capture, and its local-first workflow lets reviewers audit scripting style instantly. Seven checks — faster validation, clearer documentation."
            image="cyberbuddy-tools.jpg"
            alt="CyberBuddy browser security tools interface"
            tags={['7 tools live', 'Local-first', 'Evidence-led', 'Featured']}
            primaryLink={LINKS.cyberbuddyLive}
            primaryLabel="Live preview"
            secondaryLink={LINKS.cyberbuddyRepo}
            secondaryLabel="View GitHub"
          />
          <ProjectCard
            type="release"
            eyebrow="VAPT Checklist · v1.0.0-r29 release candidate"
            title="VAPT Checklist"
            summary="A local-first, context-aware workspace for Web and API security testing."
            detail="Fragmented checklists miss context and slow assessments down. VAPT Checklist connects taxonomy, scope, evidence, and honest coverage states — reducing manual testing friction and making 623 validated items faster to navigate during live assessments."
            image="vapt-workflow.jpg"
            alt="VAPT Checklist structured security workflow"
            tags={['623 validated items', '25 categories', 'Release candidate']}
            primaryLink={LINKS.vaptLive}
            primaryLabel="Live preview"
            secondaryLink={LINKS.vaptRepo}
            secondaryLabel="View GitHub"
            reverse
          />
        </div>

        <article className="experiment-card">
          <div>
            <Eyebrow icon={TerminalSquare}>Other experiment · Python</Eyebrow>
            <h3>ScriptSentry</h3>
            <p>A Python experiment in line-by-line script analysis, extending the work beyond browser security.</p>
          </div>
          <div className="experiment-card__aside">
            <span>Experimental · 2026</span>
            <ButtonLink href={LINKS.scriptSentry} external><GitHubIcon size={16} /> View on GitHub <ExternalArrow /></ButtonLink>
          </div>
        </article>
      </div>
    </section>
  );
}

function Writing() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="writing" className="section section--soft writing-section" aria-labelledby="writing-title">
      <div className="shell">
        <Reveal className="section-heading section-heading--split">
          <div>
            <Eyebrow icon={PenTool}>Technical Writing · deep dives</Eyebrow>
            <h2 id="writing-title">Technical Writing · <br /><em>deep dives.</em></h2>
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
              <div className="article-card__meta"><span>Research note {String(index + 1).padStart(2, '0')}</span><ExternalArrow /></div>
              <h3>{article.title}</h3>
              <p>{article.insight}{index === 0 ? ' I built a two-origin probe to test the actual impact.' : ''}</p>
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

function LearningLoop() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="learning" className="section loop-section" aria-labelledby="loop-title">
      <div className="shell">
        <div className="section-heading loop-heading">
          <Eyebrow icon={Lightbulb}>How I learn and apply</Eyebrow>
          <h2 id="loop-title">The loop</h2>
          <p className="intro-lead">Learn, practice, apply, then build and share. It is how I have grown into the work—and how I keep improving it.</p>
          <div className="loop-badges" aria-label="Continuous learning credentials">
            <span className="badge">API Sec University</span>
            <span className="badge">PortSwigger Labs</span>
            <span className="badge">TryHackMe</span>
            <span className="badge">135+ labs</span>
          </div>
        </div>
        <ol className="loop-grid">
          {LOOP_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.number}
                className={`loop-card loop-card--${step.tone}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: MOTION_EASE }}
              >
                <div className="loop-card__head"><span>{step.number}</span><Icon size={18} aria-hidden="true" /></div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
                <small>{step.meta}</small>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Journey() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="journey" className="section section--soft journey-section" aria-labelledby="journey-title">
      <div className="shell journey-layout">
        <Reveal className="section-intro journey-intro">
          <Eyebrow icon={Route}>Journey · Nov 2023 → now</Eyebrow>
          <h2 id="journey-title">From research<br />to <em>security.</em></h2>
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

function Signals() {
  return (
    <section className="section signals-section" aria-labelledby="signals-title">
      <div className="shell">
        <div className="signals-heading">
          <Eyebrow icon={Award}>Beyond the timeline</Eyebrow>
          <h2 id="signals-title">Growth signals</h2>
          <p>The timeline covers recognition and transition. These are the habits I bring beyond day-to-day delivery.</p>
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
        <blockquote className="impact-quote">
          <p>“Your team’s professionalism and clarity made the difference. The report was not just findings — it was a clear path to fix things.”</p>
          <footer>Feedback from a SaaS assessment · client confidentiality protected</footer>
        </blockquote>
      </div>
    </section>
  );
}

function Now() {
  return (
    <section id="now" className="section section--soft now-section" aria-labelledby="now-title">
      <div className="shell now-layout">
        <div className="section-intro">
          <Eyebrow icon={Clock3}>Now · August 2026</Eyebrow>
          <h2 id="now-title">What I am<br /><em>working on.</em></h2>
          <p className="intro-lead">A current snapshot of work, writing, maintenance, and learning.</p>
          <div className="now-meta">
            <p><MapPin size={16} /> Roots in West Bengal · building in Bengaluru · open to remote collaboration</p>
            <p><Clock3 size={16} /> Current time in India · updated August 2026</p>
          </div>
          <div className="learning-note"><Award size={16} /><span>Selected learning: API Penetration Testing and API Security Fundamentals · APIsec University · January 2026</span></div>
        </div>
        <div className="now-list">
          {NOW_ITEMS.map((item) => {
            const Icon = item.icon;
            const external = !item.href.startsWith('#');
            return (
              <article className={`now-row now-row--${item.tone}`} key={item.label}>
                <div className="now-row__label"><Icon size={16} /><span>{item.label}</span></div>
                <p>{item.detail}</p>
                <ButtonLink href={item.href} external={external} className="text-link">{item.action} {external ? <ExternalArrow /> : <ArrowUpRight size={15} />}</ButtonLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section id="resume" className="section resume-section" aria-labelledby="resume-title">
      <div className="shell resume-layout">
        <Reveal className="section-intro resume-intro">
          <Eyebrow icon={Award}>Resume · updated 2026</Eyebrow>
          <h2 id="resume-title">Resume / <em>CV.</em></h2>
          <p className="intro-lead">Updated security analyst resume covering VAPT work, custom tooling, and continuous lab credentials.</p>
          <p>Includes authorization logic gaps, evidence-led reporting methodology, and practical remediation guidance from authorized web application and API testing.</p>
        </Reveal>
        <Reveal className="resume-content" delay={0.08}>
          <div className="panel panel--accent resume-panel">
            <div className="resume-badges">
              <div className="badge-row">
                <span className="badge">API Sec University</span>
                <span className="badge">PortSwigger Labs</span>
                <span className="badge">TryHackMe</span>
              </div>
              <p className="badge-desc">API Penetration Testing · API Security Fundamentals · 135+ labs completed · January 2026 → present</p>
            </div>
            <div className="resume-cta-block">
              <a href="#" className="button button--primary is-disabled" aria-label="Resume download coming soon" aria-disabled="true" style={{pointerEvents:'none', opacity:0.55}}>
                <Award size={16} /> Download CV / Resume (PDF) — coming soon <ArrowUpRight size={15} />
              </a>
              <p className="resume-note"><em>Updated PDF will be activated here once shared — just drop it in /public/assets/.</em></p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="connect" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-grid-pattern" aria-hidden="true" />
      <div className="shell contact-layout">
        <div className="contact-copy">
          <Eyebrow icon={Mail}>Contact · collaborations welcome</Eyebrow>
          <h2 id="contact-title">Let’s make<br />security <em>clearer</em><br />together.</h2>
          <p>Need Web or API VAPT with clear evidence and practical remediation context? Or want to discuss browser-security tooling? Let’s connect.</p>
          <a className="email-address" href={`mailto:${LINKS.email}`} data-cursor="EMAIL"><Mail size={17} /> {LINKS.email}</a>
        </div>
        <div className="contact-actions">
          <div className="contact-primary-actions">
            <a href={`mailto:${LINKS.email}?subject=Portfolio%20contact`} className="email-cta" data-cursor="EMAIL ME"><Mail size={22} /><span>Email<br />me <ArrowUpRight size={18} /></span></a>
            <a href="#" className="email-cta is-disabled" aria-label="Resume download coming soon" aria-disabled="true" data-cursor="RESUME" style={{pointerEvents:'none', opacity:0.55}}><Award size={22} /><span>Download<br />CV — soon <ArrowUpRight size={18} /></span></a>
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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <span>© 2026 Amit Pal · Application Security</span>
        <div>
          <a href="#top">Back to top ↑</a><span aria-hidden="true">·</span>
          <a href="#" aria-disabled="true" style={{pointerEvents:"none",opacity:0.55}}>Resume</a><span aria-hidden="true">·</span>
          <a href={`mailto:${LINKS.email}`}><Mail size={13} style={{verticalAlign:'-2px'}}/> Email</a><span aria-hidden="true">·</span>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><GitHubIcon size={13} style={{verticalAlign:'-2px'}}/> GitHub</a><span aria-hidden="true">·</span>
          <a href={LINKS.medium} target="_blank" rel="noopener noreferrer"><BookOpen size={13} style={{verticalAlign:'-2px'}}/> Medium</a><span aria-hidden="true">·</span>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon size={13} style={{verticalAlign:'-2px'}}/> LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const time = useCurrentTime();
  const activeSection = useActiveSection();
  const progress = useScrollProgress();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1050);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        time={time}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main id="main">
        <Hero />
        <Work />
        <Focus />
        <LearningLoop />
        <Writing />
        <Journey />
        <Signals />
        <Now />
        <Contact />
        <Resume />
      </main>
      <Footer />
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
    </MotionConfig>
  );
}
