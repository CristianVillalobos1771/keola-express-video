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
import { AppBadge } from "../../components/AppBadge";

export const MarketplaceCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const sceneFade = interpolate(frame, [155, 175], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo
  const logoSp = spring({ fps, frame: frame - 22, config: { damping: 13, stiffness: 75, mass: 1.1 } });
  const logoOpacity = interpolate(frame - 22, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(logoSp, [0, 1], [0.75, 1.0]);
  const logoY = interpolate(logoSp, [0, 1], [50, 0]);

  // "Marketplace" badge
  const badgeSp = spring({ fps, frame: frame - 35, config: { damping: 12, stiffness: 100 } });
  const badgeOpacity = interpolate(frame - 35, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgeScale = interpolate(badgeSp, [0, 1], [0.6, 1.0]);

  // "Descárgala gratis"
  const textSp = spring({ fps, frame: frame - 50, config: { damping: 14, stiffness: 80 } });
  const textOpacity = interpolate(frame - 50, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textSp, [0, 1], [35, 0]);

  // Orange underline
  const lineP = interpolate(frame - 62, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badges
  const badges: Array<"appstore" | "playstore" | "web"> = ["appstore", "playstore", "web"];
  const badgeW = Math.round(width * 0.2);

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
        opacity: sceneFade,
        fontFamily: poppins,
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(254,146,0,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${logoY}px)`,
          opacity: logoOpacity,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("logo_app.png")}
          style={{ width: Math.round(width * 0.22), height: "auto", display: "block" }}
        />
      </div>

      {/* "Marketplace" pill */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          background: "rgba(254,146,0,0.15)",
          border: "3px solid rgba(254,146,0,0.5)",
          borderRadius: 100,
          padding: `${Math.round(height * 0.01)}px ${Math.round(width * 0.025)}px`,
          fontWeight: 700,
          fontSize: Math.round(width * 0.018),
          color: "#FE9200",
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
        }}
      >
        Marketplace
      </div>

      {/* "Descárgala gratis" */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: Math.round(width * 0.028),
            color: "#fff",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          Descarga la app gratis
        </div>
        <div
          style={{
            width: Math.round(width * 0.1) * lineP,
            height: 5,
            background: "linear-gradient(90deg, transparent, #FE9200, transparent)",
            borderRadius: 3,
          }}
        />
      </div>

      {/* App Store Badges */}
      <div
        style={{
          display: "flex",
          gap: Math.round(width * 0.022),
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {badges.map((type, i) => {
          const bSp = spring({
            fps,
            frame: frame - (72 + i * 10),
            config: { damping: 13, stiffness: 80 },
          });
          const bOpacity = interpolate(frame - (72 + i * 10), [0, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const bY = interpolate(bSp, [0, 1], [55, 0]);

          return (
            <div
              key={type}
              style={{ opacity: bOpacity, transform: `translateY(${bY}px)` }}
            >
              <AppBadge type={type} width={badgeW} />
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      {(() => {
        const t = interpolate(frame - 115, [0, 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            style={{
              opacity: t,
              fontWeight: 300,
              fontSize: Math.round(width * 0.016),
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
            }}
          >
            Disponible ya · iOS & Android
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
