import { ArrowUpRight, Play } from "lucide-react";
import { Section } from "@/components/Section";
import type { DesignWork } from "@/data/portfolio";

type DesignWorkCopy = {
  eyebrow: string;
  title: string;
  visit: string;
  items: readonly DesignWork[];
};

export function DesignWorkSection({ copy }: { copy: DesignWorkCopy }) {
  return (
    <Section id="design-work" eyebrow={copy.eyebrow} title={copy.title}>
      <div className="design-work">
        {copy.items.map((item) => (
          <article className="design-work__card" key={item.name}>
            <a className="design-work__media-link" href={item.url} target="_blank" rel="noreferrer">
              <div className={`design-work__media design-work__media--${item.tone}`} aria-hidden="true">
                <span className="design-work__play">
                  <Play size={22} fill="currentColor" aria-hidden="true" />
                </span>
                <span className="design-work__media-title">{item.name}</span>
                <span className="design-work__media-label">YouTube</span>
              </div>
            </a>
            <div className="design-work__content">
              <p className="design-work__category">{item.category}</p>
              <h3 className="design-work__name">{item.name}</h3>
              <p className="design-work__description">{item.description}</p>
              <a className="design-work__link" href={item.url} target="_blank" rel="noreferrer">
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
