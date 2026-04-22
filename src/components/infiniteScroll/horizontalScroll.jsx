import React, { useEffect, useRef } from "react"
import { handleHover , getMenuHoverAnimationTimeline, rotatorAnimation, setZeroRotation} from "../../GSAP/horizontalScroll.js";

const HorizontalScroll = () => {

    const rotateCount = useRef(0);

    useEffect(()=>{
        getMenuHoverAnimationTimeline().play();


     document.addEventListener("wheel", (e) => {
    if (e.deltaY > 0 && rotateCount.current < 1) {
        rotateCount.current += 1;
        rotatorAnimation(rotateCount.current);
    } 
    else if (e.deltaY < 0 && rotateCount.current > -1) {
        rotateCount.current -= 1;
        rotatorAnimation(rotateCount.current);
    }
})
    setInterval(()=>{
        setZeroRotation();
    },2000)
    
    },[])

    return (
        <div onMouseEnter={(e) => { handleHover(e).play(); } } 
       
        onMouseLeave={(e) =>  { handleHover(e).reverse(); }}
        
         className= {`MenuStagger absolute transform translate-x-[0px] top-[600px] h-1/6 bg-black w-[120vw] left-[-15vw] border-white  border-t border-b   z-[5] opacity-100  hover:cursor-pointer select-none`} >
            <div className={` hoverMask absolute inset-0 w-full h-0 opacity-0 bg-[#D3FD50] flex`} > </div>
            <div id={`menuAnimationBox`} className={`flex flex-row justify-center items-center h-full gap-5 `}>
                    <div className="mb-2">
                        <span className="text-white whitespace-nowrap text-9xl font-semibold tracking-wide ">
                            ORDER NOW!
                        </span>
                    </div>

                    <div className="mb-2">
                        <span className="text-white whitespace-nowrap text-9xl font-semibold tracking-wider ">
                            ORDER NOW!
                        </span>
                    </div>

                    <div className="mb-2">
                        <span className="text-white whitespace-nowrap text-9xl font-semibold tracking-wider ">
                            ORDER NOW!
                        </span>
                    </div>
                    <div className="mb-2">
                        <span className="text-white whitespace-nowrap text-9xl font-semibold tracking-wide ">
                            ORDER NOW!
                        </span>
                    </div>
                    <div className="mb-2">
                        <span className="text-white whitespace-nowrap text-9xl font-semibold tracking-wide ">
                            ORDER NOW!
                        </span>
                    </div>
                </div>
                
            

        </div>
    )
}

export default HorizontalScroll