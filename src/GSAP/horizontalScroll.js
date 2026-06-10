import gsap from "gsap";

let hoverAnimations = null;
let menuItemHoverAnimationTimelines = null;

export const handleHover = (e) =>{
        if(!hoverAnimations){
            hoverAnimations = gsap.timeline({paused:true});
            hoverAnimations.to(".hoverMask",{
            duration:0.5,
            opacity:1,
            height:"100%",
            delay:0,
            ease:"power1.out",
        })
        .to(".horizontalText",{
            opacity:1,
            duration:0.2,
        },"<"
        )
        .to(".superText",{
            opacity:0,
            duration:0.2,
        },"<"
        )   
        // glass background stays — no override needed
        }
        return hoverAnimations;        
}


export function getMenuHoverAnimationTimeline(){
    if(!menuItemHoverAnimationTimelines){
        menuItemHoverAnimationTimelines = gsap.timeline({paused:true});
        // Animate to -50%: since content is duplicated, at -50% it shows an
        // identical copy — the snap-back on repeat is invisible (seamless loop).
        menuItemHoverAnimationTimelines.to(`#menuAnimationBox`,{
            duration: 18,
            xPercent: -50,
            ease: "none",
            repeat: -1,
        });
    }
    return menuItemHoverAnimationTimelines;
}

export const menuHoverAnimationPause = () => {
    if(menuItemHoverAnimationTimelines){
        menuItemHoverAnimationTimelines.pause();
    }
}

export const rotatorAnimation = (count) => {
    
    gsap.to(".MenuStagger",{
        duration:0.5,
        rotate: count * 3,
        transformOrigin: "center center",
        ease:"bounce.out",
    })
    
}

export const setZeroRotation = () => {
    gsap.to(".MenuStagger",{
        duration:0.5,
        rotate: 0,
        transformOrigin: "center center",
        ease:"power1.inOut",
    })
}

