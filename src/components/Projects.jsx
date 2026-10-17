import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, X, Terminal, Cpu, Activity, Layers, GitBranch } from 'lucide-react';
import { GithubIcon } from './icons';
import './Projects.css';

/* ─── PLACEHOLDER DATA ─────────────────────────────────────
   Replace with your actual projects. Do not invent results.
────────────────────────────────────────────────────────────*/
const PROJECTS = [
  {
    id: 'apexstream',
    index: '01',
    title: 'ApexStream AI',
    category: 'AI / ML Platform',
    tags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Redis', 'WebSockets'],
    description:
      'A real-time AI event streaming and telemetry platform designed for low-latency inference delivery and stream aggregation.',
    github: 'https://github.com/',
    live: null,
    featured: true,
    caseStudy: {
      tagline: 'High-Throughput Telemetry & Real-Time Inference Gateway',
      overview:
        'ApexStream AI was engineered to bridge high-throughput event queues with real-time browser telemetry. It handles continuous multi-model inference pipelines with backpressure management.',
      challenge:
        'Traditional HTTP polling introduced unacceptable lag (>350ms) for real-time model evaluation. Processing bursty streaming data caused worker exhaustion under peak traffic.',
      solution:
        'Architected an async event-driven pipeline utilizing FastAPI, Redis Pub/Sub channels, and persistent bidirectional WebSockets. Implemented adaptive batching and client-side stream decompression.',
      metrics: [
        { label: 'P99 Latency', value: '< 42ms' },
        { label: 'Event Throughput', value: '12k/sec' },
        { label: 'Memory Footprint', value: '-38%' },
      ],
      architecture: [
        'Ingestion Layer: FastAPI async workers with token validation',
        'Queue & Buffer: Redis Streams with consumer group distribution',
        'Inference Engine: Pluggable model runners with dynamic GPU batching',
        'Client Gateway: Multiplexed WebSockets delivering binary frames',
      ],
      codeSnippet: `// Stream Subscription & Backpressure Management
async function subscribeTelemetryStream(streamId, onPayload) {
  const ws = new WebSocket(\`wss://api.apexstream.io/v1/telemetry/\${streamId}\`);
  ws.binaryType = 'arraybuffer';
  
  ws.onmessage = (event) => {
    const frame = decodeBinaryFrame(event.data);
    if (frame.heartbeat) {
      ws.send(JSON.stringify({ ack: frame.sequence }));
      return;
    }
    onPayload(frame.telemetry);
  };
}`,
    },
  },
  {
    id: 'smart-mandi',
    index: '02',
    title: 'Smart Mandi Intelligence System',
    category: 'Data / Analytics',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'ML', 'TailwindCSS'],
    description:
      'Agricultural market intelligence platform transforming complex commodity price volatility into predictive price forecasts.',
    github: 'https://github.com/',
    live: null,
    featured: true,
    caseStudy: {
      tagline: 'Predictive Agro-Commodity Intelligence & Price Analytics',
      overview:
        'Smart Mandi processes daily APMC market price indices, predicting commodity spikes and offering transparent market trend visualisations.',
      challenge:
        'Fragmented rural mandi data sources with inconsistent schemas, sparse historical records, and intermittent network availability.',
      solution:
        'Built automated scrapers and ingestion sanitizers with fuzzy entity reconciliation. Deployed lightweight forecasting models with offline-first PWA caching.',
      metrics: [
        { label: 'Markets Indexed', value: '450+' },
        { label: 'Prediction Accuracy', value: '89.4%' },
        { label: 'Data Freshness', value: '15 min' },
      ],
      architecture: [
        'Data Harvester: Distributed headless scraping workers',
        'Sanitization Pipeline: Schema normalization & outlier detection',
        'Analytics Service: Time-series regression models',
        'Frontend Monograph: Responsive visual analytics with SVG charts',
      ],
      codeSnippet: `// Daily Mandi Price Anomaly Detection
function evaluatePriceDrift(currentArrival, baselineAverage) {
  const zScore = (currentArrival.modalPrice - baselineAverage.mean) / baselineAverage.stdDev;
  return {
    isAnomaly: Math.abs(zScore) >= 2.0,
    deviationPercent: ((currentArrival.modalPrice - baselineAverage.mean) / baselineAverage.mean) * 100,
    confidence: calculateConfidenceInterval(baselineAverage.sampleCount)
  };
}`,
    },
  },
  {
    id: 'clinical-auth',
    index: '03',
    title: 'Clinical Sanctuary Auth',
    category: 'Healthcare / Security',
    tags: ['React Native', 'OAuth2', 'Node.js', 'Redis', 'JWT'],
    description:
      'Secure cryptographic authentication gateway for clinical workflows, designed with zero-trust token rotation and biometric verification.',
    github: 'https://github.com/',
    live: null,
    featured: false,
    caseStudy: {
      tagline: 'Zero-Trust Clinical Authentication & Identity Verification',
      overview:
        'A HIPAA-compliant authorization broker providing single-sign-on and cryptographically validated session tokens across distributed hospital workstations.',
      challenge:
        'Fast-paced ER environments need instantaneous clinician authentication while maintaining strict audit compliance and tamper resistance.',
      solution:
        'Implemented stateless asymmetric JWT key rotation with ephemeral Redis revoking lists and device fingerprint validation.',
      metrics: [
        { label: 'Auth Time', value: '85ms' },
        { label: 'Audit Compliance', value: '100%' },
        { label: 'Token Lifespan', value: '15 min' },
      ],
      architecture: [
        'Identity Broker: OAuth2/OIDC conformant identity server',
        'Session Store: Redis cluster with sub-millisecond revocation lookup',
        'Audit Logger: Append-only cryptographic hash-chained audit log',
      ],
      codeSnippet: `// Ephemeral Session Key Verification & Revocation Check
async function verifyClinicalSession(bearerToken) {
  const payload = await jwt.verify(bearerToken, PUBLIC_KEY_SET);
  const isRevoked = await redis.sismember('revoked_tokens', payload.jti);
  if (isRevoked) {
    throw new SecurityException('SESSION_TERMINATED');
  }
  return { practitionerId: payload.sub, clearanceLevel: payload.clearance };
}`,
    },
  },
  {
    id: 'project-04',
    index: '04',
    title: '[Project Name]',
    category: 'Architecture / Systems',
    tags: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
    description:
      'Placeholder — replace with your actual project description, technologies used, and architectural decisions.',
    github: 'https://github.com/',
    live: null,
    featured: false,
  },
];

