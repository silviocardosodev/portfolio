"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
import { Section } from "@/components/Section";
import type { DesignWork } from "@/data/portfolio";
import riqueBarcelonaImage from "@/assets/img/canaldorique-barcelona.jpeg";
import riqueCucurellaImage from "@/assets/img/canaldorique-cucurella.jpeg";
import riqueFinalImage from "@/assets/img/canaldorique-final.jpeg";
import jotinhaCampeonatoImage from "@/assets/img/jotinhatv-campeonatox2.jpeg";
import jotinhaNeymarImage from "@/assets/img/jotinhatv-neymar.jpeg";
import jotinhaSpfcImage from "@/assets/img/jotinhatv-spfc.jpeg";
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

const thumbnailGallery: ThumbnailGalleryItem[] = [
  { label: "Canal do Rique Barcelona thumbnail", image: riqueBarcelonaImage },
  { label: "Canal do Rique Cucurella thumbnail", image: riqueCucurellaImage },
  { label: "Canal do Rique final thumbnail", image: riqueFinalImage },
  { label: "Jotinha TV Campeonato X2 thumbnail", image: jotinhaCampeonatoImage },
  { label: "Jotinha TV Neymar thumbnail", image: jotinhaNeymarImage },
  { label: "Jotinha TV SPFC thumbnail", image: jotinhaSpfcImage },
];

export function DesignWorkSection({ copy }: { copy: DesignWorkCopy }) {
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<ThumbnailGalleryItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryItems = useMemo(() => [...thumbnailGallery, thumbnailGallery[0]], []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGalleryIndex((currentIndex) => currentIndex + 1);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const track = galleryTrackRef.current;
    const target = track?.children[galleryIndex] as HTMLElement | undefined;

    if (!track || !target) {
      return;
    }

    track.scrollTo({
      behavior: "smooth",
      left: target.offsetLeft - track.offsetLeft,
    });

    if (galleryIndex === thumbnailGallery.length) {
      const timeout = window.setTimeout(() => {
        track.scrollTo({ behavior: "instant", left: 0 });
        setGalleryIndex(0);
      }, 720);

      return () => window.clearTimeout(timeout);
    }
  }, [galleryIndex]);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  function scrollGallery(direction: "previous" | "next") {
    setGalleryIndex((currentIndex) => {
      if (direction === "next") {
        return currentIndex + 1;
      }

      return currentIndex <= 0 ? thumbnailGallery.length - 1 : currentIndex - 1;
    });
  }

  return (
    <Section id="design-work-content" eyebrow={copy.eyebrow} title={copy.title}>
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
          <div className="design-work__gallery-track" ref={galleryTrackRef}>
            {galleryItems.map((item, index) => (
              <button
                className="design-work__gallery-item"
                key={`${item.label}-${index}`}
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

        {activeImage && typeof document !== "undefined"
          ? createPortal(
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
          </div>,
              document.body,
            )
          : null}
      </>
    </Section>
  );
}
