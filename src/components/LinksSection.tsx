import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";

type LinksCopy = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly {
    label: string;
    href: string;
  }[];
};

export function LinksSection({ copy }: { copy: LinksCopy }) {
  return (
    <Section id="contact-content" eyebrow={copy.eyebrow} title={copy.title}>
      <div className="links">
        <p className="links__description text-copy">{copy.description}</p>
        <div className="links__grid">
          {copy.items.map((item) => {
            const isInternal = item.href.startsWith("/");

            return (
              <a
                className="links__item"
                href={item.href}
                key={item.label}
                target={isInternal ? undefined : "_blank"}
                rel={isInternal ? undefined : "noreferrer"}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
