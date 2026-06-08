import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import { poppins } from "../lib/fonts";

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Fade envelope: in 0-15, out 105-120
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  // Logo: scale + fade spring
  const logoSp = spring({
    fps,
    frame: frame - 12,
    config: { damping: 11, stiffness: 75, mass: 1.2 },
  });
  const logoScale = interpolate(logoSp, [0, 1], [0.55, 1.0]);
  const logoOpacity = interpolate(frame - 12, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline word-by-word
  const tagline = "Tu ciudad, en tus manos.";
  const taglineWords = tagline.split(" ");
  const taglineStart = 32;

  // Subtitle
  const subOpacity = interpolate(frame - 72, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subSp = spring({
    fps,
    frame: frame - 72,
    config: { damping: 14, stiffness: 80 },
  });
  const subY = interpolate(subSp, [0, 1], [35, 0]);

  // Decorative orange accent line
  const lineProgress = interpolate(frame - 55, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineWidth = width * 0.14 * lineProgress;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, #CC8800 0%, #7A4200 30%, #280E00 65%, #0A0300 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: Math.round(height * 0.038),
        opacity: sceneOpacity,
      }}
    >
      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("logo_app.png")}
          style={{
            width: Math.round(width * 0.2),
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* Orange separator */}
      <div
        style={{
          width: lineWidth,
          height: 6,
          background:
            "linear-gradient(90deg, transparent, #FE9200, transparent)",
          borderRadius: 3,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: Math.round(width * 0.013),
          width: "80%",
          textAlign: "center",
        }}
      >
        {taglineWords.map((word, i) => {
          const wStart = taglineStart + i * 5;
          const localF = frame - wStart;
          const wSp = spring({
            fps,
            frame: localF,
            config: { damping: 13, stiffness: 95 },
          });
          const wOpacity = interpolate(localF, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const wY = interpolate(wSp, [0, 1], [45, 0]);

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: wOpacity,
                transform: `translateY(${wY}px)`,
                fontFamily: poppins,
                fontWeight: 700,
                fontSize: Math.round(width * 0.044),
                color: "#fff",
                letterSpacing: "0.005em",
                textShadow: "0 2px 18px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.25)",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          fontFamily: poppins,
          fontWeight: 400,
          fontSize: Math.round(width * 0.022),
          color: "#FE9200",
          textAlign: "center",
          letterSpacing: "0.03em",
          maxWidth: "70%",
        }}
      >
        Comida de tus restaurantes favoritos — en minutos.
      </div>

      {/* Radial glow from center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,200,80,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
