import {
  Fingerprint,
  Hammer,
  Layers3,
  Lightbulb,
  PenTool,
  Route,
  Search,
  Target,
} from 'lucide-react';
import { FOCUS_STEPS } from '../content';
import { SectionHeader, Reveal } from '../lib/ui';

export function Focus() {
  return (
    <>
      <section id="focus" className="section section--soft" aria-labelledby="focus-title">
        <div className="shell">
          <SectionHeader
            index="01"
            icon={Target}
            eyebrow="Focus — what I do"
            meta="Current: Associate Consultant · VAPT"
            titleId="focus-title"
            title={<>Practical <em>appsec.</em></>}
            aside="I assess web applications and APIs by understanding the system, testing it responsibly, and validating real impact rather than reporting what a scanner returns."
          />

          <div className="focus-layout">
            <Reveal className="focus-intro">
              <p className="role-badge"><span className="status-dot" /><span>Current role</span><b>Associate Consultant · Ampcus Cyber · Aug 2026 → now</b></p>
              <p className="focus-intro__text">
                VAPT — Vulnerability Assessment and Penetration Testing — is the practice of
                finding, validating, and clearly explaining security issues that need attention.
              </p>
              <div className="focus-domains" aria-label="Domains of focus">
                <span className="focus-domains__label">Domains</span>
                <div className="tag-row">
                  <span>Web App Security</span>
                  <span>API Security</span>
                  <span>Auth &amp; logic</span>
                  <span>OWASP Top 10</span>
                  <span>Research &amp; tooling</span>
                </div>
              </div>
              <div className="trust-note"><Fingerprint size={16} /><span>Authorized, evidence-led security testing.</span></div>
            </Reveal>

            <Reveal className="focus-method" delay={0.08}>
              <p className="focus-method__label"><Layers3 size={15} aria-hidden="true" /> How I test — end to end</p>
              <ol className="process-list">
                {FOCUS_STEPS.map(([title, detail], index) => (
                  <li key={title}>
                    <span>0{index + 1}</span>
                    <div><h3>{title}</h3><p>{detail}</p></div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal className="focus-principle" delay={0.05} amount={0.3}>
            <p>
              Beyond tool output — hands-on testing, focused research, and tooling turn
              observations into <em>reproducible evidence</em> and practical next steps.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="scenario" className="section scenario-section" aria-labelledby="scenario-title">
        <div className="shell">
          <SectionHeader
            index="02"
            icon={Search}
            eyebrow="Case study — capture INT-0417"
            meta="Same file as the opening evidence panel"
            titleId="scenario-title"
            title={<>One finding, <em>end to end.</em></>}
            aside="The evidence panel at the top of this page is working material, not decoration. This is that same capture decoded — expected 403, observed 200: what was observed, why it matters, and how it was validated."
          />

          <div className="case-line" aria-hidden="true">
            <span>GET /api/admin/users</span>
            <span>expected <s>403</s></span>
            <span>observed <b>200 OK</b></span>
            <span>impact: PII · roles · session data</span>
          </div>

          <div className="case-steps">
            <Reveal className="case-step">
              <span className="case-step__num">01</span>
              <h3>What I observed</h3>
              <p><code>GET /api/admin/users</code> returned <code>200 OK</code> with identity <code>user</code> — no role elevation required. The endpoint did not re-validate authorization after session establishment.</p>
            </Reveal>
            <Reveal className="case-step case-step--impact" delay={0.08}>
              <span className="case-step__num">02</span>
              <h3>Why it is high-impact</h3>
              <p>Access to admin user listings exposes PII, roles, and session identifiers — not a disclosure glitch, but a logic gap with direct data exposure.</p>
              <p className="case-step__fix">Remediation: enforce server-side authorization checks at the endpoint, not just at the route level.</p>
            </Reveal>
            <Reveal className="case-step" delay={0.16}>
              <span className="case-step__num">03</span>
              <h3>How I validated</h3>
              <p>Correlated manual replay in Repeater with automated scan coverage across three endpoints — same valid session, no privilege change, repeated to rule out false positives.</p>
              <p className="case-step__fix">Evidence captured as request/response pairs — reproducible by the client without custom tooling.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="approach-band" aria-label="How I work">
        <div className="shell approach-band__inner">
          <p className="approach-band__label"><Route size={15} aria-hidden="true" /> How I work</p>
          <p className="approach-band__flow"><Search size={15} aria-hidden="true" /> Test <i>→</i> <Hammer size={15} aria-hidden="true" /> Build <i>→</i> <Lightbulb size={15} aria-hidden="true" /> Research <i>→</i> <PenTool size={15} aria-hidden="true" /> Write</p>
          <span>From testing to practical next steps.</span>
        </div>
      </section>
    </>
  );
}
