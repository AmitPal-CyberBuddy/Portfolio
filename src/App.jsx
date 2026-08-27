import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  Shield, Search, Code2, FileText, Award, MapPin, Clock, Mail,
  ExternalLink, ArrowUpRight, Zap, BookOpen, Hammer, Layers, PenTool, Sun, Moon,
  Sparkles, Target, Fingerprint, Globe, Terminal, Lightbulb, TrendingUp, Route
} from 'lucide-react';

function GithubIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
function LinkedinIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const LINKS = {
  github: "https://github.com/AmitPal-CyberBuddy",
  linkedin: "https://www.linkedin.com/in/amitpal-wb/",
  medium: "https://amitpxl.medium.com/",
  cyberbuddyLive: "https://amitpal-cyberbuddy.github.io/CyberBuddy/",
  vaptLive: "https://amitpal-cyberbuddy.github.io/VAPT-Checklist/",
  portfolioRepo: "https://github.com/AmitPal-CyberBuddy/Portfolio",
  email: "amitpal.secure@gmail.com",
};

const WRITING = [
  {
    title: "CORS Misconfiguration: When Reflecting the Origin Is Not the Whole Story",
    insight: "I learned reflection ≠ exploitation. Proving authenticated impact matters.",
    link: "https://amitpxl.medium.com/cors-misconfiguration-when-reflecting-the-origin-is-not-the-whole-story-956e2e6e18bc",
  },
  {
    title: "HTTP Request Smuggling vs Pipelining: Why They're Often Confused",
    insight: "I dug into why double responses in Repeater aren't always smuggling.",
    link: "https://amitpxl.medium.com/http-request-smuggling-vs-http-request-pipelining-why-theyre-often-confused-44ffe6e528eb",
  },
  {
    title: "How I Broke Client-Side Encryption By Frontend JavaScript Analysis",
    insight: "I found frontend JS is an attack surface, not just UI.",
    link: "https://amitpxl.medium.com/how-i-broke-encrypted-requests-by-reading-frontend-javascript-b016c5b9078d",
  },
];

function useCurrentTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }) + " IST");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  return [theme, toggle];
}

function Cursor({ activeSection }) {
  const dotRef = useRef(null);
  const cursorRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const mouse = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  // The dot, ring and label are painted WHITE and the CSS applies
  // `mix-blend-mode: difference`. Under `difference` the rendered colour is
  // |backdrop - source|, so a white source resolves to the complement of
  // whatever is underneath: near-black over cream, near-white over #050507.
  // That keeps the cursor legible on all 11 section surfaces in both themes.
  //
  // A BLACK source must never be used here: black is the identity element for
  // `difference` (|bg - 0| = bg), so it renders the cursor exactly the same
  // colour as the page and it disappears completely.
  const sectionTint = {
    focus: "rgba(110,255,229,0.12)",
    work: "rgba(0,255,157,0.12)",
    writing: "rgba(255,77,0,0.12)",
    journey: "rgba(138,92,255,0.12)",
    connect: "rgba(58,91,255,0.12)",
  };
  const tint = sectionTint[activeSection] || "rgba(255,255,255,0.08)";

  useEffect(() => {
    // Hide the native cursor only once this component is actually driving one.
    // If JS fails, the class is never added and the OS cursor stays available.
    document.documentElement.classList.add('custom-cursor-on');
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onHover = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) { setHover(true); setLabel(target.getAttribute('data-cursor') || "VIEW"); }
      else { setHover(false); setLabel(""); }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onHover);
    // Under reduced motion, snap the cursor instead of easing it.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    const animate = () => {
      const k1 = reduce ? 1 : 0.3;
      const k2 = reduce ? 1 : 0.12;
      dot.current.x += (mouse.current.x - dot.current.x) * k1;
      dot.current.y += (mouse.current.y - dot.current.y) * k1;
      cur.current.x += (mouse.current.x - cur.current.x) * k2;
      cur.current.y += (mouse.current.y - cur.current.y) * k2;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0)`;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${cur.current.x - 12}px, ${cur.current.y - 12}px, 0)`;
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onHover);
      document.documentElement.classList.remove('custom-cursor-on');
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ background: "white" }} />
      <div ref={cursorRef} className={`cursor ${hover ? 'hover' : ''}`} style={{ borderColor: hover ? "white" : "rgba(255,255,255,0.85)", background: hover ? tint : undefined, color: "white" }}>
        <span className="cursor-label">{label}</span>
      </div>
    </>
  );
}

// ———————————————————————————————
// VISUALS — Now with images + theme aware
// ———————————————————————————————

function HeroVisual({ theme }) {
  // "Observation -> Evidence": a single art-directed intercept artifact, not a
  // boxed stock image. It shows the signature moment of manual application
  // security work -- a request the automation marks safe but the logic does
  // not -- expected 403 vs observed 200. Specific, credible, and not a
  // flowchart, terminal, or particle field.
  const L = theme === 'light';
  const ink = L ? '#0A0A0F' : '#F5F3EF';
  const dim = L ? 'rgba(10,10,15,0.62)' : 'rgba(245,243,239,0.55)';
  const faint = L ? 'rgba(10,10,15,0.52)' : 'rgba(245,243,239,0.42)';
  const hair = L ? 'rgba(10,10,15,0.18)' : 'rgba(245,243,239,0.18)';
  const card = L ? '#FBF1DC' : '#0B0B12';
  const ok = L ? '#0A6B45' : '#00FF9D';      // observed -- confirmed impact
  const bad = L ? 'rgba(10,10,15,0.42)' : 'rgba(245,243,239,0.36)'; // expected
  const blue = L ? '#2B44C4' : '#6E8CFF';
  const mono = "var(--font-mono)";

  return (
    <div className="hero-evidence" aria-hidden="true">
      <div className="hero-evidence-card" style={{ background: card, borderColor: hair, color: ink }}>
        <div className="ev-scan" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: `1px solid ${hair}`, fontFamily: mono, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: dim }}>
          <span>Intercept #0417</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span className="ev-dot" style={{ background: blue }} />live</span>
        </div>

        <div style={{ padding: '14px 14px 10px', fontFamily: mono }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.02em', color: ink }}>
            <span style={{ padding: '2px 6px', background: blue, color: L ? '#FBF1DC' : '#050507', fontSize: '9px', letterSpacing: '0.1em' }}>GET</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>/api/admin/users</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap', fontFamily: mono, fontSize: '9px', letterSpacing: '0.08em', color: dim }}>
            <span style={{ border: `1px solid ${hair}`, padding: '2px 6px' }}>identity: user</span>
            <span style={{ border: `1px solid ${hair}`, padding: '2px 6px' }}>session: valid</span>
          </div>
        </div>

        <div style={{ padding: '4px 14px 12px', fontFamily: mono, fontSize: '11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', color: bad, textDecoration: 'line-through', textDecorationColor: faint }}>
            <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '9px' }}>expected</span>
            <span>403 Forbidden</span>
          </div>
          <div className="ev-observed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', border: `1px solid ${ok}`, color: ok }}>
            <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '9px', textDecoration: 'none' }}>observed</span>
            <span style={{ fontWeight: 700 }}>200 OK</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: '9px', letterSpacing: '0.1em', color: dim, textTransform: 'uppercase' }}>
            <span>authorization logic</span>
            <span style={{ color: ok }}>gap found</span>
          </div>
        </div>

        <div style={{ padding: '8px 14px', borderTop: `1px solid ${hair}`, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: faint }}>
          <span>evidence captured</span>
          <span>manual • beyond the scanner</span>
        </div>
      </div>
    </div>
  );
}

