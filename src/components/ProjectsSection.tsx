"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Section } from "@/components/Section";
import type { Project } from "@/data/portfolio";
import centroVeterinarioImage from "@/assets/img/centroveterinario.png";
import flpsicoflowImage from "@/assets/img/flpsicoflow.png";
import kitchenaidImage from "@/assets/img/kitchenaid.png";
import villamuImage from "@/assets/img/villamu.png";

type ProjectsCopy = {
  eyebrow: string;
  title: string;
  visit: string;
};

const projectImages = {
  "Centro Veterinário Linda-a-Velha": centroVeterinarioImage,
  "KitchenAid Brasil": kitchenaidImage,
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const selectedProjectImage = selectedProject
    ? projectImages[selectedProject.title as keyof typeof projectImages]
    : null;
  const selectedProjectDetails = selectedProject
    ? [
        { label: "Role", value: selectedProject.role },
        { label: "Challenge", value: selectedProject.challenge },
        { label: "Solution", value: selectedProject.solution },
        { label: "Impact", value: selectedProject.impact },
      ].filter((detail): detail is { label: string; value: string } => Boolean(detail.value))
    : [];

  return (
    <Section id="projects" eyebrow={copy.eyebrow} title={copy.title}>
      <div className="projects">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <button
              className="project-card__media"
              type="button"
              onClick={() => setSelectedProject(project)}
              aria-label={`${copy.visit} ${project.title}`}
            >
              <Image
                className="project-card__image"
                src={projectImages[project.title as keyof typeof projectImages]}
                alt={`${project.title} preview`}
                width={projectImages[project.title as keyof typeof projectImages].width}
                height={projectImages[project.title as keyof typeof projectImages].height}
                sizes="(max-width: 640px) 100vw, 13rem"
              />
            </button>
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
              <button className="project-card__link" type="button" onClick={() => setSelectedProject(project)}>
                <span>{copy.visit}</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedProject && selectedProjectImage ? (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div className="project-modal__panel">
            <button
              className="project-modal__close"
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <div className="project-modal__media">
              <Image
                className="project-modal__image"
                src={selectedProjectImage}
                alt={`${selectedProject.title} preview`}
                width={selectedProjectImage.width}
                height={selectedProjectImage.height}
                sizes="(max-width: 720px) 100vw, 42rem"
              />
            </div>
            <div className="project-modal__content">
              <p className="project-card__category">{selectedProject.category}</p>
              <h3 className="project-modal__title" id="project-modal-title">
                {selectedProject.title}
              </h3>
              <p className="project-modal__description text-copy">{selectedProject.description}</p>
              {selectedProjectDetails.length > 0 ? (
                <dl className="project-modal__details">
                  {selectedProjectDetails.map((detail) => (
                    <div className="project-modal__detail" key={detail.label}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <ul className="project-card__stack" aria-label={`${selectedProject.title} stack`}>
                {selectedProject.stack.map((item) => (
                  <li className="project-card__stack-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <a className="button button--primary project-modal__live" href={selectedProject.url} target="_blank" rel="noreferrer">
                <span>{copy.visit}</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
