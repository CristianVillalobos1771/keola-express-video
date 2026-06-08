import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface MotoBikeProps {
  startFrame?: number;
  durationFrames?: number;
  fromX?: number;
  toX?: number;
  topPx?: number;
  scale?: number;
}

export const MotoBike: React.FC<MotoBikeProps> = ({
  startFrame = 0,
  durationFrames = 100,
  fromX = -500,
  toX = 2200,
  topPx = 1400,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const x = interpolate(localFrame, [0, durationFrames], [fromX, toX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  const bounce = Math.sin(localFrame * 0.35) * 5 * scale;

  const opacity = interpolate(localFrame, [0, 10, durationFrames - 15, durationFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Wheel rotation
  const wheelRot = localFrame * 8;

  const W = 640 * scale;
  const H = 400 * scale;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: topPx,
        opacity,
        transform: `translateY(${bounce}px)`,
      }}
    >
      <svg
        width={W}
        height={H}
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === BACK WHEEL === */}
        <g transform={`rotate(${wheelRot}, 72, 148)`}>
          <circle cx="72" cy="148" r="44" fill="#111" />
          <circle cx="72" cy="148" r="34" fill="#222" />
          {/* spokes */}
          {[0, 45, 90, 135].map((angle) => (
            <line
              key={angle}
              x1={72 + Math.cos((angle * Math.PI) / 180) * 34}
              y1={148 + Math.sin((angle * Math.PI) / 180) * 34}
              x2={72 - Math.cos((angle * Math.PI) / 180) * 34}
              y2={148 - Math.sin((angle * Math.PI) / 180) * 34}
              stroke="#333"
              strokeWidth="3"
            />
          ))}
          <circle cx="72" cy="148" r="10" fill="#FE9200" />
          <circle cx="72" cy="148" r="5" fill="#111" />
        </g>
        <circle cx="72" cy="148" r="45" stroke="#FE9200" strokeWidth="4" fill="none" />

        {/* === FRONT WHEEL === */}
        <g transform={`rotate(${wheelRot}, 248, 148)`}>
          <circle cx="248" cy="148" r="44" fill="#111" />
          <circle cx="248" cy="148" r="34" fill="#222" />
          {[0, 45, 90, 135].map((angle) => (
            <line
              key={angle}
              x1={248 + Math.cos((angle * Math.PI) / 180) * 34}
              y1={148 + Math.sin((angle * Math.PI) / 180) * 34}
              x2={248 - Math.cos((angle * Math.PI) / 180) * 34}
              y2={148 - Math.sin((angle * Math.PI) / 180) * 34}
              stroke="#333"
              strokeWidth="3"
            />
          ))}
          <circle cx="248" cy="148" r="10" fill="#FE9200" />
          <circle cx="248" cy="148" r="5" fill="#111" />
        </g>
        <circle cx="248" cy="148" r="45" stroke="#FE9200" strokeWidth="4" fill="none" />

        {/* === FRAME === */}
        {/* Main chassis */}
        <path
          d="M72 148 L95 95 L190 90 L230 130 L248 148"
          stroke="#FE9200"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Under frame */}
        <path
          d="M95 95 L105 148 L72 148"
          stroke="#FFA726"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M190 90 L200 148 L248 148"
          stroke="#FFA726"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Front fork */}
        <line x1="210" y1="95" x2="248" y2="132" stroke="#888" strokeWidth="7" strokeLinecap="round" />
        <line x1="218" y1="90" x2="254" y2="128" stroke="#666" strokeWidth="5" strokeLinecap="round" />

        {/* Handlebar */}
        <path d="M218 88 L230 68 L252 68" stroke="#555" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="252" cy="68" r="8" fill="#333" />

        {/* Engine block */}
        <rect x="115" y="105" width="80" height="46" rx="10" fill="#FE9200" />
        <rect x="128" y="112" width="20" height="12" rx="4" fill="#cc7400" />
        <rect x="158" y="112" width="20" height="12" rx="4" fill="#cc7400" />

        {/* Seat */}
        <path d="M115 88 Q160 78 200 90" stroke="#cc7400" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M115 88 Q160 80 200 90" stroke="#E08000" strokeWidth="10" strokeLinecap="round" fill="none" />

        {/* === DELIVERY BOX === */}
        <rect x="68" y="44" width="72" height="52" rx="7" fill="#FFA726" />
        <rect x="68" y="44" width="72" height="52" rx="7" stroke="#cc7400" strokeWidth="3" fill="none" />
        {/* box cross strap */}
        <line x1="104" y1="44" x2="104" y2="96" stroke="#cc7400" strokeWidth="2.5" />
        <line x1="68" y1="70" x2="140" y2="70" stroke="#cc7400" strokeWidth="2.5" />
        {/* "K" on box */}
        <text x="88" y="67" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="#fff" textAnchor="middle">K</text>

        {/* === RIDER === */}
        {/* Body */}
        <path d="M155 88 Q175 75 190 88 L185 118 Q170 128 155 118 Z" fill="#222" />
        {/* Jacket detail */}
        <path d="M165 88 L165 118" stroke="#FE9200" strokeWidth="2.5" />
        {/* Arms */}
        <path d="M155 95 L140 110 L155 115" stroke="#222" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M190 92 L220 82 L226 68" stroke="#222" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Legs */}
        <path d="M160 118 L145 145 L165 145" stroke="#222" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M178 118 L195 140 L215 140" stroke="#222" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Helmet */}
        <circle cx="172" cy="62" r="26" fill="#FE9200" />
        {/* Helmet visor */}
        <path d="M150 68 Q172 80 194 68" fill="#1a1a1a" />
        <path d="M156 62 Q172 72 188 62" fill="#00aaff" opacity="0.6" />
        {/* Helmet shine */}
        <path d="M158 48 Q165 44 172 46" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* === SPEED LINES === */}
        {[-15, 5, 22, 38].map((yOff, i) => (
          <line
            key={i}
            x1={-10 - i * 18}
            y1={130 + yOff}
            x2={18 - i * 10}
            y2={130 + yOff}
            stroke="rgba(254,146,0,0.35)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ))}

        {/* === EXHAUST === */}
        <path d="M72 148 Q55 155 30 148" stroke="#888" strokeWidth="6" fill="none" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={20 - i * 18}
            cy={144 - i * 8}
            r={5 + i * 4}
            fill={`rgba(180,180,180,${0.18 - i * 0.04})`}
          />
        ))}
      </svg>
    </div>
  );
};
