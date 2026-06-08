import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { poppins } from "../lib/fonts";

interface AnimatedTextProps {
  text: string;
  startFrame?: number;
  stagger?: number;
  style?: React.CSSProperties;
  splitBy?: "words" | "chars";
  from?: "bottom" | "top";
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  startFrame = 0,
  stagger = 6,
  style,
  splitBy = "words",
  from = "bottom",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const units = splitBy === "words" ? text.split(" ") : text.split("");

  return (
    <span
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        gap: splitBy === "words" ? "0.28em" : "0",
        fontFamily: poppins,
        ...style,
      }}
    >
      {units.map((unit, i) => {
        const localFrame = frame - startFrame - i * stagger;
        const progress = spring({
          fps,
          frame: localFrame,
          config: { damping: 14, stiffness: 100, mass: 1 },
        });
        const opacity = interpolate(localFrame, [0, 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const translateY =
          from === "bottom"
            ? interpolate(progress, [0, 1], [50, 0])
            : interpolate(progress, [0, 1], [-50, 0]);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${translateY}px)`,
              whiteSpace: "pre",
            }}
          >
            {unit}
            {splitBy === "words" ? "" : ""}
          </span>
        );
      })}
    </span>
  );
};
