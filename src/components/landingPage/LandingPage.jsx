import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import cloudyBitesVideo from '../../assets/cloudyBites.mp4'

const HeroSection = () =>{
  const Array = ["Rain Soaked", "Farm Fresh", "Unapologetically Delicious"];
  const pathRef = useRef(null);
  const stringRef = useRef(null);

  const initialPath = "M 10 50 Q 600 50 1190 50";

  useEffect(() => {
    const path = pathRef.current;
    const stringEl = stringRef.current;
    if (!path || !stringEl) return;

    // Set the initial straight line
    path.setAttribute("d", initialPath);

    const handleMouseMove = (e) => {
      const rect = stringEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const finalPath = `M 10 50 Q ${x} ${y} 1190 50`;

      gsap.to(path, {
        attr: { d: finalPath },
        duration: 0.5,
        ease: "elastic.out(1, 0.1)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(path, {
        attr: { d: initialPath },
        duration: 0.6,
        ease: "bounce.out"
      });
    };

    stringEl.addEventListener("mousemove", handleMouseMove);
    stringEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      stringEl.removeEventListener("mousemove", handleMouseMove);
      stringEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute top-0 left-0 w-[100vw] h-[100vh] object-cover z-[0]'
      >
        <source src={cloudyBitesVideo} type="video/mp4" />
      </video>

      <div className='HeroSection absolute  top-[95px] left-[7%] w-[85%] bg-[transparent] z-[1]'>
        <section className='Section1 text-[100px] text-[#fff] mt-[10px] flex flex-col text-center font-bold leading-none'>
        {Array.map((item, index) => (
          <React.Fragment key={index}>
            <span className='font-[NeuMachina] tracking-wider'>{item}</span>
            
            {/* Interactive string after "Farm Fresh" */}
            {item === "Farm Fresh" && (
              <div
                ref={stringRef}
                className="absolute left-0 right-0 cursor-pointer z-[2]"
                style={{ height: "80px", marginTop: "350px" }}
              >
                <svg width="100%" height="150px" preserveAspectRatio="none" viewBox="0 0 1200 100">
                  <path
                    ref={pathRef}
                    d={initialPath}
                    strokeWidth="2"
                    fill="transparent"
                    stroke="beige"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </section>

    
      

    </div>
    </>
  )
}

export default HeroSection