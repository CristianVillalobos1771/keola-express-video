import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { poppins } from "../lib/fonts";

const LINE1_WORDS = ["¿Tienes", "antojo..."];
const LINE2_WORDS = ["...pero", "no", "quieres", "salir?"];

const RevealWord: React.FC<{
  word: string;
  startFrame: number;
  fontSize: number;
  color?: string;
}> = ({ word, startFrame, fontSize, color = "#fff" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  const progress = spring({
    fps,
    frame: localFrame,
    config: { damping: 13, stiffness: 90, mass: 1.1 },
  });
  const opacity = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [55, 0]);

  return (
    <span
      style={{
        display: "inline-block",
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: poppins,
        fontWeight: 700,
        fontSize,
        color,
        letterSpacing: "-0.01em",
        textShadow: "0 2px 18px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)",
      }}
    >
      {word}
    </span>
  );
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Ken Burns: subtle zoom-out 1.07 → 1.0
  const scale = interpolate(frame, [0, 90], [1.07, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Fade out last ~15 frames
  const opacity = interpolate(frame, [80, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fontSize = Math.round(width * 0.058);
  const gap = Math.round(height * 0.035);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, #CC8800 0%, #7A4200 30%, #280E00 65%, #0A0300 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap,
        }}
      >
        {/* Line 1 */}
        <div style={{ display: "flex", gap: Math.round(fontSize * 0.32) }}>
          {LINE1_WORDS.map((word, i) => (
            <RevealWord
              key={i}
              word={word}
              startFrame={6 + i * 7}
              fontSize={fontSize}
            />
          ))}
        </div>

        {/* Line 2 */}
        <div style={{ display: "flex", gap: Math.round(fontSize * 0.32) }}>
          {LINE2_WORDS.map((word, i) => (
            <RevealWord
              key={i}
              word={word}
              startFrame={34 + i * 7}
              fontSize={fontSize}
              color={i >= LINE2_WORDS.length - 2 ? "#FE9200" : "#fff"}
            />
          ))}
        </div>
      </div>

      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
