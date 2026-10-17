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

export default function Nav() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const indicatorRef = useRef(null);
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
      </div>
      {mobileOpen && (
        <div className="mobile-drawer__backdrop" onClick={() => setMobileOpen(false)} aria-hidden />
      )}
    </>
  );
}
