import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaRegEnvelope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingAddress } from "../../redux/order/orderSlice";

const DeliveryAddressUpdate = ({ onSave }) => {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => state.order);
  const address = currentOrder?.shipping_address;

  const [street, setStreet] = useState("");
  const [lga, setLga] = useState("");
  const [stateName, setStateName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phone, setPhone] = useState("");

  // Populate existing address on mount
  useEffect(() => {
    if (address) {
      setStreet(address.street_address || "");
      setLga(address.local_govt || "");
      setStateName(address.state || "");
      setLandmark(address.landmark || "");
      setPhone(address.phone_number || "");
    }
  }, [address]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!street || !lga || !stateName || !landmark || !phone) {
      toast.error("Please fill in all fields before proceeding.");
      return;
    }

    const addressData = {
      phone_number: phone,
      street_address: street,
      local_govt: lga,
      landmark,
      state: stateName,
      country: "Nigeria",
    };

    try {
      const res = await dispatch(updateShippingAddress(addressData));
      if (updateShippingAddress.fulfilled.match(res)) {
        toast.success("Shipping address updated successfully");
        onSave();
      } else {
        if (res.payload?.shipping_address) {
          const addressErrors = res.payload.shipping_address;
          const flatErrors = Object.entries(addressErrors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n");

          toast.error(flatErrors);
        } else {
          toast.error(res.payload?.message || "Failed to update address");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form
      className="gap-4 w-full flex flex-col bg-white px-3 py-3 rounded"
      onSubmit={handleUpdate}
    >
      <div className="flex items-center justify-between border-b border-stone-300 p-2.5 w-full">
        <div className="flex items-center gap-2 w-96">
          <div className="w-7 h-7 px-2.5 py-1.5 rounded-2xl outline outline-1 outline-offset-[-1px] outline-zinc-500 flex items-center justify-center">
            <span className="text-xs font-bold text-neutral-600">1</span>
          </div>
          <span className="text-base font-bold text-neutral-900">
            Delivery Address
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        {/* Street address */}
        <div>
          <div className="text-sm font-bold mb-3 text-zinc-800">
            Street Address
          </div>
          <div className="flex items-center border border-neutral-200 bg-neutral-50">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <GoHome className="text-primary text-xl" />
            </div>
            <input
              type="text"
              placeholder="7 Bode Thomas Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Local Government */}
        <div>
          <div className="text-sm font-bold mb-3 text-zinc-800">
            Local Government
          </div>
          <div className="flex items-center border border-neutral-200 bg-neutral-50">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <GoHome className="text-primary text-xl" />
            </div>
            <input
              type="text"
              placeholder="Surulere"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* State */}
        <div>
          <div className="text-sm font-bold mb-3 text-zinc-800">State</div>
          <div className="flex items-center border border-neutral-200 bg-neutral-50">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <GoHome className="text-primary text-xl" />
            </div>
            <input
              type="text"
              placeholder="Lagos"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Landmark */}
        <div>
          <div className="text-sm font-bold mb-3 text-zinc-800">Landmark</div>
          <div className="flex items-center border border-neutral-200 bg-neutral-50">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <GrLocation className="text-primary text-xl" />
            </div>
            <input
              type="text"
              placeholder="Close to Obalende Junction"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Phone number */}
        <div>
          <div className="text-sm font-bold mb-3 text-zinc-800">
            Phone Number
          </div>
          <div className="flex items-center border border-neutral-200 bg-neutral-50">
            <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
              <FiPhone className="text-primary text-xl" />
            </div>
            <input
              type="tel"
              placeholder="e.g. 07033417291"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Update button */}
        <button
          type="submit"
          className="w-48 h-8 px-4 bg-primary hover:opacity-90 cursor-pointer rounded inline-flex justify-center items-center gap-2 overflow-hidden text-white text-sm font-medium font-nunito"
        >
          Update Changes
        </button>
      </div>
    </form>
  );
};

export default DeliveryAddressUpdate;
