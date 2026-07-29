import { useEffect, useState } from "react";

export function useActiveSection(items: readonly { href: string }[]) {
  const [activeHref, setActiveHref] = useState(() => items[0]?.href ?? "");

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

    const visibleSections = new Map<string, number>();
    const prefersPageScroll = window.matchMedia("(max-width: 860px)").matches;
    const scrollRoot = prefersPageScroll ? null : document.querySelector<HTMLElement>(".portfolio__snap");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = sections.find((candidate) => candidate.element === entry.target);

          if (!section) {
            return;
          }

          visibleSections.set(section.href, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const activeSection = sections.reduce((current, section) => {
          const currentRatio = visibleSections.get(current.href) ?? 0;
          const sectionRatio = visibleSections.get(section.href) ?? 0;

          return sectionRatio > currentRatio ? section : current;
        }, sections[0]);

        setActiveHref(activeSection.href);
      },
      {
        root: scrollRoot,
        threshold: [0.18, 0.32, 0.5, 0.68, 0.84],
      },
    );

    sections.forEach((section) => observer.observe(section.element));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return activeHref;
}
