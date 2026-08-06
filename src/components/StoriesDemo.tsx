"use client";

import { Check, Copy, Send, Share2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import mercedesStory1 from "@/assets/img/stories/mercedes/mercedes1.jpg";
import mercedesStory2 from "@/assets/img/stories/mercedes/mercedes2.jpg";
import mercedesStory3 from "@/assets/img/stories/mercedes/mercedes3.jpg";
import acuraStory from "@/assets/img/stories/acura/acura.jpg";
import audiStory1 from "@/assets/img/stories/audi/audi1.jpg";
import audiStory2 from "@/assets/img/stories/audi/audi2.jpg";
import audiStory3 from "@/assets/img/stories/audi/audi3.jpg";
import lexusStory from "@/assets/img/stories/lexus/lexus.jpg";
import mazdaStory1 from "@/assets/img/stories/mazda/mazda1.jpg";
import mazdaStory2 from "@/assets/img/stories/mazda/mazda2.jpg";
import teslaStory from "@/assets/img/stories/tesla/tesla.jpg";
import type { Locale } from "@/data/portfolio";

const storyItems = [
  { id: "mercedes", en: "Mercedes", pt: "Mercedes", image: "/brand-stories/mercedes.svg", slides: [mercedesStory1, mercedesStory2, mercedesStory3] },
  { id: "tesla", en: "Tesla", pt: "Tesla", image: "/brand-stories/tesla.svg", slides: [teslaStory] },
  { id: "audi", en: "Audi", pt: "Audi", image: "/brand-stories/audi.svg", slides: [audiStory1, audiStory2, audiStory3] },
  { id: "acura", en: "Acura", pt: "Acura", image: "/brand-stories/acura.svg", slides: [acuraStory] },
  { id: "lexus", en: "Lexus", pt: "Lexus", image: "/brand-stories/lexus.svg", slides: [lexusStory] },
  { id: "mazda", en: "Mazda", pt: "Mazda", image: "/brand-stories/mazda.svg", slides: [mazdaStory1, mazdaStory2] },
] as const;

const shareUrl = "https://silviocardoso.dev";
const encodedShareUrl = encodeURIComponent(shareUrl);
const shareLinks = [
  { href: `https://wa.me/?text=${encodedShareUrl}`, label: "WhatsApp" },
  { href: `https://t.me/share/url?url=${encodedShareUrl}`, label: "Telegram" },
  { href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`, label: "LinkedIn" },
] as const;

const storiesCopy = {
  en: {
    categoriesAria: "Story categories",
    closeAria: "Close story",
    copied: "Copied",
    copyUrl: "Copy URL",
    phoneAria: "Vertical phone viewport",
    shareAria: "Share story",
    shareMenuAria: "Share Silvio Cardoso site",
  },
  pt: {
    categoriesAria: "Categorias de stories",
    closeAria: "Fechar story",
    copied: "Copiado",
    copyUrl: "Copiar URL",
    phoneAria: "Viewport vertical de celular",
    shareAria: "Compartilhar story",
    shareMenuAria: "Compartilhar site de Silvio Cardoso",
  },
} as const;

type StoryItem = (typeof storyItems)[number];

export function StoriesDemo({ locale }: { locale: Locale }) {
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isHoldingStory, setIsHoldingStory] = useState(false);
  const [isSharePaused, setIsSharePaused] = useState(false);
  const [isDraggingStories, setIsDraggingStories] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [hasCopiedShareUrl, setHasCopiedShareUrl] = useState(false);
  const [isStoryImageLoading, setIsStoryImageLoading] = useState(false);
  const [loadingStoryId, setLoadingStoryId] = useState<string | null>(null);
  const [visitedStories, setVisitedStories] = useState<string[]>([]);
  const loadingTimerRef = useRef(0);
  const activeStoryIdRef = useRef<string | null>(null);
  const storiesDragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    hasMoved: boolean;
  } | null>(null);
  const copy = storiesCopy[locale];
  const orderedStoryItems = [
    ...storyItems.filter((item) => !visitedStories.includes(item.id)),
    ...visitedStories.map((storyId) => storyItems.find((item) => item.id === storyId)).filter((item) => item !== undefined),
  ];
  const activeStory = storyItems.find((item) => item.id === activeStoryId);
  const activeStoryLabel = activeStory?.[locale] ?? "";
  const activeStoryIndex = activeStoryId ? storyItems.findIndex((item) => item.id === activeStoryId) : -1;
  const activeStorySlide = activeStory?.slides[activeSlideIndex];
  const activeStoryTotalSlides = Math.max(1, activeStory?.slides.length ?? 0);

  function markStoryAsVisited(itemId: string) {
    setVisitedStories((items) => [...items.filter((visitedItem) => visitedItem !== itemId), itemId]);
  }

  function completeStory(itemId = activeStoryId) {
    if (itemId) {
      markStoryAsVisited(itemId);
    }

    setIsHoldingStory(false);
    setIsSharePaused(false);
    setIsShareOpen(false);
    setHasCopiedShareUrl(false);
    setIsStoryImageLoading(false);
    activeStoryIdRef.current = null;
    setActiveSlideIndex(0);
    setActiveStoryId(null);
  }

  function handleStoryViewerPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary) {
      return;
    }

    event.preventDefault();
    setIsHoldingStory(true);
  }

  function handleStoriesPointerDown(event: PointerEvent<HTMLDivElement>) {
    const track = event.currentTarget;

    storiesDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      hasMoved: false,
    };
    setIsDraggingStories(true);
  }

  function handleStoriesPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = storiesDragRef.current;

    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    event.preventDefault();
    if (Math.abs(event.clientX - drag.startX) > 4) {
      drag.hasMoved = true;
    }
    event.currentTarget.scrollLeft = drag.startScrollLeft + drag.startX - event.clientX;
  }

  function handleStoryPointerUp(item: StoryItem) {
    if (storiesDragRef.current?.hasMoved) {
      return;
    }

    setIsHoldingStory(false);
    setIsSharePaused(false);
    setIsShareOpen(false);
    setHasCopiedShareUrl(false);
    activeStoryIdRef.current = null;
    setActiveStoryId(null);
    setLoadingStoryId(item.id);
    window.clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = window.setTimeout(() => {
      setLoadingStoryId(null);
      activeStoryIdRef.current = item.id;
      setActiveSlideIndex(0);
      setIsStoryImageLoading(item.slides.length > 0);
      setActiveStoryId(item.id);
    }, 750);
  }

  function closeStory() {
    window.clearTimeout(loadingTimerRef.current);
    setLoadingStoryId(null);
    completeStory();
  }

  function toggleShareMenu() {
    setIsShareOpen((isOpen) => {
      const nextIsOpen = !isOpen;

      setIsSharePaused(nextIsOpen);
      return nextIsOpen;
    });
  }

  function openStory(item: StoryItem) {
    setIsHoldingStory(false);
    setIsShareOpen(false);
    setHasCopiedShareUrl(false);
    activeStoryIdRef.current = item.id;
    setActiveSlideIndex(0);
    setIsStoryImageLoading(item.slides.length > 0);
    setActiveStoryId(item.id);
  }

  function openNextStory() {
    if (activeStoryIndex < 0) {
      return;
    }

    if (activeStory && activeSlideIndex < activeStory.slides.length - 1) {
      setIsStoryImageLoading(true);
      setActiveSlideIndex((index) => index + 1);
      return;
    }

    const hasFinishedAllStories = storyItems.every((item) => item.id === activeStoryId || visitedStories.includes(item.id));

    if (hasFinishedAllStories) {
      completeStory(activeStoryId);
      return;
    }

    completeStory(activeStoryId);
    openStory(storyItems[(activeStoryIndex + 1) % storyItems.length]);
  }

  function openPreviousStory() {
    if (activeStoryIndex < 0) {
      return;
    }

    if (activeSlideIndex > 0) {
      setIsStoryImageLoading(true);
      setActiveSlideIndex((index) => index - 1);
      return;
    }

    completeStory(activeStoryId);
    const previousStory = storyItems[(activeStoryIndex - 1 + storyItems.length) % storyItems.length];
    openStory(previousStory);
    setActiveSlideIndex(Math.max(0, previousStory.slides.length - 1));
    setIsStoryImageLoading(previousStory.slides.length > 0);
  }

  function handleStoryViewerClick(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();

    if (event.clientX >= bounds.left + bounds.width / 2) {
      openNextStory();
      return;
    }

    openPreviousStory();
  }

  async function copyShareUrl() {
    await window.navigator.clipboard.writeText(shareUrl);
    setHasCopiedShareUrl(true);
  }

  function finishStoriesDrag() {
    storiesDragRef.current = null;
    setIsDraggingStories(false);
  }

  useEffect(() => {
    return () => {
      window.clearTimeout(loadingTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isHoldingStory) {
      return;
    }

    function releaseStoryHold() {
      setIsHoldingStory(false);
    }

    function releaseStoryHoldFromTouch(event: TouchEvent) {
      event.preventDefault();
      setIsHoldingStory(false);
    }

    window.addEventListener("pointerup", releaseStoryHold);
    window.addEventListener("pointercancel", releaseStoryHold);
    window.addEventListener("mouseup", releaseStoryHold);
    window.addEventListener("dragend", releaseStoryHold);
    window.addEventListener("drop", releaseStoryHold);
    window.addEventListener("touchend", releaseStoryHoldFromTouch, { passive: false });
    window.addEventListener("touchcancel", releaseStoryHoldFromTouch, { passive: false });
    window.addEventListener("blur", releaseStoryHold);
    document.addEventListener("visibilitychange", releaseStoryHold);

    return () => {
      window.removeEventListener("pointerup", releaseStoryHold);
      window.removeEventListener("pointercancel", releaseStoryHold);
      window.removeEventListener("mouseup", releaseStoryHold);
      window.removeEventListener("dragend", releaseStoryHold);
      window.removeEventListener("drop", releaseStoryHold);
      window.removeEventListener("touchend", releaseStoryHoldFromTouch);
      window.removeEventListener("touchcancel", releaseStoryHoldFromTouch);
      window.removeEventListener("blur", releaseStoryHold);
      document.removeEventListener("visibilitychange", releaseStoryHold);
    };
  }, [isHoldingStory]);

  return (
    <div className="stories-phone" aria-label={copy.phoneAria}>
      <div className="stories-phone__speaker" aria-hidden="true" />
      <div className="stories-phone__screen">
        <div className="stories-phone__status" aria-hidden="true">
          <span>9:41</span>
          <span>5G</span>
        </div>
        <div className="stories-phone__content">
          <div
            className={`stories-list ${isDraggingStories ? "stories-list--dragging" : ""}`}
            aria-label={copy.categoriesAria}
            onPointerDown={handleStoriesPointerDown}
            onPointerMove={handleStoriesPointerMove}
            onPointerUp={finishStoriesDrag}
            onPointerCancel={finishStoriesDrag}
            onPointerLeave={finishStoriesDrag}
          >
            {orderedStoryItems.map((item) => (
              <button
                className={`stories-list__item ${loadingStoryId === item.id ? "stories-list__item--loading" : ""} ${
                  visitedStories.includes(item.id) ? "stories-list__item--visited" : ""
                }`}
                type="button"
                key={item.id}
                disabled={loadingStoryId !== null}
                onPointerUp={() => handleStoryPointerUp(item)}
              >
                <span className="stories-list__media" aria-hidden="true">
                  <Image className="stories-list__image" src={item.image} alt="" width={38} height={38} draggable={false} />
                </span>
                <span className="stories-list__label">{item[locale]}</span>
              </button>
            ))}
          </div>
        </div>
        {activeStoryId ? (
          <div
            className={`story-viewer ${isHoldingStory ? "story-viewer--holding" : ""} ${
              isHoldingStory || isSharePaused ? "story-viewer--paused" : ""
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={activeStoryLabel}
            onClick={handleStoryViewerClick}
            onDragStart={(event) => event.preventDefault()}
            onPointerDown={handleStoryViewerPointerDown}
          >
            {activeStorySlide ? (
              <Image
                className="story-viewer__media"
                src={activeStorySlide}
                alt=""
                fill
                priority
                draggable={false}
                sizes="(max-width: 640px) 88vw, 21rem"
                onLoad={() => setIsStoryImageLoading(false)}
              />
            ) : null}
            {isStoryImageLoading ? (
              <div className="story-viewer__loader" aria-label="Loading story image" role="status">
                <span className="story-viewer__loader-ring" />
              </div>
            ) : null}
            <div className="story-viewer__progress" aria-hidden="true">
              {Array.from({ length: activeStoryTotalSlides }, (_, index) => (
                <span className="story-viewer__progress-track" key={`${activeStoryId}-${index}`}>
                  <span
                    className={`story-viewer__progress-fill ${
                      index < activeSlideIndex ? "story-viewer__progress-fill--complete" : ""
                    } ${index === activeSlideIndex ? "story-viewer__progress-fill--active" : ""}`}
                    key={`${activeStoryId}-${activeSlideIndex}-${index}`}
                    onAnimationEnd={index === activeSlideIndex ? openNextStory : undefined}
                  />
                </span>
              ))}
            </div>
            <div className="story-viewer__header">
              <span className="story-viewer__avatar" aria-hidden="true">
                {activeStory ? (
                  <Image className="story-viewer__avatar-image" src={activeStory.image} alt="" width={36} height={36} draggable={false} />
                ) : null}
              </span>
              <span className="story-viewer__name">{activeStoryLabel}</span>
            </div>
            <div
              className="story-viewer__actions"
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <button
                className="story-viewer__action"
                    type="button"
                    aria-label={copy.shareAria}
                    aria-expanded={isShareOpen}
                    onClick={toggleShareMenu}
                  >
                <Share2 size={18} aria-hidden="true" />
              </button>
              <button className="story-viewer__action" type="button" aria-label={copy.closeAria} onClick={closeStory}>
                <X size={18} aria-hidden="true" />
              </button>
              {isShareOpen ? (
                <div className="story-share" role="menu" aria-label={copy.shareMenuAria}>
                  {shareLinks.map((link) => (
                    <a className="story-share__item" href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                      <Send size={14} aria-hidden="true" />
                      {link.label}
                    </a>
                  ))}
                  <button className="story-share__item" type="button" onClick={copyShareUrl}>
                    {hasCopiedShareUrl ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                    {hasCopiedShareUrl ? copy.copied : copy.copyUrl}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
