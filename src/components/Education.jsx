import React from 'react';
import { GraduationCap } from 'lucide-react';
import './Education.css';

/* ─── PLACEHOLDER DATA ─────────────────────────────────────
   Replace with your actual education details.
────────────────────────────────────────────────────────────*/
const EDUCATION = [
  {
    id: 'edu-1',
    degree: '[Degree / Programme]',
    field: '[Field of Study]',
    institution: '[Institution Name]',
    period: '[Start Year] — [End Year]',
    grade: '[Grade / GPA]',
    highlights: [
      'Placeholder — notable coursework, thesis, or project.',
      'Placeholder — any awards, honours, or activities.',
    ],
  },
  {
    id: 'edu-2',
    degree: '[Secondary / Higher Secondary]',
    field: '[Stream / Specialisation]',
    institution: '[School / College Name]',
    period: '[Start Year] — [End Year]',
    grade: '[Grade / Percentage]',
    highlights: [
      'Placeholder — relevant achievements or activities.',
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="section-tag">04 / Education</div>

        <div className="education__header">
          <h2 className="headline-xl">Academic Background</h2>
          <p className="body-lg education__subtitle">
            Foundations that inform the engineering approach.
          </p>
        </div>

        <div className="education__grid">
          {EDUCATION.map(edu => (
            <article key={edu.id} className="edu-card glass-card" id={edu.id}>
              <div className="edu-card__icon-wrap">
                <GraduationCap size={20} strokeWidth={1.5} />
              </div>

              <div className="edu-card__period label-code">{edu.period}</div>
              <h3 className="edu-card__degree headline-md">{edu.degree}</h3>
              <p className="edu-card__field body-md">{edu.field}</p>
              <p className="edu-card__institution body-sm">{edu.institution}</p>

              {edu.grade && (
                <div className="edu-card__grade">
                  <span className="label-caps" style={{ color: 'var(--text-muted)' }}>Grade</span>
                  <span className="body-sm" style={{ color: 'var(--accent-purple-light)' }}>{edu.grade}</span>
                </div>
              )}

              {edu.highlights.length > 0 && (
                <ul className="edu-card__highlights">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="edu-card__highlight body-sm">
                      <span className="edu-card__bullet" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
