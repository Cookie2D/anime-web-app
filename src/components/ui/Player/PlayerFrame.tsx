import React from "react";

interface Props {
  src: string;
}
const PlayerFrame: React.FC<Props> = ({ src }) => {
  return <iframe src={src} className="w-full aspect-video" />;
};

export default PlayerFrame;
