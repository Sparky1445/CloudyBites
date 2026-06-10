import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Preloader from './components/preLoader/Preloader'
import './App.css'
import Cursor from './components/cursor/cursor.jsx'
import HeroSection from './components/landingPage/LandingPage.jsx'
import Navbar from './components/Navbar/navbar.jsx'
import HorizontalScroll from './components/infiniteScroll/horizontalScroll.jsx'
import Menu from './components/Menu/Menu.jsx'
import AboutUs from './components/aboutUs/AboutUs.jsx'
import Reviews from './components/reviews/Reviews.jsx'
import ContactUs from './components/contactUs/ContactUs.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [halfAnimation, setHalfAnimation] = useState(false);
  const loopOverlayRef = useRef(null);
  const loopLabelRef   = useRef(null);

  // ── Lock scroll while preloader is running ──
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLoading]);

  // ── Infinite scroll loop ──
  // When the user tries to scroll past the ContactUs bottom, fade to dark,
  // snap back to the top, then fade back in — seamless because both ends are dark.
  useEffect(() => {
    if (isLoading) return;

    const overlay = loopOverlayRef.current;
    let looping = false;

    const label = loopLabelRef.current;

    const triggerLoop = () => {
      if (looping) return;
      looping = true;

      gsap.set(label, { opacity: 0, y: 24 });

      gsap.timeline()
        // 1. Fade the dark screen in
        .to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.in' })
        // 2. Slide the label up into view once the screen is dark
        .to(label, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.05')
        // 3. Hold so the user can read it, then snap the scroll silently
        .add(() => { window.scrollTo(0, 0); }, '+=0.55')
        // 4. Fade the whole overlay (label included) back out
        .to(overlay, {
          opacity: 0,
          duration: 0.65,
          ease: 'power2.out',
          onComplete: () => { looping = false; },
        });
    };

    // Wheel: fire before the browser hits the scroll boundary for an instant response
    const onWheel = (e) => {
      if (looping) return;
      const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 100;
      if (atBottom && e.deltaY > 0) {
        e.preventDefault();
        triggerLoop();
      }
    };

    // Scroll fallback: covers keyboard / touch / trackpad momentum that slips past the wheel check
    const onScroll = () => {
      if (looping) return;
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 4) {
        triggerLoop();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <Preloader onComplete={() => { setIsLoading(false); }} />
      )}

      <main style={{ visibility: halfAnimation ? 'hidden' : 'visible' }}>
        <Navbar />
        <Cursor />
        <HeroSection />
        <HorizontalScroll />
        <Menu />
        <AboutUs />
        <Reviews />
        <ContactUs />
      </main>

      {/* Full-screen loop overlay — invisible until the infinite-scroll transition fires */}
      <div
        ref={loopOverlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#060f1e',
          zIndex: 999999,
          opacity: 0,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <div
          ref={loopLabelRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            opacity: 0,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(235,245,251,0.55)',
          }}>
            Back to the beginning
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#EBF5FB',
            lineHeight: 1,
          }}>
            Cloudy Bites
          </span>
        </div>
      </div>
    </>
  );
}

export default App