function VaptCinematic({ theme }) {
  const canvasRef = useRef(null);
  const [hover, setHover] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, w, h, dpr;
    const dots = [];
    let progress = 0;
    let dir = 1;
    let last = 0;
    let visible = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.5);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.length = 0;
      const count = isMobile ? 70 : 180;
      for (let i = 0; i < count; i++) {
        const cluster = i % 5;
        const cx = (cluster * w) / 5 + w / 10 + (Math.random() - 0.5) * 40;
        const cy = h * 0.5 + (Math.random() - 0.5) * h * 0.6;
        dots.push({
          ox: Math.random() * w, oy: Math.random() * h,
          tx: cx + (Math.random() - 0.5) * 24,
          ty: cy + (Math.random() - 0.5) * 18,
          r: Math.random() * 1.2 + 0.3,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) loop(0);
    }, { threshold: 0.2 });
    obs.observe(canvas);

    const loop = (t) => {
      if (!visible) { raf = null; return; }
      if (!last) last = t;
      const delta = (t - last) / 1000; last = t;
      const speed = hover ? 0.55 : 0.18;
      progress += delta * speed * dir;
      if (progress > 1.2) { progress = 1.2; dir = -1; }
      if (progress < -0.2) { progress = -0.2; dir = 1; }
      const p = Math.max(0, Math.min(1, progress));
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      ctx.clearRect(0, 0, w, h);

      if (p > 0.2) {
        ctx.strokeStyle = `rgba(0,255,157,${(p - 0.2) * (hover ? 0.45 : 0.25)})`;
        ctx.lineWidth = hover ? 1.5 : 1;
        ctx.setLineDash([8, 12]);
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        ctx.bezierCurveTo(w * 0.33, h * 0.5 - h * 0.2 * eased, w * 0.66, h * 0.5 + h * 0.15 * eased, w, h * 0.5);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      dots.forEach(d => {
        const x = d.ox + (d.tx - d.ox) * eased;
        const y = d.oy + (d.ty - d.oy) * eased;
        ctx.beginPath();
        ctx.arc(x, y, d.r * (hover ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,157,${0.2 + eased * (hover ? 0.8 : 0.6)})`;
        ctx.fill();
      });

      for (let i = 0; i < 5; i++) {
        const cx = (i * w) / 5 + w / 10;
        ctx.beginPath();
        ctx.arc(cx, h * 0.5, 2.5 + eased * (hover ? 4 : 2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,157,${0.5 + eased * 0.5})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, h * 0.5, 14 + eased * (hover ? 14 : 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,157,${0.08 + eased * (hover ? 0.16 : 0.08)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      obs.disconnect();
    };
  }, [hover, isMobile]);

  return (
    <div style={{ position: 'absolute', inset: 0 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <img src="/Portfolio/assets/vapt-workflow.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: theme === 'light' ? 0.12 : 0.28 }} />
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 2 }} aria-hidden="true" />
      <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
        <defs>
          <pattern id="gv" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,255,157,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gv)" />
        <g fontFamily="IBM Plex Mono" fontSize="9" fill="rgba(0,255,157,0.32)" letterSpacing="0.15em">
          <text x="32" y="36">VAPT CHECKLIST — IN DEVELOPMENT — {isMobile ? "SCROLL" : "HOVER"}</text>
          <text x="32" y="470">LIVE DEV — {hover ? "ORGANIZING..." : "STRUCTURED WORKFLOW"}</text>
        </g>
      </svg>
    </div>
  );
}

function ApproachMinimal({ theme }) {
  return (
    <section className="approach-mobile" style={{ position: 'relative', background: theme === 'light' ? '#FFF8EC' : 'var(--black)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '28px 48px', overflow: 'hidden' }}>
      <div className="approach-mobile-inner" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Route size={14} /> How I work
        </div>
        <div className="approach-steps" style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Search size={12} />Test<span style={{ color: 'var(--gray-500)', marginLeft: '8px' }}>→</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Hammer size={12} />Build<span style={{ color: 'var(--gray-500)', marginLeft: '8px' }}>→</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Lightbulb size={12} />Research<span style={{ color: 'var(--gray-500)', marginLeft: '8px' }}>→</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><PenTool size={12} />Write</span>
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '13px', color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={12} /> Identifying Vulnerabilities Before Attackers Do
        </div>
      </div>
    </section>
  );
}

function ProfessionalFocusMinimal({ theme }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section ref={ref} id="focus" className="journey-section" style={{ position: 'relative', background: theme === 'light' ? '#FBF2DF' : '#0A0A0F', color: theme === 'light' ? 'black' : 'white', padding: '100px 48px', borderTop: '1px solid var(--border)', overflow: 'hidden' }}>


      <div className="journey-responsive" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '80px' }}>
        <div className="journey-sticky" style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={14} color="#00FF9D" />
            Who I am today — 00
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            <span style={{ padding: '6px 10px', background: theme === 'light' ? '#0A5C36' : '#00FF9D', color: theme === 'light' ? '#FFFFFF' : '#04140C', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Security Analyst (VAPT) • Ampcus Cyber • Feb 2026 → Now</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
            <span style={{ display: 'block' }}>I DO</span>
            <span style={{ display: 'block' }}>PRACTICAL</span>
            <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: theme === 'light' ? '1px rgba(0,0,0,0.15)' : '1px rgba(255,255,255,0.2)' }}>APPSEC —</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, textTransform: 'none', color: theme === 'light' ? '#0A5C36' : 'var(--cyan)' }}>not just tools.</span>
          </h2>
          <p style={{ marginTop: '20px', fontFamily: 'var(--font-serif-2)', fontSize: '16px', lineHeight: 1.6, fontWeight: 300, color: theme === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', maxWidth: '360px' }}>
            I'm a Security Analyst in VAPT at Ampcus Cyber since Feb 2026. I do end-to-end testing — I understand systems, validate impact, and write clear reports.
          </p>
          <p style={{ marginTop: '12px', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.6, color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)', maxWidth: '360px' }}>
            <strong style={{ fontWeight: 600, color: theme === 'light' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)' }}>New here from LinkedIn?</strong> VAPT = Vulnerability Assessment &amp; Penetration Testing. I work on Web Application &amp; API Security — I scope, recon, test manually, validate impact, and write reports that give a clear path to fix.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ padding: '6px 10px', border: `1px solid ${theme === 'light' ? 'rgba(10,92,54,0.35)' : 'rgba(0,255,157,0.28)'}`, color: theme === 'light' ? '#0A5C36' : '#00FF9D', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}><Fingerprint size={10} /> Credible • Practical • Authorized only</span>
            <span style={{ padding: '6px 10px', border: '1px solid var(--border)', color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={10} /> Based Bengaluru • Roots WB</span>
          </div>
          <p style={{ marginTop: '16px', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5, color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.55)', maxWidth: '340px', display: 'flex', gap: '8px' }}>
            <Target size={14} style={{ flexShrink: 0, marginTop: '2px' }} color="#00FF9D" />
            I'm working across a growing range of client environments and APIs — Web & API focused.
          </p>
        </div>

        <div className="journey-timeline" style={{ position: 'relative', paddingLeft: '48px', borderLeft: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)' }}>
          <svg width="2" height="100%" viewBox="0 0 2 600" preserveAspectRatio="none" style={{ position: 'absolute', left: '-1px', top: 0, bottom: 0, width: '2px', height: '100%' }}>
            <line x1="1" y1="0" x2="1" y2="600" stroke={theme === 'light' ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"} strokeWidth="1" />
            <motion.path d="M1 0 L1 600" stroke="#00FF9D" strokeWidth="2" fill="none" strokeLinecap="round" style={{ pathLength }} />
          </svg>

          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: theme === 'light' ? '#0A5C36' : '#00FF9D', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><Layers size={12} /> How I test — end-to-end</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.4 }}>
              {[
                { step: "Scope & Recon", note: "understanding the attack surface" },
                { step: "Web & API Testing", note: "manual first, not scanner-only" },
                { step: "Manual Validation", note: "confirming it is real and reproducible" },
                { step: "Impact Analysis", note: "what it actually means for the business" },
                { step: "Reporting", note: "a clear path to fix" },
              ].map((s, i) => (
                <span key={i} style={{ padding: '8px 12px', border: '1px solid var(--border)', background: theme === 'light' ? (i === 0 ? 'rgba(0,255,157,0.08)' : 'white') : (i === 0 ? 'rgba(0,255,157,0.06)' : 'rgba(0,0,0,0.3)'), color: i === 0 ? (theme === 'light' ? '#0A5C36' : '#00FF9D') : (theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.6)'), display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {i > 0 && <span style={{ color: 'var(--gray-500)' }}>→</span>}
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span>{s.step}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0', textTransform: 'none', lineHeight: 1.3, color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)' }}>{s.note}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><Code2 size={12} /> What I focus on</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                "Web App Security",
                "API Security",
                "Auth & Logic",
                "OWASP Top 10",
                "Research & Tooling",
              ].map((f, i) => (
                <span key={i} style={{ padding: '6px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: '6px' }}><Shield size={10} />{f}</span>
              ))}
            </div>
          </div>

          <div style={{ padding: '20px', border: `1px solid ${theme === 'light' ? 'rgba(10,92,54,0.25)' : 'rgba(110,255,229,0.18)'}`, background: theme === 'light' ? 'rgba(0,255,157,0.05)' : 'rgba(110,255,229,0.03)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: theme === 'light' ? '#0A5C36' : '#6EFFE5', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Lightbulb size={12} /> What makes me different</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.6, color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.65)', maxWidth: '440px' }}>
              I don't just list skills. I test real systems, build tools that help me during engagements (CyberBuddy, VAPT Checklist), research edge cases, and write about spec vs reality.
            </div>
            <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {["Practice", "Building", "Learning", "Sharing"].map((p, i) => (
                <span key={i} style={{ padding: '4px 8px', border: '1px solid var(--border)', color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {i > 0 && <span style={{ color: 'var(--gray-500)' }}>→</span>}{p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LoopLabel({ color, children }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color, marginBottom: '8px' }}>{children}</div>
  );
}

function LoopPhase({ num, title, icon: Icon, color, hair, head, first, children }) {
  return (
    <div className="loop-phase" style={{ position: 'relative', padding: first ? '0 24px 0 0' : '0 24px', borderLeft: first ? 'none' : `1px solid ${hair}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color }}>{num}</span>
        <span style={{ flex: 1, height: '1px', background: hair }}></span>
        <Icon size={14} color={color} />
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', color: head, marginBottom: '14px' }}>{title}</div>
      {children}
    </div>
  );
}

function LearningLoop({ theme }) {
  // The learning engine behind the transition. Journey (below) already tells
  // APPLY; Growth Signals tells BUILD & SHARE. This section supplies the two
  // missing beats - LEARN and PRACTICE - and ties all four into one loop, so
  // the growth story reads as a system instead of a resume.
  const L = theme === 'light';
  const c = {
    bg: L ? '#FBF2DF' : '#0A0A0F',
    head: L ? 'black' : 'white',
    body: L ? 'rgba(10,10,15,0.66)' : 'rgba(245,243,239,0.6)',
    soft: L ? 'rgba(10,10,15,0.55)' : 'rgba(245,243,239,0.5)',
    faint: L ? 'rgba(10,10,15,0.52)' : 'rgba(245,243,239,0.42)',
    hair: L ? 'rgba(10,10,15,0.12)' : 'rgba(245,243,239,0.12)',
    accent: L ? '#4E27BF' : '#8A5CFF',
    blue: L ? '#2B44C4' : '#6E8CFF',
    green: L ? '#0A6B45' : '#00FF9D',
    gold: L ? '#7A5C00' : '#FFD60A',
    chipBg: L ? 'rgba(10,10,15,0.04)' : 'rgba(255,255,255,0.04)',
  };
  return (
    <section id="learning" style={{ position: 'relative', background: c.bg, color: c.body, padding: '100px 48px', borderTop: `1px solid ${c.hair}`, overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: c.soft, marginBottom: '24px' }}>
          <Lightbulb size={14} color={c.accent} />
          <span style={{ width: '24px', height: '1px', background: c.soft, display: 'inline-block' }}></span>
          How I got here — and keep going
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: c.head }}>THE LOOP</h2>
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(16px, 2vw, 22px)', color: c.accent }}>learn → practice → apply → build & share</span>
        </div>
        <p style={{ fontFamily: 'var(--font-serif-2)', fontSize: '15px', lineHeight: 1.6, fontWeight: 300, maxWidth: '640px', color: c.body, marginBottom: '56px' }}>
          The transition below didn't come from a single course. It came from running this loop — structured learning, deliberate practice in labs, real engagements, then building and writing about what survived. It still runs.
        </p>

        <div className="loop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
          <LoopPhase num="01" title="Learn" icon={BookOpen} color={c.accent} hair={c.hair} head={c.head} first>
            <LoopLabel color={c.accent}>Structured</LoopLabel>
            <div style={{ display: 'grid', gap: '10px', marginBottom: '18px' }}>
              {[
                ['API Penetration Testing', 'APIsec University • Jan 2026'],
                ['API Security Fundamentals ’25', 'APIsec University • Jan 2026'],
              ].map(([t, m], i) => (
                <div key={i} style={{ border: `1px solid ${c.hair}`, background: c.chipBg, padding: '10px 12px' }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: c.head }}>{t}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.08em', color: c.soft, marginTop: '4px', textTransform: 'uppercase' }}>{m}</div>
                </div>
              ))}
            </div>
            <LoopLabel color={c.faint}>Self-directed</LoopLabel>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.6, color: c.body, margin: 0 }}>
              Most of it is self-taught — documentation, research, and reading until the mental model is mine, not borrowed.
            </p>
          </LoopPhase>

          <LoopPhase num="02" title="Practice" icon={Terminal} color={c.blue} hair={c.hair} head={c.head}>
            <LoopLabel color={c.blue}>Hands-on labs</LoopLabel>
            <div style={{ border: `1px solid ${c.hair}`, background: c.chipBg, padding: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: c.head }}>135+</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', color: c.soft, textTransform: 'uppercase' }}>labs • and counting</span>
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: 1.5, color: c.body, marginTop: '6px' }}>
                PortSwigger Web Security Academy, plus lab environments like TryHackMe.
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.6, color: c.body, margin: 0 }}>
              I don't read about a flaw — I reproduce it in a lab first, so the theory has hands on it.
            </p>
          </LoopPhase>

          <LoopPhase num="03" title="Apply" icon={Target} color={c.green} hair={c.hair} head={c.head}>
            <LoopLabel color={c.green}>Real engagements</LoopLabel>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.6, color: c.body, margin: '0 0 14px' }}>
              End-to-end VAPT across web applications and APIs — where the practice meets real systems and real stakes.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', color: c.soft, textTransform: 'uppercase', marginBottom: '14px' }}>
              12+ clients • ~30 web apps • ~10 API collections
            </div>
            <a href="#journey" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.green, borderBottom: '1px solid currentColor', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>The transition ↓ <ArrowUpRight size={10} /></a>
          </LoopPhase>

          <LoopPhase num="04" title="Build & Share" icon={Hammer} color={c.gold} hair={c.hair} head={c.head}>
            <LoopLabel color={c.gold}>Compound it</LoopLabel>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.6, color: c.body, margin: '0 0 14px' }}>
              Friction from real work becomes tools — CyberBuddy, VAPT Checklist — and writing about only what I verified.
            </p>
            <a href="#writing" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.gold, borderBottom: '1px solid currentColor', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Writing & tools ↓ <ArrowUpRight size={10} /></a>
          </LoopPhase>
        </div>
      </div>
    </section>
  );
}

