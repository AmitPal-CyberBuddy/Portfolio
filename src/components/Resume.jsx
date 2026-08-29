import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Download,
  FileText,
  X,
} from 'lucide-react';
import { MOTION_EASE, RESUME_DATA } from '../content';
import { Eyebrow, Reveal } from '../lib/ui';

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

export function ResumeViewer({ onClose }) {
  const reduceMotion = useReducedMotion();

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
    <section id="resume" className="section resume-section" aria-labelledby="resume-title">
      <div className="shell resume-layout">
        <Reveal className="section-intro resume-intro">
          <Eyebrow icon={FileText}>Resume · updated August 2026</Eyebrow>
          <h2 id="resume-title">Resume / <em>CV.</em></h2>
          <p className="intro-lead">Application Security Consultant focused on Web Application and API PT, with hands-on experience managing end-to-end security assessments.</p>
          <div className="button-row">
            <button type="button" className="button button--primary" onClick={onOpenResume} data-cursor="RESUME">
              <FileText size={16} /> View My Resume <ArrowUpRight size={15} />
            </button>
            <button type="button" className="button button--secondary" onClick={downloadResumeATS} data-cursor="DOWNLOAD">
              <Download size={16} /> Print / Save ATS Resume
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


