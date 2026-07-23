import { Section } from "@/components/Section";

type SkillsCopy = {
  eyebrow: string;
  title: string;
  groups: readonly {
    title: string;
    items: readonly string[];
  }[];
};

export function SkillsSection({ copy }: { copy: SkillsCopy }) {
  return (
    <Section id="skills" eyebrow={copy.eyebrow} title={copy.title}>
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
    </Section>
  );
}
