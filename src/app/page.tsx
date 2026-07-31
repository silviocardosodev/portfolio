"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { BrandsSection } from "@/components/BrandsSection";
import { DesignWorkSection } from "@/components/DesignWorkSection";
import { EducationSection } from "@/components/EducationSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { LanguageToggle } from "@/components/LanguageToggle";
import { LinksSection } from "@/components/LinksSection";
import { MobileMenu } from "@/components/MobileMenu";
import { ProjectsSection } from "@/components/ProjectsSection";
import { QuickContactLinks } from "@/components/QuickContactLinks";
import { Section } from "@/components/Section";
import { SkillsSection } from "@/components/SkillsSection";
import { ThemeToggle, type Theme } from "@/components/ThemeToggle";
import { portfolioCopy, type Locale } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [aboutDrag, setAboutDrag] = useState<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
  } | null>(null);
  const [aboutScrollProgress, setAboutScrollProgress] = useState(0);
  const [hasPlayedAboutHint, setHasPlayedAboutHint] = useState(false);
  const aboutTrackRef = useRef<HTMLDivElement>(null);
  const snapTrackRef = useRef<HTMLDivElement>(null);
  const wheelAccumulatorRef = useRef(0);
  const snapAnimationRef = useRef(0);
  const isSnapAnimatingRef = useRef(false);
  const copy = useMemo(() => portfolioCopy[locale], [locale]);
  const activeHref = useActiveSection(copy.navigation);

  function finishAboutDrag(track: HTMLDivElement, drag = aboutDrag) {
    if (!drag) {
      return;
    }

    const slideWidth = track.clientWidth;
    const dragOffset = track.scrollLeft - drag.startScrollLeft;
    const direction = Math.abs(dragOffset) > Math.min(slideWidth * 0.18, 160) ? Math.sign(dragOffset) : 0;
    const startIndex = Math.round(drag.startScrollLeft / slideWidth);
    const maxIndex = Math.max(0, track.children.length - 1);
    const nextIndex = Math.min(maxIndex, Math.max(0, startIndex + direction));

    track.scrollTo({
      behavior: "smooth",
      left: nextIndex * slideWidth,
    });
    track.classList.remove("about-slides--dragging");
    setAboutDrag(null);
  }

  function handleAboutPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(max-width: 860px)").matches) {
      return;
    }

    const track = event.currentTarget;

    setAboutDrag({
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    });
    track.classList.add("about-slides--dragging");
    track.setPointerCapture(event.pointerId);
  }

  function handleAboutPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!aboutDrag || event.pointerId !== aboutDrag.pointerId) {
      return;
    }

    event.preventDefault();
    event.currentTarget.scrollLeft = aboutDrag.startScrollLeft + aboutDrag.startX - event.clientX;
  }

  function handleAboutPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!aboutDrag || event.pointerId !== aboutDrag.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    finishAboutDrag(event.currentTarget);
  }

  function updateAboutScrollProgress(track: HTMLDivElement) {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    setAboutScrollProgress(maxScrollLeft > 0 ? track.scrollLeft / maxScrollLeft : 0);
  }

  function scrollAbout(direction: "previous" | "next") {
    const track = aboutTrackRef.current;

    if (!track) {
      return;
    }

    track.scrollBy({
      behavior: "smooth",
      left: direction === "next" ? track.clientWidth : -track.clientWidth,
    });
  }

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    window.requestAnimationFrame(() => {
      setTheme(storedTheme ?? (prefersLight ? "light" : "dark"));
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (activeHref === "#summary" && !hasPlayedAboutHint) {
      const animationFrame = window.requestAnimationFrame(() => {
        setHasPlayedAboutHint(true);
      });

      return () => window.cancelAnimationFrame(animationFrame);
    }
  }, [activeHref, hasPlayedAboutHint]);

  useEffect(() => {
    const snapTrack = snapTrackRef.current;

    if (!snapTrack) {
      return;
    }

    function handleWheel(event: WheelEvent) {
      const track = snapTrackRef.current;

      if (!track) {
        return;
      }

      if (window.matchMedia("(max-width: 860px), (prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (Math.abs(event.deltaY) < Math.abs(event.deltaX) || Math.abs(event.deltaY) < 8) {
        return;
      }

      if (isSnapAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const scrollableTarget = (event.target as Element).closest<HTMLElement>(
        ".about-slides__item, .portfolio__panel",
      );
      const canScrollInside =
        scrollableTarget &&
        scrollableTarget.scrollHeight > scrollableTarget.clientHeight + 1 &&
        ((event.deltaY > 0 &&
          scrollableTarget.scrollTop + scrollableTarget.clientHeight < scrollableTarget.scrollHeight - 2) ||
          (event.deltaY < 0 && scrollableTarget.scrollTop > 2));

      if (canScrollInside) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      event.preventDefault();

      wheelAccumulatorRef.current += event.deltaY;

      const panels = Array.from(track.querySelectorAll<HTMLElement>(":scope > .portfolio__panel"));
      const currentIndex = Math.round(track.scrollTop / track.clientHeight);
      const threshold = track.clientHeight * 0.25;

      if (Math.abs(wheelAccumulatorRef.current) < threshold) {
        return;
      }

      const nextIndex = Math.min(
        panels.length - 1,
        Math.max(0, currentIndex + (wheelAccumulatorRef.current > 0 ? 1 : -1)),
      );

      wheelAccumulatorRef.current = 0;

      if (nextIndex === currentIndex) {
        return;
      }

      isSnapAnimatingRef.current = true;
      track.scrollTo({
        behavior: "smooth",
        top: panels[nextIndex].offsetTop,
      });

      window.clearTimeout(snapAnimationRef.current);
      snapAnimationRef.current = window.setTimeout(() => {
        isSnapAnimatingRef.current = false;
      }, 560);
    }

    snapTrack.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      snapTrack.removeEventListener("wheel", handleWheel);
      window.clearTimeout(snapAnimationRef.current);
    };
  }, []);

  return (
    <main className="portfolio" id="top">
      <LanguageToggle locale={locale} onChange={setLocale} labels={copy.language} />
      <ThemeToggle theme={theme} onChange={setTheme} />
      <QuickContactLinks />
      <MobileMenu
        items={copy.navigation}
        labels={copy.language}
        locale={locale}
        onLocaleChange={setLocale}
        theme={theme}
        onThemeChange={setTheme}
        activeHref={activeHref}
      />
      <nav className="section-dots" aria-label="Current portfolio section">
        {copy.navigation.map((item) => (
          <a
            className={`section-dots__link ${activeHref === item.href ? "section-dots__link--active" : ""}`}
            href={item.href}
            key={item.href}
            aria-label={item.label}
            aria-current={activeHref === item.href ? "true" : undefined}
          >
            <span className="section-dots__label">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="portfolio__snap" ref={snapTrackRef}>
        <div className="portfolio__panel portfolio__panel--hero" id="hero">
          <Hero copy={copy.hero} />
        </div>
        <div className="portfolio__panel portfolio__panel--about" id="summary">
          <div
            className="about-slides"
            ref={aboutTrackRef}
            data-hint={hasPlayedAboutHint ? "played" : undefined}
            aria-label={copy.summary.title}
            onPointerDown={handleAboutPointerDown}
            onPointerMove={handleAboutPointerMove}
            onPointerUp={handleAboutPointerUp}
            onPointerCancel={(event) => finishAboutDrag(event.currentTarget)}
            onLostPointerCapture={(event) => finishAboutDrag(event.currentTarget)}
            onScroll={(event) => updateAboutScrollProgress(event.currentTarget)}
          >
            <div className="about-slides__item">
              <Section id="about-me" eyebrow={copy.summary.eyebrow} title={copy.summary.title}>
                <div className="summary">
                  <div className="summary__text text-copy">
                    {copy.summary.paragraphs.map((paragraph) => (
                      <p className="summary__paragraph" key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="summary__fun-facts">
                    <h3 className="summary__fun-facts-title">{copy.summary.funFactsTitle}</h3>
                    <ul className="summary__fun-facts-list">
                      {copy.summary.funFacts.map((fact) => (
                        <li className="summary__fun-facts-item" key={fact}>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>
            </div>
            <div className="about-slides__item">
              <ExperienceSection copy={copy.experience} />
            </div>
            <div className="about-slides__item">
              <EducationSection copy={copy.education} />
            </div>
          </div>
          <button
            className="about-control about-control--previous"
            type="button"
            aria-label="Previous about section"
            onClick={() => scrollAbout("previous")}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            className="about-control about-control--next"
            type="button"
            aria-label="Next about section"
            onClick={() => scrollAbout("next")}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <div className="about-scrollbar" aria-hidden="true">
            <span
              className="about-scrollbar__thumb"
              style={{ transform: `translateX(${aboutScrollProgress * 200}%)` }}
            />
          </div>
        </div>
        <div className="portfolio__panel portfolio__panel--projects" id="projects">
          <ProjectsSection copy={copy.projects} projects={copy.projectItems} />
        </div>
        <div className="portfolio__panel portfolio__panel--collabs" id="collabs">
          <BrandsSection copy={copy.brands} />
        </div>
        <div className="portfolio__panel portfolio__panel--design-work" id="design-work">
          <DesignWorkSection copy={copy.designWork} />
        </div>
        <div className="portfolio__panel portfolio__panel--skills" id="skills">
          <SkillsSection copy={copy.skills} />
        </div>
        <div className="portfolio__panel portfolio__panel--links" id="links">
          <LinksSection copy={copy.links} />
        </div>
      </div>
    </main>
  );
}
