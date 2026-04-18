import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const DotGrid = () => {
  const gridRef = useRef(null);
  const dotRefs = useRef([]);
  const quickToFns = useRef([]);
  const activeDots = useRef(new Set()); // Track which dots are currently displaced

  const dotSpacing = 30;
  const rows = Math.floor(window.innerHeight / dotSpacing);
  const cols = Math.floor(window.innerWidth / dotSpacing);
  const totalDots = rows * cols;
  const radius = 100;

  useEffect(() => {
    // ── STEP 1: Create quickTo functions ONCE ──
    quickToFns.current = dotRefs.current.map((dot) => {
      if (!dot) return null;
      return {
        x: gsap.quickTo(dot, "x", { duration: 0.05, ease: "power2.out" }),
        y: gsap.quickTo(dot, "y", { duration: 0.4, ease: "power2.out" }),
        scale: gsap.quickTo(dot, "scale", { duration: 0.4, ease: "power2.out" }),
      };
    });

    // ── STEP 2: Add will-change to the grid container for GPU compositing ──
    if (gridRef.current) {
      gridRef.current.style.willChange = "transform";
    }

    // ── STEP 3: Grid-based spatial lookup ──
    // Since dots are in a perfect grid, we KNOW every dot's position:
    //   dot at index (row, col) is at pixel position (col * spacing, row * spacing)
    // So instead of checking all 500+ dots, we calculate which rows/cols
    // fall within the mouse radius — typically only ~20 dots!
    let rafId = null;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const updateDots = () => {
      rafId = null;
      const mouseX = lastMouseX;
      const mouseY = lastMouseY;

      // Get grid's position on screen (only the container, not every dot)
      const gridRect = gridRef.current?.getBoundingClientRect();
      if (!gridRect) return;

      // Calculate which grid cells are within the radius
      const minCol = Math.max(0, Math.floor((mouseX - gridRect.left - radius) / dotSpacing));
      const maxCol = Math.min(cols - 1, Math.ceil((mouseX - gridRect.left + radius) / dotSpacing));
      const minRow = Math.max(0, Math.floor((mouseY - gridRect.top - radius) / dotSpacing));
      const maxRow = Math.min(rows - 1, Math.ceil((mouseY - gridRect.top + radius) / dotSpacing));

      // Track dots that need to reset (were active before, not active now)
      const newActiveDots = new Set();

      // Only loop through nearby dots (typically ~20 instead of 500+)
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const i = row * cols + col;
          const fns = quickToFns.current[i];
          if (!fns) continue;

          // Dot's center position on screen
          const dotX = gridRect.left + col * dotSpacing + dotSpacing / 2;
          const dotY = gridRect.top + row * dotSpacing + dotSpacing / 2;

          const distX = mouseX - dotX;
          const distY = mouseY - dotY;
          const distance = Math.sqrt(distX * distX + distY * distY);

          if (distance < radius) {
            const angle = Math.atan2(distY, distX);
            const force = (radius - distance) / radius;

            fns.x(Math.cos(angle) * force * -20);
            fns.y(Math.sin(angle) * force * -20);
            fns.scale(1.5);
            newActiveDots.add(i);
          }
        }
      }

      // Reset dots that were active before but aren't anymore
      for (const i of activeDots.current) {
        if (!newActiveDots.has(i)) {
          const fns = quickToFns.current[i];
          if (fns) {
            fns.x(0);
            fns.y(0);
            fns.scale(1);
          }
        }
      }

      activeDots.current = newActiveDots;
    };

    // ── STEP 4: Throttle with requestAnimationFrame ──
    // Mouse events fire 60-100+ times/sec, but screen only refreshes 60fps
    // So we batch: store the mouse position, process once per frame
    const handleMouseMove = (e) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updateDots);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${cols}, ${dotSpacing}px)`,
        gridTemplateRows: `repeat(${rows}, ${dotSpacing}px)`,
        backgroundColor: "transparent",
      }}
      className="top-0 left-0 fixed w-[100vw] h-[100vh] z-[1] place-items-center grid pointer-events-none"
      ref={gridRef}
    >
      {[...Array(totalDots)].map((_, i) => (
        <div
          key={i}
          className="w-[4px] h-[4px] bg-[brown] rounded-full"
          ref={(el) => (dotRefs.current[i] = el)}
        />
      ))}
    </div>
  );
};

export default DotGrid;