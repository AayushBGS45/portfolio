import React, { useState, useEffect, useRef } from 'react';
import './Nav.css';

const NAV_ITEMS = [
  { id: 'home',       label: 'Home'       },
  { id: 'projects',   label: 'Projects'   },
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education'  },
  { id: 'contact',    label: 'Contact'    },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Nav({ isDark, toggleTheme }) {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section by scroll position
      const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
      let current = 'home';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) current = section.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };


  return (
    <>
      <nav className={`nav-pill${scrolled ? ' nav-pill--scrolled' : ''}`} ref={navRef} aria-label="Main navigation">
        <div className="nav-pill__inner">
          <span className="nav-pill__brand" onClick={() => scrollTo('home')}>
            AK
          </span>

          <ul className="nav-pill__list" role="list">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`nav-pill__item${active === id ? ' nav-pill__item--active' : ''}`}
                  onClick={() => scrollTo(id)}
                  aria-current={active === id ? 'page' : undefined}
                  id={`nav-${id}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Theme toggle button */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            id="theme-toggle-btn"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="theme-toggle__track">
              <span className={`theme-toggle__thumb ${isDark ? 'theme-toggle__thumb--dark' : 'theme-toggle__thumb--light'}`}>
                {isDark ? <MoonIcon /> : <SunIcon />}
              </span>
            </span>
          </button>

          <button
            className="nav-pill__menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <span className={`hamburger${mobileOpen ? ' hamburger--open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${mobileOpen ? ' mobile-drawer--open' : ''}`} aria-hidden={!mobileOpen}>
        <ul className="mobile-drawer__list">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`mobile-drawer__item${active === id ? ' mobile-drawer__item--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Theme toggle in mobile drawer too */}
        <div className="mobile-drawer__theme">
          <button className="theme-toggle theme-toggle--mobile" onClick={toggleTheme} id="theme-toggle-mobile-btn">
            <span className="theme-toggle__track">
              <span className={`theme-toggle__thumb ${isDark ? 'theme-toggle__thumb--dark' : 'theme-toggle__thumb--light'}`}>
                {isDark ? <MoonIcon /> : <SunIcon />}
              </span>
            </span>
          </button>
          <span className="mobile-drawer__theme-label">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-drawer__backdrop" onClick={() => setMobileOpen(false)} aria-hidden />
      )}
    </>
  );
}
