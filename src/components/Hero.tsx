import Image from "next/image";
import { ArrowDown, BriefcaseBusiness, Mail } from "lucide-react";
import { CvDownloadButton } from "@/components/CvDownloadButton";
import silvioPortrait from "@/assets/img/silviocardoso.webp";

type HeroCopy = {
  name: string;
  role: string;
  description: string;
  contact: string;
  experience: string;
  cv: string;
  scroll: string;
};

export function Hero({ copy }: { copy: HeroCopy }) {
  const [firstName, lastName] = copy.name.split(" ");

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__portrait" aria-label={copy.name}>
          <Image
            className="hero__portrait-image"
            src={silvioPortrait}
            alt={copy.name}
            width={silvioPortrait.width}
            height={silvioPortrait.height}
            priority
            sizes="(max-width: 640px) 90vw, 32vw"
          />
        </div>
        <div className="hero__content">
          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-line">{firstName}</span>
            <span className="hero__title-line">{lastName}</span>
          </h1>
          <p className="hero__role">{copy.role}</p>
          <div className="hero__actions">
            <a className="button button--red" href="mailto:silviocardos@hotmail.com">
              <Mail size={18} aria-hidden="true" />
              <span>{copy.contact}</span>
            </a>
            <a className="button button--white" href="#experience">
              <BriefcaseBusiness size={18} aria-hidden="true" />
              <span>{copy.experience}</span>
            </a>
            <CvDownloadButton className="button button--black" label={copy.cv} />
          </div>
        </div>
      </div>
      <a className="hero__scroll" href="#summary" aria-label={copy.scroll}>
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
