import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Download,
  FileText,
  X,
} from 'lucide-react';
import { MOTION_EASE, RESUME_DATA } from '../content';
import { useFocusTrap } from '../lib/hooks';
import { Reveal, SectionHeader } from '../lib/ui';

function getPrintResumeData() {
  return {
    ...RESUME_DATA,
    summary:
      'Application Security Consultant focused on Web Application and API PT, leading end-to-end assessments across client environments. Experienced in scoping, testing, validation, reporting, remediation support, retesting, and closure.',
    experience: RESUME_DATA.experience.map((exp) => ({
      ...exp,
      roles: exp.roles.map((role) => {
        if (role.title === 'Associate Consultant') {
          return {
            ...role,
            bullets: [
              'Lead end-to-end Web Application and API PT engagements across multiple client applications and API collections.',
              'Translate SOW and client requirements into scope, coverage, access planning, and Black Box/Grey Box testing approaches.',
              'Validate vulnerabilities across authentication, authorization, session management, business logic, and input validation; eliminate false positives.',
              'Drive reporting, walkthroughs, remediation validation, retesting, and engagement closure with clients and internal stakeholders.',
            ],
          };
        }

        if (role.title === 'Security Analyst') {
          return {
            ...role,
            bullets: [
              'Performed manual and automated Web Application and API security assessments across client environments.',
              'Tested REST and SOAP APIs against OWASP API risks including authentication, authorization, input validation, and mass assignment.',
              'Validated findings and supported reporting, remediation guidance, and retesting.',
            ],
          };
        }

        if (role.title === 'Lead Generation Executive') {
          return {
            ...role,
            description:
              'Conducted OSINT-driven market, organization, and stakeholder research to support targeted outreach and opportunity identification.',
          };
        }

        return role;
      }),
    })),
    independentWork: [
      {
        title: 'CyberBuddy',
        links: {
          live: 'https://amitpal-cyberbuddy.github.io/CyberBuddy/',
          github: 'https://github.com/AmitPal-CyberBuddy/CyberBuddy',
        },
        description:
          'Browser-based, local-first security suite covering clickjacking, headers, CSP, CORS, DNS, CSRF PoCs, and JWT analysis.',
      },
      {
        title: 'ScriptSentry',
        links: {
          live: 'https://amitpal-cyberbuddy.github.io/ScriptSentry/',
          github: 'https://github.com/AmitPal-CyberBuddy/ScriptSentry',
        },
        status: 'Live',
        description:
          'Local JavaScript security analysis platform surfacing secrets, crypto, APIs, storage, DOM risk, obfuscation, and exportable findings.',
      },
      {
        title: 'VAPT Checklist',
        links: {
          live: 'https://amitpal-cyberbuddy.github.io/VAPT-Checklist/',
          github: 'https://github.com/AmitPal-CyberBuddy/VAPT-Checklist',
        },
        status: 'Live',
        description:
          'Context-aware local-first VAPT workspace with 2,006 checks, 631 families, 52 plans, 48 attack paths, and no telemetry.',
      },
      {
        title: 'Technical Security Writing',
        links: { medium: 'https://amitpxl.medium.com/' },
        description: 'Practical AppSec writing focused on web/API security, research, and testing.',
      },
    ],
    continuousLearning: [
      {
        title: 'PortSwigger Web Security Academy',
        detail: '135+ hands-on labs',
        description: 'Hands-on practice across web vulnerabilities and exploitation techniques.',
      },
      {
        title: 'APIsec University',
        detail: 'Jan 2026',
        description: 'API Penetration Testing (12h) and API Security Fundamentals 25 (2h).',
      },
    ],
  };
}

