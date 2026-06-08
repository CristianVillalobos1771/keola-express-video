import React from "react";
import { Composition } from "remotion";
import { ExpressVideo } from "./compositions/ExpressVideo";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="KeOlaExpress"
      component={ExpressVideo}
      durationInFrames={900}
      fps={30}
      width={3840}
      height={2160}
    />
  );
};
