import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { poppins } from "../../lib/fonts";

// ─── Category chips (sub-beat A) ───────────────────────────────────────────────

const CATEGORIES = [
  { emoji: "👗", label: "Ropa" },
  { emoji: "📱", label: "Tecnología" },
  { emoji: "👟", label: "Zapatillas" },
  { emoji: "🛋️", label: "Muebles" },
];

const CategoryChip: React.FC<{
  emoji: string;
  label: string;
  startFrame: number;
  left: number;
  top: number;
  chipH: number;
}> = ({ emoji, label, startFrame, left, top, chipH }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localF = frame - startFrame;
  const sp = spring({ fps, frame: localF, config: { damping: 11, stiffness: 85 } });
  const opacity = interpolate(localF, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(sp, [0, 1], [0.4, 1.0]);

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        transform: `scale(${scale})`,
        transformOrigin: "left center",
        opacity,
        background: "rgba(254,146,0,0.14)",
        border: "3px solid rgba(254,146,0,0.45)",
        borderRadius: chipH * 0.5,
        padding: `${chipH * 0.18}px ${chipH * 0.45}px`,
        display: "flex",
        alignItems: "center",
        gap: chipH * 0.3,
        backdropFilter: "blur(8px)",
      }}
    >
      <span style={{ fontSize: chipH * 0.7, lineHeight: 1 }}>{emoji}</span>
      <span
        style={{
          fontFamily: poppins,
          fontWeight: 600,
          fontSize: chipH * 0.55,
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
};

// ─── Main scene ────────────────────────────────────────────────────────────────

export const MarketplaceDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Scene fade envelope
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [348, 365], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  // Layout constants
  const textLeft = Math.round(width * 0.04);
  const textWidth = Math.round(width * 0.42);
  const labelFontSize = Math.round(width * 0.028);
  const accentFontSize = Math.round(width * 0.036);
  const chipH = Math.round(height * 0.078);

  // ── Sub-beat A ─────────────────────────────────────────────────────────────
  const labelAOpacity = Math.min(
    interpolate(frame - 22, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [100, 118], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );
  const labelASp = spring({ fps, frame: frame - 22, config: { damping: 13, stiffness: 85 } });
  const labelAY = interpolate(labelASp, [0, 1], [40, 0]);

  // ── Sub-beat B ─────────────────────────────────────────────────────────────
  const labelBOpacity = Math.min(
    interpolate(frame - 132, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [222, 240], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );
  const labelBSp = spring({ fps, frame: frame - 132, config: { damping: 13, stiffness: 85 } });
  const labelBY = interpolate(labelBSp, [0, 1], [40, 0]);

  // Price badge pop-in
  const priceSp = spring({ fps, frame: frame - 158, config: { damping: 9, stiffness: 190 } });
  const priceScale = interpolate(priceSp, [0, 1], [0.2, 1.0]);
  const priceOpacity = interpolate(frame - 158, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shipping chip
  const shipOpacity = interpolate(frame - 178, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shipSp = spring({ fps, frame: frame - 178, config: { damping: 13, stiffness: 90 } });
  const shipY = interpolate(shipSp, [0, 1], [20, 0]);

  // ── Sub-beat C ─────────────────────────────────────────────────────────────
  const labelCOpacity = interpolate(frame - 252, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelCSp = spring({ fps, frame: frame - 252, config: { damping: 13, stiffness: 85 } });
  const labelCY = interpolate(labelCSp, [0, 1], [40, 0]);

  // Seller steps data and stagger
  const sellerSteps = [
    { icon: "📸", title: "Sube fotos", sub: "En segundos" },
    { icon: "💰", title: "Fija tu precio", sub: "Tú decides" },
    { icon: "✅", title: "Primeras ventas", sub: "Miles te ven" },
  ];
  const stepH = Math.round(height * 0.063);
  const stepGap = Math.round(height * 0.17);

  // Sales counter (right side)
  const salesRaw = interpolate(frame - 278, [0, 80], [0, 247], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });
  const salesCount = Math.floor(salesRaw);
  const counterOpacity = interpolate(frame - 270, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterSp = spring({ fps, frame: frame - 270, config: { damping: 13, stiffness: 80 } });
  const counterY = interpolate(counterSp, [0, 1], [50, 0]);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, #CC8800 0%, #7A4200 30%, #280E00 65%, #0A0300 100%)",
        opacity: sceneOpacity,
        fontFamily: poppins,
      }}
    >

      {/* ══════════ SUB-BEAT A — Explora ══════════ */}
      {frame < 128 && (
        <>
          {/* Text */}
          <div
            style={{
              position: "absolute",
              left: textLeft,
              top: height * 0.22,
              width: textWidth,
              opacity: labelAOpacity,
              transform: `translateY(${labelAY}px)`,
            }}
          >
            <div style={{ fontWeight: 300, fontSize: labelFontSize, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
              Explora y
            </div>
            <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#fff", lineHeight: 1.1 }}>
              Descubre miles
            </div>
            <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#FE9200", lineHeight: 1.1 }}>
              de productos
            </div>
          </div>

          {/* Category chips — single column so labels largos no chocan */}
          {CATEGORIES.map((cat, i) => (
            <CategoryChip
              key={cat.label}
              emoji={cat.emoji}
              label={cat.label}
              startFrame={32 + i * 8}
              left={textLeft}
              top={Math.round(height * 0.45) + i * Math.round(height * 0.135)}
              chipH={chipH}
            />
          ))}

        </>
      )}

      {/* ══════════ SUB-BEAT B — Precio perfecto ══════════ */}
      {frame >= 112 && frame < 248 && (
        <>
          {/* Text */}
          <div
            style={{
              position: "absolute",
              left: textLeft,
              top: height * 0.22,
              width: textWidth,
              opacity: labelBOpacity,
              transform: `translateY(${labelBY}px)`,
            }}
          >
            <div style={{ fontWeight: 300, fontSize: labelFontSize, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
              Encuentra
            </div>
            <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#fff", lineHeight: 1.1 }}>
              El precio
            </div>
            <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#FE9200", lineHeight: 1.1, marginBottom: height * 0.065 }}>
              perfecto
            </div>

            {/* Price badge */}
            <div
              style={{
                opacity: priceOpacity,
                transform: `scale(${priceScale})`,
                transformOrigin: "left center",
                display: "inline-flex",
                alignItems: "center",
                gap: 20,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 24,
                padding: `${Math.round(labelFontSize * 0.4)}px ${Math.round(labelFontSize * 0.65)}px`,
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: Math.round(labelFontSize * 1.05),
                  color: "#fff",
                }}
              >
                S/ 3,249
              </span>
              <span
                style={{
                  background: "#FE9200",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: Math.round(labelFontSize * 0.52),
                  borderRadius: 10,
                  padding: "6px 16px",
                }}
              >
                -26%
              </span>
            </div>

            {/* "Envío gratis" chip */}
            <div
              style={{
                marginTop: Math.round(height * 0.028),
                opacity: shipOpacity,
                transform: `translateY(${shipY}px)`,
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                background: "rgba(254,146,0,0.12)",
                border: "2px solid rgba(254,146,0,0.38)",
                borderRadius: 100,
                padding: `${Math.round(labelFontSize * 0.22)}px ${Math.round(labelFontSize * 0.5)}px`,
              }}
            >
              <span style={{ fontSize: Math.round(labelFontSize * 0.75) }}>🚚</span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: Math.round(labelFontSize * 0.62),
                  color: "#FE9200",
                }}
              >
                Envío gratis
              </span>
            </div>
          </div>

        </>
      )}

      {/* ══════════ SUB-BEAT C — Vende ══════════ */}
      {frame >= 240 && (
        <>
          {/* Text */}
          <div
            style={{
              position: "absolute",
              left: textLeft,
              top: height * 0.16,
              width: textWidth,
              opacity: labelCOpacity,
              transform: `translateY(${labelCY}px)`,
            }}
          >
            <div style={{ fontWeight: 300, fontSize: labelFontSize, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
              ¿Emprendedor? Sube tu producto y
            </div>
            <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#fff", lineHeight: 1.1 }}>
              Empieza a
            </div>
            <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#FE9200", lineHeight: 1.1 }}>
              vender hoy
            </div>
          </div>

          {/* Seller steps */}
          {sellerSteps.map((step, i) => {
            const stepSp = spring({ fps, frame: frame - (268 + i * 18), config: { damping: 12, stiffness: 80 } });
            const stepOpacity = interpolate(frame - (268 + i * 18), [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const stepX = interpolate(stepSp, [0, 1], [-80, 0]);

            return (
              <div
                key={step.title}
                style={{
                  position: "absolute",
                  left: textLeft,
                  top: height * 0.43 + i * stepGap,
                  opacity: stepOpacity,
                  transform: `translateX(${stepX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: Math.round(stepH * 0.5),
                  background: "rgba(255,255,255,0.05)",
                  border: "2px solid rgba(254,146,0,0.28)",
                  borderRadius: Math.round(stepH * 0.28),
                  padding: `${Math.round(stepH * 0.22)}px ${Math.round(stepH * 0.5)}px`,
                  width: Math.round(width * 0.38),
                }}
              >
                <div
                  style={{
                    width: Math.round(stepH * 1.1),
                    height: Math.round(stepH * 1.1),
                    borderRadius: "50%",
                    background: "rgba(254,146,0,0.18)",
                    border: "3px solid rgba(254,146,0,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: Math.round(stepH * 0.62),
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: poppins,
                      fontWeight: 700,
                      fontSize: Math.round(stepH * 0.68),
                      color: "#fff",
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontFamily: poppins,
                      fontWeight: 400,
                      fontSize: Math.round(stepH * 0.44),
                      color: "rgba(254,146,0,0.8)",
                      marginTop: 4,
                    }}
                  >
                    {step.sub}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Sales counter — right side */}
          <div
            style={{
              position: "absolute",
              left: Math.round(width * 0.57),
              top: Math.round(height * 0.28),
              opacity: counterOpacity,
              transform: `translateY(${counterY}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: Math.round(height * 0.02),
            }}
          >
            <div
              style={{
                fontFamily: poppins,
                fontWeight: 300,
                fontSize: Math.round(labelFontSize * 0.75),
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
              }}
            >
              Ventas hoy
            </div>
            <div
              style={{
                fontFamily: poppins,
                fontWeight: 800,
                fontSize: Math.round(accentFontSize * 2.8),
                color: "#FE9200",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
                textShadow: "0 0 60px rgba(254,146,0,0.5)",
              }}
            >
              {salesCount}
            </div>
            <div
              style={{
                fontFamily: poppins,
                fontWeight: 400,
                fontSize: Math.round(labelFontSize * 0.55),
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.04em",
              }}
            >
              vendedores activos
            </div>

            {/* Animated pulse ring around counter */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: Math.round(accentFontSize * 4.5),
                height: Math.round(accentFontSize * 4.5),
                borderRadius: "50%",
                border: `4px solid rgba(254,146,0,${0.12 + Math.sin(frame * 0.18) * 0.08})`,
                pointerEvents: "none",
              }}
            />
          </div>
        </>
      )}

      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 60% at 70% 50%, rgba(255,200,80,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
