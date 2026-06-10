import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let navbarTimeline = null;

const ORIGINAL_LINK_COLOR  = "beige";
const ORIGINAL_LOGO_COLOR  = "#f4f4f5";
const MENU_SECTION_COLOR   = "#1a2e44"; // dark navy — clearly visible on the light #EBF5FB background
const MENU_NAV_BG          = "rgba(255, 255, 255, 0.75)";
const ORIGINAL_NAV_BG      = "transparent";
const MENU_BORDER          = "rgba(46, 117, 182, 0.25)";
const ORIGINAL_BORDER      = "rgba(255, 255, 255, 0.04)";

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

    // Change nav text colour + background when navbar overlaps the Menu section
    ScrollTrigger.create({
        trigger: ".Menu",
        start: "top 8%",
        end: "bottom 8%",
        onEnter: () => {
            gsap.to(".navbar", {
                backgroundColor: MENU_NAV_BG,
                borderColor: MENU_BORDER,
                duration: 0.3,
                ease: "power1.out",
            });
            gsap.to(".navbar button, .navbarLogo span", {
                color: MENU_SECTION_COLOR,
                duration: 0.3,
                ease: "power1.out",
            });
        },
        onLeave: () => {
            gsap.to(".navbar", {
                backgroundColor: ORIGINAL_NAV_BG,
                borderColor: ORIGINAL_BORDER,
                duration: 0.3,
                ease: "power1.out",
            });
            gsap.to(".navbar button, .navbarLogo span", {
                color: ORIGINAL_LOGO_COLOR,
                duration: 0.3,
                ease: "power1.out",
            });
        },
        onEnterBack: () => {
            gsap.to(".navbar", {
                backgroundColor: MENU_NAV_BG,
                borderColor: MENU_BORDER,
                duration: 0.3,
                ease: "power1.out",
            });
            gsap.to(".navbar button, .navbarLogo span", {
                color: MENU_SECTION_COLOR,
                duration: 0.3,
                ease: "power1.out",
            });
        },
        onLeaveBack: () => {
            gsap.to(".navbar", {
                backgroundColor: ORIGINAL_NAV_BG,
                borderColor: ORIGINAL_BORDER,
                duration: 0.3,
                ease: "power1.out",
            });
            gsap.to(".navbar button, .navbarLogo span", {
                color: ORIGINAL_LOGO_COLOR,
                duration: 0.3,
                ease: "power1.out",
            });
        },
    });

    return navbarTimeline;
}

export default navbarScroll