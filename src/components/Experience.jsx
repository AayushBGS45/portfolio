import React from 'react';
import './Experience.css';

/* ─── PLACEHOLDER DATA ─────────────────────────────────────
   Replace with your actual work experience. Do not invent
   company names, dates, or achievements.
────────────────────────────────────────────────────────────*/
const EXPERIENCE = [
  {
    id: 'exp-1',
    role: '[Job Title]',
    company: '[Company Name]',
    period: '[Start Date] — [End Date]',
    type: 'Full-time',
    location: '[Location / Remote]',
    bullets: [
      'Placeholder — describe what you built or improved here.',
      'Placeholder — quantify impact where possible.',
      'Placeholder — mention technologies or systems involved.',
    ],
    tags: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
  },
  {
    id: 'exp-2',
    role: '[Job Title]',
    company: '[Company Name]',
    period: '[Start Date] — [End Date]',
    type: 'Internship',
    location: '[Location / Remote]',
    bullets: [
      'Placeholder — describe key contributions.',
      'Placeholder — mention what you learned or shipped.',
    ],
    tags: ['[Tech 1]', '[Tech 2]'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-tag">03 / Experience</div>

        <div className="experience__header">
          <h2 className="headline-xl">Work Experience</h2>
          <p className="body-lg experience__subtitle">
            Professional roles and contributions across different organizations.
          </p>
        </div>

        <div className="timeline">
          {EXPERIENCE.map((exp, idx) => (
            <div key={exp.id} className="timeline__entry" id={exp.id}>
              {/* Track */}
              <div className="timeline__track">
                <div className="timeline__node">
                  <div className="timeline__node-core" />
                  <div className="timeline__node-halo" />
                </div>
                {idx < EXPERIENCE.length - 1 && (
                  <div className="timeline__line" />
                )}
              </div>

              {/* Content */}
              <div className="timeline__card glass-card">
                {/* Header */}
                <div className="timeline__card-header">
                  <div className="timeline__card-meta">
                    <span className="label-caps timeline__type">{exp.type}</span>
                    <span className="body-sm timeline__period">{exp.period}</span>
                  </div>
                  <span className="body-sm timeline__location">{exp.location}</span>
                </div>

                <h3 className="timeline__role headline-md">{exp.role}</h3>
                <p className="timeline__company body-md">{exp.company}</p>

                {/* Bullets */}
                <ul className="timeline__bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="timeline__bullet body-md">
                      <span className="timeline__bullet-dot" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="timeline__tags">
                  {exp.tags.map(tag => (
                    <span key={tag} className="tech-tag label-code">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
