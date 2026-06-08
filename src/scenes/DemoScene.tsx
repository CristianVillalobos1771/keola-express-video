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
import { MotoBike } from "../components/MotoBike";

// ─── Food chips ────────────────────────────────────────────────────────────────

const CHIPS = [
  { emoji: "🍕", label: "Pizza" },
  { emoji: "🍔", label: "Burguer" },
  { emoji: "🌮", label: "Tacos" },
  { emoji: "🍣", label: "Sushi" },
];

const FoodChip: React.FC<{
  emoji: string;
  label: string;
  startFrame: number;
  x: number;
  y: number;
  chipH: number;
}> = ({ emoji, label, startFrame, x, y, chipH }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localF = frame - startFrame;
  const sp = spring({
    fps,
    frame: localF,
    config: { damping: 11, stiffness: 85 },
  });
  const opacity = interpolate(localF, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(sp, [0, 1], [0.4, 1.0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
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

// ─── Route animation ───────────────────────────────────────────────────────────

const RouteAnimation: React.FC<{
  startFrame: number;
  x1: number;
  x2: number;
  y: number;
}> = ({ startFrame, x1, x2, y }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - startFrame, [0, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  const sceneOpacity = interpolate(frame - startFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totalLen = x2 - x1;
  const dotCount = 22;
  const iconSize = 90;

  return (
    <div style={{ position: "absolute", opacity: sceneOpacity }}>
      {/* Restaurant pin */}
      <div
        style={{
          position: "absolute",
          left: x1 - iconSize / 2,
          top: y - iconSize * 1.3,
          width: iconSize,
          height: iconSize,
          background: "#FE9200",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: iconSize * 0.52,
          boxShadow: "0 4px 16px rgba(254,146,0,0.5)",
        }}
      >
        🍽️
      </div>
      {/* Label */}
      <div
        style={{
          position: "absolute",
          left: x1 - 80,
          top: y + iconSize * 0.3,
          fontFamily: poppins,
          fontWeight: 600,
          fontSize: 52,
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          width: 200,
        }}
      >
        Restaurante
      </div>

      {/* Home pin */}
      <div
        style={{
          position: "absolute",
          left: x2 - iconSize / 2,
          top: y - iconSize * 1.3,
          width: iconSize,
          height: iconSize,
          background: progress >= 0.92 ? "#FE9200" : "#3a3a3a",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: iconSize * 0.52,
          boxShadow: progress >= 0.92 ? "0 4px 16px rgba(254,146,0,0.5)" : "none",
        }}
      >
        🏠
      </div>
      <div
        style={{
          position: "absolute",
          left: x2 - 50,
          top: y + iconSize * 0.3,
          fontFamily: poppins,
          fontWeight: 600,
          fontSize: 52,
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          width: 160,
        }}
      >
        Tú
      </div>

      {/* Dot path */}
      <svg
        style={{ position: "absolute", left: x1, top: y - 8 }}
        width={totalLen}
        height={18}
      >
        {Array.from({ length: dotCount }).map((_, i) => {
          const dotX = (i / (dotCount - 1)) * totalLen;
          const visible = dotX <= totalLen * progress;
          return (
            <circle
              key={i}
              cx={dotX}
              cy={9}
              r={visible ? 7 : 5}
              fill={visible ? "#FE9200" : "rgba(255,255,255,0.18)"}
            />
          );
        })}
      </svg>
    </div>
  );
};

// ─── Main scene ────────────────────────────────────────────────────────────────

export const DemoScene: React.FC = () => {
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

  // Text column (left)
  const textLeft = Math.round(width * 0.04);
  const textWidth = Math.round(width * 0.43);
  const labelFontSize = Math.round(width * 0.028);
  const accentFontSize = Math.round(width * 0.036);
  const chipH = Math.round(height * 0.1);

  // ── Sub-beat A labels ─────────────────────────────────────────────────────
  const labelAOpacity =
    Math.min(
      interpolate(frame - 22, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      interpolate(frame, [100, 118], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    );
  const labelASp = spring({ fps, frame: frame - 22, config: { damping: 13, stiffness: 85 } });
  const labelAY = interpolate(labelASp, [0, 1], [40, 0]);

  // ── Sub-beat B labels + counter ───────────────────────────────────────────
  const labelBOpacity =
    Math.min(
      interpolate(frame - 132, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      interpolate(frame, [222, 240], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    );
  const labelBSp = spring({ fps, frame: frame - 132, config: { damping: 13, stiffness: 85 } });
  const labelBY = interpolate(labelBSp, [0, 1], [40, 0]);

  // Counter goes from 0:00 to 0:58 then check
  const counterRaw = interpolate(frame - 145, [0, 55], [0, 58], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });
  const counterSecs = Math.floor(counterRaw);
  const isComplete = frame >= 205;

  const checkSp = spring({ fps, frame: frame - 206, config: { damping: 9, stiffness: 180 } });
  const checkScale = interpolate(checkSp, [0, 1], [0.2, 1.0]);

  // ── Sub-beat C labels ─────────────────────────────────────────────────────
  const labelCOpacity = interpolate(frame - 252, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelCSp = spring({ fps, frame: frame - 252, config: { damping: 13, stiffness: 85 } });
  const labelCY = interpolate(labelCSp, [0, 1], [40, 0]);

  // Route positions
  const routeX1 = Math.round(width * 0.06);
  const routeX2 = Math.round(width * 0.52);
  const routeY = Math.round(height * 0.82);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, #CC8800 0%, #7A4200 30%, #280E00 65%, #0A0300 100%)",
        opacity: sceneOpacity,
        fontFamily: poppins,
      }}
    >
      {/* ────────── SUB-BEAT A ────────── */}
      {frame < 128 && (
        <>
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
              Elige tu
            </div>
            <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#FE9200", lineHeight: 1.1 }}>
              restaurante
            </div>
          </div>

          {CHIPS.map((chip, i) => (
            <FoodChip
              key={chip.label}
              emoji={chip.emoji}
              label={chip.label}
              startFrame={32 + i * 8}
              x={textLeft + (i % 2) * (textWidth * 0.5 + 20)}
              y={height * 0.55 + Math.floor(i / 2) * (chipH * 1.5)}
              chipH={chipH}
            />
          ))}
        </>
      )}

      {/* ────────── SUB-BEAT B ────────── */}
      {frame >= 112 && frame < 248 && (
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
            Confirma y
          </div>
          <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#fff", lineHeight: 1.1 }}>
            Pide en
          </div>
          <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#FE9200", lineHeight: 1.1, marginBottom: height * 0.06 }}>
            segundos
          </div>

          {!isComplete ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 24,
                padding: `${labelFontSize * 0.5}px ${labelFontSize * 0.8}px`,
                width: "fit-content",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#FE9200",
                  opacity: Math.sin(frame * 0.3) * 0.4 + 0.6,
                }}
              />
              <span style={{ fontWeight: 600, fontSize: Math.round(labelFontSize * 0.9), color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                {`0:${String(counterSecs).padStart(2, "0")}`}
              </span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                transform: `scale(${checkScale})`,
                transformOrigin: "left center",
              }}
            >
              <div
                style={{
                  width: Math.round(labelFontSize * 1.3),
                  height: Math.round(labelFontSize * 1.3),
                  borderRadius: "50%",
                  background: "#FE9200",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width={Math.round(labelFontSize * 0.75)}
                  height={Math.round(labelFontSize * 0.75)}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 13l5 5L20 6"
                    stroke="#fff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: Math.round(labelFontSize * 0.85), color: "#fff" }}>
                  Pedido realizado ✓
                </div>
                <div style={{ fontWeight: 400, fontSize: Math.round(labelFontSize * 0.55), color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                  En camino hacia ti
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ────────── SUB-BEAT C ────────── */}
      {frame >= 240 && (
        <>
          <div
            style={{
              position: "absolute",
              left: textLeft,
              top: height * 0.22,
              width: textWidth,
              opacity: labelCOpacity,
              transform: `translateY(${labelCY}px)`,
            }}
          >
            <div style={{ fontWeight: 300, fontSize: labelFontSize, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
              Tu motorizado
            </div>
            <div style={{ fontWeight: 800, fontSize: accentFontSize, color: "#fff", lineHeight: 1.1 }}>
              Sale hacia ti
            </div>
            <div style={{ fontWeight: 400, fontSize: Math.round(labelFontSize * 0.6), color: "#FE9200", marginTop: 18, letterSpacing: "0.04em" }}>
              Tiempo estimado: 20 min
            </div>
          </div>

          <RouteAnimation
            startFrame={262}
            x1={routeX1}
            x2={routeX2}
            y={routeY}
          />

          <MotoBike
            startFrame={258}
            durationFrames={95}
            fromX={-520}
            toX={Math.round(width * 0.44)}
            topPx={Math.round(height * 0.62)}
            scale={width / 3840}
          />
        </>
      )}

      {/* Subtle background gradient glow */}
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
