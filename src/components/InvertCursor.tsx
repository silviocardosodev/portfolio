"use client";

import { useEffect, useRef } from "react";

const trailLength = 3;

export function InvertCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cursor = cursorRef.current;

    if (!finePointer.matches || !cursor) {
      return;
    }

    const dots = Array.from(cursor.querySelectorAll<HTMLElement>(".invert-cursor__dot"));
    const pointer = { x: -100, y: -100 };
    const trail = Array.from({ length: trailLength }, () => ({ x: pointer.x, y: pointer.y }));
    let animationFrame = 0;
    let isEnabled = true;
    let isAnimating = false;
    let idleTimeout = 0;

    function animateTrail() {
      if (!isEnabled) {
        isAnimating = false;
        return;
      }

      let largestDelta = 0;

      trail.forEach((dot, index) => {
        const target = index === 0 ? pointer : trail[index - 1];
        const ease = index === 0 ? 1 : 0.34;
        const nextX = dot.x + (target.x - dot.x) * ease;
        const nextY = dot.y + (target.y - dot.y) * ease;

        largestDelta = Math.max(largestDelta, Math.abs(nextX - dot.x), Math.abs(nextY - dot.y));
        dot.x = nextX;
        dot.y = nextY;
        dots[index]?.style.setProperty("transform", `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`);
      });

      if (largestDelta > 0.08) {
        animationFrame = window.requestAnimationFrame(animateTrail);
        return;
      }

      isAnimating = false;
    }

    function startTrail() {
      if (isAnimating) {
        return;
      }

      isAnimating = true;
      animationFrame = window.requestAnimationFrame(animateTrail);
    }

    function moveCursor(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      cursor?.setAttribute("data-visible", "true");
      window.clearTimeout(idleTimeout);
      idleTimeout = window.setTimeout(() => {
        cursor?.removeAttribute("data-active");
      }, 160);
      cursor?.setAttribute("data-active", "true");
      startTrail();
    }

    function hideCursor() {
      cursor?.removeAttribute("data-visible");
      cursor?.removeAttribute("data-active");
    }

    function handlePointerCapabilityChange(event: MediaQueryListEvent) {
      isEnabled = event.matches;

      if (isEnabled) {
        startTrail();
        return;
      }

      hideCursor();
      isAnimating = false;
      window.cancelAnimationFrame(animationFrame);
    }

    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    finePointer.addEventListener("change", handlePointerCapabilityChange);

    return () => {
      isEnabled = false;
      isAnimating = false;
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(idleTimeout);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      finePointer.removeEventListener("change", handlePointerCapabilityChange);
    };
  }, []);

  return (
    <div className="invert-cursor" ref={cursorRef} aria-hidden="true">
      {Array.from({ length: trailLength }, (_, index) => (
        <span className="invert-cursor__dot" key={index} style={{ "--trail-index": index } as React.CSSProperties} />
      ))}
    </div>
  );
}
