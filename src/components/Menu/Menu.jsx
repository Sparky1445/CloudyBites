import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import foodImage from '../../assets/food_split.png'
import { OuterMenuAnimation } from '../../GSAP/MenuAnimations.js'

const Menu = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    // Initially: cards are together (no gap), forming one seamless image
    // On scroll into view or hover, they split apart and flip

    // Set initial state — cards together, no perspective rotation
    gsap.set(cards, {
      rotateY: 0,
      gap: 0,
    });

    // Mouse enter: split + flip
    const container = containerRef.current;

    // const handleMouseEnter = () => {
    //   gsap.to(container, {
    //     gap: 20,
    //     duration: 0.8,
    //     ease: "power3.out",
    //   });

    //   cards.forEach((card, i) => {
    //     // Left card rotates right, right card rotates left, center stays
    //     const rotateDirection = i === 0 ? 15 : i === 2 ? -15 : 0;
    //     gsap.to(card, {
    //       rotateY: rotateDirection,
    //       duration: 0.8,
    //       ease: "power3.out",
    //     });
    //   });
    // };

    // const handleMouseLeave = () => {
    //   gsap.to(container, {
    //     gap: 0,
    //     duration: 0.6,
    //     ease: "power3.inOut",
    //   });

    //   cards.forEach((card) => {
    //     gsap.to(card, {
    //       rotateY: 0,
    //       duration: 0.6,
    //       ease: "power3.inOut",
    //     });
    //   });
    // };

    // container.addEventListener("mouseenter", handleMouseEnter);
    // container.addEventListener("mouseleave", handleMouseLeave);
    OuterMenuAnimation();

    return () => {
      // container.removeEventListener("mouseenter", handleMouseEnter);
      // container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className='Menu z-[4] absolute bg-black top-[717px]  w-full h-screen flex flex-col items-center justify-center ' style={{ perspective: "1200px" }}>
      
        {/* Card container */}
        <div
          ref={containerRef}
          className="MenuCards flex items-center justify-center w-full "
          style={{
            gap: "0px",
            perspective: "1200px",
          }}
        >
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`MenuCard  ${i === 0 ? "border-l-2 rounded-l-2xl " : "" } ${i === 2 ? " border-r-2 rounded-r-2xl " : "" }  overflow-hidden cursor-pointer`}
            style={{
              width: "400px",
              height: "500px",
              backgroundImage: `url(${foodImage})`,
              backgroundSize: "750px 350px",         // total width = 3 cards × 250px
              backgroundPosition: `${-i * 250}px 0`, // offset each card
              backgroundRepeat: "no-repeat",
              transformStyle: "preserve-3d",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }}
          />
        ))}
      </div>

      <div className='MenuTitle'>
        <h1 className='text-6xl font-bold text-white'>THE MENU</h1>
      </div>
    </section>
  )
}

export default Menu
