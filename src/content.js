import {
  BookOpen,
  Hammer,
  Layers3,
  Lightbulb,
  PenTool,
  Search,
  ShieldCheck,
  Target,
  TerminalSquare,
  Zap,
} from 'lucide-react';

export const LINKS = {
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

export const NAV_ITEMS = [
  { id: 'focus', label: 'Focus' },
  { id: 'resume', label: 'Resume' },
  { id: 'work', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'journey', label: 'Journey' },
  { id: 'learning', label: 'Loop' },
  { id: 'now', label: 'Now' },
  { id: 'connect', label: 'Contact' },
];

export const WRITING = [
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

export const FOCUS_STEPS = [
  ['Scope & recon', 'Map the real attack surface before testing starts.'],
  ['Web & API testing', 'Pair manual analysis with automated scanning — scanners alone miss the logic and business-rule flaws that matter.'],
  ['Validate impact', 'Confirm a finding is reproducible, meaningful, and safe to report.'],
  ['Clear reporting', 'Turn evidence into a practical path to remediation.'],
];

export const LOOP_STEPS = [
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

export const JOURNEY = [
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

export const SIGNALS = [
  ['I build', 'Tools I ship independently', 'CyberBuddy, VAPT Checklist, and ScriptSentry are live and open source. Each began with friction I encountered during real engagements.', Hammer],
  ['I go deeper', 'Where specifications meet behavior', 'I research how browsers behave in practice: CORS, JWT, CSP, client-side crypto, and script-level analysis.', Search],
  ['I share', 'Writing grounded in verification', 'My Medium articles are grounded in testing and reproduction, with tools that help demonstrate the point.', PenTool],
];

export const NOW_ITEMS = [
  {
    label: 'Building',
    detail: 'VAPT Checklist — a local-first VAPT workspace; web testing live, Android & iOS in beta.',
    href: LINKS.vaptLive,
    action: 'Live preview',
    tone: 'green',
    icon: Hammer,
  },
  {
    label: 'Open-sourcing',
    detail: 'ScriptSentry — a live, open-source JavaScript security intelligence platform.',
    href: LINKS.scriptSentryLive,
    action: 'Live preview',
    tone: 'violet',
    icon: Zap,
  },
  {
    label: 'Writing',
    detail: 'Write practical application security articles on topics across Web Application and API security, vulnerability research, and security testing.',
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

export const RESUME_DATA = {
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
      status: 'Live',
      description:
        'Visual JavaScript security and script-behavior intelligence platform \u2014 secrets, crypto keys, APIs, storage, DOM risks, obfuscation, and data flows analyzed through a motion-rich dashboard with 20+ detection modules. Runs 100% locally and is free and open source.',
    },
    {
      title: 'VAPT Checklist',
      links: {
        live: 'https://amitpal-cyberbuddy.github.io/VAPT-Checklist/',
        github: 'https://github.com/AmitPal-CyberBuddy/VAPT-Checklist',
      },
      status: 'Live',
      description:
        'Context-aware VAPT methodology, checklist, knowledge base, and local-first workspace \u2014 2,006 catalog checks organized into 631 test families and 52 scenario plans, with 48 connected attack paths and no telemetry.',
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

export const PROJECT_VISUALS = {
  live: {
    className: 'live',
    top: ['CyberBuddy // live', 'Local-first'],
    metrics: [['07', 'checks live'], ['NO ACCOUNT', 'no sign-up']],
    units: { total: 7, label: '07 / 07 checks online' },
    rows: [['CORS validation', 'evidence led'], ['Headers audit', 'policy signals'], ['JWT workbench', 'local only']],
    footer: ['Authorized testing only', 'Evidence-grade'],
    caption: ['Live · 7 tools', 'Local-first browser security'],
    aria: 'CyberBuddy live tool data',
  },
  release: {
    className: 'release',
    top: ['VAPT Checklist · live', 'Web live · Android/iOS beta'],
    metrics: [['2,006', 'catalog checks'], ['631', 'test families']],
    units: { total: 6, cells: ['S', 'D', 'P', 'T', 'R', 'R'], label: '6-stage loop · web live' },
    rows: [['52 plans', 'scenario-based'], ['48 attack paths', 'connected'], ['6-stage loop', 'scope → retest']],
    footer: ['Authorized testing only', 'Web live · mobile in beta'],
    caption: ['Live · VAPT workspace', 'Web testing · Android/iOS beta'],
    aria: 'VAPT Checklist live workspace data',
  },
  experiment: {
    className: 'experiment',
    top: ['ScriptSentry · live', 'Free & open source'],
    metrics: [['20+', 'detection modules'], ['100%', 'local analysis']],
    units: { total: 20, label: '20+ detection modules online' },
    rows: [['Secrets & crypto', 'key exposure'], ['DOM & storage', 'risk map'], ['Exports', 'HTML/TXT/CSV/SARIF']],
    footer: ['JavaScript security', 'Local analysis'],
    caption: ['Live · open source', 'JS security intelligence'],
    aria: 'ScriptSentry live open source data',
  },
};

export const PROJECT_EYEBROW_ICONS = { live: Zap, release: Layers3, experiment: TerminalSquare };
export const PROJECT_PRIMARY_BUTTONS = { live: 'button--violet', release: 'button--green', experiment: 'button--gold' };

export const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
export const MOTION_EASE = [0.16, 1, 0.3, 1];
