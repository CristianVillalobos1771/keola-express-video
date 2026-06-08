import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";

interface PhoneMockupProps {
  screenshot: string;
  width?: number;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  screenshot,
  width = 620,
}) => {
  const frame = useCurrentFrame();

  const height = Math.round(width * 2.165);
  const borderRadius = Math.round(width * 0.115);
  const bezel = Math.round(width * 0.038);
  const innerW = width - bezel * 2;
  const innerH = height - bezel * 2;
  const islandW = Math.round(width * 0.28);
  const islandH = Math.round(width * 0.042);

  // Subtle floating animation
  const floatY = Math.sin(frame * 0.04) * 6;

  return (
    <div
      style={{
        width,
        height,
        transform: `translateY(${floatY}px)`,
        position: "relative",
        borderRadius,
        background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 50%, #222 100%)",
        border: `${bezel}px solid #1e1e1e`,
        boxShadow: [
          `0 0 0 1.5px #3a3a3a`,
          `0 ${width * 0.04}px ${width * 0.12}px rgba(0,0,0,0.85)`,
          `0 ${width * 0.08}px ${width * 0.2}px rgba(0,0,0,0.5)`,
          `inset 0 1px 0 rgba(255,255,255,0.06)`,
        ].join(", "),
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Screen */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: innerW,
          height: innerH,
          borderRadius: borderRadius - bezel,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Img
          src={staticFile(screenshot)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />

        {/* Top status bar gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "7%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Screen glare */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Dynamic Island */}
      <div
        style={{
          position: "absolute",
          top: bezel + Math.round(innerH * 0.016),
          left: "50%",
          transform: "translateX(-50%)",
          width: islandW,
          height: islandH,
          background: "#000",
          borderRadius: islandH,
          zIndex: 10,
        }}
      />

      {/* Volume buttons (left) */}
      {[0.2, 0.31, 0.43].map((topRatio, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: -bezel * 0.6,
            top: height * topRatio,
            width: bezel * 0.7,
            height: height * (i === 0 ? 0.05 : 0.1),
            background: "#2e2e2e",
            borderRadius: 2,
          }}
        />
      ))}

      {/* Power button (right) */}
      <div
        style={{
          position: "absolute",
          right: -bezel * 0.6,
          top: height * 0.27,
          width: bezel * 0.7,
          height: height * 0.13,
          background: "#2e2e2e",
          borderRadius: 2,
        }}
      />
    </div>
  );
};
