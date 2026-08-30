import {
  Fingerprint,
  Hammer,
  Layers3,
  Lightbulb,
  PenTool,
  Route,
  Search,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { FOCUS_STEPS } from '../content';
import { Eyebrow, Reveal } from '../lib/ui';

export function Focus() {
  return (
    <>
      <section id="focus" className="section section--soft" aria-labelledby="focus-title">
        <div className="shell focus-layout">
          <Reveal className="section-intro focus-intro">
            <Eyebrow icon={Target}>Focus · what I do</Eyebrow>
            <p className="role-badge"><span className="status-dot" /><span>Current role</span><b>Associate Consultant · Ampcus Cyber · Aug 2026 → now</b></p>
            <h2 id="focus-title">Practical <em>appsec.</em></h2>
            <p className="intro-lead">I assess web applications and APIs by understanding the system, testing it responsibly, and validating real impact rather than reporting what a scanner returns.</p>
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
            <h2 id="scenario-title">The authorization gap <em>in your banner.</em></h2>
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
              <p>Correlated manual replay in Repeater with automated scan coverage across three endpoints — same valid session, no privilege change, repeated to rule out false positives. Evidence captured with request/response pairs — reproducible by the client without custom tooling.</p>
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
