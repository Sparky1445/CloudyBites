import gsap from "gsap";

let hoverAnimations = null;
let menuItemHoverAnimationTimelines = null;

export const handleHover = (e) =>{
        if(!hoverAnimations){
            hoverAnimations = gsap.timeline({paused:true});
            hoverAnimations.to(".hoverMask",{
            duration:0.175,
            opacity:1,
            height:"100%",
            delay:0,
            ease:"power1.inOut",
        }).addPause();
        }
        return hoverAnimations;        
}


export function getMenuHoverAnimationTimeline(){
    if(!menuItemHoverAnimationTimelines){
        menuItemHoverAnimationTimelines = gsap.timeline({paused:true});
             menuItemHoverAnimationTimelines.addLabel('menuItemHoverAnimationTimelineStart')
            .from(`#menuAnimationBox`,{
                duration:4,
                xPercent:-50,
                delay:0,
                ease:"none",
                repeat:-1,
                yoyo:true
            })
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
        duration:0.8,
        rotate: count * 5,
        transformOrigin: "center center",
        ease:"bounce.out",
    })
    
}

export const setZeroRotation = () => {
    gsap.to(".MenuStagger",{
        duration:0.8,
        rotate: 0,
        transformOrigin: "center center",
        ease:"power1.inOut",
    })
}

