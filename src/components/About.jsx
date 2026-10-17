import React, { useState } from 'react';
import './About.css';

/* ─── PLACEHOLDER DATA ─────────────────────────────────────
   Replace skill groups and bio text with your actual details.
────────────────────────────────────────────────────────────*/
const SKILL_GROUPS = [
  {
    label: 'Core Architecture',
    skills: [
      { name: 'System Design', accent: 'purple', context: 'High availability, fault tolerance, API gateway patterns & microservices.' },
      { name: 'REST APIs', accent: 'cyan', context: 'Idempotency, resource versioning, hypermedia & OpenAPI specifications.' },
      { name: 'Microservices', accent: 'purple', context: 'Domain-driven bounded contexts, service mesh & decentralized data.' },
      { name: 'gRPC', accent: 'cyan', context: 'High-throughput binary protocol buffers & bidirectional RPC streaming.' },
      { name: 'Event-Driven Arch', accent: 'purple', context: 'Pub/sub topologies, CQRS event sourcing & message queuing.' },
    ],
  },
  {
    label: 'Web Engineering',
    skills: [
      { name: 'React', accent: 'cyan', context: 'Component composition, custom hooks, virtual DOM optimization & state machines.' },
      { name: 'Next.js', accent: 'purple', context: 'Server Components, SSR, static generation & edge route handlers.' },
      { name: 'Node.js', accent: 'cyan', context: 'Asynchronous event loop, cluster workers, stream piping & runtime perf.' },
      { name: 'TypeScript', accent: 'purple', context: 'Type safety, conditional types, generics & AST transformations.' },
      { name: 'GraphQL', accent: 'cyan', context: 'Schema design, resolvers, dataloader query batching & federated graphs.' },
    ],
  },
  {
    label: 'Data & Infra',
    skills: [
      { name: 'PostgreSQL', accent: 'purple', context: 'Indexing strategies, query plan profiling, ACID transactions & JSONB.' },
      { name: 'MongoDB', accent: 'cyan', context: 'Document schema design, aggregation pipelines & replica sets.' },
      { name: 'Redis', accent: 'purple', context: 'In-memory caching, atomic rate limiting, Pub/Sub & Redis Streams.' },
      { name: 'Docker', accent: 'cyan', context: 'Multi-stage container builds, image slimming & container networking.' },
      { name: 'Kubernetes', accent: 'purple', context: 'Pod scheduling, rolling deployments, ConfigMaps & ingress routing.' },
    ],
  },
  {
    label: 'Languages',
    skills: [
      { name: 'Python', accent: 'purple', context: 'Asyncio concurrent pipelines, data structures, scientific computing.' },
      { name: 'JavaScript', accent: 'cyan', context: 'ESNext features, closures, microtask queues & DOM APIs.' },
      { name: 'Java', accent: 'purple', context: 'JVM garbage collection tuning, multithreading & Enterprise Spring Boot.' },
      { name: 'Go', accent: 'cyan', context: 'Goroutines, channels, concurrent networking & memory efficiency.' },
      { name: 'C++', accent: 'purple', context: 'Low-level memory management, pointers, STL algorithms & systems code.' },
    ],
  },
];

export default function About() {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-tag">01 / About</div>

        <div className="about__layout">
          {/* Left column: bio */}
          <div className="about__bio-col">
            <h2 className="headline-xl about__heading">
              Engineering{' '}
              <span className="about__heading--accent">with intent</span>
            </h2>

            {/* Placeholder bio paragraphs */}
            <p className="body-lg about__para">
              I'm Aayush Kumar, a software developer with a focus on building
              reliable, well-crafted systems. I care about the engineering process
              as much as the end result — from architecture decisions to code
              readability and developer experience.
            </p>
            <p className="body-md about__para">
              {/* Placeholder — replace with your actual background, interests, or focus */}
              Background, interests, and any additional personal context should be
              added here by the portfolio owner.
            </p>

            {/* Quick stats */}
            <div className="about__stats">
              {[
                { value: '—', label: 'Years of experience' },
                { value: '—', label: 'Projects shipped' },
                { value: '—', label: 'Open-source contributions' },
              ].map(stat => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-item__value headline-lg">{stat.value}</span>
                  <span className="stat-item__label body-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: skill matrix */}
          <div className="about__skills-col">
            <div className="skills-matrix">
              {SKILL_GROUPS.map(group => (
                <div key={group.label} className="skill-group">
                  <h3 className="skill-group__label label-caps">{group.label}</h3>
                  <div className="skill-group__pills">
                    {group.skills.map(skill => (
                      <div
                        key={skill.name}
                        className={`skill-pill-wrapper${activeTooltip === skill.name ? ' skill-pill-wrapper--active' : ''}`}
                        onMouseEnter={() => setActiveTooltip(skill.name)}
                        onMouseLeave={() => setActiveTooltip(null)}
                        onClick={() => setActiveTooltip(activeTooltip === skill.name ? null : skill.name)}
                      >
                        <span className={`skill-pill skill-pill--${skill.accent}`}>
                          <span className={`skill-pill__node skill-pill__node--${skill.accent}`} />
                          <span className="body-sm">{skill.name}</span>
                        </span>
                        
                        {/* Interactive Tooltip */}
                        {activeTooltip === skill.name && (
                          <div className="skill-tooltip" role="tooltip">
                            <div className="skill-tooltip__header label-caps">{skill.name}</div>
                            <div className="skill-tooltip__body body-sm">{skill.context}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
