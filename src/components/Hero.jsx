import React, { useEffect, useRef } from 'react';
import { ArrowDown, Mail, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './icons';
import './Hero.css';

const PROFILE_PHOTO = '/profile.jpeg';

export default function Hero() {
  const canvasRef = useRef(null);

  // Meteor shower background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let meteors = [];
    let spawnTimer = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = [
      { r: 0, g: 240, b: 255 }, // cyan
      { r: 168, g: 85, b: 247 }, // purple
      { r: 120, g: 160, b: 255 }, // periwinkle
      { r: 200, g: 100, b: 255 }, // violet
    ];

    const spawnMeteor = () => {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      // Spawn anywhere along the top or right edge, always travel down-left diagonal
      const fromRight = Math.random() > 0.4;
      const x = fromRight
        ? canvas.width * (0.4 + Math.random() * 0.7)
        : canvas.width * Math.random();
      const y = fromRight
        ? -20 + Math.random() * canvas.height * 0.3
        : -20;

      const speed = 2.8 + Math.random() * 2.2;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.35; // ~45° down-left
      const length = 90 + Math.random() * 160;

      meteors.push({
        x, y,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        life: 1,           // 1 → 0
        decay: 0.012 + Math.random() * 0.01,
        width: 1.2 + Math.random() * 1.4,
        r: col.r, g: col.g, b: col.b,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn a new meteor every ~90 frames (≈1.5s at 60fps), stagger start
      spawnTimer++;
      if (spawnTimer % 90 === 0) spawnMeteor();
      // Also randomly fire an extra one sometimes for a burst feel
      if (spawnTimer % 90 === 45 && Math.random() > 0.55) spawnMeteor();

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];

        // Tail: gradient line from head (bright) to tail (transparent)
        const tailX = m.x - m.vx * (m.length / (Math.abs(m.vx) + Math.abs(m.vy)));
        const tailY = m.y - m.vy * (m.length / (Math.abs(m.vx) + Math.abs(m.vy)));

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(${m.r},${m.g},${m.b}, ${m.life * 0.92})`);
        grad.addColorStop(0.3, `rgba(${m.r},${m.g},${m.b}, ${m.life * 0.4})`);
        grad.addColorStop(1, `rgba(${m.r},${m.g},${m.b}, 0)`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width * m.life;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.width * 0.9 * m.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255, ${m.life * 0.9})`;
        ctx.fill();

        // Soft glow behind head
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.width * 6);
        glow.addColorStop(0, `rgba(${m.r},${m.g},${m.b}, ${m.life * 0.35})`);
        glow.addColorStop(1, `rgba(${m.r},${m.g},${m.b}, 0)`);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.width * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.restore();

        // Advance meteor
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;

        // Remove when faded or off-screen
        if (m.life <= 0 || m.y > canvas.height + 40 || m.x < -40) {
          meteors.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    // Stagger first few meteors so they don't all appear at once
    for (let i = 0; i < 3; i++) {
      setTimeout(spawnMeteor, i * 600);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden />

      {/* Gradient radial glow behind heading */}
      <div className="hero__glow" aria-hidden />

      <div className="container hero__inner">
        {/* Left column: Text & Information (positioned nicely on the left) */}
        <div className="hero__content">
          {/* Status tag */}
          <div className="hero__status">
            <span className="status-dot" />
            <span className="label-code">Available for opportunities</span>
          </div>

          <h1 className="hero__heading display-hero">
            <span className="hero__name-line">Aayush</span>
            <span className="hero__name-line hero__name-line--accent">Kumar</span>
          </h1>

          <div className="hero__role headline-md">
            <Terminal size={18} strokeWidth={1.5} />
            <span>Software Developer</span>
            <span className="hero__role-dot" />
            <span>Full-Stack Engineer</span>
          </div>

          <p className="hero__bio body-lg">
            I architect and ship high-performance software systems. Obsessed with
            clean abstractions, developer experience, and the craft of building
            things that scale.
          </p>

          <div className="hero__actions">
            <button className="btn-primary" onClick={scrollToProjects}>
              View Projects
              <ArrowDown size={16} strokeWidth={2} />
            </button>
            <a
              href="mailto:aayushsinghbgs@gmail.com"
              className="btn-ghost"
              id="hero-contact-btn"
            >
              Get in Touch
              <Mail size={16} strokeWidth={2} />
            </a>
          </div>

          <div className="hero__social">
            <a
              href="https://github.com/AayushBGS45/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
              id="hero-github-link"
            >
              <GithubIcon size={18} strokeWidth={1.5} />
            </a>
            <a
              href="https://leetcode.com/u/AayushBGS45/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LeetCode profile"
              id="hero-leetcode-link"
            >
              <LeetcodeIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/aayush-kumar-b3a46b29a/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
              id="hero-linkedin-link"
            >
              <LinkedinIcon size={18} strokeWidth={1.5} />
            </a>
            <a
              href="mailto:aayushsinghbgs@gmail.com"
              className="social-link"
              aria-label="Email"
              id="hero-email-link"
            >
              <Mail size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Right column: Big Photo (Clean display without any overlays) */}
        <div className="hero__visual">
          <div className="hero__photo-ambient" aria-hidden />

          <div className="hero__photo-card">
            <img
              src={PROFILE_PHOTO}
              alt="Aayush Kumar"
              className="hero__photo-img"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button className="scroll-indicator" onClick={scrollToProjects} aria-label="Scroll to projects">
        <div className="scroll-indicator__track">
          <div className="scroll-indicator__dot" />
        </div>
        <span className="label-caps" style={{ color: '#4B5563' }}>scroll</span>
      </button>
    </section>
  );
}
