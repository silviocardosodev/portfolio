import { Section } from "@/components/Section";

type ExperienceCopy = {
  eyebrow: string;
  title: string;
  items: readonly {
    period: string;
    role: string;
    company: string;
    details: readonly string[];
  }[];
};

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
              <ul className="experience__details text-copy">
                {item.details.map((detail) => (
                  <li className="experience__detail" key={detail}>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
