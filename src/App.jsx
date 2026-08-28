import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  FileText,
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
  scriptSentryLive: 'https://amitpal-cyberbuddy.github.io/ScriptSentry/',
  email: 'amitpal.secure@gmail.com',
};

const NAV_ITEMS = [
  { id: 'work', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'focus', label: 'Focus' },
  { id: 'writing', label: 'Writing' },
  { id: 'learning', label: 'Loop' },
  { id: 'journey', label: 'Journey' },
  { id: 'now', label: 'Now' },
  { id: 'connect', label: 'Contact' },
];

const WRITING = [
  {
    title: 'CORS Misconfiguration: When Reflecting the Origin Is Not the Whole Story',
    insight: 'I check how a reflected origin behaves under a real cross-origin request — Reflection alone is not proof of exploitation.',
    link: 'https://amitpxl.medium.com/cors-misconfiguration-when-reflecting-the-origin-is-not-the-whole-story-956e2e6e18bc',
  },
  {
    title: "HTTP Request Smuggling vs Pipelining: Why They're Often Confused",
    insight: 'I check why double responses in Repeater are not always a smuggling sign — the two patterns are easy to mix up.',
    link: 'https://amitpxl.medium.com/http-request-smuggling-vs-http-request-pipelining-why-theyre-often-confused-44ffe6e528eb',
  },
  {
    title: 'How I Broke Client-Side Encryption By Frontend JavaScript Analysis',
    insight: 'I check the JavaScript a page actually ships — frontend encryption is an attack surface, not just UI.',
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
  },
  {
    date: 'Q1 2026',
    title: 'Recognized for ownership',
    role: 'Performer of the Quarter · VAPT',
    detail: 'Soon after transitioning, I focused on learning quickly and taking ownership. The recognition reflects that approach, not just an award.',
  },
  {
    date: 'Aug 2026',
    title: 'Promoted to Associate Consultant',
    role: 'Associate Consultant · VAPT',
    detail: 'Now leading end-to-end VAPT engagements, translating SOW requirements into assessment scope, and driving reporting, remediation, and closure across diverse client environments.',
    current: true,
  },
];

const SIGNALS = [
  ['I build', 'Tools I ship independently', 'CyberBuddy is live, and VAPT Checklist is under active development. Both began with friction I encountered during real engagements.', Hammer],
  ['I go deeper', 'Where specifications meet behavior', 'I research how browsers behave in practice: CORS, JWT, CSP, client-side crypto, and script-level analysis.', Search],
  ['I share', 'Writing grounded in verification', 'My Medium articles are grounded in testing and reproduction, with tools that help demonstrate the point.', PenTool],
];

