import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import cloudyBitesVideo from '../../assets/CloudyBites3.mp4'
import { WHATSAPP_NUMBER } from '../../config.js'

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () =>{
  const textArr = ["Great Food", "Wherever You are ", "In Sohra"];
  const ellipseRef = useRef(null);

  useEffect(() => {

    const isTouch = window.innerWidth < 1024;

    if (isTouch) return;

    // Animate the stroke tracing around the fixed ellipse — desktop only
    const ellipse = ellipseRef.current;
    if (ellipse) {
      const totalLength = ellipse.getTotalLength();
      gsap.set(ellipse, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(ellipse, { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" })
        .to({}, { duration: 2 })
        .to(ellipse, { strokeDashoffset: totalLength, duration: 1, ease: "power1.inOut" })
        .to({}, { duration: 1 });
    }

    // Desktop only: pin hero and fade marquee on scroll
    gsap.to(".MenuStagger", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".landingPageWrapper",
        start: "top top",
        end: "+=80",
        scrub: 1,
      }
    });

    const st = ScrollTrigger.create({
      trigger: ".landingPageWrapper",
      start: "top top",
      end: () => "+=" + (window.innerHeight + 2200),
      pin: true,
      pinSpacing: false,
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <>
      <div className="landingPageWrapper absolute top-0 left-0 w-full h-screen z-[0]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute top-0 left-0 w-[100vw] h-[100vh] object-cover z-[0]'
        >
          <source src={cloudyBitesVideo} type="video/mp4" />
        </video>

        <div className='HeroSection absolute top-[72px] sm:top-[95px] left-[3%] sm:left-[7%] w-[94%] sm:w-[85%] bg-[transparent] z-[1]'>
          <section className='Section1 text-4xl sm:text-6xl md:text-[76px] text-[#EBF5FB] mt-[10px] flex flex-col text-center font-medium leading-tight drop-shadow-2xl'>
            {textArr.map((item, index) => (
              <React.Fragment key={index}>  
                <span className='font-[serif] text-[#EBF5FB] tracking-wider'>
                  {item === "In Sohra" ? (
                    <>
                      In{" "}
                      <span
                        className="sohra-text  text-[#1a6b3a] font-[5px] tracking-wide"
                        style={{
                          position: 'relative',
                          display: 'inline-block',
                          textShadow: '0 1px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Sohra

                        {/* Fixed ellipse with animated stroke trace */}
                        <svg
                          viewBox="0 0 360 130"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: 'clamp(180px, 55vw, 360px)',
                            height: 'clamp(65px, 20vw, 130px)',
                            transform: 'translate(-50%, -50%) rotate(-15deg)',
                            overflow: 'visible',
                            pointerEvents: 'none',
                          }}
                        >
                          <ellipse
                            ref={ellipseRef}
                            cx="180" cy="70"
                            rx="185" ry="58"
                            fill="none"
                            stroke="#1a6b3a"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    item
                  )}
                </span>
              </React.Fragment>
            ))}
          </section>
        </div>

        {/* Mobile-only ORDER NOW CTA — pinned to the bottom of the hero */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-[2]
                     w-[78vw] max-w-[340px] text-center
                     py-5 rounded-2xl no-underline
                     bg-gradient-to-r from-[#5B9BD5] via-[#3a8fd1] to-[#2E75B6]
                     text-white text-[18px] font-bold tracking-[0.22em] uppercase
                     shadow-[0_0_32px_6px_rgba(91,155,213,0.55),0_8px_24px_rgba(0,0,0,0.35)]
                     border border-white/30
                     active:scale-95 transition-transform"
        >
          Order Now
        </a>
      </div>
    </>
  )
}

export default HeroSection