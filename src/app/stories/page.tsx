"use client";

import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { InvertCursor } from "@/components/InvertCursor";

const storyItems = [
  "Forno",
  "Batedeiras",
  "Liquidificador",
  "Processador de alimentos",
  "Mixer de mão",
  "Cafeteiras",
];

export default function StoriesPage() {
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [isHoldingStory, setIsHoldingStory] = useState(false);
  const [isDraggingStories, setIsDraggingStories] = useState(false);
  const [loadingStory, setLoadingStory] = useState<string | null>(null);
  const [visitedStories, setVisitedStories] = useState<string[]>([]);
  const loadingTimerRef = useRef(0);
  const storiesDragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    hasMoved: boolean;
  } | null>(null);
  const orderedStoryItems = [
    ...storyItems.filter((item) => !visitedStories.includes(item)),
    ...visitedStories,
  ];

  function markStoryAsVisited(item: string) {
    setVisitedStories((items) => [...items.filter((visitedItem) => visitedItem !== item), item]);
  }

  function completeStory(item = activeStory) {
    if (item) {
      markStoryAsVisited(item);
    }

    setIsHoldingStory(false);
    setActiveStory(null);
  }

  function handleStoryViewerPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsHoldingStory(true);
  }

  function handleStoryViewerPointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsHoldingStory(false);
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

  function handleStoryPointerUp(item: string) {
    if (storiesDragRef.current?.hasMoved) {
      return;
    }

    setIsHoldingStory(false);
    setActiveStory(null);
    setLoadingStory(item);
    window.clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = window.setTimeout(() => {
      setLoadingStory(null);
      setActiveStory(item);
    }, 3000);
  }

  function closeStory() {
    window.clearTimeout(loadingTimerRef.current);
    setLoadingStory(null);
    completeStory();
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

  return (
    <main className="stories-page">
      <InvertCursor />
      <Link className="stories-page__back" href="/" aria-label="Back to portfolio">
        <ArrowLeft size={18} aria-hidden="true" />
        Portfolio
      </Link>
      <section className="stories-stage" aria-label="Stories phone preview">
        <div className="stories-phone" aria-label="Vertical phone viewport">
          <div className="stories-phone__speaker" aria-hidden="true" />
          <div className="stories-phone__screen">
            <div className="stories-phone__status" aria-hidden="true">
              <span>9:41</span>
              <span>5G</span>
            </div>
            <div className="stories-phone__content">
              <div
                className={`stories-list ${isDraggingStories ? "stories-list--dragging" : ""}`}
                aria-label="Story categories"
                onPointerDown={handleStoriesPointerDown}
                onPointerMove={handleStoriesPointerMove}
                onPointerUp={finishStoriesDrag}
                onPointerCancel={finishStoriesDrag}
                onPointerLeave={finishStoriesDrag}
              >
                {orderedStoryItems.map((item) => (
                  <button
                    className={`stories-list__item ${loadingStory === item ? "stories-list__item--loading" : ""} ${
                      visitedStories.includes(item) ? "stories-list__item--visited" : ""
                    }`}
                    type="button"
                    key={item}
                    disabled={loadingStory !== null}
                    onPointerUp={() => handleStoryPointerUp(item)}
                  >
                    <span className="stories-list__media" aria-hidden="true" />
                    <span className="stories-list__label">{item}</span>
                  </button>
                ))}
              </div>
            </div>
            {activeStory ? (
              <div
                className={`story-viewer ${isHoldingStory ? "story-viewer--holding" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label={activeStory}
                onPointerDown={handleStoryViewerPointerDown}
                onPointerUp={handleStoryViewerPointerEnd}
                onPointerCancel={handleStoryViewerPointerEnd}
              >
                <div className="story-viewer__progress" aria-hidden="true">
                  <span
                    className="story-viewer__progress-fill"
                    key={activeStory}
                    onAnimationEnd={() => completeStory(activeStory)}
                  />
                </div>
                <button
                  className="story-viewer__close"
                  type="button"
                  aria-label="Close story"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={closeStory}
                >
                  <X size={18} aria-hidden="true" />
                </button>
                <p className="story-viewer__title">{activeStory}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
