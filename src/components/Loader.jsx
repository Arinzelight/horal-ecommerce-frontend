import React from "react";
import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <MoonLoader color="#4A90E2" size={60} speedMultiplier={1} />
    </div>
  );
};

export default Loader;