const NOW_ITEMS = [
  {
    label: 'Building',
    detail: 'VAPT Checklist — a context-aware VAPT workspace, under active development.',
    href: LINKS.vaptLive,
    action: 'Live preview',
    tone: 'green',
    icon: Hammer,
  },
  {
    label: 'Experimenting',
    detail: 'ScriptSentry — a JavaScript security intelligence platform, under active development.',
    href: LINKS.scriptSentryLive,
    action: 'Live preview',
    tone: 'violet',
    icon: Zap,
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

const RESUME_DATA = {
  header: {
    name: 'AMIT PAL',
    title: 'Application Security Consultant | Web Application & API PT',
    location: 'Bengaluru, India',
    phone: '+91 XXXXX XXXXX',
    email: 'amitpal.secure@gmail.com',
    linkedin: 'https://www.linkedin.com/in/amitpal-wb/',
    github: 'https://github.com/AmitPal-CyberBuddy',
    portfolio: 'https://amitpal-cyberbuddy.github.io/Portfolio/',
    medium: 'https://amitpxl.medium.com/',
  },
  summary:
    'Application Security Consultant focused on Web Application and API PT, with hands-on experience managing end-to-end security assessments across diverse client environments. Experienced in translating assessment requirements into practical testing approaches, identifying and validating security vulnerabilities, and supporting clients through reporting, remediation, retesting, and project closure.',
  experience: [
    {
      company: 'AMPCUS CYBER',
      location: 'Bengaluru, India',
      roles: [
        {
          title: 'Associate Consultant',
          period: 'Aug 2026 \u2013 Present',
          bullets: [
            'Lead end-to-end Web Application and API PT engagements, covering multiple client applications and API collections across diverse engagements.',
            'Translate SOW and client requirements into assessment scope, coordinating application coverage, testing access, and Black Box or Grey Box testing approaches.',
            'Perform and validate security testing across authentication, authorization, session management, business logic, and input validation; assess practical impact and eliminate false positives.',
            'Drive reporting, client walkthroughs, remediation validation, retesting, and closure while coordinating with clients, PMO, and internal stakeholders.',
          ],
        },
        {
          title: 'Security Analyst',
          period: 'Feb 2026 \u2013 Jul 2026',
          bullets: [
            'Conducted Web Application and API security assessments using manual and automated testing techniques across client environments.',
            'Assessed REST and SOAP APIs against relevant OWASP API Security risks, including authorization, authentication, input validation, and Mass Assignment.',
            'Validated findings, documented technical impact and remediation guidance, and supported reporting and retesting activities.',
          ],
        },
        {
          title: 'Lead Generation Executive',
          period: 'Dec 2023 \u2013 Jan 2026',
          description:
            'Conducted OSINT-driven market, organization, and stakeholder research; developed structured prospect intelligence to support targeted outreach, business development, and opportunity identification.',
        },
      ],
    },
  ],
  independentWork: [
    {
      title: 'CyberBuddy',
      links: {
        live: 'https://amitpal-cyberbuddy.github.io/CyberBuddy/',
        github: 'https://github.com/AmitPal-CyberBuddy/CyberBuddy',
      },
      description:
        'Independent browser-based security testing console consolidating clickjacking, security headers, CSP, CORS, DNS/domain security, CSRF proof-of-concepts, and JWT analysis in one workspace.',
    },
    {
      title: 'ScriptSentry',
      links: {
        live: 'https://amitpal-cyberbuddy.github.io/ScriptSentry/',
        github: 'https://github.com/AmitPal-CyberBuddy/ScriptSentry',
      },
      status: 'Under Development',
      description:
        'Visual JavaScript security and script-behavior intelligence platform \u2014 secrets, crypto keys, APIs, storage, DOM risks, obfuscation, and data flows analyzed through a motion-rich dashboard with 20+ detection modules.',
    },
    {
      title: 'VAPT Checklist',
      links: {
        live: 'https://amitpal-cyberbuddy.github.io/VAPT-Checklist/',
        github: 'https://github.com/AmitPal-CyberBuddy/VAPT-Checklist',
      },
      status: 'Under Development',
      description:
        'Context-aware VAPT methodology, checklist, knowledge base, and local-first workspace \u2014 623 validated items across 25 categories, 196 guided test families, 15 attack-chain graphs, 40 payload references, and 12 Burp Suite workflows.',
    },
    {
      title: 'Technical Security Writing',
      links: { medium: 'https://amitpxl.medium.com/' },
      description:
        'Write practical application security articles on topics across Web Application and API security, vulnerability research, and security testing.',
    },
  ],
  expertise: {
    securityTesting: ['Web Application VAPT', 'API Security Testing', 'OWASP Top 10', 'OWASP API Security Top 10'],
    assessmentFocus: ['Access Control', 'Authentication & Authorization', 'Session Management', 'Input Validation', 'Business Logic', 'Client-Side & Server-Side Testing'],
    tools: ['Burp Suite', 'Postman', 'Nuclei', 'OWASP ZAP', 'Nmap', 'SQLMap'],
  },
  education: [
    {
      title: 'Bachelor of Computer Applications (BCA)',
      period: '2020 \u2013 2023',
      institution: 'Techno Main Salt Lake, MAKAUT University',
      cgpa: '9.16/10',
    },
  ],
  continuousLearning: [
    {
      title: 'PortSwigger Web Security Academy',
      detail: '135+ hands-on labs completed',
      description: 'Hands-on practice across Web Application security vulnerabilities and exploitation techniques.',
    },
    {
      title: 'APIsec University',
      detail: 'Jan 2026',
      description: "API Penetration Testing (12 hours) \u00b7 API Security Fundamentals '25 (2 hours)",
    },
  ],
};

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
    const update = () => {
      const offset = window.innerHeight * 0.35;
      let current = '';
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
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

function Header({ theme, toggleTheme, time, activeSection, menuOpen, setMenuOpen, onOpenResume }) {
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

function Hero({ onOpenResume }) {
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
          <Eyebrow icon={ShieldCheck}>Amit Pal · Associate Consultant (VAPT) at Ampcus Cyber</Eyebrow>
          <h1 id="hero-title" className="hero__title">
            <span>I find logic flaws</span>
            <span>attackers miss.</span>
            <strong>Manual Web &amp; API testing — validated by evidence, not assumptions.</strong>
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
            <button type="button" className="button button--secondary" onClick={onOpenResume} data-cursor="RESUME"><FileText size={16} /> View My Resume <ArrowUpRight size={15} /></button>
          </div>
          <div className="stats-bar" aria-label="Key metrics">
            <div><strong>135+</strong> hands-on labs</div>
            <div><strong>3</strong> published articles</div>
            <div><strong>3</strong> security projects</div>
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
            <p className="role-badge"><span className="status-dot" /><span>Current role</span><b>Associate Consultant · Ampcus Cyber · Aug 2026 → now</b></p>
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
            <div className="panel scenario-card">
              <span className="scenario-card__step">01</span>
              <h3>What I observed</h3>
              <p><code>GET /api/admin/users</code> returned <code>200 OK</code> with identity <code>user</code> — no role elevation required. The endpoint did not re-validate authorization after session establishment.</p>
            </div>
            <div className="panel panel--accent scenario-card">
              <span className="scenario-card__step">02</span>
              <h3>Why it is high-impact</h3>
              <p>Access to admin user listings exposes PII, roles, and session identifiers — not a disclosure glitch, but a logic gap with direct data exposure. Remediation: enforce server-side authorization checks at the endpoint, not just at the route level.</p>
            </div>
            <div className="panel scenario-card">
              <span className="scenario-card__step">03</span>
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

const PROJECT_VISUALS = {
  live: {
    className: 'live',
    top: ['CyberBuddy // live', 'Local-first'],
    metrics: [['07', 'checks live'], ['NO ACCOUNT', 'no sign-up']],
    rows: [['CORS validation', 'evidence led'], ['Headers audit', 'policy signals'], ['JWT workbench', 'local only']],
    footer: ['Authorized testing only', 'Evidence-grade'],
    caption: ['Live · 7 tools', 'Local-first browser security'],
    aria: 'CyberBuddy live tool data',
  },
  release: {
    className: 'release',
    top: ['VAPT checklist // under development', 'Active dev'],
    metrics: [['623', 'validated items'], ['25', 'categories']],
    rows: [['Adaptive scope', 'context first'], ['Manual validation', 'reproducible'], ['Coverage state', 'honest gaps']],
    footer: ['Local-first workspace', 'Browser & visual QA'],
    caption: ['Under Development', 'Context-aware VAPT workspace'],
    aria: 'VAPT Checklist under development data',
  },
  experiment: {
    className: 'experiment',
    top: ['ScriptSentry // under development', 'Experiment'],
    metrics: [['20+', 'detection modules'], ['JS', 'script analysis']],
    rows: [['Secrets & crypto', 'key exposure'], ['DOM & storage', 'risk map'], ['Obfuscation', 'detector']],
    footer: ['JavaScript security', 'Motion-rich dashboard'],
    caption: ['Under Development', 'JS security intelligence'],
    aria: 'ScriptSentry under development data',
  },
};

function ProjectDataVisual({ type, image, alt }) {
  const reduceMotion = useReducedMotion();
  const visual = PROJECT_VISUALS[type] || PROJECT_VISUALS.release;

  return (
    <figure className={`project-media project-media--${visual.className}`}>
      <div className="project-visual-frame">
        {image && (
          <motion.img
            src={asset(image)}
            alt={alt}
            loading="lazy"
            decoding="async"
            animate={reduceMotion ? { scale: 1, x: '0%' } : { scale: [1.03, 1.11, 1.03], x: ['-1.5%', '1.5%', '-1.5%'] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <div className="project-visual-frame__scrim" aria-hidden="true" />
        <div className="project-data" role="group" aria-label={visual.aria}>
          <div className="project-data__top"><span><i /> {visual.top[0]}</span><span>{visual.top[1]}</span></div>
          <div className="project-data__metrics">
            {visual.metrics.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <div className="project-data__rows">
            {visual.rows.map(([label, value], index) => (
              <div key={label}><span>0{index + 1}</span><b>{label}</b><small>{value}</small></div>
            ))}
          </div>
          <div className="project-data__footer"><span>{visual.footer[0]}</span><span>{visual.footer[1]}</span></div>
        </div>
        <motion.span
          className="project-scanline"
          aria-hidden="true"
          animate={reduceMotion ? { top: '0%' } : { top: ['-2%', '102%'] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 5.5, repeat: Infinity, repeatDelay: 2.5, ease: 'linear' }}
        />
      </div>
      <figcaption><span>{visual.caption[0]}</span><span>{visual.caption[1]}</span></figcaption>
    </figure>
  );
}

const PROJECT_EYEBROW_ICONS = { live: Zap, release: Layers3, experiment: TerminalSquare };
const PROJECT_PRIMARY_BUTTONS = { live: 'button--violet', release: 'button--green', experiment: 'button--gold' };

function ProjectCard({ type, title, eyebrow, summary, detail, image, alt, tags, primaryLink, primaryLabel, secondaryLink, secondaryLabel, reverse = false }) {
  const reduceMotion = useReducedMotion();
  const eyebrowIcon = PROJECT_EYEBROW_ICONS[type] || Layers3;
  const primaryButton = PROJECT_PRIMARY_BUTTONS[type] || 'button--green';
  return (
    <motion.article
      className={`project-card project-card--${type} ${reverse ? 'project-card--reverse' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, ease: MOTION_EASE }}
    >
      <div className="project-card__copy">
        <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
        <h3>{title}</h3>
        <p className="project-card__lead">{summary}</p>
        <p>{detail}</p>
        <div className="tag-row project-card__tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="button-row">
          <ButtonLink href={primaryLink} external className={`button button--primary ${primaryButton}`}><ExternalLink size={16} /> {primaryLabel}</ButtonLink>
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
            eyebrow="VAPT Checklist · Under Development"
            title="VAPT Checklist"
            summary="A local-first, context-aware workspace for Web and API security testing."
            detail="Fragmented checklists miss context and slow assessments down. VAPT Checklist connects taxonomy, scope, evidence, and honest coverage states — reducing manual testing friction and making 623 validated items across 25 categories, 196 guided families, and 15 attack chains faster to navigate during live assessments."
            image="vapt-workflow.jpg"
            alt="VAPT Checklist structured security workflow"
            tags={['623 items', '25 categories', '196 families', '15 attack chains', 'Under Development']}
            primaryLink={LINKS.vaptLive}
            primaryLabel="Live preview"
            secondaryLink={LINKS.vaptRepo}
            secondaryLabel="View GitHub"
            reverse
          />
          <ProjectCard
            type="experiment"
            eyebrow="ScriptSentry · Under Development"
            title="ScriptSentry"
            summary="A browser-based visual intelligence platform for JavaScript security and script behavior."
            detail="ScriptSentry reads the JavaScript an application actually ships — secrets, crypto keys, API calls, storage usage, DOM risks, and obfuscation — and surfaces them in a motion-rich dashboard with 20+ detection modules. It makes script-level analysis visible instead of a manual read-through."
            tags={['20+ detection modules', 'Secrets & crypto', 'DOM risks', 'Data flows', 'Under Development']}
            primaryLink={LINKS.scriptSentryLive}
            primaryLabel="Live preview"
            secondaryLink={LINKS.scriptSentry}
            secondaryLabel="View GitHub"
          />
        </div>
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
        <div className="impact-quotes">
          <blockquote className="impact-quote">
            <span className="impact-quote__label">From a SaaS assessment</span>
            <p>“Your team’s professionalism and clarity made the difference. The report was not just findings — it was a clear path to fix things.”</p>
            <footer>Client confidentiality protected</footer>
          </blockquote>
          <blockquote className="impact-quote">
            <span className="impact-quote__label">VAPT & Mobile PT closure</span>
            <p>“From navigating complex findings to supporting us through every step of the remediation process, your team’s professionalism, patience, and expertise made all the difference. Amit, you were our go-to person throughout this journey — always available when we needed guidance. We look forward to continuing this partnership for future security assessments.”</p>
            <footer>Client confidentiality protected</footer>
          </blockquote>
          <blockquote className="impact-quote">
            <span className="impact-quote__label">Web & Mobile PT closure</span>
            <p>“A heartfelt thank you to Amit and the entire team for the exceptional support throughout this engagement. The professionalism, patience, and diligence shown by you and everyone working in the background has been truly appreciated.”</p>
            <footer>Client confidentiality protected</footer>
          </blockquote>
        </div>
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

function downloadResumeATS() {
  const r = RESUME_DATA;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${esc(r.header.name)} - Resume</title>
<style>
@page{size:A4;margin:0.48in 0.64in}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10pt;line-height:1.4;color:#1a1a1a}
h1{font-size:21pt;font-weight:700;margin-bottom:2pt}
.subtitle{font-size:11pt;font-weight:700;color:#2E506B;margin-bottom:4pt}
.contact{font-size:8.5pt;color:#555;margin-bottom:6pt}
.contact a{color:#555;text-decoration:none}
.summary{font-size:9.15pt;line-height:1.45;margin-bottom:8pt;color:#333}
.section-title{font-size:10.2pt;font-weight:700;color:#2E506B;border-bottom:1px solid #D9DEE2;padding-bottom:3pt;margin-top:10pt;margin-bottom:6pt;text-transform:uppercase;letter-spacing:0.5pt}
.company-row{display:flex;justify-content:space-between;align-items:baseline}
.company{font-weight:700;font-size:9.5pt;margin-top:6pt}
.location{font-size:8.6pt;color:#5A5A5A}
.role-row{display:flex;justify-content:space-between;align-items:baseline}
.role{font-weight:700;font-size:9.3pt;margin-top:4pt}
.period{font-size:8.6pt;color:#5A5A5A}
ul{margin:2pt 0 4pt 15pt}
li{font-size:9.15pt;line-height:1.4;margin-bottom:1.5pt;color:#333}
.desc{font-size:9.15pt;color:#333;margin-top:2pt;line-height:1.4}
.project-row{display:flex;justify-content:space-between;align-items:baseline}
.project-title{font-weight:700;font-size:9.3pt}
.project-links{font-size:8.6pt;color:#5A5A5A}
.project-links a{color:#5A5A5A;text-decoration:none}
.expertise-group{margin-bottom:2pt;font-size:9.15pt;color:#333}
.expertise-label{font-weight:700}
.edu-row{display:flex;justify-content:space-between;align-items:baseline}
.edu-title{font-weight:700;font-size:9.3pt}
.edu-detail{font-size:8.6pt;color:#5A5A5A}
.edu-institution{font-size:9.15pt;color:#333;margin-top:1pt}
.edu-cgpa{font-weight:700}
.learning-row{display:flex;justify-content:space-between;align-items:baseline}
.learning-title{font-weight:700;font-size:9.3pt}
.learning-detail{font-size:8.6pt;color:#5A5A5A}
.learning-desc{font-size:9.15pt;color:#333;margin-top:1pt}
.spacer{height:4pt}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body>
<h1>${esc(r.header.name)}</h1>
<div class="subtitle">${esc(r.header.title)}</div>
<div class="contact">${esc(r.header.location)} | ${esc(r.header.phone)} | <a href="mailto:${esc(r.header.email)}">${esc(r.header.email)}</a> | <a href="${r.header.linkedin}">LinkedIn</a> | <a href="${r.header.github}">GitHub</a> | <a href="${r.header.portfolio}">Portfolio</a> | <a href="${r.header.medium}">Medium</a></div>
<div class="summary">${esc(r.summary)}</div>
<div class="section-title">Experience</div>
${r.experience.map((exp) => `<div class="company-row"><span class="company">${esc(exp.company)}</span><span class="location">${esc(exp.location)}</span></div>
${exp.roles.map((role) => `<div class="role-row"><span class="role">${esc(role.title)}</span><span class="period">${esc(role.period)}</span></div>
${role.bullets ? `<ul>${role.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
${role.description ? `<div class="desc">${esc(role.description)}</div>` : ''}`).join('')}`).join('')}
<div class="section-title">Independent Work &amp; Security Writing</div>
${r.independentWork.map((item) => `<div class="project-row"><span class="project-title">${esc(item.title)}</span><span class="project-links">${item.links.live ? `<a href="${item.links.live}">Live</a>` : ''}${item.links.github ? `${item.links.live ? ' | ' : ''}<a href="${item.links.github}">GitHub</a>` : ''}${item.links.medium ? `<a href="${item.links.medium}">Medium (@amitpxl)</a>` : ''}${item.status ? ` | <em>${esc(item.status)}</em>` : ''}</span></div>
<div class="desc">${esc(item.description)}</div>
<div class="spacer"></div>`).join('')}
<div class="section-title">Expertise</div>
<div class="expertise-group"><span class="expertise-label">Security Testing: </span>${r.expertise.securityTesting.map(esc).join(' \u00b7 ')}</div>
<div class="expertise-group"><span class="expertise-label">Assessment Focus: </span>${r.expertise.assessmentFocus.map(esc).join(' \u00b7 ')}</div>
<div class="expertise-group"><span class="expertise-label">Tools: </span>${r.expertise.tools.map(esc).join(' \u00b7 ')}</div>
<div class="section-title">Education &amp; Continuous Learning</div>
${r.education.map((edu) => `<div class="edu-row"><span class="edu-title">${esc(edu.title)}</span><span class="edu-detail">${esc(edu.period)}</span></div>
<div class="edu-institution">${esc(edu.institution)} \u00b7 <span class="edu-cgpa">CGPA: ${esc(edu.cgpa)}</span></div>`).join('')}
<div class="spacer"></div>
${r.continuousLearning.map((item) => `<div class="learning-row"><span class="learning-title">${esc(item.title)}</span><span class="learning-detail">${esc(item.detail)}</span></div>
<div class="learning-desc">${esc(item.description)}</div>
<div class="spacer"></div>`).join('')}
<script>window.onload=function(){setTimeout(function(){window.print()},300)}</script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Amit_Pal_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function ResumeDocument() {
  const r = RESUME_DATA;
  return (
    <div className="resume-doc">
      <header className="resume-doc__header">
        <h1 className="resume-doc__name">{r.header.name}</h1>
        <p className="resume-doc__title">{r.header.title}</p>
        <div className="resume-doc__contact">
          <span>{r.header.location}</span>
          <span>{r.header.phone}</span>
          <a href={`mailto:${r.header.email}`}>{r.header.email}</a>
          <a href={r.header.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={r.header.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={r.header.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
          <a href={r.header.medium} target="_blank" rel="noopener noreferrer">Medium</a>
        </div>
      </header>

      <section className="resume-doc__section">
        <p className="resume-doc__summary">{r.summary}</p>
      </section>

      <section className="resume-doc__section">
        <h2 className="resume-doc__section-title">Experience</h2>
        {r.experience.map((exp, i) => (
          <div key={i} className="resume-doc__company">
            <div className="resume-doc__company-header">
              <span className="resume-doc__company-name">{exp.company}</span>
              <span className="resume-doc__company-location">{exp.location}</span>
            </div>
            {exp.roles.map((role, j) => (
              <div key={j} className="resume-doc__role">
                <div className="resume-doc__role-header">
                  <span className="resume-doc__role-title">{role.title}</span>
                  <span className="resume-doc__role-period">{role.period}</span>
                </div>
                {role.bullets && (
                  <ul className="resume-doc__bullets">
                    {role.bullets.map((b, k) => <li key={k}>{b}</li>)}
                  </ul>
                )}
                {role.description && <p className="resume-doc__desc">{role.description}</p>}
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="resume-doc__section">
        <h2 className="resume-doc__section-title">Independent Work &amp; Security Writing</h2>
        {r.independentWork.map((item, i) => (
          <div key={i} className="resume-doc__project">
            <div className="resume-doc__project-header">
              <span className="resume-doc__project-title">{item.title}</span>
              <span className="resume-doc__project-links">
                {item.links.live && <a href={item.links.live} target="_blank" rel="noopener noreferrer">Live</a>}
                {item.links.github && (
                  <>
                    {item.links.live && <span aria-hidden="true"> · </span>}
                    <a href={item.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  </>
                )}
                {item.links.medium && <a href={item.links.medium} target="_blank" rel="noopener noreferrer">Medium (@amitpxl)</a>}
                {item.status && <span className="resume-doc__project-status"> · {item.status}</span>}
              </span>
            </div>
            <p className="resume-doc__desc">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="resume-doc__section">
        <h2 className="resume-doc__section-title">Expertise</h2>
        <p className="resume-doc__expertise-group"><span className="resume-doc__expertise-label">Security Testing: </span>{r.expertise.securityTesting.join(' \u00b7 ')}</p>
        <p className="resume-doc__expertise-group"><span className="resume-doc__expertise-label">Assessment Focus: </span>{r.expertise.assessmentFocus.join(' \u00b7 ')}</p>
        <p className="resume-doc__expertise-group"><span className="resume-doc__expertise-label">Tools: </span>{r.expertise.tools.join(' \u00b7 ')}</p>
      </section>

      <section className="resume-doc__section">
        <h2 className="resume-doc__section-title">Education &amp; Continuous Learning</h2>
        {r.education.map((edu, i) => (
          <div key={i} className="resume-doc__edu">
            <div className="resume-doc__edu-header">
              <span className="resume-doc__edu-title">{edu.title}</span>
              <span className="resume-doc__edu-period">{edu.period}</span>
            </div>
            <p className="resume-doc__edu-institution">{edu.institution} · <span className="resume-doc__edu-cgpa">CGPA: {edu.cgpa}</span></p>
          </div>
        ))}
        <div style={{ height: '0.5rem' }} />
        {r.continuousLearning.map((item, i) => (
          <div key={i} className="resume-doc__learning">
            <div className="resume-doc__learning-header">
              <span className="resume-doc__learning-title">{item.title}</span>
              <span className="resume-doc__learning-detail">{item.detail}</span>
            </div>
            <p className="resume-doc__learning-desc">{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function ResumeViewer({ onClose }) {
  const reduceMotion = useReducedMotion();
  const [showSizeNote, setShowSizeNote] = useState(false);

  useEffect(() => {
    setShowSizeNote(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="resume-viewer-overlay"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="resume-viewer"
        initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: MOTION_EASE }}
        role="dialog"
        aria-modal="true"
        aria-label="Resume viewer"
      >
        <div className="resume-viewer__toolbar">
          <div className="resume-viewer__toolbar-left">
            <FileText size={16} aria-hidden="true" />
            <span>Resume · Amit Pal</span>
          </div>
          <div className="resume-viewer__toolbar-right">
            <button type="button" className="resume-viewer__btn" onClick={downloadResumeATS}>
              <Download size={15} aria-hidden="true" /> <span>Download ATS PDF</span>
            </button>
            <button type="button" className="resume-viewer__close" onClick={onClose} aria-label="Close resume viewer">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        {showSizeNote && (
          <div className="resume-viewer__size-note" role="status">
            <span>For the best experience, view on a laptop or desktop. You can also try desktop mode in your browser.</span>
            <button type="button" onClick={() => setShowSizeNote(false)} aria-label="Dismiss suggestion">
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        )}
        <div className="resume-viewer__content">
          <ResumeDocument />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Resume({ onOpenResume }) {
  return (
    <section id="resume" className="section resume-section" aria-labelledby="resume-title">
      <div className="shell resume-layout">
        <Reveal className="section-intro resume-intro">
          <Eyebrow icon={FileText}>Resume · updated August 2026</Eyebrow>
          <h2 id="resume-title">Resume / <em>CV.</em></h2>
          <p className="intro-lead">Application Security Consultant focused on Web Application and API PT, with hands-on experience managing end-to-end security assessments.</p>
          <p>Currently Associate Consultant at Ampcus Cyber, leading VAPT engagements across diverse client environments.</p>
          <div className="button-row">
            <button type="button" className="button button--primary" onClick={onOpenResume} data-cursor="RESUME">
              <FileText size={16} /> View My Resume <ArrowUpRight size={15} />
            </button>
            <button type="button" className="button button--secondary" onClick={downloadResumeATS} data-cursor="DOWNLOAD">
              <Download size={16} /> Download ATS Resume
            </button>
          </div>
        </Reveal>
        <Reveal className="resume-content" delay={0.08}>
          <div className="panel panel--accent resume-panel">
            <div className="resume-highlights">
              <div className="resume-highlight">
                <span className="resume-highlight__label">Current Role</span>
                <span className="resume-highlight__value">Associate Consultant · Ampcus Cyber</span>
              </div>
              <div className="resume-highlight">
                <span className="resume-highlight__label">Focus</span>
                <span className="resume-highlight__value">Web Application &amp; API PT</span>
              </div>
              <div className="resume-highlight">
                <span className="resume-highlight__label">Education</span>
                <span className="resume-highlight__value">BCA · CGPA 9.16/10</span>
              </div>
              <div className="resume-highlight">
                <span className="resume-highlight__label">Labs</span>
                <span className="resume-highlight__value">135+ hands-on (PortSwigger)</span>
              </div>
            </div>
            <div className="resume-badges">
              <div className="badge-row">
                <span className="badge">Burp Suite</span>
                <span className="badge">OWASP Top 10</span>
                <span className="badge">API Security</span>
                <span className="badge">Web Security</span>
                <span className="badge">Penetration Testing</span>
                <span className="badge">Manual & Automated Testing</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact({ onOpenResume }) {
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

function Footer() {
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

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
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
        onOpenResume={() => setResumeOpen(true)}
      />
      <main id="main">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <Work />
        <Resume onOpenResume={() => setResumeOpen(true)} />
        <Focus />
        <LearningLoop />
        <Writing />
        <Journey />
        <Signals />
        <Now />
        <Contact onOpenResume={() => setResumeOpen(true)} />
      </main>
      <Footer />
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <AnimatePresence>{resumeOpen && <ResumeViewer onClose={() => setResumeOpen(false)} />}</AnimatePresence>
    </MotionConfig>
  );
}
