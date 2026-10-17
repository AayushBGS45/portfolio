import React, { useState } from 'react';
import './index.css';
import IntroAnimation from './components/IntroAnimation';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="app">
      {!introDone && (
        <IntroAnimation onComplete={() => setIntroDone(true)} />
      )}
      <Nav />
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
