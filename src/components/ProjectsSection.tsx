"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Section } from "@/components/Section";
import type { Project } from "@/data/portfolio";
import centroVeterinarioImage from "@/assets/img/centroveterinario.png";
import flpsicoflowImage from "@/assets/img/flpsicoflow.png";
import kitchenaidCustomCheckoutMobileImage from "@/assets/img/kitchenaid-customcheckout-mobile.png";
import kitchenaidImage from "@/assets/img/kitchenaid.png";
import kitchenaidStoriesInstagramImage from "@/assets/img/kitchenaid-stories-instagram.png";
import villamuImage from "@/assets/img/villamu.png";

type ProjectsCopy = {
  eyebrow: string;
  title: string;
  visit: string;
  previous: string;
  next: string;
};

const projectImages = {
  "Centro Veterinário Linda-a-Velha": centroVeterinarioImage,
  "KitchenAid Brasil": kitchenaidImage,
  "KitchenAid Brazil - Instagram Stories-like Component": kitchenaidStoriesInstagramImage,
  "KitchenAid Brazil - Componente similar aos Stories do Instagram": kitchenaidStoriesInstagramImage,
  "KitchenAid Brasil - Componente similar aos Stories do Instagram": kitchenaidStoriesInstagramImage,
  "KitchenAid Brazil - Custom Checkout VTEX": kitchenaidCustomCheckoutMobileImage,
  "KitchenAid Brasil - Checkout VTEX Customizado": kitchenaidCustomCheckoutMobileImage,
  FLPsicoFlow: flpsicoflowImage,
  "Villa Mu": villamuImage,
};

