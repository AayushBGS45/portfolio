import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">AK</span>
          <p className="footer__tagline body-sm">
            Software Developer · Engineering with intent.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {[
            { href: '#home', label: 'Home' },
            { href: '#projects', label: 'Projects' },
            { href: '#about', label: 'About' },
            { href: '#experience', label: 'Experience' },
            { href: '#education', label: 'Education' },
            { href: '#contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="footer__link body-sm" id={`footer-${label.toLowerCase()}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="footer__social">
          <a href="https://github.com/AayushBGS45" target="_blank" rel="https://github.com/AayushBGS45" className="social-link" aria-label="GitHub" id="footer-github">
            <GithubIcon size={17} strokeWidth={1.5} />
          </a>
          <a href="https://www.linkedin.com/in/aayush-kumar-b3a46b29a/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" id="footer-linkedin">
            <LinkedinIcon size={17} strokeWidth={1.5} />
          </a>
          <a href="mailto:aayushsinghbgs@gmail.com" className="social-link" aria-label="Email" id="footer-email">
            <Mail size={17} strokeWidth={1.5} />
          </a>
        </div>

        <div className="footer__bottom">
          <span className="label-code footer__copy">
            © {year} Aayush Kumar. All rights reserved.
          </span>
          <span className="label-code footer__made">
            Made with <Heart size={11} strokeWidth={2} style={{ color: 'var(--accent-purple)', display: 'inline', verticalAlign: 'middle' }} /> using React + Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
