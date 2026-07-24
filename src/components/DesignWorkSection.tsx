"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
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
  "Canal do Rique": riqueImage,
  "Rique Paiva": riqueImage,
  "Jotinha TV": jotinhaImage,
};

type ThumbnailGalleryItem = {
  label: string;
  image: StaticImageData;
};

const thumbnailGallery: ThumbnailGalleryItem[] = Array.from({ length: 10 }, (_, index) => ({
  label: `Thumbnail example ${index + 1}`,
  image: index % 2 === 0 ? riqueImage : jotinhaImage,
}));

export function DesignWorkSection({ copy }: { copy: DesignWorkCopy }) {
  const [activeImage, setActiveImage] = useState<ThumbnailGalleryItem | null>(null);

  function scrollGallery(direction: "previous" | "next") {
    const gallery = document.querySelector<HTMLDivElement>(".design-work__gallery-track");

    gallery?.scrollBy({
      behavior: "smooth",
      left: direction === "next" ? 320 : -320,
    });
  }

  return (
    <Section id="design-work" eyebrow={copy.eyebrow} title={copy.title}>
      <>
        <div className="design-work">
          {copy.items.map((item) => {
            const image = designWorkImages[item.name as keyof typeof designWorkImages] ?? riqueImage;

            return (
              <article className="design-work__card" key={item.name}>
                <a className="design-work__media-link" href={item.url} target="_blank" rel="noreferrer">
                  <div className={`design-work__media design-work__media--${item.tone}`} aria-hidden="true">
                    <Image
                      className="design-work__image"
                      src={image}
                      alt={`${item.name} thumbnail preview`}
                      width={image.width}
                      height={image.height}
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
                  <p className="design-work__description text-copy">{item.description}</p>
                  <a className="design-work__link" href={item.url} target="_blank" rel="noreferrer">
                    <span>{copy.visit}</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="design-work__gallery" aria-label="Thumbnail gallery">
          <button
            className="design-work__gallery-control design-work__gallery-control--previous"
            type="button"
            aria-label="Previous thumbnails"
            onClick={() => scrollGallery("previous")}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <div className="design-work__gallery-track">
            {thumbnailGallery.map((item) => (
              <button
                className="design-work__gallery-item"
                key={item.label}
                type="button"
                aria-label={`Expand ${item.label}`}
                onClick={() => setActiveImage(item)}
              >
                <Image
                  className="design-work__gallery-image"
                  src={item.image}
                  alt={item.label}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(max-width: 640px) 62vw, 18rem"
                />
              </button>
            ))}
          </div>
          <button
            className="design-work__gallery-control design-work__gallery-control--next"
            type="button"
            aria-label="Next thumbnails"
            onClick={() => scrollGallery("next")}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>

        {activeImage ? (
          <div className="design-work__lightbox" role="dialog" aria-modal="true" aria-label={activeImage.label}>
            <button className="design-work__lightbox-backdrop" type="button" onClick={() => setActiveImage(null)} />
            <div className="design-work__lightbox-panel">
              <button
                className="design-work__lightbox-close"
                type="button"
                aria-label="Close image preview"
                onClick={() => setActiveImage(null)}
              >
                <X size={20} aria-hidden="true" />
              </button>
              <Image
                className="design-work__lightbox-image"
                src={activeImage.image}
                alt={activeImage.label}
                width={activeImage.image.width}
                height={activeImage.image.height}
                sizes="92vw"
                priority
              />
            </div>
          </div>
        ) : null}
      </>
    </Section>
  );
}
