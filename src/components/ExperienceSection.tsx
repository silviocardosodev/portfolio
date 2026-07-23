import { Section } from "@/components/Section";

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

export function ExperienceSection({ copy }: { copy: ExperienceCopy }) {
  return (
    <Section id="experience" eyebrow={copy.eyebrow} title={copy.title}>
      <div className="experience">
        {copy.items.map((item) => (
          <article className="experience__item" key={`${item.period}-${item.role}`}>
            <span className="experience__period">{item.period}</span>
            <div className="experience__content">
              <h3 className="experience__role">{item.role}</h3>
              <p className="experience__company">{item.company}</p>
              <p className="experience__details">{item.details}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
