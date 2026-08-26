import { ImageResponse } from "next/og";

export const alt = "Silvio Cardoso portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0b0b0b",
          color: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "76px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#ff3158",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 0,
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Front-end Developer
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: 0,
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Silvio Cardoso
        </div>
        <div
          style={{
            color: "#cfcfcf",
            fontSize: 34,
            lineHeight: 1.35,
            marginTop: 28,
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          React, TypeScript, design systems and high-performance digital experiences.
        </div>
      </div>
    ),
    size,
  );
}
