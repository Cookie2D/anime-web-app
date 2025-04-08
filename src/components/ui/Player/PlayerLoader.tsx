import React from "react";
import SpinLoader from "../Loaders/SpinLoader";

const PlayerLoader = () => {
  return (
    <div className="min-h-[443px] w-full grid place-content-center ">
      <SpinLoader />
    </div>
  );
};

export default PlayerLoader;
