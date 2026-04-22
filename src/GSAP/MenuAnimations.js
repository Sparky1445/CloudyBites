import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let OuterMenuAnimationTimeline = null;

export const OuterMenuAnimation = () => {
    if(!OuterMenuAnimationTimeline){
        OuterMenuAnimationTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".Menu",
                start: "top top", // Activates right when the menu curtain finishes covering the screen
                end: "+=2000",    // Pins the menu in place for 2000px of scrolling
                pin: true,        // GSAP locks the Menu to the center of the screen
                scrub: 1,
                markers: true,
            }
        });
        // Animate the background or the inside cards during the pinned scroll!
        OuterMenuAnimationTimeline.to(".Menu", {
            duration: 1,
            ease: "none",
        })
        .to(".MenuCards", {
            width:"1000px",
            duration: 1,
            ease: "none",
        }, "<") 
        .to(".MenuCard", {
            width:"333px",
            height:"400px",
            duration: 0.6,
            ease: "power1.out",
        }, "<") 
        .to(".MenuCards",{
            gap:"50px",
            duration: 1,
            ease: "power1.out",
        })

        .to(".MenuCard", {
            rotateY:"180deg",
            duration: 1,
            ease: "power1.out",
        })
        .to(".MenuCard", {
            duration: 2,
        })  
    }
}