function downloadResumeATS() {
  const r = getPrintResumeData();
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${esc(r.header.name)} - Resume</title>
<style>
@page{size:A4;margin:0.34in 0.42in}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%}
body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:8.55pt;line-height:1.24;color:#1a1a1a;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1{font-size:18pt;font-weight:700;margin-bottom:1pt;line-height:1.02}
.subtitle{font-size:9.1pt;font-weight:700;color:#2E506B;margin-bottom:3pt}
.contact{font-size:7.45pt;line-height:1.2;color:#555;margin-bottom:4pt}
.contact a,.project-links a{color:#555;text-decoration:none}
.summary{font-size:8.1pt;line-height:1.24;margin-bottom:5pt;color:#333}
.section-title{font-size:8.85pt;font-weight:700;color:#2E506B;border-bottom:1px solid #D9DEE2;padding-bottom:2pt;margin-top:6pt;margin-bottom:4pt;text-transform:uppercase;letter-spacing:0.45pt;break-after:avoid}
.company-row,.role-row,.project-row,.edu-row,.learning-row{display:flex;justify-content:space-between;align-items:baseline;gap:10pt;page-break-inside:avoid}
.company{font-weight:700;font-size:8.7pt;margin-top:3pt}
.location,.period,.project-links,.edu-detail,.learning-detail{font-size:7.4pt;color:#5A5A5A;white-space:nowrap}
.role{font-weight:700;font-size:8.35pt;margin-top:2pt}
ul{margin:1pt 0 2pt 12pt}
li{font-size:8pt;line-height:1.22;margin-bottom:0.8pt;color:#333}
.desc,.expertise-group,.edu-institution,.learning-desc{font-size:8pt;line-height:1.22;color:#333}
.desc{margin-top:1pt}
.project-title,.edu-title,.learning-title{font-weight:700;font-size:8.25pt}
.expertise-group{margin-bottom:1pt}
.expertise-label,.edu-cgpa{font-weight:700}
.edu-institution,.learning-desc{margin-top:1pt}
.spacer{height:2pt}
.company-row,.role-row,.project-row,.edu-row,.learning-row,.desc,ul,.section-title{orphans:2;widows:2}
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
<div class="expertise-group"><span class="expertise-label">Security Testing: </span>${r.expertise.securityTesting.map(esc).join(' \\u00b7 ')}</div>
<div class="expertise-group"><span class="expertise-label">Assessment Focus: </span>${r.expertise.assessmentFocus.map(esc).join(' \\u00b7 ')}</div>
<div class="expertise-group"><span class="expertise-label">Tools: </span>${r.expertise.tools.map(esc).join(' \\u00b7 ')}</div>
<div class="section-title">Education &amp; Continuous Learning</div>
${r.education.map((edu) => `<div class="edu-row"><span class="edu-title">${esc(edu.title)}</span><span class="edu-detail">${esc(edu.period)}</span></div>
<div class="edu-institution">${esc(edu.institution)} \\u00b7 <span class="edu-cgpa">CGPA: ${esc(edu.cgpa)}</span></div>`).join('')}
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
        <p className="resume-doc__expertise-group"><span className="resume-doc__expertise-label">Security Testing: </span>{r.expertise.securityTesting.join(' \\u00b7 ')}</p>
        <p className="resume-doc__expertise-group"><span className="resume-doc__expertise-label">Assessment Focus: </span>{r.expertise.assessmentFocus.join(' \\u00b7 ')}</p>
        <p className="resume-doc__expertise-group"><span className="resume-doc__expertise-label">Tools: </span>{r.expertise.tools.join(' \\u00b7 ')}</p>
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
        <div className="resume-doc__spacer" aria-hidden="true" />
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

export function ResumeViewer({ onClose }) {
  const reduceMotion = useReducedMotion();
  const viewerRef = useRef(null);

  useFocusTrap(viewerRef, true, {
    onEscape: onClose,
    initialFocusSelector: '.resume-viewer__close',
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

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
        ref={viewerRef}
        className="resume-viewer"
        initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: MOTION_EASE }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-viewer-title"
      >
        <div className="resume-viewer__toolbar">
          <div className="resume-viewer__toolbar-left">
            <FileText size={16} aria-hidden="true" />
            <span id="resume-viewer-title">Resume · Amit Pal</span>
          </div>
          <div className="resume-viewer__toolbar-right">
            <button type="button" className="resume-viewer__btn" onClick={downloadResumeATS} aria-label="Print or save ATS resume" title="Print or save ATS resume">
              <Download size={15} aria-hidden="true" /> <span>Print / Save ATS</span>
            </button>
            <button type="button" className="resume-viewer__close" onClick={onClose} aria-label="Close resume viewer">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="resume-viewer__content">
          <ResumeDocument />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Resume({ onOpenResume }) {
  return (
    <section id="resume" className="section section--soft resume-section" aria-labelledby="resume-title">
      <div className="shell">
        <SectionHeader
          index="03"
          icon={FileText}
          eyebrow="Resume — on file"
          meta="Updated September 2026"
          titleId="resume-title"
          title={<>Resume / <em>CV.</em></>}
          aside="Application Security Consultant focused on Web Application and API PT, with hands-on experience managing end-to-end security assessments."
        />

        <div className="resume-layout">
          <Reveal className="resume-intro">
            <div className="button-row">
              <button type="button" className="button button--primary" onClick={onOpenResume} data-cursor="RESUME">
                <FileText size={16} /> View My Resume <ArrowUpRight size={15} />
              </button>
              <button type="button" className="button button--secondary" onClick={downloadResumeATS} data-cursor="DOWNLOAD">
                <Download size={16} /> Print / Save ATS Resume
              </button>
            </div>
            <p className="resume-note">Viewable in-browser, or exported as a clean, ATS-friendly document.</p>
          </Reveal>

          <Reveal className="resume-facts" delay={0.08}>
            <dl className="fact-ledger">
              <div className="fact-ledger__row"><dt>Current role</dt><dd>Associate Consultant · Ampcus Cyber</dd></div>
              <div className="fact-ledger__row"><dt>Focus</dt><dd>Web Application &amp; API PT</dd></div>
              <div className="fact-ledger__row"><dt>Education</dt><dd>BCA · CGPA 9.16/10</dd></div>
              <div className="fact-ledger__row"><dt>Labs</dt><dd>135+ hands-on · PortSwigger</dd></div>
            </dl>
            <div className="resume-stack">
              <span className="resume-stack__label">Tools &amp; coverage</span>
              <div className="badge-row">
                <span className="badge">Burp Suite</span>
                <span className="badge">OWASP Top 10</span>
                <span className="badge">API Security</span>
                <span className="badge">Web Security</span>
                <span className="badge">Penetration Testing</span>
                <span className="badge">Manual &amp; Automated Testing</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
