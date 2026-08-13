"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ferrariLogo from "@/assets/img/ferrari.png";
import { InvertCursor } from "@/components/InvertCursor";

const LAP_DURATION_MS = 67934;
const SOURCE_LAP_MS = 67934;
const SECTOR_SOURCE_MS = [17498, 34445, 15991];
const SECTOR_DURATION_MS = SECTOR_SOURCE_MS.map((sector) => (sector / SOURCE_LAP_MS) * LAP_DURATION_MS);
const SECTOR_START_MS = [
  0,
  SECTOR_DURATION_MS[0],
  SECTOR_DURATION_MS[0] + SECTOR_DURATION_MS[1],
];
const RPM_TELEMETRY = [
  [0, 11465],
  [3.8, 10970],
  [4.2, 10070],
  [4.6, 8675],
  [5, 9080],
  [5.3, 9755],
  [8.8, 8855],
  [9.1, 10250],
  [9.8, 11780],
  [10.2, 10880],
  [15, 11780],
  [15.1, 11870],
  [15.5, 10655],
  [19.4, 11690],
  [19.8, 10565],
  [25, 11555],
  [26.8, 11690],
  [27.2, 10565],
  [27.6, 9665],
  [30, 10700],
  [31.1, 12185],
  [31.5, 11015],
  [34.7, 11555],
  [35, 10475],
  [40, 11600],
  [45, 10835],
  [47.2, 11780],
  [47.5, 10925],
  [47.9, 9395],
  [49, 9350],
  [49.3, 8450],
  [50, 8000],
  [52.5, 8090],
  [52.9, 8990],
  [55, 8855],
  [56.8, 9260],
  [57.1, 8450],
  [59.6, 11960],
  [60, 11105],
  [61.8, 12050],
  [62.2, 10655],
  [62.5, 9125],
  [65, 8000],
  [67.5, 8090],
  [67.8, 9125],
  [68.2, 10070],
  [68.9, 11195],
  [69.3, 12050],
  [70, 11780],
  [70.4, 12365],
  [70.7, 11150],
  [74.4, 11870],
  [74.7, 10475],
  [76.5, 11105],
  [76.8, 9980],
  [77.2, 8315],
  [77.5, 8585],
  [77.9, 9485],
  [80, 8720],
  [83.9, 12095],
  [84.3, 10835],
  [85, 11240],
  [86, 11870],
  [86.4, 10475],
  [90, 11510],
  [91.4, 11285],
  [91.8, 10430],
  [95, 11105],
  [100, 11600],
];
const SPEED_GEAR_TELEMETRY = [
  [0, 320, 8],
  [3.8, 323, 8],
  [4.2, 293, 8],
  [4.6, 261, 8],
  [4.9, 212, 8],
  [5, 209, 8],
  [5.3, 201, 8],
  [5.6, 175, 8],
  [6, 163, 6],
  [6.3, 148, 4],
  [6.7, 137, 3],
  [9.8, 163, 3],
  [10, 166, 4],
  [11.9, 199, 4],
  [12.3, 212, 5],
  [13.4, 229, 5],
  [13.7, 233, 6],
  [15, 249, 6],
  [15.8, 257, 7],
  [19.8, 291, 7],
  [20, 292, 8],
  [25, 321, 8],
  [26.8, 325, 8],
  [27.2, 305, 8],
  [27.6, 268, 8],
  [27.9, 235, 8],
  [28.3, 198, 8],
  [28.6, 187, 6],
  [29, 179, 4],
  [30, 171, 4],
  [31.5, 192, 4],
  [31.8, 208, 5],
  [32.9, 228, 5],
  [33.2, 232, 6],
  [34.7, 250, 6],
  [35, 254, 7],
  [40, 284, 7],
  [42.9, 254, 7],
  [43.2, 242, 6],
  [45, 227, 6],
  [47.5, 248, 6],
  [47.9, 218, 6],
  [48.3, 181, 6],
  [48.6, 159, 6],
  [49, 139, 4],
  [49.3, 129, 3],
  [50, 111, 3],
  [55, 131, 3],
  [56.8, 124, 3],
  [57.1, 132, 4],
  [59.6, 190, 4],
  [60, 198, 5],
  [61.8, 233, 5],
  [62.2, 204, 5],
  [62.5, 180, 5],
  [62.9, 155, 5],
  [63.2, 141, 4],
  [63.6, 131, 3],
  [65, 104, 3],
  [68.9, 142, 3],
  [69.3, 160, 3],
  [69.7, 175, 3],
  [70, 184, 4],
  [70.4, 192, 4],
  [70.7, 202, 5],
  [71.9, 221, 5],
  [72.2, 227, 6],
  [74.7, 253, 6],
  [75, 256, 7],
  [76.8, 264, 7],
  [77.2, 225, 7],
  [77.5, 185, 7],
  [77.9, 169, 7],
  [78.2, 156, 5],
  [78.6, 144, 4],
  [80, 132, 4],
  [82.9, 196, 4],
  [83.2, 203, 5],
  [84.3, 224, 5],
  [84.6, 231, 6],
  [85, 236, 6],
  [86, 250, 6],
  [86.4, 255, 7],
  [90, 279, 7],
  [91.4, 286, 7],
  [91.8, 288, 8],
  [95, 308, 8],
  [100, 322, 8],
];

