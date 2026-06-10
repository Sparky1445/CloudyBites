import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let reviewsTimeline = null;

export const ReviewsAnimation = () => {
    if (!reviewsTimeline) {
        reviewsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".Reviews",
                start: "top 75%",
                toggleActions: "play none none none",
            }
        });

        // Heading letters — snappy stagger
        reviewsTimeline
            .from(".Reviews #reviewsText h2 .rv-left", {
                y: 50,
                opacity: 0,
                duration: 0.35,
                stagger: 0.04,
                ease: "power2.out"
            }, "start")
            .from(".Reviews #reviewsText h2 .rv-right", {
                y: 50,
                opacity: 0,
                duration: 0.35,
                stagger: -0.04,
                ease: "power2.out"
            }, "start")

            // Decorative line — tight follow
            .from(".reviews-header-line", {
                scaleX: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            }, "<0.2")

            // Cards pop up quickly with a short stagger
            .from(".reviews-cardAnim", {
                y: 40,
                opacity: 0,
                duration: 0.45,
                stagger: 0.08,
                ease: "power3.out"
            }, "<0.1");
    }
};
