import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let navbarTimeline = null;

const ORIGINAL_LINK_COLOR  = "beige";
const ORIGINAL_LOGO_COLOR  = "#f4f4f5";
const MENU_SECTION_COLOR   = "#7B3F00"; // warm chocolate brown

const navbarScroll = () => {
    if(!navbarTimeline){
        navbarTimeline = gsap.timeline({
            scrollTrigger:{
                trigger:".AboutUs",
                start:"top 10%",
                end:"bottom bottom",
                scrub:true,
            }
        })
        navbarTimeline.to(".navbar",{
            opacity:0,
            duration:0.5,
            ease:"power1.inOut"
        })
    }

    // Change nav text colour when navbar overlaps the Menu section
    ScrollTrigger.create({
        trigger: ".Menu",
        start: "top 8%",
        end: "bottom 8%",
        onEnter: () => gsap.to(".navbar a, .navbarLogo span", {
            color: MENU_SECTION_COLOR,
            duration: 0.3,
            ease: "power1.out",
        }),
        onLeave: () => gsap.to(".navbar a, .navbarLogo span", {
            color: ORIGINAL_LINK_COLOR,
            duration: 0.3,
            ease: "power1.out",
        }),
        onEnterBack: () => gsap.to(".navbar a, .navbarLogo span", {
            color: MENU_SECTION_COLOR,
            duration: 0.3,
            ease: "power1.out",
        }),
        onLeaveBack: () => gsap.to(".navbar a, .navbarLogo span", {
            color: ORIGINAL_LINK_COLOR,
            duration: 0.3,
            ease: "power1.out",
        }),
    });

    return navbarTimeline;
}

export default navbarScroll