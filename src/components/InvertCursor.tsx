"use client";

import { useEffect, useRef } from "react";

const trailLength = 6;

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

    function animateTrail() {
      if (!isEnabled) {
        return;
      }

      trail.forEach((dot, index) => {
        const target = index === 0 ? pointer : trail[index - 1];
        const ease = index === 0 ? 1 : 0.34;

        dot.x += (target.x - dot.x) * ease;
        dot.y += (target.y - dot.y) * ease;
        dots[index]?.style.setProperty("--cursor-x", `${dot.x}px`);
        dots[index]?.style.setProperty("--cursor-y", `${dot.y}px`);
      });

      animationFrame = window.requestAnimationFrame(animateTrail);
    }

    function moveCursor(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      cursor?.setAttribute("data-visible", "true");
    }

    function hideCursor() {
      cursor?.removeAttribute("data-visible");
    }

    function handlePointerCapabilityChange(event: MediaQueryListEvent) {
      isEnabled = event.matches;

      if (isEnabled) {
        animateTrail();
        return;
      }

      hideCursor();
      window.cancelAnimationFrame(animationFrame);
    }

    animateTrail();
    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    finePointer.addEventListener("change", handlePointerCapabilityChange);

    return () => {
      isEnabled = false;
      window.cancelAnimationFrame(animationFrame);
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
