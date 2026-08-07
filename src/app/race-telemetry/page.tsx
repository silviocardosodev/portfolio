"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import ferrariLogo from "@/assets/img/ferrari.png";
import { InvertCursor } from "@/components/InvertCursor";

export default function RaceTelemetryPage() {
  const [isTelemetryRunning, setIsTelemetryRunning] = useState(true);
  const trackRef = useRef<SVGSVGElement>(null);

  function toggleTelemetryAnimation() {
    const track = trackRef.current;
    const shouldRun = !isTelemetryRunning;

    if (track) {
      if (shouldRun) {
        track.unpauseAnimations();
      } else {
        track.pauseAnimations();
      }
    }

    setIsTelemetryRunning(shouldRun);
  }

  return (
    <main className="race-telemetry-page">
      <InvertCursor />
      <div className="stories-phone stories-phone--race-telemetry" aria-label="Race telemetry phone viewport">
        <div className="stories-phone__speaker" aria-hidden="true" />
        <div className="stories-phone__screen">
          <div className="stories-phone__status" aria-hidden="true">
            <span>9:41</span>
            <span>5G</span>
          </div>
          <div className="stories-phone__content race-telemetry">
            <div className="race-telemetry__event-row" aria-label="Race event summary">
              <article className="race-telemetry__event-card race-telemetry__event-card--wide">
                <span className="race-telemetry__event-label">Event name</span>
                <strong className="race-telemetry__event-value">Brazil GP</strong>
              </article>
              <article className="race-telemetry__event-card">
                <span className="race-telemetry__event-label">Lap(s)</span>
                <strong className="race-telemetry__event-value">72</strong>
              </article>
            </div>
            <section className="race-telemetry__track-card" aria-label="Interlagos track map">
              <svg
                className="race-telemetry__track"
                ref={trackRef}
                viewBox="30 0 410 250"
                role="img"
                aria-label="Interlagos circuit outline"
              >
                <path
                  id="interlagos-track-path"
                  className="race-telemetry__track-line"
                  d="M88 94 C70 105 54 112 48 126 C42 140 50 150 65 156 C76 160 78 171 73 184 C67 201 75 215 91 223 C111 233 126 235 154 235 L287 235 C311 235 322 234 326 222 C330 204 325 177 313 169 L206 129 C188 122 171 116 169 94 C167 73 182 67 198 60 L232 44 C251 35 267 40 260 59 C256 71 253 80 260 88 C270 101 286 101 295 88 L316 51 C322 40 337 31 348 38 C358 46 348 60 339 74 C331 86 326 98 330 119 C334 140 349 151 374 157 L398 164 C413 168 421 162 422 145 L423 115 C423 99 413 79 397 62 L369 31 C354 15 331 8 304 9 L218 13 C199 14 184 19 166 29 L88 94 Z"
                />
                <g className="race-telemetry__driver-marker">
                  <circle className="race-telemetry__driver-dot" cx="0" cy="0" r="12" />
                  <animateMotion
                    dur="67.6s"
                    repeatCount="indefinite"
                    rotate="0"
                    calcMode="linear"
                    keyPoints="0;0.08;0.16;0.22;0.38;0.53;0.61;0.68;0.76;0.84;0.91;1"
                    keyTimes="0;0.12;0.22;0.3;0.42;0.54;0.64;0.74;0.84;0.92;0.97;1"
                  >
                    <mpath href="#interlagos-track-path" />
                  </animateMotion>
                </g>
              </svg>
              <button
                className="race-telemetry__control"
                type="button"
                aria-label={isTelemetryRunning ? "Pause telemetry animation" : "Start telemetry animation"}
                onClick={toggleTelemetryAnimation}
              >
                {isTelemetryRunning ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                <span>{isTelemetryRunning ? "Stop" : "Start"}</span>
              </button>
            </section>
            <section className="race-telemetry__driver-row" aria-label="Driver, team and position">
              <div className="race-telemetry__team-card">
                <Image className="race-telemetry__team-logo" src={ferrariLogo} alt="" width={46} height={36} />
                <div className="race-telemetry__team-copy">
                  <span className="race-telemetry__team-name">Ferrari</span>
                  <strong className="race-telemetry__driver-name">Lewis Hamilton</strong>
                </div>
              </div>
              <div className="race-telemetry__position-card">
                <span className="race-telemetry__position-label">Pos.</span>
                <strong className="race-telemetry__position-value">1</strong>
              </div>
            </section>
            <section className="race-telemetry__metric-row" aria-label="Car telemetry metrics">
              <article className="race-telemetry__metric-card race-telemetry__metric-card--throttle">
                <span className="race-telemetry__metric-fill" style={{ "--metric-fill": "78%" } as CSSProperties} />
                <strong className="race-telemetry__metric-value">Throttle</strong>
              </article>
              <article className="race-telemetry__metric-card race-telemetry__metric-card--brakes">
                <span className="race-telemetry__metric-fill" style={{ "--metric-fill": "32%" } as CSSProperties} />
                <strong className="race-telemetry__metric-value">Brakes</strong>
              </article>
            </section>
            <section className="race-telemetry__live-card" aria-label="Live car speed and gear">
              <article className="race-telemetry__live-item">
                <span className="race-telemetry__live-label">Live speed</span>
                <strong className="race-telemetry__live-value">335km/h</strong>
              </article>
              <article className="race-telemetry__live-item">
                <span className="race-telemetry__live-label">Gear</span>
                <strong className="race-telemetry__live-value">8</strong>
              </article>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
