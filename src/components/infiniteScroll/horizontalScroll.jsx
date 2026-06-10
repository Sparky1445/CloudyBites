import { useEffect, useRef } from "react"
import { handleHover, getMenuHoverAnimationTimeline, rotatorAnimation, setZeroRotation } from "../../GSAP/horizontalScroll.js";
import { WHATSAPP_NUMBER } from "../../config.js";

const HorizontalScroll = () => {
    const rotateCount = useRef(0);

    useEffect(() => {
        if (window.innerWidth < 1024) return;

        getMenuHoverAnimationTimeline().play();

        document.addEventListener("wheel", (e) => {
            if (e.deltaY > 0 && rotateCount.current < 1) {
                rotateCount.current += 1;
                rotatorAnimation(rotateCount.current);
            } else if (e.deltaY < 0 && rotateCount.current > -1) {
                rotateCount.current -= 1;
                rotatorAnimation(rotateCount.current);
            }
        });

        setInterval(() => { setZeroRotation(); }, 1000);
    }, []);

    // One set of 4 items — rendered twice for seamless loop
    const renderSet = () => (
        <>
            <div className="mb-2 mx-6 md:mx-14 flex-shrink-0">
                <span className="horizontalText opacity-0 text-white whitespace-nowrap text-4xl sm:text-5xl md:text-7xl font-semibold tracking-wider">
                    ORDER NOW!!
                </span>
            </div>

            <span className="horizontalText opacity-0 text-white/40 text-2xl md:text-4xl select-none flex-shrink-0">✦</span>

            <div className="mb-2 mx-6 md:mx-14 flex-shrink-0">
                <span className="horizontalText opacity-0 text-white/60 whitespace-nowrap text-4xl sm:text-5xl md:text-7xl tracking-wider">
                    ORDER NOW!!
                </span>
            </div>

            <span className="horizontalText opacity-0 text-white/40 text-2xl md:text-4xl select-none flex-shrink-0">✦</span>

            <div className="mb-2 mx-6 md:mx-14 flex-shrink-0">
                <span className="horizontalText opacity-0 text-white/80 whitespace-nowrap text-4xl sm:text-5xl md:text-7xl tracking-wider">
                    ORDER NOW!!
                </span>
            </div>

            <span className="horizontalText opacity-0 text-white/40 text-2xl md:text-4xl select-none flex-shrink-0">✦</span>

            <div className="mb-2 mx-6 md:mx-14 flex-shrink-0">
                <span className="horizontalText opacity-0 text-white whitespace-nowrap text-4xl sm:text-5xl md:text-7xl font-semibold tracking-wider">
                    ORDER NOW!!
                </span>
            </div>

            <span className="horizontalText opacity-0 text-white/40 text-2xl md:text-4xl select-none flex-shrink-0">✦</span>
        </>
    );

    return (
        <div
            onMouseEnter={(e) => { handleHover(e).play(); }}
            onMouseLeave={(e) => { handleHover(e).reverse(); }}
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
            className="MenuStagger absolute transform translate-x-[0px] top-[638px] h-1/7 bg-white/10 backdrop-blur-md w-[120vw] left-[-15vw] border-white/20 border-t border-b z-[5] opacity-100 hover:cursor-pointer select-none overflow-hidden"
        >
            {/* Background text — visible by default, hides on hover */}
            <h1 className="superText font-['Cormorant_Garamond'] absolute transform translate-y-[22px] translate-x-[330px] text-white/80 whitespace-nowrap text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wider drop-shadow-sm">
                SUPERCALIFRAGILISTICEXPIALADOCIOUS
            </h1>

            <div className="hoverMask absolute inset-0 w-full h-0 opacity-0 bg-black/30 flex" />

            {/* Marquee — two identical sets for seamless loop */}
            <div
                id="menuAnimationBox"
                className="flex flex-row items-center h-full"
                style={{ width: 'max-content' }}
            >
                {renderSet()}
                {renderSet()}
            </div>
        </div>
    );
};

export default HorizontalScroll;
