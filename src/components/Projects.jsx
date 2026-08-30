import { motion, useReducedMotion } from 'framer-motion';
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
import { ButtonLink, Eyebrow, Reveal } from '../lib/ui';

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
            animate={reduceMotion ? { scale: 1, x: '0%' } : { scale: [1.01, 1.05, 1.01], x: ['-1%', '1%', '-1%'] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
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

function ProjectCard({ type, title, eyebrow, summary, detail, image, alt, tags, primaryLink, primaryLabel, secondaryLink, secondaryLabel }) {
  const reduceMotion = useReducedMotion();
  const eyebrowIcon = PROJECT_EYEBROW_ICONS[type] || Layers3;
  const primaryButton = PROJECT_PRIMARY_BUTTONS[type] || 'button--green';
  return (
    <motion.article
      className={`project-card project-card--${type}`}
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

export function Projects() {
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="shell shell--wide">
        <Reveal className="section-heading section-heading--split">
          <div>
            <Eyebrow icon={Hammer}>Projects · independent security work</Eyebrow>
            <h2 id="work-title">Custom Tooling · <em>local-first utilities.</em></h2>
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
            eyebrow="VAPT Checklist · Live workspace"
            title="VAPT Checklist"
            summary="A local-first VAPT workspace — pick a scenario, get a context-driven plan with variants and evidence, then retest."
            detail="VAPT Checklist replaces static checklists with a six-stage loop — scope, discover, prioritize, test, report, retest — organizing the whole catalog into context-driven plans with named variants, connected attack paths, and honest coverage states. Everything runs in the browser with no backend and no telemetry. Web testing is live; Android and iOS checklists are next."
            image="vapt-workflow.jpg"
            alt="VAPT Checklist structured security workflow"
            tags={['Scenario-based plans', 'Connected attack paths', '6-stage loop', 'Local-first', 'Live']}
            primaryLink={LINKS.vaptLive}
            primaryLabel="Live preview"
            secondaryLink={LINKS.vaptRepo}
            secondaryLabel="View GitHub"
          />
          <ProjectCard
            type="experiment"
            eyebrow="ScriptSentry · Live open-source"
            title="ScriptSentry"
            summary="A local-first visual intelligence platform for JavaScript security and script behavior."
            detail="ScriptSentry reads the JavaScript an application actually ships — secrets, crypto keys, API calls, storage usage, DOM risks, and obfuscation — and surfaces them in a motion-rich dashboard. It runs 100% locally, analyzes a pasted fragment or a live URL, and exports HTML, TXT, CSV, or SARIF. Free and open source."
            tags={['20+ detection modules', 'Secrets & crypto', 'Data flows', 'Open source', 'Local analysis']}
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