function formatLapTime(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millis = Math.floor(milliseconds % 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}.${millis.toString().padStart(3, "0")}`;
}

function formatSectorTime(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  const millis = Math.floor(milliseconds % 1000);

  return `${seconds}.${millis.toString().padStart(3, "0")}`;
}

function getCurrentRpm(lapElapsedMs: number) {
  const progress = (lapElapsedMs / LAP_DURATION_MS) * 100;
  const nextIndex = RPM_TELEMETRY.findIndex(([point]) => point >= progress);

  if (nextIndex <= 0) {
    return RPM_TELEMETRY[0][1];
  }

  const [previousPoint, previousRpm] = RPM_TELEMETRY[nextIndex - 1];
  const [nextPoint, nextRpm] = RPM_TELEMETRY[nextIndex];
  const ratio = (progress - previousPoint) / (nextPoint - previousPoint);

  return Math.round(previousRpm + (nextRpm - previousRpm) * ratio);
}

function getCurrentSpeedAndGear(lapElapsedMs: number) {
  const progress = (lapElapsedMs / LAP_DURATION_MS) * 100;
  const nextIndex = SPEED_GEAR_TELEMETRY.findIndex(([point]) => point >= progress);

  if (nextIndex <= 0) {
    const [, speed, gear] = SPEED_GEAR_TELEMETRY[0];

    return { speed, gear };
  }

  const [previousPoint, previousSpeed, previousGear] = SPEED_GEAR_TELEMETRY[nextIndex - 1];
  const [nextPoint, nextSpeed, nextGear] = SPEED_GEAR_TELEMETRY[nextIndex];
  const ratio = (progress - previousPoint) / (nextPoint - previousPoint);
  const speed = Math.round(previousSpeed + (nextSpeed - previousSpeed) * ratio);
  const gear = ratio < 0.5 ? previousGear : nextGear;

  return { speed, gear };
}

export default function RaceTelemetryPage() {
  const [isTelemetryRunning, setIsTelemetryRunning] = useState(false);
  const [lapElapsedMs, setLapElapsedMs] = useState(0);
  const trackRef = useRef<SVGSVGElement>(null);
  const motionRef = useRef<SVGAnimationElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lapStartRef = useRef(0);
  const pausedAtRef = useRef(0);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      trackRef.current?.pauseAnimations();
      motionRef.current?.beginElement();
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isTelemetryRunning) {
      return;
    }

    let frameId = 0;

    function updateLapTimer(now: number) {
      if (lapStartRef.current === 0) {
        lapStartRef.current = now - pausedAtRef.current;
      }

      const elapsed = (now - lapStartRef.current) % LAP_DURATION_MS;

      setLapElapsedMs(elapsed);
      frameId = requestAnimationFrame(updateLapTimer);
    }

    frameId = requestAnimationFrame(updateLapTimer);

    return () => cancelAnimationFrame(frameId);
  }, [isTelemetryRunning]);

  function toggleTelemetryAnimation() {
    const track = trackRef.current;
    const shouldRun = !isTelemetryRunning;

    if (track) {
      if (shouldRun) {
        track.unpauseAnimations();
        lapStartRef.current = performance.now() - pausedAtRef.current;
      } else {
        track.pauseAnimations();
        pausedAtRef.current = lapElapsedMs;
      }
    }

    setIsTelemetryRunning(shouldRun);
  }

  function restartTelemetryAnimation() {
    const now = performance.now();

    lapStartRef.current = now;
    pausedAtRef.current = 0;
    setLapElapsedMs(0);
    setIsTelemetryRunning(true);
    trackRef.current?.unpauseAnimations();
    motionRef.current?.beginElement();

    const content = contentRef.current;

    if (content) {
      content.classList.remove("race-telemetry--restarting");
      void content.offsetWidth;
      content.classList.add("race-telemetry--restarting");
      requestAnimationFrame(() => {
        content.classList.remove("race-telemetry--restarting");
      });
    }
  }

  const sectorTimes = SECTOR_DURATION_MS.map((sectorDuration, index) => {
    const sectorElapsed = lapElapsedMs - SECTOR_START_MS[index];

    return Math.min(Math.max(sectorElapsed, 0), sectorDuration);
  });
  const currentRpm = getCurrentRpm(lapElapsedMs);
  const { speed: currentSpeed, gear: currentGear } = getCurrentSpeedAndGear(lapElapsedMs);

  return (
    <main className="race-telemetry-page">
      <InvertCursor />
      <div
        className="stories-phone stories-phone--race-telemetry"
        aria-label="Race telemetry phone viewport"
      >
        <div className="stories-phone__speaker" aria-hidden="true" />
        <div className="stories-phone__screen">
          <div className="stories-phone__status" aria-hidden="true">
            <span>9:41</span>
            <span>5G</span>
          </div>
          <div
            className={`stories-phone__content race-telemetry${isTelemetryRunning ? "" : " race-telemetry--paused"}`}
            ref={contentRef}
          >
            <div
              className="race-telemetry__event-row"
              aria-label="Race event summary"
            >
              <article className="race-telemetry__event-card race-telemetry__event-card--wide">
                <span className="race-telemetry__event-label">Event name</span>
                <strong className="race-telemetry__event-value">
                  Brazil GP
                </strong>
              </article>
              <article className="race-telemetry__event-card">
                <span className="race-telemetry__event-label">Lap(s)</span>
                <strong className="race-telemetry__event-value">72</strong>
              </article>
            </div>
            <section
              className="race-telemetry__timer-card"
              aria-label="Current lap timer and sector times"
            >
              <div className="race-telemetry__timer-main">
                <span className="race-telemetry__timer-label">Lap time</span>
                <strong className="race-telemetry__timer-value">
                  {formatLapTime(lapElapsedMs)}
                </strong>
              </div>
              <div className="race-telemetry__sector-grid">
                {sectorTimes.map((sectorTime, index) => (
                  <div className="race-telemetry__sector" key={index}>
                    <span className="race-telemetry__sector-label">
                      S{index + 1}
                    </span>
                    <strong className="race-telemetry__sector-value">
                      {formatSectorTime(sectorTime)}
                    </strong>
                  </div>
                ))}
              </div>
            </section>
            <section
              className="race-telemetry__track-card"
              aria-label="Interlagos track map"
            >
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
                  d="M168.7 166.0 L172.9 182.1 L177.2 198.3 L181.6 214.4 L186.3 228.0 L191.3 235.7 L197.4 238.0 L203.1 235.6 L209.2 230.9 L217.2 229.4 L227.5 233.2 L239.2 234.9 L251.8 231.5 L262.2 223.3 L269.3 211.5 L273.4 196.9 L277.0 182.3 L280.6 167.2 L284.5 151.9 L288.6 136.1 L292.8 119.9 L296.9 104.6 L301.0 89.8 L300.8 79.6 L296.2 72.6 L287.0 68.7 L275.9 67.6 L263.9 69.7 L252.9 76.8 L243.7 87.0 L235.7 98.8 L227.6 111.1 L219.4 123.3 L211.6 134.2 L200.7 141.3 L188.7 141.3 L178.8 134.9 L173.0 123.9 L170.7 110.4 L171.5 102.9 L174.3 98.4 L179.0 97.7 L184.5 100.2 L191.5 102.9 L197.6 101.3 L200.5 95.9 L199.2 88.6 L193.8 81.3 L186.2 72.7 L180.5 62.6 L178.8 54.6 L180.2 49.0 L184.3 47.1 L188.9 49.0 L193.4 53.4 L197.5 58.9 L204.6 65.9 L215.7 68.7 L227.7 66.1 L237.6 57.8 L244.6 46.3 L251.3 34.7 L254.2 27.0 L252.3 20.7 L246.3 16.4 L237.9 13.4 L227.5 12.0 L217.3 12.9 L204.8 16.2 L192.6 21.9 L181.5 30.6 L173.1 42.0 L167.3 55.6 L163.4 70.1 L160.4 85.2 L159.0 100.7 L159.2 117.0 L161.4 133.4 L164.7 149.6 L168.9 166.4 Z"
                />
                <path
                  className="race-telemetry__sector-line race-telemetry__sector-line--s1"
                  d="M168.7 166.0 L172.9 182.1 L177.2 198.3 L181.6 214.4 L186.3 228.0 L191.3 235.7 L197.4 238.0 L203.1 235.6 L209.2 230.9 L217.2 229.4 L227.5 233.2 L239.2 234.9 L251.8 231.5 L262.2 223.3 L269.3 211.5 L273.4 196.9 L277.0 182.3 L280.6 167.2 L284.5 151.9 L288.6 136.1 L292.8 119.9 L294.2 114.6"
                />
                <path
                  className="race-telemetry__sector-line race-telemetry__sector-line--s2"
                  d="M294.2 114.6 L296.9 104.6 L301.0 89.8 L300.8 79.6 L296.2 72.6 L287.0 68.7 L275.9 67.6 L263.9 69.7 L252.9 76.8 L243.7 87.0 L235.7 98.8 L227.6 111.1 L219.4 123.3 L211.6 134.2 L200.7 141.3 L188.7 141.3 L178.8 134.9 L173.0 123.9 L170.7 110.4 L171.5 102.9 L174.3 98.4 L179.0 97.7 L184.5 100.2 L191.5 102.9 L197.6 101.3 L200.5 95.9 L199.2 88.6 L193.8 81.3 L186.2 72.7 L180.5 62.6 L178.8 54.6 L180.2 49.0 L184.3 47.1 L188.9 49.0 L193.4 53.4 L197.5 58.9 L204.6 65.9 L215.7 68.7 L227.7 66.1 L237.6 57.8 L244.6 46.3 L247.3 41.6"
                />
                <path
                  className="race-telemetry__sector-line race-telemetry__sector-line--s3"
                  d="M247.3 41.6 L251.3 34.7 L254.2 27.0 L252.3 20.7 L246.3 16.4 L237.9 13.4 L227.5 12.0 L217.3 12.9 L204.8 16.2 L192.6 21.9 L181.5 30.6 L173.1 42.0 L167.3 55.6 L163.4 70.1 L160.4 85.2 L159.0 100.7 L159.2 117.0 L161.4 133.4 L164.7 149.6 L168.9 166.4"
                />
                <line
                  className="race-telemetry__start-line"
                  x1="157.9"
                  y1="168.2"
                  x2="179.3"
                  y2="163.6"
                />
                <g className="race-telemetry__driver-marker">
                  <circle
                    className="race-telemetry__driver-dot"
                    cx="0"
                    cy="0"
                    r="12"
                  />
                  <animateMotion
                    ref={motionRef}
                    begin="indefinite"
                    dur="67.934s"
                    repeatCount="indefinite"
                    rotate="0"
                    calcMode="linear"
                    keyPoints="0;0.0181;0.0364;0.0547;0.0704;0.0803;0.0875;0.0942;0.1027;0.1115;0.1235;0.1364;0.1506;0.1651;0.1801;0.1966;0.213;0.23;0.2472;0.265;0.2832;0.3005;0.3173;0.3284;0.3376;0.3484;0.3606;0.3738;0.3882;0.4032;0.4187;0.4347;0.4508;0.4654;0.4796;0.4927;0.5055;0.5191;0.534;0.5423;0.548;0.5533;0.5599;0.568;0.5749;0.5816;0.5897;0.5997;0.6121;0.6247;0.6337;0.64;0.6449;0.6504;0.6572;0.6647;0.6756;0.6881;0.7014;0.7155;0.7303;0.7449;0.7538;0.761;0.7691;0.7788;0.7902;0.8014;0.8155;0.8302;0.8455;0.861;0.8771;0.8935;0.9103;0.9273;0.945;0.963;0.9811;1"
                    keyTimes="0;0.0127;0.0253;0.038;0.0506;0.0633;0.0759;0.0886;0.1013;0.1139;0.1266;0.1392;0.1519;0.1646;0.1772;0.1899;0.2025;0.2152;0.2278;0.2405;0.2532;0.2658;0.2785;0.2911;0.3038;0.3165;0.3291;0.3418;0.3544;0.3671;0.3797;0.3924;0.4051;0.4177;0.4304;0.443;0.4557;0.4684;0.481;0.4937;0.5063;0.519;0.5316;0.5443;0.557;0.5696;0.5823;0.5949;0.6076;0.6203;0.6329;0.6456;0.6582;0.6709;0.6835;0.6962;0.7089;0.7215;0.7342;0.7468;0.7595;0.7722;0.7848;0.7975;0.8101;0.8228;0.8354;0.8481;0.8608;0.8734;0.8861;0.8987;0.9114;0.9241;0.9367;0.9494;0.962;0.9747;0.9873;1"
                  >
                    <mpath href="#interlagos-track-path" />
                  </animateMotion>
                </g>
              </svg>
              <div className="race-telemetry__controls">
                <button
                  className="race-telemetry__control"
                  type="button"
                  aria-label={
                    isTelemetryRunning
                      ? "Pause telemetry animation"
                      : "Start telemetry animation"
                  }
                  onClick={toggleTelemetryAnimation}
                >
                  {isTelemetryRunning ? (
                    <Pause size={14} aria-hidden="true" />
                  ) : (
                    <Play size={14} aria-hidden="true" />
                  )}
                  <span>{isTelemetryRunning ? "Stop" : "Start"}</span>
                </button>
                <button
                  className="race-telemetry__control"
                  type="button"
                  aria-label="Restart telemetry from start line"
                  onClick={restartTelemetryAnimation}
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Restart</span>
                </button>
              </div>
            </section>
            <section
              className="race-telemetry__driver-row"
              aria-label="Driver, team and position"
            >
              <div className="race-telemetry__team-card">
                <Image
                  className="race-telemetry__team-logo"
                  src={ferrariLogo}
                  alt=""
                  width={46}
                  height={36}
                />
                <div className="race-telemetry__team-copy">
                  <span className="race-telemetry__team-name">Ferrari</span>
                  <strong className="race-telemetry__driver-name">
                    Lewis Hamilton
                  </strong>
                </div>
              </div>
              <div className="race-telemetry__position-card">
                <span className="race-telemetry__position-label">Pos.</span>
                <strong className="race-telemetry__position-value">1</strong>
              </div>
            </section>
            <section
              className="race-telemetry__telemetry-row"
              aria-label="Live car telemetry"
            >
              <div
                className="race-telemetry__metric-row"
                aria-label="Car telemetry metrics"
              >
                <article className="race-telemetry__metric-card race-telemetry__metric-card--throttle">
                  <span className="race-telemetry__metric-fill" />
                  <strong className="race-telemetry__metric-value">
                    Throttle
                  </strong>
                </article>
                <article className="race-telemetry__metric-card race-telemetry__metric-card--brakes">
                  <span className="race-telemetry__metric-fill" />
                  <strong className="race-telemetry__metric-value">
                    Brakes
                  </strong>
                </article>
                <article className="race-telemetry__metric-card race-telemetry__metric-card--rpm">
                  <span className="race-telemetry__metric-fill" />
                  <strong className="race-telemetry__metric-value">
                    RPM - {currentRpm.toLocaleString("en-US")}
                  </strong>
                </article>
              </div>
              <div
                className="race-telemetry__live-card"
                aria-label="Live car speed and gear"
              >
                <article className="race-telemetry__live-item">
                  <span className="race-telemetry__live-label">Live speed</span>
                  <strong className="race-telemetry__live-value">
                    {currentSpeed}km/h
                  </strong>
                </article>
                <article className="race-telemetry__live-item">
                  <span className="race-telemetry__live-label">Gear</span>
                  <strong className="race-telemetry__live-value">{currentGear}</strong>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
