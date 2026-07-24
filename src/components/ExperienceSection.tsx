import { Section } from "@/components/Section";
import { ArrowUpRight } from "lucide-react";

type ExperienceCopy = {
  eyebrow: string;
  title: string;
  items: readonly {
    period: string;
    role: string;
    company: string;
    details: string;
  }[];
};

const selectedProjects = ["Interface System", "Campaign Visuals"];

export function ExperienceSection({ copy }: { copy: ExperienceCopy }) {
  return (
    <Section id="experience" eyebrow={copy.eyebrow} title={copy.title}>
      <div className="experience">
        {copy.items.map((item) => (
          <article className="experience__item" key={`${item.period}-${item.role}`}>
            <div className="experience__marker" aria-hidden="true" />
            <div className="experience__body">
              <div className="experience__heading">
                <div>
                  <h3 className="experience__role">{item.role}</h3>
                  <p className="experience__company">{item.company}</p>
                </div>
                <span className="experience__period">{item.period}</span>
              </div>
              <p className="experience__details text-copy">{item.details}</p>
              <div className="experience__projects" aria-label="Selected projects">
                <p className="experience__projects-title">Selected Projects</p>
                <div className="experience__project-list">
                  {selectedProjects.map((project, index) => (
                    <article className="experience__project" key={`${item.role}-${project}`}>
                      <div className={`experience__project-media experience__project-media--${index + 1}`} aria-hidden="true">
                        <ArrowUpRight className="experience__project-icon" size={20} />
                      </div>
                      <div className="experience__project-content">
                        <h4 className="experience__project-name">{project}</h4>
                        <p className="experience__project-description">A focused digital work sample with polished visuals.</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
