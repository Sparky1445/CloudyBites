import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

/**
 * Preloader Component — Skeleton
 *
 * Props:
 *   onComplete — callback fired after exit animation finishes,
 *                used by App.jsx to hide the preloader and show content.
 *
 * Architecture:
 *   1. Create refs for DOM elements you need to animate (counter, progress bar, etc.)
 *   2. Inside useEffect, build a GSAP timeline with your animation phases
 *   3. In the timeline's onComplete, play an EXIT animation, then call onComplete()
 *   4. Return cleanup: ctx.revert() to kill all GSAP animations on unmount
 *
 * Suggested Animation Phases:
 *   Phase 1: Ambient elements fade in (background blobs, corner accents)
 *   Phase 2: Counter counts from 0 → 100 + progress bar fills
 *   Phase 3: Brand text characters stagger in
 *   Phase 4: Exit — preloader slides/fades away, revealing content
 */
const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // gsap.context scopes all animations to preloaderRef
    // so cleanup is automatic — no stray animations
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        onComplete: () => {
          // ── EXIT ANIMATION ──
          // TODO: Create a new timeline here for the exit animation
          // e.g. fade out elements, then slide the preloader away
          // At the very end, call: onComplete?.()

          // Example structure:
          // const exitTl = gsap.timeline({ onComplete: () => onComplete?.() });
          // exitTl.to(preloaderRef.current, { ... });

          onComplete?.(); // Remove this line once you add your exit animation
        },
      });

      // ── PHASE 1: Fade in ambient/decorative elements ──
      // TODO: Animate in any decorative elements (blobs, borders, etc.)
      // tl.to('.your-element', { opacity: 1, duration: 0.8 })

      // ── PHASE 2: Counter + Progress Bar ──
      // TIP: Use an object to tween the counter value:
      //
      // const counter = { value: 0 };
      // tl.to(counter, {
      //   value: 100,
      //   duration: 2,
      //   ease: 'power2.inOut',
      //   onUpdate: () => {
      //     counterRef.current.textContent = Math.round(counter.value);
      //   },
      // });
      //
      // Animate the progress bar width simultaneously:
      // tl.to(progressRef.current, { width: '100%', duration: 2 }, '<');

      // ── PHASE 3: Brand text stagger ──
      // TIP: Stagger each .char element for a letter-by-letter reveal:
      //
      // tl.to('.preloader-brand .char', {
      //   opacity: 1,
      //   y: 0,
      //   stagger: 0.04,
      //   duration: 0.5,
      //   ease: 'power3.out',
      // }, '-=1');

    }, preloaderRef);

    return () => ctx.revert(); // Cleanup all GSAP animations
  }, [onComplete]);

  // ── Split brand name into characters for stagger animation ──
  const brandName = 'CloudyBites';
  const chars = brandName.split('');

  return (
    <div className="preloader" ref={preloaderRef}>

      {/* TODO: Add any decorative elements you want (blobs, lines, corners) */}

      {/* Brand text — split into individual <span> for GSAP stagger */}
      <div className="preloader-brand">
        {chars.map((char, i) => (
          <span className="char" key={i}>{char}</span>
        ))}
      </div>

      {/* Counter */}
      <div className="preloader-counter" ref={counterRef}>0</div>

      {/* Progress bar */}
      <div className="preloader-progress">
        <div className="preloader-progress-fill" ref={progressRef} />
      </div>

    </div>
  );
};

export default Preloader;
