import React from "react";
import { Video, staticFile, useCurrentFrame } from "remotion";

interface PhoneVideoProps {
  width?: number;
  startFrom?: number;
}

export const PhoneVideo: React.FC<PhoneVideoProps> = ({
  width = 620,
  startFrom = 0,
}) => {
  const frame = useCurrentFrame();

  // Same floating animation as PhoneMockup
  const floatY = Math.sin(frame * 0.04) * 6;

  return (
    <div
      style={{
        width,
        transform: `translateY(${floatY}px)`,
        flexShrink: 0,
      }}
    >
      <Video
        src={staticFile("express1.mp4")}
        startFrom={startFrom}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
};
