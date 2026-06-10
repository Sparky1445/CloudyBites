import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let aboutUsTimeline = null;

export const AboutUsAnimation = () => {
    if (!aboutUsTimeline) {
        aboutUsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".AboutUs",
                start: "top bottom",  // fires the instant AboutUs enters the viewport bottom
                toggleActions: "play none none none",
            }
        });

        // aboutUsTimeline.to(".navbar", {
        //     opacity: 0,
        //     duration: 1,
        //     ease: "power3.out"
        // },"start")

        aboutUsTimeline.from(".AboutUs #Text h1 .left", {
            y: 80,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        }, "start")
        .from(".AboutUs #Text h1 .right", {
            y: 80,
            opacity: 0,
            duration: 0.6,
            stagger: -0.15,
            ease: "power2.out"
        }, "start")

        .from(".AboutUs .header-line", {
            scaleX: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        },"<0.8")

        .from(".aboutUs-imageAnim", {
            x: -80,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        },"<0.3")

        .from(".aboutUs-nameAnim", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        },"<")

        // ── Text content slides in from right ──
        .from(".aboutUs-textAnim", {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        },"<0.3");
    }
}