function TransitionMinimal({ theme }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 30%"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });

  return (
    <section ref={ref} id="journey" className="journey-section" style={{ position: 'relative', background: theme === 'light' ? '#FFF8EC' : '#0A0A0F', color: theme === 'light' ? '#0A0A0F' : 'white', padding: '100px 48px', borderTop: '1px solid var(--border)', overflow: 'hidden' }}>


      <div className="journey-responsive" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '80px' }}>
        <div className="journey-sticky" style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Route size={14} color="#8A5CFF" />
            <span style={{ width: '24px', height: '1px', background: 'var(--gray-500)', display: 'inline-block' }}></span>
            My transition — Nov 2023 → Feb 2026
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
            <span style={{ display: 'block' }}>FROM</span>
            <span style={{ display: 'block' }}>RESEARCH</span>
            <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: theme === 'light' ? '1px rgba(0,0,0,0.15)' : '1px rgba(255,255,255,0.15)' }}>TO</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, textTransform: 'none', color: '#8A5CFF' }}>security.</span>
          </h2>
          <p style={{ marginTop: '20px', fontFamily: 'var(--font-serif-2)', fontSize: '16px', lineHeight: 1.6, fontWeight: 300, color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.65)', maxWidth: '380px' }}>
            For someone new: I joined Ampcus Cyber in Nov 2023 as a fresher in research & analysis (OSINT, market research, target profiling). That attention to detail became my foundation. In Feb 2026, I transitioned into VAPT as Security Analyst — hands-on technical work I wanted.
          </p>
          <p style={{ marginTop: '12px', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5, color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.55)', maxWidth: '380px' }}>
            Research & analysis → Professional growth → Cybersecurity transition → Security testing → Independent building & research. Not a résumé timeline, but the pattern matters.
          </p>
        </div>

        <div className="journey-timeline" style={{ position: 'relative', paddingLeft: '48px', borderLeft: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)' }}>
          <svg width="2" height="100%" viewBox="0 0 2 800" preserveAspectRatio="none" style={{ position: 'absolute', left: '-1px', top: 0, bottom: 0, width: '2px', height: '100%' }}>
            <line x1="1" y1="0" x2="1" y2="800" stroke={theme === 'light' ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"} strokeWidth="1" />
            <motion.path d="M1 0 L1 800" stroke="#8A5CFF" strokeWidth="2" fill="none" strokeLinecap="round" style={{ pathLength }} />
          </svg>

          {[
            {
              year: "NOV 2023 — I JOINED AS FRESHER",
              title: "Ampcus Cyber — Lead Generation Executive",
              desc: "I joined as a fresher. From Dec 2023 to Jan 2026, I focused on research, OSINT, market research, target profiling, and structuring information. That attention to detail became my foundation for security.",
              num: "01",
              icon: Search,
              muted: true,
            },
            {
              year: "2024 → EARLY 2025 — MY RECOGNITION",
              title: "Performance Recognition — Rewards & Recognition",
              desc: "My work in 2024 was recognized at Ampcus Cyber's Rewards & Recognition in early 2025. For me it was: joined as fresher → gained experience → delivered consistently → got recognized.",
              num: "02",
              icon: Award,
              muted: false,
            },
            {
              year: "FEB 2026 — MY TRANSITION",
              title: "VAPT Team — Security Analyst",
              desc: "I moved into the VAPT team as a Security Analyst. My path: research & analysis → deliberate learning → cybersecurity transition. I wanted hands-on technical work.",
              num: "03",
              icon: Shield,
              muted: false,
              highlight: true,
            },
            {
              year: "Q1 2026 — I TOOK OWNERSHIP",
              title: "Performer of the Quarter — VAPT",
              desc: "Right after transitioning, I focused on learning fast and taking ownership. I was named Performer of the Quarter in Q1 2026 — for me, it meant ownership, not just an award.",
              num: "04",
              icon: TrendingUp,
              muted: false,
            },
          ].map((node, i) => {
            const Icon = node.icon;
            return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} style={{ position: 'relative', paddingBottom: i === 3 ? 0 : '80px', opacity: node.muted ? 0.7 : 1 }}>
              <div className="journey-dot" style={{ position: 'absolute', left: '-53px', top: '4px', width: node.highlight ? '12px' : '10px', height: node.highlight ? '12px' : '10px', borderRadius: '50%', background: node.highlight ? '#8A5CFF' : node.muted ? (theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)') : 'var(--electric-blue)', boxShadow: node.highlight ? '0 0 20px #8A5CFF' : node.muted ? 'none' : '0 0 20px var(--electric-blue)' }} />
              <div style={{ position: 'absolute', right: '0', top: '-12px', fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 800, lineHeight: 1, color: theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)', pointerEvents: 'none' }}>{node.num}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: node.highlight ? '#8A5CFF' : node.muted ? 'rgba(128,128,128,0.8)' : 'var(--electric-blue)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Icon size={12} />{node.year}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '12px', color: theme === 'light' ? (node.muted ? 'rgba(0,0,0,0.7)' : 'black') : (node.muted ? 'rgba(255,255,255,0.7)' : 'white') }}>{node.title}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.6, color: theme === 'light' ? 'rgba(0,0,0,0.6)' : (node.muted ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.65)'), maxWidth: '440px' }}>{node.desc}</div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}

function ExperimentsMinimal({ theme }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [20, -20]);

  return (
    <section ref={ref} className="experiments-section" style={{ position: 'relative', background: theme === 'light' ? '#FBF2DF' : '#0A0A0F', borderTop: '1px solid var(--border)', padding: '80px 48px', overflow: 'hidden' }}>

      <div className="project-responsive experiments-grid" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '48px', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Terminal size={14} />
            <span style={{ width: '24px', height: '1px', background: 'var(--gray-500)', display: 'inline-block' }}></span>
            My other experiments — ScriptSentry — Python
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', color: theme === 'light' ? 'black' : 'white' }}>
            <span style={{ display: 'block' }}>I WATCH</span>
            <span style={{ display: 'block' }}>EVERY LINE.</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, textTransform: 'none', color: 'var(--gold)', fontSize: '0.85em' }}>I detect every risk.</span>
          </h3>
          <p style={{ marginTop: '20px', fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.6, color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)', maxWidth: '400px' }}>
            I built ScriptSentry as an experiment — Python tooling for script analysis. Watch every line, detect every risk. It's part of my broader tooling research beyond browser tools.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="https://github.com/AmitPal-CyberBuddy/ScriptSentry" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 16px', border: '1px solid rgba(255,214,10,0.25)', color: theme === 'light' ? '#8A5C00' : '#FFD60A', background: theme === 'light' ? 'rgba(255,214,10,0.12)' : 'transparent', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }} data-cursor="GITHUB"><GithubIcon size={12} /> ScriptSentry — GitHub ↗</a>
            <span style={{ padding: '10px 16px', border: '1px solid var(--border)', color: 'var(--gray-500)', fontFamily: 'var(--font-mono)', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><Code2 size={12} />Python • Experimental • 2026</span>
          </div>
        </div>
        <motion.div style={{ y, position: 'relative', border: '1px solid rgba(255,214,10,0.12)', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)', padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '10px', lineHeight: 1.6, color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.55)' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFD60A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Lightbulb size={10} /> Why I built this</div>
          <div>I'm exploring beyond browser security — line-by-line risk detection. I test real systems, build what helps during my engagements, research, write, repeat.</div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 8px', border: '1px solid rgba(255,214,10,0.2)', color: '#FFD60A', fontSize: '9px', display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={10} />EXPERIMENTAL</span>
            <span style={{ padding: '4px 8px', border: '1px solid var(--border)', fontSize: '9px' }}>PYTHON</span>
            <span style={{ padding: '4px 8px', border: '1px solid var(--border)', fontSize: '9px' }}>SCRIPT ANALYSIS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ManifestoLine({ theme }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <div ref={ref} style={{ position: 'absolute', left: '48px', top: '50%', width: '1px', height: '200px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
      <svg width="1" height="200" viewBox="0 0 1 200" preserveAspectRatio="none" style={{ width: '1px', height: '200px' }}>
        <line x1="0.5" y1="0" x2="0.5" y2="200" stroke={theme === 'light' ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)"} strokeWidth="1" />
        <motion.path d="M0.5 0 L0.5 200" stroke="#6EFFE5" strokeWidth="1" fill="none" style={{ pathLength }} />
      </svg>
    </div>
  );
}

function WritingCinematic({ theme }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <img src="/Portfolio/assets/writing-research.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: theme === 'light' ? 0.12 : 0.06 }} />
    </div>
  );
}

function MilestoneMinimal({ theme }) {
  // Light mode gets its own treatment instead of reusing the dark panel.
  // The accents are darkened for it: #FFD60A measures 1.15 and #00FF9D 1.08
  // against paper, i.e. invisible. Dark mode keeps the originals.
  const L = theme === 'light';
  const c = {
    bg: L ? '#FBF2DF' : '#0A0A0F',
    text: L ? '#14120E' : 'white',
    body: L ? 'rgba(20,18,14,0.68)' : 'rgba(255,255,255,0.6)',
    muted: L ? 'rgba(20,18,14,0.52)' : 'rgba(255,255,255,0.45)',
    soft: L ? 'rgba(20,18,14,0.62)' : 'rgba(255,255,255,0.5)',
    quote: L ? 'rgba(20,18,14,0.9)' : 'rgba(255,255,255,0.9)',
    hair: L ? 'rgba(20,18,14,0.14)' : 'rgba(255,255,255,0.06)',
    stroke: L ? 'rgba(20,18,14,0.22)' : 'rgba(255,255,255,0.2)',
    goldStroke: L ? 'rgba(122,92,0,0.45)' : 'rgba(255,214,10,0.3)',
    gold: L ? '#7A5C00' : '#FFD60A',
    purple: L ? '#4E27BF' : '#8A5CFF',
    green: L ? '#0A6B45' : '#00FF9D',
  };
  return (
    <section className="milestone-section" style={{ position: 'relative', background: c.bg, color: c.text, padding: '100px 48px', borderTop: `1px solid ${c.hair}`, overflow: 'hidden' }}>


      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '80px', marginBottom: '80px' }} className="milestone-responsive">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Award size={14} color={c.gold} />
              <span style={{ width: '24px', height: '1px', background: 'var(--gray-500)', display: 'inline-block' }}></span>
              Beyond the timeline — how I keep growing
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
              <span style={{ display: 'block' }}>MY</span>
              <span style={{ display: 'block' }}>GROWTH</span>
              <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: `1px ${c.goldStroke}` }}>SIGNALS</span>
            </div>
            <p style={{ marginTop: '16px', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5, color: c.soft, maxWidth: '300px' }}>
              Recognition and the transition itself are in Journey above. These are the signals that sit on top of it — the things I add on my own.
            </p>
          </div>
          <div style={{ display: 'grid', gap: '0' }}>
            {[
              {
                year: "SIGNAL 01 — I BUILD",
                title: "Tools I ship on my own time",
                desc: "CyberBuddy is live — browser security checks under one roof, 100% local. VAPT Checklist is in active development. Neither was assigned to me; both came from friction I hit during real engagements.",
                tag: "INITIATIVE • SHIPPED",
                color: c.gold,
                icon: Hammer,
              },
              {
                year: "SIGNAL 02 — I GO DEEPER",
                title: "Spec vs reality — browser internals",
                desc: "I research what browsers actually do versus what the specs say — CORS, JWT, CSP, client-side crypto. ScriptSentry is my Python experiment in script-level analysis. Depth I add on top of the day job.",
                tag: "RESEARCH • SELF-DIRECTED",
                color: c.purple,
                icon: Search,
              },
              {
                year: "SIGNAL 03 — I SHARE",
                title: "Writing only what I verified",
                desc: "I publish on Medium only what I have tested and reproduced myself. Each piece connects back to a tool I built to prove the point, so the writing and the work stay honest to each other.",
                tag: "WRITING • VERIFIED",
                color: c.green,
                icon: PenTool,
              },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }} style={{ padding: '28px 0', borderTop: `1px solid ${c.hair}`, borderBottom: `1px solid ${c.hair}`, marginBottom: '-1px', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, lineHeight: 1.5 }}>
                  <div style={{ color: m.color, marginBottom: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><Icon size={12} />{m.year}</div>
                  <div style={{ padding: '4px 8px', border: `1px solid ${m.color}40`, color: m.color, width: 'fit-content', fontSize: '10px' }}>{m.tag}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{m.title}</div>
                  <div style={{ marginTop: '10px', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5, color: c.body, maxWidth: '520px' }}>{m.desc}</div>
                </div>
              </motion.div>
            )})}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '80px', borderTop: `1px solid ${c.hair}`, paddingTop: '60px' }} className="milestone-responsive">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={14} />
              <span style={{ width: '24px', height: '1px', background: 'var(--gray-500)', display: 'inline-block' }}></span>
              How I handle appreciation
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: `1px ${c.stroke}` }}>MY IMPACT</div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.3, fontStyle: 'italic', maxWidth: '600px', position: 'relative', zIndex: 2, color: c.quote }}>
              "Your team's professionalism and clarity made the difference. The report was not just findings — it was a clear path to fix things."
            </div>
            <div style={{ marginTop: '16px', fontFamily: 'var(--font-sans)', fontSize: '13px', color: c.soft, lineHeight: 1.5, maxWidth: '440px', display: 'flex', gap: '8px' }}>
              <Target size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
              I got this feedback on a SaaS assessment — multi-tenant, JWT, GraphQL. I adapted my checklist as scope expanded.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CyberBuddyCinematic({ theme }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -30]);

  return (
    <div ref={ref} className="project-visual-mobile" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img src="/Portfolio/assets/cyberbuddy-tools.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: theme === 'light' ? 0.12 : 0.28 }} />
      <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="gc" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(138,92,255,0.07)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="cyGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#8A5CFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0F0A1A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gc)" />
        <rect width="100%" height="100%" fill="url(#cyGlow)" />
        <g fontFamily="IBM Plex Mono" fontSize="9" fill="rgba(138,92,255,0.35)" letterSpacing="0.14em">
          <text x="32" y="36">I BUILT BROWSER SECURITY — EVIDENCE-GRADE — LOCAL-FIRST</text>
          <text x="32" y="570">07 TOOLS — LIVE — AUTHORIZED TESTING ONLY</text>
        </g>
      </svg>

      <motion.div
        className="browser-win"
        onMouseEnter={() => setHovered(1)}
        onMouseLeave={() => setHovered(null)}
        style={{ y: y1, position: 'absolute', left: '8%', top: '18%', width: '42%', aspectRatio: '16/10', border: `1px solid ${hovered === 1 ? 'rgba(138,92,255,0.45)' : 'rgba(138,92,255,0.18)'}`, background: hovered === 1 ? 'rgba(15,10,26,0.92)' : 'rgba(15,10,26,0.8)', backdropFilter: 'blur(16px)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'all 0.3s ease', boxShadow: hovered === 1 ? '0 20px 60px rgba(138,92,255,0.25)' : 'none', transform: hovered === 1 ? 'translateY(-4px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5F56' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27C93F' }} />
          <div style={{ marginLeft: 'auto', fontFamily: 'IBM Plex Mono', fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '4px' }}><Shield size={10} /> CLICKJACKING • HEADERS • CORS</div>
        </div>
        <div style={{ flex: 1, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.55)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ height: '6px', width: '60%', background: 'rgba(138,92,255,0.3)' }} />
          <div style={{ height: '4px', width: '90%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ height: '4px', width: '75%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
            <div style={{ padding: '4px 8px', border: '1px solid rgba(0,255,157,0.3)', color: '#00FF9D', fontFamily: 'IBM Plex Mono', fontSize: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><Fingerprint size={10} />A — SECURE</div>
            <div style={{ padding: '4px 8px', border: '1px solid rgba(255,77,0,0.3)', color: '#FF4D00', fontFamily: 'IBM Plex Mono', fontSize: '8px' }}>CORS — HIGH</div>
          </div>
          <div style={{ marginTop: 'auto', height: '32px', border: '1px dashed rgba(138,92,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'IBM Plex Mono', fontSize: '8px', color: 'rgba(138,92,255,0.6)' }}>I BUILT LIVE FRAME-TEST — VISUAL POC</div>
        </div>
      </motion.div>

      <motion.div
        className="browser-win-2"
        onMouseEnter={() => setHovered(2)}
        onMouseLeave={() => setHovered(null)}
        style={{ y: y2, position: 'absolute', right: '8%', top: '28%', width: '36%', aspectRatio: '4/3', border: `1px solid ${hovered === 2 ? 'rgba(255,92,161,0.4)' : 'rgba(255,92,161,0.18)'}`, background: hovered === 2 ? 'rgba(15,10,26,0.95)' : 'rgba(15,10,26,0.85)', backdropFilter: 'blur(16px)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'all 0.3s ease', boxShadow: hovered === 2 ? '0 20px 60px rgba(255,92,161,0.2)' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'IBM Plex Mono', fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Code2 size={10} />MY JWT WORKBENCH — LOCAL ONLY</span>
          <span style={{ color: '#00FF9D' }}>● LOCAL</span>
        </div>
        <div style={{ flex: 1, background: 'rgba(0,0,0,0.62)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px', fontFamily: 'IBM Plex Mono', fontSize: '9px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)' }}>
          <div style={{ color: '#8A5CFF' }}>eyJhbGciOiJIUzI1NiIs...</div>
          <div style={{ color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>{"{ payload: { sub: '...' } }"}</div>
          <div style={{ marginTop: '12px', display: 'flex', gap: '6px' }}>
            <div style={{ padding: '3px 6px', background: 'rgba(0,255,157,0.12)', border: '1px solid rgba(0,255,157,0.2)', color: '#00FF9D', fontSize: '7px' }}>DECODE</div>
            <div style={{ padding: '3px 6px', background: 'rgba(138,92,255,0.12)', border: '1px solid rgba(138,92,255,0.2)', color: '#8A5CFF', fontSize: '7px' }}>VERIFY</div>
            <div style={{ padding: '3px 6px', background: 'rgba(255,92,161,0.12)', border: '1px solid rgba(255,92,161,0.2)', color: '#FF5CA1', fontSize: '7px' }}>TEST</div>
          </div>
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '7px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>I ENSURE NO TOKEN EVER LEAVES BROWSER</div>
      </motion.div>

      <motion.div
        className="browser-win-3"
        onMouseEnter={() => setHovered(3)}
        onMouseLeave={() => setHovered(null)}
        style={{ y: y3, position: 'absolute', left: '22%', bottom: '16%', width: '28%', aspectRatio: '16/9', border: `1px solid ${hovered === 3 ? 'rgba(110,255,229,0.35)' : 'rgba(110,255,229,0.15)'}`, background: hovered === 3 ? 'rgba(10,10,15,0.92)' : 'rgba(10,10,15,0.8)', backdropFilter: 'blur(16px)', padding: '10px', transition: 'all 0.3s ease', boxShadow: hovered === 3 ? '0 16px 40px rgba(110,255,229,0.15)' : 'none' }}>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '8px', color: 'rgba(110,255,229,0.6)', letterSpacing: '0.12em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><Hammer size={10} />MY CSRF POC GENERATOR — LOCAL</div>
        <div style={{ height: '4px', width: '80%', background: 'rgba(255,255,255,0.08)', marginBottom: '6px' }} />
        <div style={{ height: '4px', width: '60%', background: 'rgba(255,255,255,0.06)', marginBottom: '12px' }} />
        <div style={{ border: '1px solid rgba(110,255,229,0.2)', padding: '6px', fontFamily: 'IBM Plex Mono', fontSize: '7px', color: 'rgba(110,255,229,0.6)', textAlign: 'center' }}>&lt;form hidden&gt; … I KEEP 100% LOCAL</div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [copyShow, setCopyShow] = useState(false);
  const [hoveredWriting, setHoveredWriting] = useState(null);
  const [theme, toggleTheme] = useTheme();
  const time = useCurrentTime();
  const isMobileGlobal = useIsMobile();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  // The nav starts visually integrated with the hero, then gains its surface
  // over the first 2% of page scroll so content never appears to collide with
  // it. Interpolated rather than toggled, so it eases in instead of popping.
  const navSurface = useTransform(scrollYProgress, [0, 0.02], [0, 1]);
  // Connect is a full-bleed closer. Dark mode keeps the near-black panel;
  // light mode gets its own designed surface instead of reusing it.
  const isLight = theme === 'light';
  const cx = {
    bg: isLight ? '#FBF2DF' : '#0A0A0F',
    text: isLight ? '#0A0A0F' : 'white',
    body: isLight ? 'rgba(10,10,15,0.72)' : 'rgba(255,255,255,0.7)',
    soft: isLight ? 'rgba(10,10,15,0.58)' : 'rgba(255,255,255,0.55)',
    muted: isLight ? 'rgba(10,10,15,0.48)' : 'rgba(255,255,255,0.45)',
    faint: isLight ? 'rgba(10,10,15,0.42)' : 'rgba(255,255,255,0.5)',
    hair: isLight ? 'rgba(10,10,15,0.14)' : 'rgba(255,255,255,0.08)',
    box: isLight ? 'rgba(10,10,15,0.05)' : 'rgba(255,255,255,0.02)',
    boxBd: isLight ? 'rgba(10,10,15,0.16)' : 'rgba(255,255,255,0.12)',
    stroke: isLight ? 'rgba(10,10,15,0.22)' : 'rgba(255,255,255,0.2)',
    ghost: isLight ? 'rgba(10,10,15,0.05)' : 'rgba(255,255,255,0.02)',
    purple: isLight ? '#4E27BF' : '#8A5CFF',
    purpleBd: isLight ? 'rgba(78,39,191,0.32)' : 'rgba(138,92,255,0.25)',
    green: isLight ? '#0A6B45' : '#00FF9D',
    greenBd: isLight ? 'rgba(10,107,69,0.32)' : 'rgba(0,255,157,0.25)',
    blue: isLight ? '#2B44C4' : 'var(--electric-blue)',
  };
  // Shared per-mode palettes so Writing/Now stay inside the mode's world.
  const w = {
    bg: isLight ? '#FFF8EC' : '#0A0A0F',
    ink: isLight ? '#0A0A0F' : '#F5F3EF',
    body: isLight ? 'rgba(10,10,15,0.66)' : 'rgba(245,243,239,0.66)',
    soft: isLight ? 'rgba(10,10,15,0.62)' : 'rgba(245,243,239,0.62)',
    faint: isLight ? 'rgba(10,10,15,0.55)' : 'rgba(245,243,239,0.5)',
    hair: isLight ? 'rgba(10,10,15,0.1)' : 'rgba(245,243,239,0.1)',
    orange: isLight ? '#B03400' : '#FF8A5C',
    featBg: isLight ? '#FFFEF9' : '#101018',
    quote: isLight ? 'rgba(10,10,15,0.05)' : 'rgba(245,243,239,0.07)',
    quoteH: isLight ? 'rgba(10,10,15,0.08)' : 'rgba(245,243,239,0.11)',
  };
  const n = {
    bg: isLight ? '#FFF8EC' : '#050507',
    ink: isLight ? '#0A0A0F' : '#F5F3EF',
    body: isLight ? 'rgba(10,10,15,0.66)' : 'rgba(245,243,239,0.66)',
    soft: isLight ? 'rgba(10,10,15,0.62)' : 'rgba(245,243,239,0.62)',
    faint: isLight ? 'rgba(10,10,15,0.55)' : 'rgba(245,243,239,0.5)',
    hair: isLight ? 'rgba(10,10,15,0.08)' : 'rgba(245,243,239,0.1)',
    purple: isLight ? '#4E27BF' : '#8A5CFF',
    gold: isLight ? '#7A5C00' : '#FFD60A',
  };
  const heroRef = useRef(null);
  const workHeaderRef = useRef(null);
  const connectRef = useRef(null);
  const [connectMouse, setConnectMouse] = useState({ x: 0, y: 0 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: workProgress } = useScroll({ target: workHeaderRef, offset: ["start end", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "16%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const buildFill = useTransform(workProgress, [0, 1], ["0%", "100%"]);
  const buildOpacity = useTransform(workProgress, [0, 0.5, 1], [0.02, 0.06, 0.02]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    const sections = ["top", "focus", "work", "writing", "journey", "now", "connect"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-30% 0px -70% 0px", threshold: 0 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [loading]);

  const copyEmail = () => {
    navigator.clipboard.writeText(LINKS.email).then(() => {
      setCopyShow(true);
      setTimeout(() => setCopyShow(false), 2000);
    });
  };

  const magneticRef = useRef(null);
  const magneticInnerRef = useRef(null);
  useEffect(() => {
    const wrap = magneticRef.current;
    const inner = magneticInnerRef.current;
    if (!wrap || !inner) return;
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      inner.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => { inner.style.transform = `translate(0px, 0px)`; };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, [loading]);

  useEffect(() => {
    const el = connectRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      setConnectMouse({ x: (e.clientX - rect.left - rect.width / 2) / 30, y: (e.clientY - rect.top - rect.height / 2) / 30 });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="noise" />
      <Cursor activeSection={activeSection} />
      <motion.div className="scroll-progress" style={{ scaleX, backgroundColor: { top: "#3A5BFF", work: "#00FF9D", writing: "#FF4D00", journey: "#3A5BFF", now: "#111", connect: "#3A5BFF" }[activeSection] || "#3A5BFF" }} />

      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            style={{ position: 'fixed', inset: 0, background: theme === 'light' ? '#FFF8EC' : 'var(--black)', zIndex: 9998, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6vw', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', left: '-2%', top: '18%', fontFamily: 'var(--font-display)', fontSize: '10vw', fontWeight: 800, lineHeight: 0.8, letterSpacing: '-0.06em', color: theme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.015)', textTransform: 'uppercase', whiteSpace: 'nowrap', pointerEvents: 'none', overflow: 'hidden' }}>
              TRAILER • NOT MOVIE • CURATED
            </div>
            <div className="loader-top" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 'auto', position: 'relative', zIndex: 2 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Fingerprint size={12} /> I'm Amit Pal — Application Security — 2026</span>
              <span>Loading my experience</span>
            </div>
            <div className="loader-main" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(48px, 14vw, 180px)', lineHeight: 0.85, letterSpacing: '-0.04em', textTransform: 'uppercase', position: 'relative', zIndex: 2, color: theme === 'light' ? 'black' : 'white' }}>
              <span style={{ display: 'block', overflow: 'hidden' }}><motion.i initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ display: 'block', fontStyle: 'normal' }}>AMIT</motion.i></span>
              <span style={{ display: 'block', overflow: 'hidden' }}><motion.i initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} style={{ display: 'block', fontStyle: 'normal', color: 'transparent', WebkitTextStroke: theme === 'light' ? '1px rgba(0,0,0,0.3)' : '1px rgba(255,255,255,0.3)' }}>PAL</motion.i></span>
            </div>
            <div className="loader-bar" style={{ marginTop: '8vh', height: '1px', background: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', zIndex: 2 }}>
              <motion.div className="loader-progress" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100%', background: 'var(--electric-blue)', transformOrigin: 'left' }} />
            </div>
            <div className="loader-bottom" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gray-500)', letterSpacing: '0.05em', position: 'relative', zIndex: 2 }}>
              <span>VAPT • WEB & API • SECURITY TOOLING • RESEARCH • WRITING</span>
              <span>2026 — Curated</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <a href="#main" className="skip-link">Skip to content</a>

          <nav className="nav" role="navigation" aria-label="Main">
            <motion.div className="nav-surface" aria-hidden="true" style={{ opacity: navSurface }} />
            <a href="#" className="nav-logo" data-cursor="HOME" aria-label="Home" style={{ color: theme === 'light' ? 'black' : 'white' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Shield size={14} /> AMIT</span><span>PAL</span>
            </a>
            <div className="nav-links" style={{ color: theme === 'light' ? 'black' : 'white' }}>
              <a href="#focus" data-cursor="FOCUS" className={activeSection === "focus" ? "active" : ""} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Shield size={12} />Focus</a>
              <a href="#work" data-cursor="PROJECTS" className={activeSection === "work" ? "active" : ""} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Hammer size={12} />Projects</a>
              <a href="#writing" data-cursor="READ" className={activeSection === "writing" ? "active" : ""} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={12} />Writing</a>
              <a href="#journey" data-cursor="PATH" className={activeSection === "journey" ? "active" : ""} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Route size={12} />Journey</a>
              <a href="#now" data-cursor="NOW" className={activeSection === "now" ? "active" : ""} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />Now</a>
              <a href="#connect" data-cursor="CONNECT" className={activeSection === "connect" ? "active" : ""} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} />Connect</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} style={{ width: '40px', height: '40px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme === 'light' ? 'black' : 'white', color: theme === 'light' ? 'white' : 'black', borderRadius: '50%' }} data-cursor={theme === 'dark' ? 'LIGHT' : 'DARK'}>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <div className="nav-time" style={{ color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }}>{time}</div>
              <button className="mobile-nav-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle nav" aria-expanded={mobileOpen} style={{ color: theme === 'light' ? 'black' : 'white', borderColor: theme === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)' }}>
                {mobileOpen ? "CLOSE" : "MENU"}
              </button>
            </div>
          </nav>

          <div className={`mobile-nav ${mobileOpen ? "open" : ""}`} role="dialog" aria-modal="true" style={{ background: theme === 'light' ? '#FFF8EC' : 'var(--black)', color: theme === 'light' ? 'black' : 'white' }}>
            <div className="mobile-nav-links">
              <a href="#focus" onClick={() => setMobileOpen(false)}><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={20} />Focus</span><span>00 — Who I am now</span></a>
              <a href="#work" onClick={() => setMobileOpen(false)}><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Hammer size={20} />Projects</span><span>01 — What I build</span></a>
              <a href="#writing" onClick={() => setMobileOpen(false)}><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={20} />Writing</span><span>02 — Research log</span></a>
              <a href="#journey" onClick={() => setMobileOpen(false)}><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Route size={20} />Journey</span><span>03 — How I got here</span></a>
              <a href="#now" onClick={() => setMobileOpen(false)}><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={20} />Now</span><span>04 — What I'm doing now</span></a>
              <a href="#connect" onClick={() => setMobileOpen(false)}><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={20} />Connect</span><span>05 — Let's build</span></a>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <button onClick={toggleTheme} style={{ padding: '12px 16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>{theme === 'dark' ? <><Sun size={14} /> Light mode</> : <><Moon size={14} /> Dark mode</>}</button>
            </div>
            <div className="mobile-nav-footer">
              <div>I'm Amit Pal — Application Security</div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GithubIcon size={12} />GitHub</a>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><LinkedinIcon size={12} />LinkedIn</a>
                <a href={LINKS.medium} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FileText size={12} />Medium</a>
                <a href={`mailto:${LINKS.email}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} />Email</a>
              </div>
            </div>
          </div>

          <div className={`copy-feedback ${copyShow ? "show" : ""}`} role="status" aria-live="polite">
            Copied — {LINKS.email}
          </div>

          {/* ——— HERO ——— */}
          <section className="hero" id="top" ref={heroRef} style={{ background: theme === 'light' ? '#FFF8EC' : 'var(--black)', color: theme === 'light' ? 'black' : 'white' }}>
            <div className="hero-grid" style={{ opacity: theme === 'light' ? 0.04 : 0.08 }} />
            <motion.div className="hero-glow" style={{ y: heroY, background: theme === 'light' ? 'radial-gradient(circle, rgba(58,91,255,0.12) 0%, rgba(110,255,229,0.06) 30%, transparent 70%)' : 'radial-gradient(circle, rgba(58,91,255,0.15) 0%, rgba(110,255,229,0.08) 30%, transparent 70%)' }} />
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              <motion.div style={{ y: heroY, position: 'absolute', left: '-2%', top: '8%', fontFamily: 'var(--font-display)', fontSize: '12vw', fontWeight: 800, lineHeight: 0.8, letterSpacing: '-0.06em', color: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.015)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                FIND THE GAP • PROVE THE IMPACT
              </motion.div>
            </div>
            <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>
              <div className="hero-left" id="main">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <div style={{ width: '36px', height: '36px', border: '1px solid rgba(110,255,229,0.2)', padding: '6px', background: theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px', color: theme === 'light' ? 'black' : 'white' }}>
                    AP
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: theme === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ width: '24px', height: '1px', background: 'var(--cyan)', display: 'inline-block' }}></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Shield size={10} /> Amit Pal — Security Analyst (VAPT) • Ampcus Cyber</span>
                  </div>
                </div>
                <h1 className="hero-title" style={{ color: theme === 'light' ? 'black' : 'white' }}>
                  <span className="hero-title-line"><motion.span initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}>FIND THE GAP.</motion.span></span>
                  <span className="hero-title-line hero-title-line--sub outline" style={{ WebkitTextStroke: theme === 'light' ? '1px rgba(0,0,0,0.35)' : '1px rgba(255,255,255,0.45)' }}><motion.span initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}>PROVE THE IMPACT.</motion.span></span>
                </h1>
                <div className="hero-tagline" style={{ color: theme === 'light' ? 'rgba(0,0,0,0.75)' : 'var(--gray-300)' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', lineHeight: 1.1 }}><motion.span initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, delay: 0.6 }} style={{ display: 'block' }}>Web Application & API Security —</motion.span></p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', lineHeight: 1.1 }}><motion.span initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, delay: 0.64 }} style={{ display: 'block' }}>Practical VAPT • Manual Testing • App Logic</motion.span></p>
                  <p style={{ marginTop: '16px', fontFamily: 'var(--font-serif-2)', fontSize: '15px', lineHeight: 1.5, fontWeight: 300, maxWidth: '400px', color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.65)' }}><motion.span initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, delay: 0.68 }} style={{ display: 'block' }}>I break systems to understand them. I build tools that prove impact — evidence-grade, local-first, authorized testing only.</motion.span></p>
                  <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ padding: '5px 10px', background: theme === 'light' ? 'black' : 'white', color: theme === 'light' ? 'white' : 'black', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}><Target size={10} /> Web & API Focused</span>
                    <span style={{ padding: '5px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}><Layers size={10} /> End-to-End VAPT</span>
                    <span style={{ padding: '5px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={10} /> WB → BLR</span>
                  </div>
                  <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a href="#work" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid currentColor', paddingBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }} data-cursor="PROJECTS">↓ Projects — CyberBuddy Live • VAPT Checklist <ArrowUpRight size={10} /></a>
                    <a href="#writing" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid currentColor', paddingBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }} data-cursor="WRITING">→ Writing on Medium <BookOpen size={10} /></a>
                  </div>
                </div>
              </div>
              <div className="hero-right">
                <HeroVisual theme={theme} />
              </div>
            </motion.div>
            <div className="scroll-indicator" aria-hidden="true" style={{ color: theme === 'light' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.5)' }}>
              <div className="scroll-indicator-line" style={{ background: theme === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)' }}></div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ArrowUpRight size={12} /> Scroll to explore</span>
            </div>
            <div className="hero-marquee" style={{ background: theme === 'light' ? 'rgba(255,248,236,0.9)' : 'rgba(5,5,7,0.8)', borderColor: 'var(--border)' }}>
              <div className="marquee-track">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="marquee-item" style={{ color: 'var(--gray-500)' }}>
                    I DO APPLICATION SECURITY • VAPT • WEB & API • SECURITY TOOLING • RESEARCH • WRITING • AMIT PAL • LIVING ARCHIVE
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ProfessionalFocusMinimal theme={theme} />

          <ApproachMinimal theme={theme} />

          {/* ——— MANIFESTO — BRIDGE — Now that you know what I do, why this site exists ——— */}
          <section className="manifesto" style={{ padding: '80px 48px', background: theme === 'light' ? '#FFF8EC' : 'var(--black)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden', color: theme === 'light' ? 'black' : 'white' }}>
            <ManifestoLine theme={theme} />
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', position: 'relative', zIndex: 2 }} className="manifesto-responsive">
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={14} />
                  <span style={{ width: '24px', height: '1px', background: 'var(--gray-500)', display: 'inline-block' }}></span>
                  Why this site — 00
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.2vw, 38px)', lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', fontWeight: 800 }}>
                  <span style={{ display: 'block', overflow: 'hidden' }}><motion.span initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>MY PROJECTS HAVE</motion.span></span>
                  <span style={{ display: 'block', overflow: 'hidden' }}><motion.span initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>THEIR OWN SITES.</motion.span></span>
                  <span style={{ display: 'block', overflow: 'hidden', fontFamily: 'var(--font-serif)', fontStyle: 'italic', textTransform: 'none', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--cyan)' }}><motion.span initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>This is my curated</motion.span></span>
                  <span style={{ display: 'block', overflow: 'hidden', fontFamily: 'var(--font-serif)', fontStyle: 'italic', textTransform: 'none', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--cyan)' }}><motion.span initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>identity & invitation.</motion.span></span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
                <p style={{ fontFamily: 'var(--font-serif-2)', fontSize: '16px', lineHeight: 1.6, fontWeight: 300, color: theme === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', maxWidth: '440px' }}>
                  For someone arriving from LinkedIn: I'm Amit Pal, Security Analyst (VAPT) focused on Web & API. I test real apps end-to-end — scope, recon, manual validation, impact, reporting. I also build tools and write about what I learn.
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.6, color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.55)', maxWidth: '440px' }}>
                  No skills matrix, no certification wall. Just a believable pattern of <b style={{ color: theme === 'light' ? 'black' : 'white' }}>practice + building + learning + sharing</b>. Projects below are discoverable with live links.
                </p>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '14px', lineHeight: 1.3, color: 'var(--cyan)', maxWidth: '420px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={14} /> Identifying Vulnerabilities Before Attackers Do.
                </div>
              </div>
            </div>
          </section>

          {/* ——— WORK — CURATED PROJECTS — For recruiter, pro, collaborator ——— */}
          <div className="section-header" id="work" ref={workHeaderRef} style={{ position: 'relative', overflow: 'hidden', background: theme === 'light' ? '#FFF8EC' : 'var(--black)', color: theme === 'light' ? 'black' : 'white', borderTop: '1px solid var(--border)' }}>
            <div style={{ position: 'absolute', left: '-2%', top: '20%', fontFamily: 'var(--font-display)', fontSize: '9vw', fontWeight: 800, lineHeight: 0.8, letterSpacing: '-0.05em', color: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.015)', textTransform: 'uppercase', pointerEvents: 'none', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <span style={{ color: 'transparent', WebkitTextStroke: theme === 'light' ? '1px rgba(0,0,0,0.06)' : '1px rgba(255,255,255,0.06)' }}>BUILD</span>
              <motion.span style={{ position: 'absolute', left: 0, top: 0, color: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)', overflow: 'hidden', whiteSpace: 'nowrap', width: buildFill, opacity: buildOpacity }}>BUILD</motion.span>
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="section-num" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Hammer size={12} /> Projects — Independent security work — Live & in development</div>
              <h2 className="section-title">
                <span><i>WHAT I</i></span><span><i>BUILD</i></span>
              </h2>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gray-500)', letterSpacing: '0.12em', textTransform: 'uppercase', maxWidth: '260px', lineHeight: 1.5, position: 'relative', zIndex: 2, display: 'flex', gap: '6px' }}>
              <Layers size={12} /> For collaborators: active projects below. For recruiters: evidence of initiative beyond job title.
            </div>
          </div>

          {/* VAPT — VISUAL SHOWCASE */}
          {/* VAPT — VISUAL SHOWCASE — Cohesive, low contrast, visitor friendly */}
          <section className="project-section" style={{ position: 'relative', background: theme === 'light' ? '#FFF8EC' : '#050507', minHeight: '90vh', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
            <VaptCinematic theme={theme} />
            <div className="project-responsive" style={{ position: 'relative', zIndex: 2, minHeight: '90vh', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', padding: '100px 48px 80px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '28px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: theme === 'light' ? '#0A5C36' : '#00FF9D', border: '1px solid rgba(0,255,157,0.2)', padding: '6px 12px', background: theme === 'light' ? 'rgba(0,255,157,0.08)' : 'rgba(0,255,157,0.06)', display: 'flex', alignItems: 'center', gap: '6px' }}><Layers size={12} /> In Development</span>
                  <span style={{ width: '6px', height: '6px', background: '#00FF9D', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', color: theme === 'light' ? 'black' : 'white' }}>
                  <span style={{ display: 'block' }}>VAPT</span>
                  <span style={{ display: 'block', color: theme === 'light' ? '#0A5C36' : '#00FF9D' }}>CHECKLIST</span>
                </h2>
                <div style={{ marginTop: '24px', maxWidth: '500px' }}>
                  <p style={{ fontFamily: 'var(--font-serif-2)', fontSize: '17px', lineHeight: 1.5, fontWeight: 300, color: theme === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
                    VAPT = Vulnerability Assessment & Penetration Testing — systematic approach to find and prove security issues in web apps & APIs. I was frustrated with fragmented checklists that miss context, so I'm building a structured, operator-focused workflow.
                  </p>
                  <p style={{ marginTop: '12px', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5, color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.55)' }}>
                    For recruiters: shows how I think about coverage, not just tool output. For security pros: taxonomy, context, honest gaps. For collaborators: active dev, open to feedback on methodology.
                  </p>
                </div>
                <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href={LINKS.vaptLive} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 24px', background: theme === 'light' ? 'black' : '#00FF9D', color: theme === 'light' ? 'white' : '#0A0F0D', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }} data-cursor="LIVE DEV"><ExternalLink size={14} /> Live preview</a>
                  <button onClick={copyEmail} style={{ padding: '14px 24px', border: '1px solid var(--border)', color: theme === 'light' ? 'black' : 'white', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }} data-cursor="COPY EMAIL"><Mail size={12} /> Email me</button>
                </div>
              </div>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: theme === 'light' ? 'white' : 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)' }}>
                <img src="/Portfolio/assets/vapt-workflow.jpg" alt="VAPT Checklist workflow" className="responsive-bg-img" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ padding: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                  <span style={{ padding: '4px 8px', background: theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)', border: '1px solid var(--border)' }}>Operator-focused</span>
                  <span style={{ padding: '4px 8px', background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.15)', color: theme === 'light' ? '#0A5C36' : '#00FF9D' }}>Taxonomy</span>
                </div>
              </div>
            </div>
          </section>

          {/* CYBERBUDDY — Cohesive */}
          <section className="project-section" style={{ position: 'relative', background: theme === 'light' ? '#FFF8EC' : '#050507', minHeight: '90vh', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: theme === 'light' ? 0.06 : 0.15 }}>
              <img src="/Portfolio/assets/cyberbuddy-tools.jpg" alt="" className="responsive-bg-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </div>
            <div className="project-responsive" style={{ position: 'relative', zIndex: 2, minHeight: '90vh', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '48px', padding: '100px 48px 80px', alignItems: 'center' }}>
              <div style={{ order: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: theme === 'light' ? 'white' : 'rgba(0,0,0,0.55)' }}>
                <img src="/Portfolio/assets/cyberbuddy-tools.jpg" alt="CyberBuddy tools" className="responsive-bg-img" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ padding: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                  <span style={{ padding: '4px 8px', background: 'rgba(138,92,255,0.08)', border: '1px solid rgba(138,92,255,0.15)', color: '#8A5CFF' }}>7 tools live</span>
                  <span style={{ padding: '4px 8px', background: theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)', border: '1px solid var(--border)' }}>Local-first</span>
                </div>
              </div>
              <div style={{ order: 2 }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '28px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A5CFF', border: '1px solid rgba(138,92,255,0.2)', padding: '6px 12px', background: 'rgba(138,92,255,0.06)', display: 'flex', alignItems: 'center', gap: '6px' }}><Hammer size={12} /> Live Product</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', background: '#8A5CFF', color: 'white', padding: '4px 8px', fontWeight: 700 }}>LIVE</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', color: theme === 'light' ? 'black' : 'white' }}>
                  <span style={{ display: 'block' }}>CYBER</span>
                  <span style={{ display: 'block', background: 'linear-gradient(90deg, #8A5CFF, #FF5CA1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>BUDDY</span>
                </h2>
                <div style={{ marginTop: '24px', maxWidth: '500px' }}>
                  <p style={{ fontFamily: 'var(--font-serif-2)', fontSize: '17px', lineHeight: 1.5, fontWeight: 300, color: theme === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
                    Browser security checks (clickjacking, headers, CORS, JWT, CSRF) are often scattered and heavy. I built CyberBuddy to keep 7 checks under one roof — evidence-grade, 100% local (no data leaves browser), for my real engagements.
                  </p>
                  <p style={{ marginTop: '12px', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5, color: theme === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.55)' }}>
                    For general visitors: think of it as a toolkit that helps prove a security issue visually. For security pros: non-destructive, local-first, shows practical problem-solving. Live at the link below.
                  </p>
                </div>
                <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href={LINKS.cyberbuddyLive} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 24px', background: '#8A5CFF', color: 'white', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }} data-cursor="LAUNCH"><ExternalLink size={14} /> Open live</a>
                  <a href={LINKS.medium} target="_blank" rel="noopener noreferrer" style={{ padding: '14px 24px', border: '1px solid var(--border)', color: theme === 'light' ? 'black' : 'white', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }} data-cursor="WRITING"><BookOpen size={12} /> My writing</a>
                </div>
              </div>
            </div>
          </section>

          <ExperimentsMinimal theme={theme} />

          {/* ——— WRITING ——— */}
          <section id="writing" style={{ background: w.bg, color: w.ink, borderTop: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
            <WritingCinematic theme={theme} />
            <div className="writing-responsive writing-header" style={{ padding: '100px 48px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: w.orange, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <PenTool size={14} />
                  <span style={{ width: '24px', height: '1px', background: w.orange, display: 'inline-block' }}></span>
                  My writing — Research Log
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
                  <span style={{ display: 'block' }}>MY</span>
                  <span style={{ display: 'block' }}>RESEARCH</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, textTransform: 'none', color: w.orange }}>Log — 02</span>
                </h2>
              </div>
              <p style={{ fontFamily: 'var(--font-serif-2)', fontSize: '18px', lineHeight: 1.5, fontWeight: 300, maxWidth: '440px' }}>
                For security pros and curious visitors: I write about <b>spec vs reality</b> — what browsers actually do vs what specs say, and why it matters for security. Each piece connects to a tool I built to prove it. Full articles on Medium (3 so far).
              </p>
            </div>

            <div className="writing-responsive" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px 100px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1px', background: theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.08)', position: 'relative', zIndex: 2 }}>
              <div
                className="writing-featured"
                onMouseEnter={() => setHoveredWriting(0)}
                onMouseLeave={() => setHoveredWriting(null)}
                onClick={() => setHoveredWriting(hoveredWriting === 0 ? null : 0)}
                style={{ background: w.featBg, padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '520px', position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease', transform: hoveredWriting === 0 ? 'translateY(-2px)' : 'none', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', left: '24px', top: '24px', fontFamily: 'var(--font-serif)', fontSize: '120px', lineHeight: 0.8, color: hoveredWriting === 0 ? w.quoteH : w.quote, pointerEvents: 'none', transition: 'color 0.4s' }}>“</div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '5px', height: '5px', background: w.orange, borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.2s infinite' }}></span>
                    Featured — I wrote on Medium @amitpxl — {hoveredWriting === 0 ? "Hovering — Read →" : "Spec vs Reality"}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.2vw, 42px)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400, transform: hoveredWriting === 0 ? 'scale(1.02)' : 'scale(1)', transformOrigin: 'left', transition: 'transform 0.4s ease' }}>
                    CORS Misconfiguration: When Reflecting the Origin Is Not the Whole Story
                  </h3>
                  <p style={{ marginTop: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.5, color: hoveredWriting === 0 ? w.body : w.soft, maxWidth: '400px', letterSpacing: '0.02em', textTransform: 'uppercase', transition: 'color 0.4s' }}>
                    I learned reflection ≠ exploitation. Proving authenticated impact matters. I built a two-origin probe. {hoveredWriting === 0 ? "→ Full article on Medium has my PoC." : ""}
                  </p>
                </div>
                <div style={{ marginTop: '40px', position: 'relative', zIndex: 2 }}>
                  <a href={WRITING[0].link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: hoveredWriting === 0 ? '24px' : '16px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, borderBottom: `1px solid ${w.ink}`, paddingBottom: '8px', transition: 'gap 0.3s' }} data-cursor="READ"><BookOpen size={12} /> Read my article on Medium ↗</a>
                </div>
              </div>
              <div className="writing-list" style={{ background: 'var(--black)', color: 'var(--cream)', padding: '48px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><PenTool size={12} /> More — I curated</div>
                {WRITING.slice(1).map((w, i) => (
                  <a key={i} href={w.link} target="_blank" rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredWriting(i + 1)}
                    onMouseLeave={() => setHoveredWriting(null)}
                    onTouchStart={() => setHoveredWriting(i + 1)}
                    style={{ display: 'block', padding: '24px 0', borderTop: `1px solid ${theme === 'light' ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)'}`, borderBottom: `1px solid ${theme === 'light' ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)'}`, marginBottom: '-1px', transform: hoveredWriting === i + 1 ? 'translateX(8px)' : 'none', transition: 'transform 0.3s ease' }} data-cursor="READ">
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em', textTransform: 'uppercase', color: hoveredWriting === i + 1 ? (theme === 'light' ? '#B03400' : 'white') : 'var(--cream)', transition: 'color 0.3s' }}>{w.title}</div>
                    <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: hoveredWriting === i + 1 ? (theme === 'light' ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.7)') : (theme === 'light' ? 'rgba(0,0,0,0.62)' : 'rgba(255,255,255,0.55)'), lineHeight: 1.4, transition: 'color 0.3s', opacity: hoveredWriting === i + 1 ? 1 : 0.85 }}>{w.insight} {hoveredWriting === i + 1 ? "↗" : ""}</div>
                  </a>
                ))}
                <div style={{ marginTop: 'auto', paddingTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: theme === 'light' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
                  Full articles on Medium — curiosity, then depth.
                </div>
                <a href={LINKS.medium} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: theme === 'light' ? '#A8500F' : 'var(--orange-light)', border: '1px solid rgba(255,196,168,0.2)', padding: '12px 16px', width: 'fit-content', marginTop: '16px', alignItems: 'center' }} data-cursor="MEDIUM"><BookOpen size={12} /> All my writing on Medium →</a>
              </div>
            </div>
          </section>

          <LearningLoop theme={theme} />
          <TransitionMinimal theme={theme} />

          <MilestoneMinimal theme={theme} />

          {/* ——— NOW ——— */}
          <section id="now" className="now-section" style={{ background: n.bg, color: n.ink, padding: '100px 48px', borderTop: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>

            <div className="now-responsive" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '80px', position: 'relative', zIndex: 2 }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>I'M<br/>NOW — 04</h2>
                <div style={{ marginTop: '20px', fontFamily: 'var(--font-sans)', fontSize: '13px', color: n.body, lineHeight: 1.5, maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} /> Roots West Bengal • Building in Bengaluru — open to remote collab</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12} /> This is a living site — Last updated Aug 2026 • {time}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: n.soft }}>For collaborators: active work below is discoverable with links</span>
                </div>
                <div style={{ marginTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '6px 10px', background: 'black', color: 'white', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '5px', height: '5px', background: '#00FF9D', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.2s infinite' }}></span>I'm Building</span>
                  <span style={{ padding: '6px 10px', border: `1px solid ${n.hair}`, fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}><PenTool size={10} />I'm Writing</span>
                  <span style={{ padding: '6px 10px', border: '1px solid rgba(255,214,10,0.3)', color: n.gold, background: 'rgba(255,214,10,0.08)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={10} />I'm Learning Mobile PT</span>
                </div>

                <div style={{ marginTop: '48px', borderTop: `1px solid ${n.hair}`, paddingTop: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: n.soft, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Award size={12} /> My selected learning</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ padding: '4px 8px', border: `1px solid ${n.hair}`, fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: n.body, display: 'flex', alignItems: 'center', gap: '4px' }}><FileText size={10} /> API Penetration Testing — APIsec University — Jan 2026 — I completed</span>
                    <span style={{ padding: '4px 8px', border: '1px solid rgba(0,0,0,0.08)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: n.soft }}>API Security Fundamentals — APIsec '25</span>
                  </div>
                  <div style={{ marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: n.body, lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={10} /> I did BCA — Techno Main Salt Lake — 2020-2023
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { k: "I'm Building", v: "I'm building VAPT Checklist — structured, operator-focused workflow. It's in active development.", link: LINKS.vaptLive, cta: "Live Dev →", color: theme === "light" ? "#0A6B45" : "#00FF9D", icon: Hammer },
                  { k: "I'm Writing", v: "I write about browser security & real impact — CORS, JWT, CSP, client-side crypto.", link: LINKS.medium, cta: "Medium →", color: theme === "light" ? "#B03400" : "#FF4D00", icon: PenTool },
                  { k: "I'm Maintaining", v: "I maintain CyberBuddy — my browser security suite, evidence-grade, local-first. 7 tools live.", link: LINKS.cyberbuddyLive, cta: "Live →", color: n.purple, icon: Shield },
                  { k: "I'm Learning", v: "I'm learning Mobile PT next — expanding from Web & API to mobile attack surface.", link: LINKS.github, cta: "GitHub →", color: theme === "light" ? "#7A5C00" : "#FFD60A", icon: BookOpen },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                  <div key={i} className="now-item" style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: '24px', padding: '28px 0', borderTop: `1px solid ${n.hair}`, borderBottom: `1px solid ${n.hair}`, marginBottom: '-1px', alignItems: 'center' }}>
                    <div className="now-item-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: n.soft, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', background: item.color, borderRadius: '50%', display: 'inline-block', animation: `pulse ${1.2 + i * 0.3}s infinite` }}></span>
                      <Icon size={12} /> {item.k}
                    </div>
                    <div className="now-item-desc" style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.5 }}>{item.v}</div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="now-item-cta" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: `1px solid ${n.ink}`, paddingBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }} data-cursor="EXPLORE">{item.cta} <ArrowUpRight size={12} /></a>
                  </div>
                )})}

                <div style={{ marginTop: '32px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: n.body, lineHeight: 1.6, borderTop: `1px solid ${n.hair}`, paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={12} /> I do practical security, not just tools — Based in Bengaluru, open to remote collab
                </div>
              </div>
            </div>
          </section>

          {/* ——— CONNECT ——— */}
          <section id="connect" ref={connectRef} className="connect-section" style={{ position: 'relative', background: cx.bg, color: cx.text, minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '80px 48px 48px', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '-2%', bottom: '12%', fontFamily: 'var(--font-display)', fontSize: '10vw', fontWeight: 800, lineHeight: 0.8, letterSpacing: '-0.06em', color: cx.ghost, textTransform: 'uppercase', pointerEvents: 'none', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              I AM AMIT PAL • 2026
            </div>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
              <svg width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="grad2" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#3A5BFF" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#050507" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad2)" />
                <g opacity="0.06" stroke="white" strokeWidth="0.5">
                  {Array.from({ length: 20 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} />)}
                  {Array.from({ length: 20 }).map((_, i) => <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="800" />)}
                </g>
              </svg>
            </div>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
              <h2 className="connect-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
                <motion.span style={{ display: 'block', x: isMobileGlobal ? 0 : connectMouse.x * 0.8, y: isMobileGlobal ? 0 : connectMouse.y * 0.5 }}>LET'S BUILD</motion.span>
                <motion.span style={{ display: 'block', color: 'transparent', WebkitTextStroke: `1px ${cx.stroke}`, x: isMobileGlobal ? 0 : connectMouse.x * -0.6, y: isMobileGlobal ? 0 : connectMouse.y * 0.3 }}>MORE SECURE</motion.span>
                <motion.span style={{ display: 'block', color: cx.blue, x: isMobileGlobal ? 0 : connectMouse.x * 0.4, y: isMobileGlobal ? 0 : connectMouse.y * -0.4 }}>THINGS TOGETHER.</motion.span>
              </h2>
              <div style={{ marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: cx.soft, maxWidth: '520px', lineHeight: 1.6 }}>
                I do Application Security • VAPT • Web & API → I'm learning Mobile PT next. If you need Web/API VAPT that explains impact clearly, or want feedback on browser security tooling, I can help. Research collabs and methodology discussions welcome. Roots West Bengal • Building in Bengaluru.
              </div>
              <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', border: `1px solid ${cx.boxBd}`, padding: '8px', background: cx.box, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'white' }}>
                  AP
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: cx.faint, lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Fingerprint size={12} /> My AP Monogram — my signature
                </div>
              </div>
            </div>

            <div className="connect-responsive connect-grid" style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', width: '100%', margin: '80px auto 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: cx.soft, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={12} /> Where you can find me</div>
                <a href={`mailto:${LINKS.email}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: `1px solid ${cx.hair}`, fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }} data-cursor="EMAIL"><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={12} />{LINKS.email}</span><span>↗</span></a>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: `1px solid ${cx.hair}`, fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }} data-cursor="LINKEDIN"><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><LinkedinIcon size={12} />LinkedIn — connect with me</span><span>↗</span></a>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: `1px solid ${cx.hair}`, fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }} data-cursor="GITHUB"><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><GithubIcon size={12} />GitHub — see my code</span><span>↗</span></a>
                <a href={LINKS.medium} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: `1px solid ${cx.hair}`, fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }} data-cursor="MEDIUM"><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={12} />Medium — read my writing</span><span>↗</span></a>
                <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
                  <a href={LINKS.cyberbuddyLive} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 16px', border: `1px solid ${cx.purpleBd}`, color: cx.purple, fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }} data-cursor="LIVE"><Hammer size={12} /> My CyberBuddy Live ↗</a>
                  <a href={LINKS.vaptLive} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 16px', border: `1px solid ${cx.greenBd}`, color: cx.green, fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }} data-cursor="LIVE DEV"><Layers size={12} /> My VAPT Live Dev ↗</a>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{ fontFamily: 'var(--font-serif-2)', fontSize: '16px', lineHeight: 1.5, fontWeight: 300, color: cx.body, maxWidth: '360px' }}>
                  I'm Amit Pal — this is my curated identity and invitation. My projects have their own sites with depth. Let's build more secure things together.
                </p>
                <div style={{ display: 'inline-block', padding: '20px', margin: '-20px' }} ref={magneticRef}>
                  <a href={`mailto:${LINKS.email}?subject=Portfolio Contact`} ref={magneticInnerRef} className="connect-email-circle" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '148px', height: '148px', borderRadius: '50%', background: 'white', color: 'black', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1, transition: 'transform 0.2s ease-out, background 0.3s' }} data-cursor="EMAIL ME">
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><Mail size={16} />EMAIL<br/>ME →</span>
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: cx.muted, lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={12} /> No tracking • No telemetry • Static-only • {theme === 'dark' ? 'Dark' : 'Light'} mode
                </div>
              </div>
            </div>

            <div className="connect-footer" style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', width: '100%', margin: '80px auto 0', borderTop: `1px solid ${cx.hair}`, paddingTop: '24px', display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              <span>© 2026 Amit Pal — Application Security — Built with care, no tracking</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}><Mail size={10} />{LINKS.email} • linkedin.com/in/amitpal-wb • github.com/AmitPal-CyberBuddy</span>
            </div>
          </section>
        </>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.85); } }
      `}</style>
    </MotionConfig>
  );
}
