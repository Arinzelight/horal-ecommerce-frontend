import React from "react";
import Loader from "./Loader";
// import logo from "../../assets/images/";

const InitialLoader = () => {
  return (
    <div className="grid place-items-center w-full h-screen">
      <div className="flex justify-center items-center w-[12%] ">
        {/* <img
          src={logo}
          alt="logo"
          className="object-contain w-full md:w-1/2 lg:w-full"
        /> */}
        {/* <p className="text-primary font-bold  text-3xl">Horal</p> */}
        <Loader />
      </div>
    </div>
  );
};

export default InitialLoader;
