import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// gsap.matchMedia() is the correct GSAP API for responsive animations.
// When the viewport drops below 1024px, GSAP automatically kills the timeline,
// removes the ScrollTrigger pin spacer, and clears all inline transforms —
// so no stale rotateY or empty scroll space can leak into the mobile layout.

let mm = null;

export const OuterMenuAnimation = () => {
    if (mm) return;
    mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".Menu",
                start: "top top",
                end: "+=2200",
                pin: true,
                scrub: 1,
            }
        });

        tl.to(".Menu", { duration: 1, ease: "power1.inOut" })
          .to(".MenuCards", { width: "1180px", duration: 1, ease: "none" }, "<")
          .to(".MenuCard",  { width: "360px", height: "490px", duration: 0.6, ease: "power1.out" }, "<")
          .to(".MenuCards", { gap: "50px", duration: 1, ease: "power1.out" })
          .to(".MenuCard",  { rotateY: "180deg", duration: 1, ease: "power1.out" })
          .to(".MenuCard",  { duration: 2 });
    });
};