const FILTERS = ['All', 'AI / ML Platform', 'Data / Analytics', 'Healthcare / Security', 'Architecture / Systems'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDrawerProject, setActiveDrawerProject] = useState(null);

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const openDrawer = (project) => {
    if (project.caseStudy) {
      setActiveDrawerProject(project);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    setActiveDrawerProject(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-tag">02 / Work</div>
        <div className="projects__header">
          <h2 className="headline-xl">Selected Projects</h2>
          <p className="body-lg projects__subtitle">
            A curated selection of work. Click any project card to inspect the architectural case study.
          </p>
        </div>

        {/* Filter pills */}
        <div className="projects__filters" role="tablist" aria-label="Project category filters">
          {FILTERS.map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              className={`filter-pill${activeFilter === f ? ' filter-pill--active' : ''}`}
              onClick={() => setActiveFilter(f)}
              id={`filter-${f.replace(/\W+/g, '-').toLowerCase()}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="projects__grid">
          {filtered.map(project => (
            <article
              key={project.id}
              className={`project-card glass-card${project.featured ? ' project-card--featured' : ''}${project.caseStudy ? ' project-card--clickable' : ''}`}
              onClick={() => openDrawer(project)}
              role={project.caseStudy ? 'button' : undefined}
              tabIndex={project.caseStudy ? 0 : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openDrawer(project);
                }
              }}
            >
              {/* Card top */}
              <div className="project-card__top">
                <span className="project-card__index label-code">{project.index}</span>
                {project.featured && (
                  <span className="project-card__badge label-caps">Featured</span>
                )}
              </div>

              {/* Category */}
              <div className="project-card__category label-caps">{project.category}</div>

              {/* Title */}
              <h3 className="project-card__title headline-md">{project.title}</h3>

              {/* Description */}
              <p className="project-card__desc body-md">{project.description}</p>

              {/* Tags */}
              <div className="project-card__tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tech-tag label-code">{tag}</span>
                ))}
              </div>

              {/* Links */}
              <div className="project-card__links" onClick={(e) => e.stopPropagation()}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`GitHub for ${project.title}`}
                    id={`project-${project.id}-github`}
                  >
                    <GithubIcon size={15} strokeWidth={1.5} />
                    <span>Source</span>
                  </a>
                )}
                {project.caseStudy && (
                  <button
                    className="project-link project-link--primary"
                    onClick={() => openDrawer(project)}
                    id={`project-${project.id}-casestudy`}
                  >
                    <span>Case Study</span>
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </button>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--primary"
                    aria-label={`Live demo for ${project.title}`}
                    id={`project-${project.id}-live`}
                  >
                    <ExternalLink size={15} strokeWidth={1.5} />
                    <span>Live</span>
                  </a>
                )}
                <span className="project-card__arrow">
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Slide-out Case Study Drawer (Obsidian Theme) */}
      {activeDrawerProject && activeDrawerProject.caseStudy && (
        <>
          <div
            className="drawer-scrim"
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <aside
            className="case-study-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeDrawerProject.title} Case Study`}
          >
            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="drawer-header__meta">
                <span className="drawer-index label-code">{activeDrawerProject.index} / ARCHITECTURE</span>
                <span className="drawer-category label-caps">{activeDrawerProject.category}</span>
              </div>
              <button
                className="drawer-close-btn"
                onClick={closeDrawer}
                aria-label="Close Case Study"
                id="drawer-close-btn"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="drawer-body">
              <div className="drawer-title-group">
                <h2 className="headline-xl drawer-title">{activeDrawerProject.title}</h2>
                <p className="body-lg drawer-tagline">{activeDrawerProject.caseStudy.tagline}</p>
              </div>

              {/* Metrics Row */}
              {activeDrawerProject.caseStudy.metrics && (
                <div className="drawer-metrics-grid">
                  {activeDrawerProject.caseStudy.metrics.map((m, idx) => (
                    <div key={idx} className="drawer-metric-item">
                      <span className="drawer-metric-val headline-lg">{m.value}</span>
                      <span className="drawer-metric-label label-caps">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architectural Columns: Challenge & Solution */}
              <div className="drawer-cols">
                <div className="drawer-col">
                  <div className="drawer-col-title label-caps">
                    <Activity size={14} className="drawer-icon-purple" />
                    <span>01 / The Challenge</span>
                  </div>
                  <p className="body-md drawer-col-text">
                    {activeDrawerProject.caseStudy.challenge}
                  </p>
                </div>

                <div className="drawer-col">
                  <div className="drawer-col-title label-caps">
                    <Cpu size={14} className="drawer-icon-cyan" />
                    <span>02 / The Solution</span>
                  </div>
                  <p className="body-md drawer-col-text">
                    {activeDrawerProject.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Architecture Blueprint Section */}
              <div className="drawer-section">
                <div className="drawer-section-title label-caps">
                  <Layers size={14} className="drawer-icon-purple" />
                  <span>System Architecture Breakdown</span>
                </div>
                <div className="drawer-arch-list">
                  {activeDrawerProject.caseStudy.architecture.map((item, i) => (
                    <div key={i} className="drawer-arch-item">
                      <span className="drawer-arch-num label-code">{`0${i + 1}`}</span>
                      <span className="body-md drawer-arch-desc">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet */}
              {activeDrawerProject.caseStudy.codeSnippet && (
                <div className="drawer-section">
                  <div className="drawer-section-title label-caps">
                    <Terminal size={14} className="drawer-icon-cyan" />
                    <span>Implementation Excerpt</span>
                  </div>
                  <div className="drawer-code-block">
                    <div className="drawer-code-header">
                      <span className="drawer-code-filename label-code">engine_pipeline.ts</span>
                      <span className="drawer-code-pill label-code">TypeScript</span>
                    </div>
                    <pre className="drawer-code-content">
                      <code>{activeDrawerProject.caseStudy.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="drawer-section">
                <div className="drawer-section-title label-caps">
                  <GitBranch size={14} className="drawer-icon-cyan" />
                  <span>Technology Stack</span>
                </div>
                <div className="drawer-tech-tags">
                  {activeDrawerProject.tags.map(tag => (
                    <span key={tag} className="tech-tag tech-tag--accent label-code">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="drawer-actions">
                {activeDrawerProject.github && (
                  <a
                    href={activeDrawerProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <GithubIcon size={16} strokeWidth={2} />
                    <span>View Repository</span>
                  </a>
                )}
                <button className="btn-ghost" onClick={closeDrawer}>
                  Close Drawer
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </section>
  );
}
