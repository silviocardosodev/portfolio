import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { Section } from "@/components/Section";
import type { DesignWork } from "@/data/portfolio";
import jotinhaImage from "@/assets/img/jotinhatv.png";
import riqueImage from "@/assets/img/riquepaiva.png";

type DesignWorkCopy = {
  eyebrow: string;
  title: string;
  visit: string;
  items: readonly DesignWork[];
};

const designWorkImages = {
  "Rique Paiva": riqueImage,
  "Jotinha TV": jotinhaImage,
};

export function DesignWorkSection({ copy }: { copy: DesignWorkCopy }) {
  return (
    <Section id="design-work" eyebrow={copy.eyebrow} title={copy.title}>
      <div className="design-work">
        {copy.items.map((item) => (
          <article className="design-work__card" key={item.name}>
            <a className="design-work__media-link" href={item.url} target="_blank" rel="noreferrer">
              <div className={`design-work__media design-work__media--${item.tone}`} aria-hidden="true">
                <Image
                  className="design-work__image"
                  src={designWorkImages[item.name as keyof typeof designWorkImages]}
                  alt={`${item.name} thumbnail preview`}
                  width={designWorkImages[item.name as keyof typeof designWorkImages].width}
                  height={designWorkImages[item.name as keyof typeof designWorkImages].height}
                  sizes="(max-width: 860px) 100vw, 32vw"
                />
                <span className="design-work__play">
                  <Play size={22} fill="currentColor" aria-hidden="true" />
                </span>
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
