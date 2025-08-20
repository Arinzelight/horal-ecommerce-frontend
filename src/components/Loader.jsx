import React from "react";
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <FadeLoader color="#4A90E2" size={30} speedMultiplier={1} width={5} />
    </div>
  );
};

export default Loader;
