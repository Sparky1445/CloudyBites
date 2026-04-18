import React from "react"
import { handleHover , getMenuHoverAnimationTimeline } from "../../GSAP/horizontalScroll.js";


const HorizontalScroll = () => {

    return (
        <div onMouseEnter={(e) => { getMenuHoverAnimationTimeline().play(); handleHover(e).play(); } } 
       
        onMouseLeave={(e) =>  { handleHover(e).reverse(); document.querySelector(`#menuAnimationBox`).style.visibility = 'hidden'; }}
         className= {`MenuStagger top-[580px] h-1/6 bg-black w-full border-white  border-t border-b fixed z-[100] opacity-100  hover:cursor-pointer select-none`} >
            <div className={` hoverMask absolute inset-0 w-full h-0 opacity-0 bg-[#D3FD50] flex`} > </div>
            <div id={`menuAnimationBox`} className={`flex flex-row justify-center items-center h-full gap-5 invisible`}>
                    <div className="mb-2">
                        <span className="text-white whitespace-nowrap text-9xl leading-none font-semibold tracking-[2px]  ">
                            HI
                        </span>
                    </div>
                  
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
                </div>
                
            

        </div>
    )
}

export default HorizontalScroll