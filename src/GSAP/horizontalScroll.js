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
                duration:6,
                xPercent:-50,
                delay:0,
                ease:"none",
                repeat:-1,
                visibility:"visible",
                yoyo:true,
            })
    }
    return menuItemHoverAnimationTimelines;
}

export const menuHoverAnimationPause = () => {
    if(menuItemHoverAnimationTimelines){
        menuItemHoverAnimationTimelines.pause();
    }
}