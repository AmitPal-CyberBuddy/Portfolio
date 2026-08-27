import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  ChevronRight,
  Clock3,
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
  vaptLive: 'https://amitpal-cyberbuddy.github.io/VAPT-Checklist/',
  scriptSentry: 'https://github.com/AmitPal-CyberBuddy/ScriptSentry',
  email: 'amitpal.secure@gmail.com',
};

const NAV_ITEMS = [
  { id: 'focus', label: 'Focus' },
  { id: 'work', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'journey', label: 'Journey' },
  { id: 'now', label: 'Now' },
  { id: 'connect', label: 'Contact' },
];

const WRITING = [
  {
    title: 'CORS Misconfiguration: When Reflecting the Origin Is Not the Whole Story',
    insight: 'Reflection is not exploitation. Proving authenticated impact matters.',
    link: 'https://amitpxl.medium.com/cors-misconfiguration-when-reflecting-the-origin-is-not-the-whole-story-956e2e6e18bc',
    featured: true,
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
    detail: 'Structured API security learning, then self-directed study until the mental model is mine.',
    meta: 'APIsec University · documentation · research',
  },
  {
    number: '02',
    title: 'Practice',
    icon: TerminalSquare,
    tone: 'blue',
    detail: 'I reproduce flaws in labs before carrying a theory into a real engagement.',
    meta: '135+ labs · PortSwigger · TryHackMe',
  },
  {
    number: '03',
    title: 'Apply',
    icon: Target,
    tone: 'green',
    detail: 'End-to-end VAPT across web applications and APIs, where practice meets real stakes.',
    meta: 'Web apps · API collections · authorized testing',
  },
  {
    number: '04',
    title: 'Build & share',
    icon: Hammer,
    tone: 'gold',
    detail: 'Friction from real work becomes tools, research, and writing about what I verified.',
    meta: 'CyberBuddy · VAPT Checklist · Medium',
  },
];

const JOURNEY = [
  {
    date: 'Nov 2023',
    title: 'I joined as a fresher',
    role: 'Ampcus Cyber · Lead Generation Executive',
    detail: 'I began in research and analysis: OSINT, market research, target profiling, and structuring information. That attention to detail became my foundation for security.',
  },
  {
    date: '2024 → early 2025',
    title: 'Consistent work, recognized',
    role: 'Rewards & Recognition',
    detail: 'The work I delivered in 2024 was recognized at Ampcus Cyber’s Rewards & Recognition in early 2025.',
  },
  {
    date: 'Feb 2026',
    title: 'I moved into VAPT',
    role: 'Security Analyst · VAPT Team',
    detail: 'I transitioned into hands-on technical work: research and analysis, deliberate learning, then cybersecurity testing.',
    current: true,
  },
  {
    date: 'Q1 2026',
    title: 'I took ownership',
    role: 'Performer of the Quarter · VAPT',
    detail: 'Soon after transitioning, I focused on learning fast and taking ownership. The recognition means ownership to me, not just an award.',
  },
];

const SIGNALS = [
  ['I build', 'Tools I ship on my own time', 'CyberBuddy is live; VAPT Checklist is in active development. Both started with friction I met during real engagements.', Hammer],
  ['I go deeper', 'Spec vs reality', 'I research what browsers actually do versus what the specs say: CORS, JWT, CSP, client-side crypto, and script-level analysis.', Search],
  ['I share', 'Writing only what I verified', 'My Medium articles are grounded in testing and reproduction, with tools that help demonstrate the point.', PenTool],
];

const NOW_ITEMS = [
  {
    label: 'Building',
    detail: 'VAPT Checklist — a structured, operator-focused testing workflow in active development.',
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
    label: 'Learning',
    detail: 'Mobile PT next, expanding from Web & API security into the mobile attack surface.',
    href: '#learning',
    action: 'See the loop',
    tone: 'gold',
    icon: Lightbulb,
  },
];

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

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

