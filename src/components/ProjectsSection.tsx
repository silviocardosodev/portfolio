import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import type { Project } from "@/data/portfolio";

type ProjectsCopy = {
  eyebrow: string;
  title: string;
  visit: string;
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
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <div className="project-card__media" aria-hidden="true">
              <span className="project-card__number">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="project-card__content">
              <p className="project-card__category">{project.category}</p>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>
              <ul className="project-card__stack" aria-label={`${project.title} stack`}>
                {project.stack.map((item) => (
                  <li className="project-card__stack-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <a className="project-card__link" href={project.url}>
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
