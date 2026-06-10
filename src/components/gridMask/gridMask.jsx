import React, { useEffect, useRef } from "react";

const DOT_SPACING = 30;
const DOT_RADIUS = 2;
const INTERACTION_RADIUS = 100;
const MAX_DISPLACE = 20;
const LERP = 0.15;

const DotGrid = ({ dotColor = "rgba(200, 135, 42, 0.5)", zIndex = 5 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Size canvas to parent element
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const COLS = Math.floor(canvas.width / DOT_SPACING);
    const ROWS = Math.floor(canvas.height / DOT_SPACING);
    const COUNT = COLS * ROWS;

    // Typed arrays: no object allocation per dot
    const dx = new Float32Array(COUNT);
    const dy = new Float32Array(COUNT);
    const tx = new Float32Array(COUNT);
    const ty = new Float32Array(COUNT);

    let rafId = null;
    let mouseX = -9999;
    let mouseY = -9999;

    const drawVisible = () => {
      const rect = canvas.getBoundingClientRect();
      // Canvas-local Y of the visible strip
      const stripTop = Math.max(0, -rect.top - DOT_SPACING);
      const stripH = window.innerHeight + DOT_SPACING * 2;

      ctx.clearRect(0, stripTop, canvas.width, stripH);
      ctx.fillStyle = dotColor;

      const minRow = Math.max(0, Math.floor(stripTop / DOT_SPACING));
      const maxRow = Math.min(ROWS - 1, Math.ceil((stripTop + stripH) / DOT_SPACING));

      for (let r = minRow; r <= maxRow; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = r * COLS + c;
          ctx.beginPath();
          ctx.arc(
            c * DOT_SPACING + DOT_SPACING / 2 + dx[i],
            r * DOT_SPACING + DOT_SPACING / 2 + dy[i],
            DOT_RADIUS,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    };

    const updateTargets = () => {
      const rect = canvas.getBoundingClientRect();
      const cmx = mouseX - rect.left; // mouse in canvas space
      const cmy = mouseY - rect.top;

      tx.fill(0);
      ty.fill(0);

      if (cmx < -INTERACTION_RADIUS || cmy < -INTERACTION_RADIUS ||
          cmx > canvas.width + INTERACTION_RADIUS || cmy > canvas.height + INTERACTION_RADIUS) return;

      const minC = Math.max(0, Math.floor((cmx - INTERACTION_RADIUS) / DOT_SPACING));
      const maxC = Math.min(COLS - 1, Math.ceil((cmx + INTERACTION_RADIUS) / DOT_SPACING));
      const minR = Math.max(0, Math.floor((cmy - INTERACTION_RADIUS) / DOT_SPACING));
      const maxR = Math.min(ROWS - 1, Math.ceil((cmy + INTERACTION_RADIUS) / DOT_SPACING));

      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
          const i = r * COLS + c;
          const dotX = c * DOT_SPACING + DOT_SPACING / 2;
          const dotY = r * DOT_SPACING + DOT_SPACING / 2;
          const distX = cmx - dotX;
          const distY = cmy - dotY;
          const dist = Math.hypot(distX, distY);

          if (dist < INTERACTION_RADIUS && dist > 0) {
            const force = (INTERACTION_RADIUS - dist) / INTERACTION_RADIUS;
            const angle = Math.atan2(distY, distX);
            tx[i] = Math.cos(angle) * force * -MAX_DISPLACE;
            ty[i] = Math.sin(angle) * force * -MAX_DISPLACE;
          }
        }
      }
    };

    const animate = () => {
      let moving = false;

      for (let i = 0; i < COUNT; i++) {
        const ex = tx[i] - dx[i];
        const ey = ty[i] - dy[i];
        if (Math.abs(ex) > 0.01 || Math.abs(ey) > 0.01) {
          dx[i] += ex * LERP;
          dy[i] += ey * LERP;
          moving = true;
        } else {
          dx[i] = tx[i];
          dy[i] = ty[i];
        }
      }

      drawVisible();

      if (moving) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateTargets();
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (!rafId) drawVisible();
    };

    drawVisible();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [dotColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex,
        pointerEvents: "none",
      }}
    />
  );
};

export default DotGrid;
