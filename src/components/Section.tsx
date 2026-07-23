import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section__header">
        <p className="section__eyebrow">{eyebrow}</p>
        <h2 className="section__title" id={`${id}-title`}>
          {title}
        </h2>
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}
