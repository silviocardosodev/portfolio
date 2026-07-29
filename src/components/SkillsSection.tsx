import { Section } from "@/components/Section";

type SkillsCopy = {
  eyebrow: string;
  title: string;
  groups: readonly {
    title: string;
    items: readonly string[];
  }[];
  toolsTitle: string;
  tools: readonly string[];
};

export function SkillsSection({ copy }: { copy: SkillsCopy }) {
  return (
    <Section id="skills-content" eyebrow={copy.eyebrow} title={copy.title}>
      <>
        <div className="skills">
          {copy.groups.map((group) => (
            <article className="skills__group" key={group.title}>
              <h3 className="skills__title">{group.title}</h3>
              <ul className="skills__list">
                {group.items.map((item) => (
                  <li className="skills__item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="skills__tools">
          <h3 className="skills__tools-title">{copy.toolsTitle}</h3>
          <ul className="skills__tools-list">
            {copy.tools.map((tool) => (
              <li className="skills__tool" key={tool}>
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </>
    </Section>
  );
}