export function ProjectsSection({
  copy,
  projects,
}: {
  copy: ProjectsCopy;
  projects: readonly Project[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const [hasShownScrollHint, setHasShownScrollHint] = useState(false);
  const [projectsPerSlide, setProjectsPerSlide] = useState(2);
  const [projectScrollProgress, setProjectScrollProgress] = useState(0);
  const [projectDrag, setProjectDrag] = useState<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
  } | null>(null);
  const projectGroups = useMemo(
    () =>
      projects.reduce<Project[][]>((groups, project, index) => {
        if (index % projectsPerSlide === 0) {
          groups.push([project]);
        } else {
          groups[groups.length - 1].push(project);
        }

        return groups;
      }, []),
    [projects, projectsPerSlide],
  );
  const hasProjectSlider = projects.length > projectsPerSlide;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    function updateProjectsPerSlide() {
      setProjectsPerSlide(mediaQuery.matches ? 1 : 2);
    }

    updateProjectsPerSlide();
    mediaQuery.addEventListener("change", updateProjectsPerSlide);

    return () => mediaQuery.removeEventListener("change", updateProjectsPerSlide);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !hasProjectSlider || hasShownScrollHint) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasShownScrollHint(true);
          observer.disconnect();
        }
      },
      { threshold: 0.42 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasProjectSlider, hasShownScrollHint]);

  function finishProjectDrag(track: HTMLDivElement, drag = projectDrag) {
    if (!drag) {
      return;
    }

    const firstSlide = track.querySelector<HTMLElement>(".projects__slide");
    const cardStep = firstSlide ? firstSlide.offsetWidth + parseFloat(window.getComputedStyle(track).columnGap || "0") : track.clientWidth;
    const dragOffset = track.scrollLeft - drag.startScrollLeft;
    const direction = Math.abs(dragOffset) > Math.min(cardStep * 0.18, 140) ? Math.sign(dragOffset) : 0;
    const startIndex = Math.round(drag.startScrollLeft / cardStep);
    const maxIndex = Math.max(0, track.children.length - 1);
    const nextIndex = Math.min(maxIndex, Math.max(0, startIndex + direction));

    track.scrollTo({
      behavior: "smooth",
      left: nextIndex * cardStep,
    });
    track.classList.remove("projects--dragging");
    setProjectDrag(null);
  }

  function handleProjectPointerDown(event: PointerEvent<HTMLDivElement>) {
    const interactiveElement = (event.target as Element).closest("button, a");

    if (interactiveElement || window.matchMedia("(max-width: 860px)").matches) {
      return;
    }

    const track = event.currentTarget;

    setProjectDrag({
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    });
    track.classList.add("projects--dragging");
    track.setPointerCapture(event.pointerId);
  }

  function handleProjectPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!projectDrag || event.pointerId !== projectDrag.pointerId) {
      return;
    }

    event.preventDefault();
    event.currentTarget.scrollLeft = projectDrag.startScrollLeft + projectDrag.startX - event.clientX;
  }

  function handleProjectPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!projectDrag || event.pointerId !== projectDrag.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    finishProjectDrag(event.currentTarget);
  }

  function updateProjectScrollProgress(track: HTMLDivElement) {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    setProjectScrollProgress(maxScrollLeft > 0 ? track.scrollLeft / maxScrollLeft : 0);
  }

  function scrollProjects(direction: "previous" | "next") {
    const track = projectsTrackRef.current;
    const firstSlide = track?.querySelector<HTMLElement>(".projects__slide");

    if (!track || !firstSlide) {
      return;
    }

    const cardStep = firstSlide.offsetWidth + parseFloat(window.getComputedStyle(track).columnGap || "0");

    track.scrollBy({
      behavior: "smooth",
      left: direction === "next" ? cardStep : -cardStep,
    });
  }

  return (
    <Section id="projects-content" eyebrow={copy.eyebrow} title={copy.title}>
      <div
        className={`projects-carousel${hasProjectSlider ? " projects-carousel--has-slider" : ""}${
          hasShownScrollHint ? " projects-carousel--hint" : ""
        }`}
        ref={sectionRef}
      >
        {hasProjectSlider ? (
          <button
            className="projects-carousel__control projects-carousel__control--previous"
            type="button"
            aria-label={copy.previous}
            onClick={() => scrollProjects("previous")}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        ) : null}
        <div
          className="projects"
          ref={projectsTrackRef}
          onPointerDown={handleProjectPointerDown}
          onPointerMove={handleProjectPointerMove}
          onPointerUp={handleProjectPointerUp}
          onPointerCancel={(event) => finishProjectDrag(event.currentTarget)}
          onLostPointerCapture={(event) => finishProjectDrag(event.currentTarget)}
          onScroll={(event) => updateProjectScrollProgress(event.currentTarget)}
        >
          {projectGroups.map((group) => (
            <div className="projects__slide" key={group.map((project) => project.title).join("-")}>
              {group.map((project) => (
                <article className="project-card" key={project.title}>
                  <a
                    className="project-card__media"
                    aria-label={`${copy.visit} ${project.title}`}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      className="project-card__image"
                      src={projectImages[project.title as keyof typeof projectImages]}
                      alt={`${project.title} preview`}
                      width={projectImages[project.title as keyof typeof projectImages].width}
                      height={projectImages[project.title as keyof typeof projectImages].height}
                      sizes="(max-width: 640px) 86vw, 13rem"
                    />
                  </a>
                  <div className="project-card__content">
                    <p className="project-card__category">{project.category}</p>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__description text-copy">{project.description}</p>
                    <ul className="project-card__stack" aria-label={`${project.title} stack`}>
                      {project.stack.map((item) => (
                        <li className="project-card__stack-item" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a className="project-card__link" href={project.url} target="_blank" rel="noreferrer">
                      <span>{copy.visit}</span>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
        {hasProjectSlider ? (
          <button
            className="projects-carousel__control projects-carousel__control--next"
            type="button"
            aria-label={copy.next}
            onClick={() => scrollProjects("next")}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        ) : null}
        {hasProjectSlider ? (
          <div className="projects-scrollbar" aria-hidden="true">
            <span
              className="projects-scrollbar__thumb"
              style={{
                transform: `translateX(${projectScrollProgress * (projectGroups.length - 1) * 100}%)`,
                width: `${100 / projectGroups.length}%`,
              }}
            />
          </div>
        ) : null}
      </div>

    </Section>
  );
}
