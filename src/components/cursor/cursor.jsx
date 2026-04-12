import gsap from 'gsap'
import { useEffect, useRef } from 'react'
const Cursor = () => {
    const cursorRef = useRef(null);

    useEffect(()=>{
        const handleMouseMove = (e)=>{
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration:0.2,
                ease: "power1.out"
            })
        }
    document.body.addEventListener('mousemove',handleMouseMove)
    return()=>{
        document.body.removeEventListener('mousemove',handleMouseMove)
    }

    })

  return (
    <div ref={cursorRef} style={{mixBlendMode:'difference'}} className='cursor fixed pointer-events-none z-[9998] cursor w-8 h-8 rounded-full bg-gray-400' > 

    </div>
  )
}

export default Cursor