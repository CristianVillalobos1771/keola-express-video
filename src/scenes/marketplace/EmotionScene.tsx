import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  random,
  Easing,
} from "remotion";
import { poppins } from "../../lib/fonts";

const Particle: React.FC<{ seed: string; delay: number }> = ({ seed, delay }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const localF = frame - delay;
  if (localF < 0) return null;

  const x = random(seed + "x") * width;
  const yStart = -random(seed + "ys") * height * 0.15;
  const yEnd = yStart + height * 1.15;
  const size = random(seed + "sz") * 22 + 10;
  const initRot = random(seed + "r") * 360;
  const rotSpeed = (random(seed + "rs") - 0.5) * 12;
  const isCircle = random(seed + "sh") > 0.45;
  const color =
    random(seed + "c") > 0.55
      ? "#fff"
      : random(seed + "c2") > 0.5
      ? "#FFB74D"
      : "#FFF3E0";

  const progress = interpolate(localF, [0, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 0, 0.66, 1),
  });
  const y = interpolate(progress, [0, 1], [yStart, yEnd]);
  const opacity = interpolate(localF, [0, 8, 95, 115], [0, 0.88, 0.88, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotation = initRot + localF * rotSpeed;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: isCircle ? size : size * 0.55,
        background: color,
        borderRadius: isCircle ? "50%" : 3,
        opacity,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
};

export const MarketplaceEmotionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 6, 138, 155], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const punchSp = spring({
    fps,
    frame: frame - 8,
    config: { damping: 7, stiffness: 220, mass: 0.75 },
  });
  const mainScale = interpolate(punchSp, [0, 1], [1.38, 1.0]);
  const mainOpacity = interpolate(frame - 8, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subWords = ["Seguro.", "Simple.", "Para todos."];
  const subStart = 30;
  const subStagger = 9;

  const mainFontSize = Math.round(width * 0.062);
  const subFontSize = Math.round(width * 0.03);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, #CC8800 0%, #7A4200 30%, #280E00 65%, #0A0300 100%)",
        opacity: sceneOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: Math.round(height * 0.055),
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 45 }).map((_, i) => (
        <Particle key={i} seed={`mkt-cfti-${i}`} delay={i * 2} />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,200,50,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main punch text */}
      <div
        style={{
          transform: `scale(${mainScale})`,
          opacity: mainOpacity,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontWeight: 800,
            fontSize: mainFontSize,
            color: "#fff",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            textShadow: `0 ${Math.round(width * 0.003)}px ${Math.round(width * 0.012)}px rgba(0,0,0,0.18)`,
          }}
        >
          Tu negocio, en todas partes.
        </div>
      </div>

      {/* Sub-words */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: `0 ${Math.round(width * 0.03)}px`,
          zIndex: 2,
        }}
      >
        {subWords.map((word, i) => {
          const wSp = spring({
            fps,
            frame: frame - (subStart + i * subStagger),
            config: { damping: 13, stiffness: 100 },
          });
          const wOpacity = interpolate(
            frame - (subStart + i * subStagger),
            [0, 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const wY = interpolate(wSp, [0, 1], [45, 0]);

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: wOpacity,
                transform: `translateY(${wY}px)`,
                fontFamily: poppins,
                fontWeight: 600,
                fontSize: subFontSize,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "0.02em",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Decorative bottom line */}
      {(() => {
        const lineP = interpolate(frame - 50, [0, 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            style={{
              width: width * 0.12 * lineP,
              height: 5,
              background: "rgba(255,255,255,0.5)",
              borderRadius: 3,
              zIndex: 2,
            }}
          />
        );
      })()}
    </AbsoluteFill>
  );
};
