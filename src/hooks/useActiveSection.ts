import { useEffect, useState } from "react";

export function useActiveSection(items: readonly { href: string }[]) {
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const sections = items
      .map((item) => {
        const element = document.querySelector(item.href);
        return element ? { href: item.href, element } : null;
      })
      .filter((section): section is { href: string; element: Element } => Boolean(section));

    if (!sections.length) {
      return;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + Math.min(window.innerHeight * 0.38, 320);
      const distanceFromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      const lastSection = sections[sections.length - 1];
      const firstSectionTop = sections[0].element.getBoundingClientRect().top + window.scrollY;

      if (distanceFromBottom <= 8) {
        setActiveHref(lastSection.href);
        return;
      }

      if (scrollPosition < firstSectionTop) {
        setActiveHref("");
        return;
      }

      const currentSection = sections.reduce((activeSection, section) => {
        const sectionTop = section.element.getBoundingClientRect().top + window.scrollY;

        if (sectionTop <= scrollPosition) {
          return section;
        }

        return activeSection;
      }, sections[0]);

      setActiveHref(currentSection.href);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [items]);

  return activeHref;
}
