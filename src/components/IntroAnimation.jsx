import React, { useState, useEffect, useRef } from 'react';
import './IntroAnimation.css';

const FIRST_NAME_LETTERS = ['A', 'A', 'Y', 'U', 'S', 'H'];
const TARGET_WORD_LETTERS = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];

export default function IntroAnimation({ onComplete }) {
  // Phases: 'drop' -> 'settled' -> 'morphing' -> 'complete' -> 'reveal'
  const [phase, setPhase] = useState('drop');
  const [morphStep, setMorphStep] = useState(0); // 0 to 9
  const [isRevealing, setIsRevealing] = useState(false);
  const timersRef = useRef([]);

  const addTimer = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  const handleFinish = () => {
    if (isRevealing) return;
    setIsRevealing(true);
    setPhase('reveal');
    addTimer(() => {
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 1250);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(handleFinish, 300);
      return () => clearTimeout(t);
    }

    // Phase 1: Letter drop takes ~1.5s to finish dropping, then pauses peacefully until 2.1s
    addTimer(() => {
      setPhase('morphing');
      startMorphSequence();
    }, 2100);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timersRef.current.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  // Slower, smoother step-by-step morphing from AAYUSH to PORTFOLIO
  const startMorphSequence = () => {
    let current = 0;
    // 160ms per letter transition creates a smooth, readable flow
    const interval = setInterval(() => {
      current += 1;
      setMorphStep(current);

      // When all 9 letters of PORTFOLIO are locked in
      if (current >= TARGET_WORD_LETTERS.length) {
        clearInterval(interval);
        setPhase('complete');

        // Hold the full PORTFOLIO word clearly on screen for 1.2s so the user can enjoy it
        addTimer(() => {
          handleFinish();
        }, 1200);
      }
    }, 160);

    timersRef.current.push(interval);
  };

  // Determine what each slot displays
  const renderSlots = () => {
    if (phase === 'drop') {
      return (
        <div className="intro-word-row">
          <div className="intro-half intro-half--left">
            {FIRST_NAME_LETTERS.slice(0, 3).map((char, index) => (
              <span
                key={`drop-${index}`}
                className="intro-char intro-char--drop"
                style={{ animationDelay: `${0.15 + index * 0.16}s` }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="intro-half intro-half--right">
            {FIRST_NAME_LETTERS.slice(3).map((char, index) => (
              <span
                key={`drop-${index + 3}`}
                className="intro-char intro-char--drop"
                style={{ animationDelay: `${0.15 + (index + 3) * 0.16}s` }}
              >
                {char}
              </span>
            ))}
            <span className="intro-accent-dot" style={{ animationDelay: '1.15s' }} />
          </div>
        </div>
      );
    }

    // 'morphing', 'complete', or 'reveal' phase:
    // 9 slots split into "PORT" (4) and "FOLIO" (5) for clean cinematic split
    const leftSlots = [0, 1, 2, 3];
    const rightSlots = [4, 5, 6, 7, 8];

    const getSlotChar = (slotIndex) => {
      if (morphStep > slotIndex) {
        return TARGET_WORD_LETTERS[slotIndex];
      }
      if (slotIndex < FIRST_NAME_LETTERS.length) {
        return FIRST_NAME_LETTERS[slotIndex];
      }
      return null;
    };

    return (
      <div className={`intro-word-row ${phase === 'complete' || phase === 'reveal' ? 'intro-word-row--complete' : ''}`}>
        <div className="intro-half intro-half--left">
          {leftSlots.map((slotIndex) => {
            const char = getSlotChar(slotIndex);
            const isMorphed = morphStep > slotIndex;
            return (
              <span
                key={`slot-${slotIndex}`}
                className={`intro-char ${isMorphed ? 'intro-char--morphed' : 'intro-char--original'
                  }`}
              >
                {char}
              </span>
            );
          })}
        </div>

        <div className="intro-half intro-half--right">
          {rightSlots.map((slotIndex) => {
            const char = getSlotChar(slotIndex);
            if (!char) return null;
            const isMorphed = morphStep > slotIndex;
            return (
              <span
                key={`slot-${slotIndex}`}
                className={`intro-char ${isMorphed ? 'intro-char--morphed' : 'intro-char--original'
                  }`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`intro-overlay ${isRevealing ? 'intro-overlay--revealing' : ''}`}
      onClick={handleFinish}
      role="dialog"
      aria-label="Welcome animation"
    >
      {/* Ambient glowing atmosphere */}
      <div className="intro-overlay__ambient" />
      <div className="intro-overlay__grid" />

      {/* Shutter curtains for smooth aperture page reveal */}
      <div className="intro-shutter intro-shutter--top" />
      <div className="intro-shutter intro-shutter--bottom" />

      {/* Center Typography Stage */}
      <div className={`intro-stage ${phase === 'reveal' ? 'intro-stage--reveal' : ''}`}>
        <h1 className="intro-wordmark" aria-live="polite">
          {renderSlots()}
        </h1>

        {/* Status / Category tag */}
        <div className="intro-subline">
          <span className="intro-subline__line" />
          <span className="intro-subline__text">
            {phase === 'drop' ? 'DEVELOPER' : 'PORTFOLIO • 2026'}
          </span>
          <span className="intro-subline__line" />
        </div>
      </div>
    </div>
  );
}
