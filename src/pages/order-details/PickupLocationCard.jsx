import React from "react";

const PickupLocationCard = () => {
  return (
    <div className="p-2 bg-white rounded flex flex-col gap-2 overflow-hidden">
      {/* Header */}
      <div className="p-2.5 border-b border-stone-300 w-full">
        <h2 className="text-neutral-900 text-lg font-bold">Pickup Location</h2>
      </div>

      {/* Body */}
      <div className="p-2 w-full ">
        <div className="max-w-md">
          <p className="text-sm font-bold text-neutral-600">
            Horal Pickup Point
            <span className="font-normal text-zinc-500"> – Ikeja</span>
          </p>
          <p className="text-sm">
            <span className="font-bold text-neutral-600">No. </span>
            <span className="font-normal text-zinc-500">
              10 Allen Avenue, Ikeja, Lagos
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold text-neutral-600">Open: </span>
            <span className="font-normal text-zinc-500">
              9AM – 6PM (Mon–Sat)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PickupLocationCard;
