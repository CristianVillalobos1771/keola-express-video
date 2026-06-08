import React from "react";
import { Img, staticFile } from "remotion";
import { poppins } from "../lib/fonts";

interface AppBadgeProps {
  type: "appstore" | "playstore" | "web";
  width?: number;
}

export const AppBadge: React.FC<AppBadgeProps> = ({ type, width = 500 }) => {
  const height = Math.round(width * 0.33);
  const radius = Math.round(width * 0.06);

  if (type === "web") {
    return (
      <div
        style={{
          width,
          height,
          background: "#fff",
          borderRadius: radius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: Math.round(width * 0.04),
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          padding: `0 ${Math.round(width * 0.06)}px`,
          boxSizing: "border-box",
        }}
      >
        {/* Globe icon */}
        <svg
          width={Math.round(height * 0.55)}
          height={Math.round(height * 0.55)}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="9.5" stroke="#1a1a1a" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="3.5" ry="9.5" stroke="#1a1a1a" strokeWidth="1.5" />
          <path d="M2.5 12h19" stroke="#1a1a1a" strokeWidth="1.5" />
          <path d="M3.5 7.5h17M3.5 16.5h17" stroke="#1a1a1a" strokeWidth="1" />
        </svg>
        <div>
          <div
            style={{
              fontFamily: poppins,
              fontWeight: 400,
              fontSize: Math.round(height * 0.22),
              color: "#666",
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            Visítanos en
          </div>
          <div
            style={{
              fontFamily: poppins,
              fontWeight: 700,
              fontSize: Math.round(height * 0.36),
              color: "#1a1a1a",
              lineHeight: 1,
            }}
          >
            keola.club
          </div>
        </div>
      </div>
    );
  }

  const src = type === "appstore" ? "AppStore.png" : "PlayStore.png";

  return (
    <div
      style={{
        width,
        height,
        background: "#fff",
        borderRadius: radius,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};
