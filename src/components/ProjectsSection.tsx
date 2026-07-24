import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
  return (
    <Section id="projects" eyebrow={copy.eyebrow} title={copy.title}>
      <div className="projects">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <a className="project-card__media" href={project.url} target="_blank" rel="noreferrer">
              <Image
                className="project-card__image"
                src={projectImages[project.title as keyof typeof projectImages]}
                alt={`${project.title} preview`}
                width={projectImages[project.title as keyof typeof projectImages].width}
                height={projectImages[project.title as keyof typeof projectImages].height}
                sizes="(max-width: 640px) 100vw, 13rem"
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
    </Section>
  );
}
