import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import preloaderImage from '../../assets/cloudybites_preloader_v2.png';
import preloaderMobile from '../../assets/cloudybites_preloader_mobile.png';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const wrapperRef    = useRef(null);
  const imageRef      = useRef(null);
  const counterRef    = useRef(null);
  const counterNumRef = useRef(null);
  const progressRef   = useRef(null);
  const fillRef       = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ── Phase 1: Navy curtains sweep DOWN to cover the screen ──
      tl.to('.pl__curtain', {
        height: '100%',
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.06,
      });

      // ── Phase 2: Illustration fades in above the curtains ──
      tl.fromTo(imageRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.1'
      );

      // ── Phase 3: Counter + progress bar appear and animate together ──
      tl.fromTo([counterRef.current, progressRef.current],
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.1'
      );

      const obj = { value: 0 };
      tl.to(obj, {
        value: 100,
        duration: 2,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counterNumRef.current)
            counterNumRef.current.textContent = Math.round(obj.value);
        },
      }, '<');

      tl.to(fillRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power1.inOut',
      }, '<');

      // ── Phase 4: Hold at 100% ──
      tl.to({}, { duration: 0.35 });

      // ── Phase 5: Image + counter + bar vanish ──
      tl.to([imageRef.current, counterRef.current, progressRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });

      // ── Phase 6: Make wrapper transparent so website shows as curtains lift ──
      tl.set(wrapperRef.current, { background: 'transparent' });

      // ── Phase 7: Curtains retract UPWARD, website appears beneath ──
      tl.to('.pl__curtain', {
        height: '0%',
        duration: 0.75,
        ease: 'power2.inOut',
        stagger: 0.06,
      });

      // ── Phase 8: Done ──
      tl.set(wrapperRef.current, { visibility: 'hidden' });
      tl.add(() => onComplete?.());

    }, wrapperRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={wrapperRef} className="pl">

      {/* Illustration — z-index above curtains */}
      <img
        ref={imageRef}
        src={window.innerWidth < 768 ? preloaderMobile : preloaderImage}
        alt="Cloudy Bites"
        className="pl__image"
        style={{ opacity: 0 }}
      />

      {/* Counter */}
      <div ref={counterRef} className="pl__counter" style={{ opacity: 0 }}>
        <span ref={counterNumRef} className="pl__counter-num">0</span>
        <span className="pl__counter-pct">%</span>
      </div>

      {/* Progress bar */}
      <div ref={progressRef} className="pl__progress" style={{ opacity: 0 }}>
        <div ref={fillRef} className="pl__progress-fill" />
      </div>

      {/* Curtains — sit below image/counter */}
      <div className="pl__curtains">
        <div className="pl__curtain" />
        <div className="pl__curtain" />
        <div className="pl__curtain" />
        <div className="pl__curtain" />
        <div className="pl__curtain" />
      </div>

    </div>
  );
};

export default Preloader;
