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
import { poppins } from "../../lib/fonts";

export const MarketplaceRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  // Logo spring
  const logoSp = spring({ fps, frame: frame - 12, config: { damping: 11, stiffness: 75, mass: 1.2 } });
  const logoScale = interpolate(logoSp, [0, 1], [0.55, 1.0]);
  const logoOpacity = interpolate(frame - 12, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "MARKETPLACE" pill badge
  const badgeSp = spring({ fps, frame: frame - 30, config: { damping: 10, stiffness: 110 } });
  const badgeScale = interpolate(badgeSp, [0, 1], [0.55, 1.0]);
  const badgeOpacity = interpolate(frame - 30, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Orange separator line
  const lineProgress = interpolate(frame - 55, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline words
  const taglineWords = "Compra y vende sin complicaciones.".split(" ");
  const taglineStart = 42;

  // Subtitle
  const subSp = spring({ fps, frame: frame - 78, config: { damping: 14, stiffness: 80 } });
  const subOpacity = interpolate(frame - 78, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(subSp, [0, 1], [35, 0]);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, #CC8800 0%, #7A4200 30%, #280E00 65%, #0A0300 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: Math.round(height * 0.032),
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
          style={{ width: Math.round(width * 0.2), height: "auto", display: "block" }}
        />
      </div>

      {/* "Marketplace" badge pill */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          background: "rgba(254,146,0,0.15)",
          border: "3px solid rgba(254,146,0,0.55)",
          borderRadius: 100,
          padding: `${Math.round(height * 0.011)}px ${Math.round(width * 0.028)}px`,
          fontFamily: poppins,
          fontWeight: 700,
          fontSize: Math.round(width * 0.02),
          color: "#FE9200",
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
        }}
      >
        Marketplace
      </div>

      {/* Orange separator */}
      <div
        style={{
          width: width * 0.14 * lineProgress,
          height: 6,
          background: "linear-gradient(90deg, transparent, #FE9200, transparent)",
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
          const wSp = spring({ fps, frame: localF, config: { damping: 13, stiffness: 95 } });
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
        Ropa, tecnología, muebles y más — en una sola app.
      </div>

      {/* Radial glow */}
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
