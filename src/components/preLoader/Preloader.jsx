import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline();
        tl.to('.PreLoader-curtain', {
        width: '100%',
        duration: 0.1,
        ease: 'power2.out',
        stagger: 0.1,
        
    
          // each curtain starts slightly after the previous
      });
      // Phase 2: Hold — screen is fully covered
      tl.to({}, { duration: 1 });
      // Phase 3: Curtains retract (width 100% → 0%)
      tl.to('.PreLoader-curtain', {
        width: '0%',
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.1,
      
      });
      // Phase 4: Hide preloader & notify App
      tl.to(preloaderRef.current, {
        visibility: 'hidden',
        duration: 0.01,
        onComplete: () => onComplete?.(),
        
      });


    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={preloaderRef}>
         <div className='PreLoader fixed inset-0 flex flex-col w-full h-full bg-transparent z-[9999]' >
            <div className='PreLoader-curtain bg-blue-500 w-0 basis-3/20 '></div>
            <div className='PreLoader-curtain bg-blue-400 w-0 basis-3/20 '></div>
            <div className='PreLoader-curtain  bg-blue-300 w-0 basis-6/20 '></div>
            <div className='PreLoader-curtain bg-blue-200 w-0 basis-4/20 '></div>
            <div className='PreLoader-curtain bg-blue-100 w-0 basis-4/20 '></div>
        </div>


    </div>
  );
};

export default Preloader;
