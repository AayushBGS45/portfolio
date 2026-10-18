import React, { useState, useEffect } from 'react';
import './index.css';
import IntroAnimation from './components/IntroAnimation';
import SplashCursor from './components/SplashCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Dark mode: electric glowing cyans (as user loved)
const DARK_COLORS = ['#00F0FF', '#00e5ff', '#38bdf8', '#0ea5e9'];

// Light mode: rich, high-contrast ocean cyans & electric cerulean water waves
const LIGHT_COLORS = ['#0284C7', '#0369A1', '#0099BB', '#0284C7', '#0891B2'];

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved ? saved === 'dark' : true; // default dark
  });

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <div className="app">
      <SplashCursor
        key={isDark ? 'dark' : 'light'}
        colors={isDark ? DARK_COLORS : LIGHT_COLORS}
        rainbow={false}
        intensity={isDark ? 0.55 : 0.75}
        size={isDark ? 0.55 : 0.65}
        force={isDark ? 0.7 : 0.85}
        swirl={3.0}
        shading={isDark ? 0.75 : 0.6}
        glow={isDark ? 0.12 : 0.05}
        trail={isDark ? 0.85 : 0.9}
        intro={false}
        zIndex={1}
      />
      {!introDone && (
        <IntroAnimation onComplete={() => setIntroDone(true)} />
      )}
      <Nav isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
