import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let contactTimeline = null;

export const ContactUsAnimation = () => {
    if (!contactTimeline) {
        contactTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".ContactUs",
                start: "top 75%",
                toggleActions: "play none none none",
            }
        });

        // Heading letters split animate (same pattern as AboutUs / Reviews)
        contactTimeline
            .from(".ContactUs .ct-left", {
                y: 80,
                opacity: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: "power2.out",
            }, "start")
            .from(".ContactUs .ct-right", {
                y: 80,
                opacity: 0,
                duration: 0.6,
                stagger: -0.12,
                ease: "power2.out",
            }, "start")

            // Eyebrow fades in
            .from(".contact-eyebrow", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
            }, "<0.3")

            // Gradient line scales in (mirroring header-line in AboutUs)
            .from(".contact-line", {
                scaleX: 0,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                transformOrigin: "left center",
            }, "<0.5")

            // Left column slides in from left
            .from(".contactAnim-left", {
                x: -60,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
            }, "start")

            // Info items stagger up
            .from(".contactAnim-item", {
                y: 30,
                opacity: 0,
                duration: 0.55,
                stagger: 0.15,
                ease: "power2.out",
            }, "<0.5")

            // Right card slides in from right
            .from(".contactAnim-right", {
                x: 60,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
            }, "<-0.6")

            // Watermark fades in slowly
            .from(".contact-watermark", {
                opacity: 0,
                scale: 1.06,
                duration: 1.4,
                ease: "power2.out",
            }, "<0.2");
    }
};
