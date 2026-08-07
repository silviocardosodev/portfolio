"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { BrandsSection } from "@/components/BrandsSection";
import { DesignWorkSection } from "@/components/DesignWorkSection";
import { EducationSection } from "@/components/EducationSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { InvertCursor } from "@/components/InvertCursor";
import { LanguageToggle } from "@/components/LanguageToggle";
import { LinksSection } from "@/components/LinksSection";
import { MobileMenu } from "@/components/MobileMenu";
import { ProjectsSection } from "@/components/ProjectsSection";
import { QuickContactLinks } from "@/components/QuickContactLinks";
import { Section } from "@/components/Section";
import { SkillsSection } from "@/components/SkillsSection";
import { StoriesDemo } from "@/components/StoriesDemo";
import { ThemeToggle, type Theme } from "@/components/ThemeToggle";
import { portfolioCopy, type Locale } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [aboutDrag, setAboutDrag] = useState<{
    mode: "horizontal" | "vertical" | null;
    pointerId: number;
    startX: number;
    startY: number;
    startScrollLeft: number;
    startSnapScrollTop: number;
  } | null>(null);
  const [aboutScrollProgress, setAboutScrollProgress] = useState(0);
  const [hasPlayedAboutHint, setHasPlayedAboutHint] = useState(false);
  const aboutTrackRef = useRef<HTMLDivElement>(null);
  const snapTrackRef = useRef<HTMLDivElement>(null);
  const snapDragRef = useRef<{
    pointerId: number;
    startY: number;
    startScrollTop: number;
    lastY: number;
  } | null>(null);
  const wheelAccumulatorRef = useRef(0);
  const snapAnimationRef = useRef(0);
  const isSnapAnimatingRef = useRef(false);
  const copy = useMemo(() => portfolioCopy[locale], [locale]);
  const activeHref = useActiveSection(copy.navigation);

  function finishAboutDrag(track: HTMLDivElement, drag = aboutDrag) {
    if (!drag) {
      return;
    }

    if (drag.mode === "vertical") {
      const snapTrack = snapTrackRef.current;

      if (snapTrack) {
        finishSnapDrag(snapTrack, {
          pointerId: drag.pointerId,
          startY: drag.startY,
          startScrollTop: drag.startSnapScrollTop,
          lastY: drag.startY,
        });
      }

      track.classList.remove("about-slides--dragging");
      setAboutDrag(null);
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
      mode: null,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: track.scrollLeft,
      startSnapScrollTop: snapTrackRef.current?.scrollTop ?? 0,
    });
    track.classList.add("about-slides--dragging");
    track.setPointerCapture(event.pointerId);
  }

  function handleAboutPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!aboutDrag || event.pointerId !== aboutDrag.pointerId) {
      return;
    }

    const snapTrack = snapTrackRef.current;
    const dragX = event.clientX - aboutDrag.startX;
    const dragY = event.clientY - aboutDrag.startY;
    const nextMode =
      aboutDrag.mode ??
      (Math.max(Math.abs(dragX), Math.abs(dragY)) > 8
        ? Math.abs(dragY) > Math.abs(dragX)
          ? "vertical"
          : "horizontal"
        : null);

    if (!nextMode) {
      return;
    }

    if (nextMode !== aboutDrag.mode) {
      setAboutDrag({ ...aboutDrag, mode: nextMode });
    }

    event.preventDefault();

    if (nextMode === "vertical" && snapTrack) {
      snapTrack.classList.add("portfolio__snap--dragging");
      snapTrack.scrollTop = aboutDrag.startSnapScrollTop + aboutDrag.startY - event.clientY;
      return;
    }

    event.currentTarget.scrollLeft = aboutDrag.startScrollLeft + aboutDrag.startX - event.clientX;
  }

  function handleAboutPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!aboutDrag || event.pointerId !== aboutDrag.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);

    if (aboutDrag.mode === "vertical") {
      const snapTrack = snapTrackRef.current;

      event.currentTarget.classList.remove("about-slides--dragging");
      setAboutDrag(null);

      if (snapTrack) {
        finishSnapDrag(snapTrack, {
          pointerId: aboutDrag.pointerId,
          startY: aboutDrag.startY,
          startScrollTop: aboutDrag.startSnapScrollTop,
          lastY: event.clientY,
        });
      }

      return;
    }

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

  function finishSnapDrag(track: HTMLDivElement, drag = snapDragRef.current) {
    if (!drag) {
      return;
    }

    const panels = Array.from(track.querySelectorAll<HTMLElement>(":scope > .portfolio__panel"));
    const dragOffset = track.scrollTop - drag.startScrollTop;
    const direction = Math.abs(dragOffset) > Math.min(track.clientHeight * 0.18, 160) ? Math.sign(dragOffset) : 0;
    const startIndex = Math.round(drag.startScrollTop / track.clientHeight);
    const currentIndex = Math.round(track.scrollTop / track.clientHeight);
    const targetIndex = direction
      ? Math.min(panels.length - 1, Math.max(0, startIndex + direction))
      : Math.min(panels.length - 1, Math.max(0, currentIndex));

    track.classList.remove("portfolio__snap--dragging");
    snapDragRef.current = null;
    isSnapAnimatingRef.current = true;
    track.scrollTo({
      behavior: "smooth",
      top: panels[targetIndex]?.offsetTop ?? targetIndex * track.clientHeight,
    });

    window.clearTimeout(snapAnimationRef.current);
    snapAnimationRef.current = window.setTimeout(() => {
      isSnapAnimatingRef.current = false;
    }, 560);
  }

  function handleSnapPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(max-width: 860px), (prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (
      (event.target as Element).closest(
        "a, button, input, textarea, select, [role='button'], .about-slides, .projects, .stories-phone, .project-modal, .design-work__lightbox",
      )
    ) {
      return;
    }

    const track = event.currentTarget;

    window.clearTimeout(snapAnimationRef.current);
    isSnapAnimatingRef.current = false;
    snapDragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startScrollTop: track.scrollTop,
      lastY: event.clientY,
    };
    track.classList.add("portfolio__snap--dragging");
    track.setPointerCapture(event.pointerId);
  }

  function handleSnapPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = snapDragRef.current;

    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    event.preventDefault();
    drag.lastY = event.clientY;
    event.currentTarget.scrollTop = drag.startScrollTop + drag.startY - event.clientY;
  }

  function handleSnapPointerUp(event: PointerEvent<HTMLDivElement>) {
    const drag = snapDragRef.current;

    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    finishSnapDrag(event.currentTarget, drag);
  }

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;

    window.requestAnimationFrame(() => {
      setTheme(storedTheme ?? "dark");
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

      if ((event.target as Element).closest(".project-modal, .design-work__lightbox")) {
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

      wheelAccumulatorRef.current += event.deltaY * 1.2;

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
      <InvertCursor />
      <div className="top-controls" aria-label="Portfolio controls">
        <LanguageToggle locale={locale} onChange={setLocale} labels={copy.language} />
        <QuickContactLinks />
        <ThemeToggle theme={theme} onChange={setTheme} />
      </div>
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
      <div
        className="portfolio__snap"
        ref={snapTrackRef}
        onPointerDown={handleSnapPointerDown}
        onPointerMove={handleSnapPointerMove}
        onPointerUp={handleSnapPointerUp}
        onPointerCancel={(event) => finishSnapDrag(event.currentTarget)}
        onLostPointerCapture={(event) => finishSnapDrag(event.currentTarget)}
      >
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
        <div className="portfolio__panel portfolio__panel--demos" id="demos">
          <Section
            id="stories-demo"
            eyebrow={copy.demos.eyebrow}
            title={copy.demos.title}
            headerExtra={
              <div className="demos-section__intro">
                <p className="demos-section__description">{copy.demos.description}</p>
                <div className="demos-section__interactions">
                  <h3 className="demos-section__label">{copy.demos.interactionsTitle}</h3>
                  <ul className="demos-section__pills" aria-label={copy.demos.interactionsTitle}>
                    {copy.demos.interactions.map((item) => (
                      <li className="demos-section__pill" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="demos-section__stack">
                  <h3 className="demos-section__label">{copy.demos.stackTitle}</h3>
                  <ul className="demos-section__pills" aria-label={copy.demos.stackTitle}>
                    {copy.demos.stack.map((item) => (
                      <li className="demos-section__pill" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
          >
            <div className="demos-section">
              <StoriesDemo locale={locale} />
            </div>
          </Section>
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
