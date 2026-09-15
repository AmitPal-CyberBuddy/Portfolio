import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ExternalLink, Hammer, Layers3 } from 'lucide-react';
import {
  asset,
  LINKS,
  MOTION_EASE,
  PROJECT_EYEBROW_ICONS,
  PROJECT_PRIMARY_BUTTONS,
  PROJECT_VISUALS,
} from '../content';
import { GitHubIcon } from '../lib/icons';
import { ButtonLink, Eyebrow, SectionHeader } from '../lib/ui';

const WORKS_INDEX = [
  ['01', 'CyberBuddy', 'Featured live product', '#project-cyberbuddy'],
  ['02', 'VAPT Checklist', 'Live workspace', '#project-vapt'],
  ['03', 'ScriptSentry', 'Live open source', '#project-scriptsentry'],
];

function ProjectDataVisual({ type, image, alt }) {
  const reduceMotion = useReducedMotion();
  const figureRef = useRef(null);
  // Ambient loops (image drift, scanline) only animate while the console is on
  // screen — offscreen compositing work is wasted battery and frame budget.
  const inView = useInView(figureRef, { amount: 0.2 });
  const visual = PROJECT_VISUALS[type] || PROJECT_VISUALS.release;
  const ambient = inView && !reduceMotion;

  // Cursor-tracking spotlight wash over the console (fine pointers only).
  const onSpotMove = (event) => {
    const el = figureRef.current;
    if (!el || event.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
    el.style.setProperty('--spot-y', `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
  };

  return (
    <figure
      ref={figureRef}
      className={`project-media project-media--${visual.className}`}
      onPointerMove={onSpotMove}
    >
      <div className="project-visual-frame">
        {image && (
          <motion.img
            src={asset(image)}
            alt={alt}
            loading="lazy"
            decoding="async"
            initial={false}
            animate={ambient ? { scale: [1.01, 1.05, 1.01], x: ['-1%', '1%', '-1%'] } : { scale: 1.01, x: '0%' }}
            transition={ambient ? { duration: 18, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4, ease: MOTION_EASE }}
          />
        )}
        <div className="project-visual-frame__scrim" aria-hidden="true" />
        <div className="project-data" role="group" aria-label={visual.aria}>
          <div className="project-data__top"><span><i /> {visual.top[0]}</span><span>{visual.top[1]}</span></div>
          <div className="project-data__metrics">
            {visual.metrics.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <div className="project-data__units">
            <div className="unit-bar" aria-hidden="true">
              {Array.from({ length: visual.units.total }, (_, i) => (
                <i key={i} className="is-live">{visual.units.cells?.[i] ?? String(i + 1).padStart(2, '0')}</i>
              ))}
            </div>
            <span className="project-data__units-label">{visual.units.label}</span>
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
          initial={false}
          animate={ambient ? { top: ['-2%', '102%'], opacity: 0.75 } : { top: '-4%', opacity: 0 }}
          transition={ambient ? { duration: 5.5, repeat: Infinity, repeatDelay: 2.5, ease: 'linear' } : { duration: 0.35, ease: 'easeOut' }}
        />
        <span className="project-spotlight" aria-hidden="true" />
      </div>
      <figcaption><span>{visual.caption[0]}</span><span>{visual.caption[1]}</span></figcaption>
    </figure>
  );
}

function ProjectCard({ id, num, type, title, eyebrow, summary, detail, image, alt, tags, primaryLink, primaryLabel, secondaryLink, secondaryLabel }) {
  const reduceMotion = useReducedMotion();
  const eyebrowIcon = PROJECT_EYEBROW_ICONS[type] || Layers3;
  const primaryButton = PROJECT_PRIMARY_BUTTONS[type] || 'button--green';
  return (
    <motion.article
      id={id}
      className={`project-card project-card--${type}`}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.7, ease: MOTION_EASE }}
    >
      <div className="project-card__meta">
        <span className="project-card__num">{num}</span>
        <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
      </div>
      <div className="project-card__copy">
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

export function Projects() {
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="shell shell--wide">
        <SectionHeader
          index="04"
          icon={Hammer}
          eyebrow="Projects — independent security work"
          meta="03 shipped · all local-first"
          titleId="work-title"
          title={<>Custom tooling, <em>built to document.</em></>}
          aside="Local-first utilities built for authorized testing and rapid evidence capture — designed to make investigation, evidence, and security conversations clearer."
        />

        <nav className="project-index" aria-label="Project index">
          {WORKS_INDEX.map(([num, name, status, href]) => (
            <a key={href} href={href} data-cursor="VIEW">
              <span className="project-index__num">{num}</span>
              <span className="project-index__name">{name}</span>
              <span className="project-index__status">{status}</span>
            </a>
          ))}
        </nav>

        <div className="project-stack">
          <ProjectCard
            id="project-cyberbuddy"
            num="01"
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
            id="project-vapt"
            num="02"
            type="release"
            eyebrow="VAPT Checklist · Live workspace"
            title="VAPT Checklist"
            summary="A local-first VAPT checklist and tracker — describe the target, and the library narrows 178+ OWASP/CWE-mapped checks to exactly what applies."
            detail="Static checklists age into noise, so VAPT Checklist starts from the application instead: around twenty scoping answers — authentication, uploads, tenants, asset types — include or exclude tests, and every check explains why it applies. A keyboard-first workspace records status, result and notes per test, progress is computed from one formula everywhere, and one click exports a 5-sheet Excel report. Everything runs in the browser — local data, no backend, no telemetry. Web, REST API and GraphQL are fully supported; SOAP, mobile and cloud ship with honestly labelled depth."
            image="vapt-workflow.jpg"
            alt="VAPT Checklist structured security workflow"
            tags={['Context-driven checklist', 'OWASP & CWE mapped', '5-sheet Excel report', 'Keyboard-first', 'Live']}
            primaryLink={LINKS.vaptLive}
            primaryLabel="Live preview"
            secondaryLink={LINKS.vaptRepo}
            secondaryLabel="View GitHub"
          />
          <ProjectCard
            id="project-scriptsentry"
            num="03"
            type="experiment"
            eyebrow="ScriptSentry · Live open-source"
            title="ScriptSentry"
            summary="A privacy-first JavaScript security analyzer — paste code, drop bundles, or point it at a live URL."
            detail="ScriptSentry reads the JavaScript an application actually ships — secrets and crypto keys, source→sink DOM-XSS paths, exfiltration routes, API surface, and obfuscation — and grades every script with an evidence-weighted 0–100 risk score on tree-sitter AST analysis. A pairing-token engine runs everything on your machine: exports HTML, TXT, CSV, SARIF, JSON and an OpenAPI map, keeps scan history, and diffs build-over-build. Optional local runtime evidence and local-AI triage — nothing ever leaves localhost. Free, MIT open source."
            tags={['Static + taint analysis', '0–100 risk scoring', 'OpenAPI export', 'Build diffing', 'Local analysis']}
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
