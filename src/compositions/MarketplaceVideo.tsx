import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { MarketplaceHookScene } from "../scenes/marketplace/HookScene";
import { MarketplaceRevealScene } from "../scenes/marketplace/RevealScene";
import { MarketplaceDemoScene } from "../scenes/marketplace/DemoScene";
import { MarketplaceEmotionScene } from "../scenes/marketplace/EmotionScene";
import { MarketplaceCTAScene } from "../scenes/marketplace/CTAScene";

/**
 * Scene timing (absolute frames @ 30fps):
 *
 *   Scene 1 – Hook      :   0 –  105  (3.5s, includes 15f fade-out overlap)
 *   Scene 2 – Reveal    :  90 –  225  (4.5s, 15f overlap on each side)
 *   Scene 3 – Demo      : 210 –  585  (12.5s, 15f overlap on each side)
 *   Scene 4 – Emotion   : 570 –  735  (5.5s, 15f overlap on each side)
 *   Scene 5 – CTA       : 720 –  900  (6s)
 */

const FADE = 15;

const S1 = 0;
const S2 = 90;
const S3 = 210;
const S4 = 570;
const S5 = 720;
const END = 900;

export const MarketplaceVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, #CC8800 0%, #7A4200 30%, #280E00 65%, #0A0300 100%)",
      }}
    >
      {/* Scene 1 — Hook (frames 0–105) */}
      <Sequence from={S1} durationInFrames={S2 + FADE}>
        <MarketplaceHookScene />
      </Sequence>

      {/* Scene 2 — Reveal (frames 90–225) */}
      <Sequence from={S2} durationInFrames={S3 - S2 + FADE}>
        <MarketplaceRevealScene />
      </Sequence>

      {/* Scene 3 — Demo (frames 210–585) */}
      <Sequence from={S3} durationInFrames={S4 - S3 + FADE}>
        <MarketplaceDemoScene />
      </Sequence>

      {/* Scene 4 — Emotion (frames 570–735) */}
      <Sequence from={S4} durationInFrames={S5 - S4 + FADE}>
        <MarketplaceEmotionScene />
      </Sequence>

      {/* Scene 5 — CTA (frames 720–900) */}
      <Sequence from={S5} durationInFrames={END - S5}>
        <MarketplaceCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