function ButtonLink({ href, children, className = 'button button--secondary', external = false, ...props }) {
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
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
        <a href="#top" className="brand" aria-label="Amit Pal — back to top" onClick={closeMenu}>
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
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
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
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell hero__layout">
        <div className="hero__copy">
          <Eyebrow icon={ShieldCheck}>Amit Pal · Security Analyst (VAPT) · Ampcus Cyber</Eyebrow>
          <h1 id="hero-title" className="hero__title">
            <span>I test web apps</span>
            <span>&amp; APIs.</span>
            <strong>Find what others miss.</strong>
          </h1>
          <p className="hero__lead">Practical Web Application &amp; API Security. I scope the work, test manually, validate impact, and report a clear path to fix.</p>
          <p className="hero__body">I build local-first tools that help prove security issues with evidence — always for authorized testing.</p>
          <div className="tag-row hero__tags" aria-label="Specialties">
            <span>Web &amp; API focused</span>
            <span>End-to-end VAPT</span>
            <span>Manual validation</span>
          </div>
          <div className="button-row">
            <ButtonLink href="#work" className="button button--primary"><Hammer size={16} /> Explore projects <ArrowUpRight size={15} /></ButtonLink>
            <ButtonLink href="#writing"><BookOpen size={16} /> Read the research log</ButtonLink>
          </div>
        </div>

        <aside className="evidence-panel" aria-label="Example security testing evidence">
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
        </aside>
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
          <div className="section-intro focus-intro">
            <Eyebrow icon={Target}>Focus · what I do today</Eyebrow>
            <h2 id="focus-title">Practical<br /><em>appsec.</em></h2>
            <p className="intro-lead">I am a Security Analyst in VAPT at Ampcus Cyber. The job is not a tool output: it is understanding a system well enough to test it responsibly.</p>
            <p>I work across a growing range of client environments and APIs, with a Web &amp; API focus. VAPT means Vulnerability Assessment &amp; Penetration Testing: finding, validating, and explaining the security issues that matter.</p>
            <div className="trust-note"><Fingerprint size={16} /><span>Credible, practical, and authorized-only testing.</span></div>
          </div>

          <div className="focus-content">
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
                <Eyebrow icon={Lightbulb}>What makes me different</Eyebrow>
                <p>I test real systems, build tools that help during engagements, research edge cases, and write about spec versus reality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="approach-band" aria-label="How I work">
        <div className="shell approach-band__inner">
          <Eyebrow icon={Route}>How I work</Eyebrow>
          <p><Search size={15} /> Test <i>→</i> <Hammer size={15} /> Build <i>→</i> <Lightbulb size={15} /> Research <i>→</i> <PenTool size={15} /> Write</p>
          <span>Identifying vulnerabilities before attackers do.</span>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ type, title, eyebrow, summary, detail, image, alt, tags, primaryLink, primaryLabel, secondaryLink, secondaryLabel, reverse = false }) {
  return (
    <article className={`project-card ${reverse ? 'project-card--reverse' : ''}`}>
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
      <figure className="project-media">
        <img src={asset(image)} alt={alt} loading="lazy" decoding="async" />
        <figcaption><span>{type === 'live' ? 'Live · 7 tools' : 'In development'}</span><span>{type === 'live' ? 'Local-first browser security' : 'Structured VAPT workflow'}</span></figcaption>
      </figure>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <Eyebrow icon={Hammer}>Projects · independent security work</Eyebrow>
            <h2 id="work-title">Tools that<br /><em>test real systems.</em></h2>
          </div>
          <p>Practical tooling, built to make investigation, evidence, and security conversations clearer.</p>
        </div>

        <div className="project-stack">
          <ProjectCard
            type="live"
            eyebrow="CyberBuddy · live product"
            title="CyberBuddy"
            summary="Seven browser security checks, under one roof. Evidence-grade and 100% local-first."
            detail="I built CyberBuddy because common browser checks — clickjacking, headers, CORS, JWT, and CSRF — can be scattered or unnecessarily heavy. It helps prove a security issue visually without sending data away."
            image="cyberbuddy-tools.jpg"
            alt="CyberBuddy browser security tools interface"
            tags={['7 tools live', 'Local-first', 'Non-destructive']}
            primaryLink={LINKS.cyberbuddyLive}
            primaryLabel="Live preview"
            secondaryLink={LINKS.github}
            secondaryLabel="GitHub profile"
          />
          <ProjectCard
            type="development"
            eyebrow="VAPT Checklist · active development"
            title="VAPT Checklist"
            summary="A structured, operator-focused workflow for Web and API security testing."
            detail="Fragmented checklists miss context. I am building a workflow that connects taxonomy, scope, evidence, and honest coverage states — for clearer manual testing, not just a longer list of checks."
            image="vapt-workflow.jpg"
            alt="VAPT Checklist structured security workflow"
            tags={['Operator-focused', 'Taxonomy', 'Evidence-led']}
            primaryLink={LINKS.vaptLive}
            primaryLabel="Live preview"
            secondaryLink="https://github.com/AmitPal-CyberBuddy/VAPT-Checklist"
            secondaryLabel="View GitHub"
            reverse
          />
        </div>

        <article className="experiment-card">
          <div>
            <Eyebrow icon={TerminalSquare}>Other experiment · Python</Eyebrow>
            <h3>ScriptSentry</h3>
            <p>Script analysis tooling: an experiment in looking line by line for risk beyond browser security work.</p>
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
  return (
    <section id="writing" className="section section--soft writing-section" aria-labelledby="writing-title">
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <Eyebrow icon={PenTool}>Writing · research log</Eyebrow>
            <h2 id="writing-title">Research<br /><em>notes.</em></h2>
          </div>
          <p>I write about spec versus reality: what browsers actually do, why it matters for security, and the proof behind the claim.</p>
        </div>

        <div className="writing-grid">
          <article className="featured-article">
            <div className="featured-article__mark" aria-hidden="true">01</div>
            <div>
              <p className="article-kicker"><span className="status-dot" /> Featured on Medium</p>
              <h3>{WRITING[0].title}</h3>
              <p>{WRITING[0].insight} I built a two-origin probe to test the real impact.</p>
            </div>
            <ButtonLink href={WRITING[0].link} external className="text-link"><BookOpen size={16} /> Read article on Medium <ExternalArrow /></ButtonLink>
          </article>

          <div className="article-list">
            <div className="article-list__heading"><Eyebrow icon={FileText}>More from the log</Eyebrow><span>02 / 03</span></div>
            {WRITING.slice(1).map((article, index) => (
              <a key={article.title} className="article-row" href={article.link} target="_blank" rel="noopener noreferrer">
                <span>0{index + 2}</span>
                <div><h3>{article.title}</h3><p>{article.insight}</p></div>
                <ExternalArrow />
              </a>
            ))}
            <ButtonLink href={LINKS.medium} external className="button button--secondary"><BookOpen size={16} /> All writing on Medium <ExternalArrow /></ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningLoop() {
  return (
    <section id="learning" className="section loop-section" aria-labelledby="loop-title">
      <div className="shell">
        <div className="section-heading loop-heading">
          <Eyebrow icon={Lightbulb}>The learning engine</Eyebrow>
          <h2 id="loop-title">The loop</h2>
          <p className="intro-lead">Learn, practice, apply, then build and share. It is the system behind the transition, and it still runs.</p>
        </div>
        <ol className="loop-grid">
          {LOOP_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.number} className={`loop-card loop-card--${step.tone}`}>
                <div className="loop-card__head"><span>{step.number}</span><Icon size={18} aria-hidden="true" /></div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
                <small>{step.meta}</small>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="section section--soft journey-section" aria-labelledby="journey-title">
      <div className="shell journey-layout">
        <div className="section-intro journey-intro">
          <Eyebrow icon={Route}>Journey · Nov 2023 → now</Eyebrow>
          <h2 id="journey-title">From research<br />to <em>security.</em></h2>
          <p className="intro-lead">My route into VAPT was built on research, deliberate learning, hands-on practice, and the desire to do technical work.</p>
          <p>Not a résumé timeline — the pattern matters: attention to detail, consistent delivery, then ownership.</p>
        </div>
        <ol className="journey-timeline">
          {JOURNEY.map((item, index) => (
            <li key={item.date} className={item.current ? 'is-current' : ''}>
              <div className="journey-timeline__marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
              <p className="journey-timeline__date">{item.date}</p>
              <h3>{item.title}</h3>
              <h4>{item.role}</h4>
              <p>{item.detail}</p>
            </li>
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
          <p>Recognition and the transition live in the journey. These are the habits I add on top of the day-to-day work.</p>
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
          <p className="intro-lead">A living snapshot of current work, writing, and learning.</p>
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

function Contact() {
  return (
    <section id="connect" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-grid-pattern" aria-hidden="true" />
      <div className="shell contact-layout">
        <div className="contact-copy">
          <Eyebrow icon={Mail}>Contact · collaborations welcome</Eyebrow>
          <h2 id="contact-title">Let’s build<br />more <em>secure</em><br />things together.</h2>
          <p>If you need Web or API VAPT that explains impact clearly, or want to discuss browser security tooling, I would be glad to connect.</p>
          <a className="email-address" href={`mailto:${LINKS.email}`}><Mail size={17} /> {LINKS.email}</a>
        </div>
        <div className="contact-actions">
          <a href={`mailto:${LINKS.email}?subject=Portfolio%20contact`} className="email-cta"><Mail size={22} /><span>Email<br />me <ArrowUpRight size={18} /></span></a>
          <div className="contact-links" aria-label="External profiles">
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon size={17} /><span>LinkedIn</span><ExternalArrow /></a>
            <a href={LINKS.medium} target="_blank" rel="noopener noreferrer"><BookOpen size={17} /><span>Medium</span><ExternalArrow /></a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><GitHubIcon size={17} /><span>GitHub</span><ExternalArrow /></a>
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
        <div><a href="#top">Back to top ↑</a><span aria-hidden="true">·</span><a href={`mailto:${LINKS.email}`}>Email</a></div>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useCurrentTime();
  const activeSection = useActiveSection();
  const progress = useScrollProgress();

  return (
    <>
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
        <Focus />
        <Work />
        <Writing />
        <LearningLoop />
        <Journey />
        <Signals />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
