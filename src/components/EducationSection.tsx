import Image from "next/image";
import carolineLogo from "@/assets/img/logo-caroline-university.jpg";
import ifgLogo from "@/assets/img/logo-ifg.jpg";
import uninoveLogo from "@/assets/img/logo-uninove.svg";
import type { EducationItem } from "@/data/portfolio";

type EducationCopy = {
  eyebrow: string;
  title: string;
  items: readonly EducationItem[];
};

const educationImages = {
  "Caroline University": carolineLogo,
  "Universidade Nove de Julho": uninoveLogo,
  "Instituto Federal de Goiás": ifgLogo,
  "Instituto Federal de Goias": ifgLogo,
};

export function EducationSection({ copy }: { copy: EducationCopy }) {
  return (
    <section className="section education" id="education" aria-labelledby="education-title">
      <div className="section__header">
        <p className="section__eyebrow">{copy.eyebrow}</p>
        <h2 className="section__title" id="education-title">
          {copy.title}
        </h2>
      </div>
      <div className="section__body">
        <div className="education__list">
          {copy.items.map((item) => {
            const logo = educationImages[item.institution as keyof typeof educationImages];

            return (
              <article className="education__item" key={item.institution}>
                <div className="education__logoBox">
                  <Image
                    className="education__logo"
                    src={logo}
                    alt={`${item.institution} logo`}
                    width={logo.width}
                    height={logo.height}
                    sizes="96px"
                  />
                </div>
                <div className="education__content">
                  <p className="education__meta">{item.location}</p>
                  <h3 className="education__degree">{item.degree}</h3>
                  <p className="education__institution">{item.institution}</p>
                  <p className="education__description text-copy">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
