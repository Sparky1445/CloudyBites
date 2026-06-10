import React, { useEffect, useRef, useState } from 'react'
import coverImage from '../../assets/meghalaya_cloudybites.svg'
import menuIndoChinese from '../../assets/menu_indochinese.png'
import menuIndian from '../../assets/menu_indian.png'
import menuSnacks from '../../assets/menu_snacks.png'
import { OuterMenuAnimation } from '../../GSAP/MenuAnimations.js'
import DotGrid from '../gridMask/gridMask.jsx'

const menuImages = [menuIndoChinese, menuIndian, menuSnacks];
const menuLabels = ['Indo-Chinese', 'Indian', 'Snacks & Drinks'];

const Menu = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    // matchMedia inside OuterMenuAnimation restricts this to ≥1024px;
    // calling it unconditionally is safe — it self-guards via gsap.matchMedia().
    OuterMenuAnimation();
  }, []);

  // ── MOBILE: vertical stacked cards, no animations ──
  if (isMobile) {
    return (
      <section
        id="menu"
        className="Menu w-full flex flex-col items-center"
        style={{ background: '#EBF5FB', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}
      >
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem',
          fontWeight: 700,
          color: '#2C3E50',
          letterSpacing: '0.06em',
          marginBottom: '2rem',
        }}>
          Our Menu
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '88%',
          maxWidth: '420px',
        }}>
          {menuImages.map((img, i) => (
            <div key={i} style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(11,29,58,0.15)',
              border: '1px solid rgba(91,155,213,0.15)',
              background: '#fff',
            }}>
              <img
                src={img}
                alt={menuLabels[i]}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              />
              <p style={{
                textAlign: 'center',
                padding: '10px 0 13px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#2C3E50',
                letterSpacing: '0.04em',
                margin: 0,
              }}>
                {menuLabels[i]}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── DESKTOP: GSAP card-flip animation ──
  return (
    <section
      id="menu"
      className='Menu z-[4] absolute top-[100vh] w-full h-screen flex flex-col items-center justify-center'
      style={{ perspective: '1200px', background: '#EBF5FB' }}
    >
      <DotGrid />

      <div
        ref={containerRef}
        className="MenuCards flex items-center justify-center w-full relative z-[10]"
        style={{ gap: '0px', perspective: '1200px' }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`MenuCard ${i === 0 ? 'rounded-l-2xl' : ''} ${i === 2 ? 'rounded-r-2xl' : ''} cursor-pointer`}
            style={{
              width: '450px',
              height: '560px',
              transformStyle: 'preserve-3d',
              position: 'relative',
            }}
          >
            {/* FRONT — seamless cover illustration */}
            <div
              className="MenuCardFront absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                backgroundImage: `url(${coverImage})`,
                backgroundSize: '1350px 570px',
                backgroundPosition: `${-i * 450}px center`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#eaf3fb',
                borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : '0',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
            />

            {/* BACK — menu image */}
            <div
              className="MenuCardBack absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 15px 50px rgba(11,29,58,0.5), 0 0 30px rgba(91,155,213,0.15)',
              }}
            >
              <img
                src={menuImages[i]}
                alt={menuLabels[i]}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 60%, rgba(11,29,58,0.25) 100%)',
                pointerEvents: 'none',
                borderRadius: '16px',
              }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu
