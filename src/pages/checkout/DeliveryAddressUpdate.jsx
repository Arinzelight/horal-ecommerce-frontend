import { useState, useEffect } from "react";
import { toast } from "../../components/toast";
import { FiPhone } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingAddress } from "../../redux/order/orderSlice";

import * as nigerianStates from "nigerian-states-and-lgas";

const DeliveryAddressUpdate = ({ onSave }) => {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => state.order);
  const address = currentOrder?.address;

  const [street, setStreet] = useState("");
  const [lga, setLga] = useState("");
  const [stateName, setStateName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phone, setPhone] = useState("");
  const [lgas, setLgas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Populate existing address on mount
  useEffect(() => {
    if (address) {
      setStreet(address.street || "");
      setLga(address.local_govt || "");
      setStateName(address.state || "");
      setLandmark(address.landmark || "");
      setPhone(address.phone_number || "");

      if (address.state) {
        const stateLgas = nigerianStates.lgas(address.state);
        setLgas(stateLgas || []);
      }
    }
  }, [address]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setStateName(selectedState);
    setLga("");
    const stateLgas = nigerianStates.lgas(selectedState);
    setLgas(stateLgas || []);
  };

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
      setLoading(true);
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
    } finally {
      setLoading(false);
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

        {/* State */}
        <div>
          <div className="text-sm font-bold mb-3 text-zinc-800">State</div>
          <select
            value={stateName}
            onChange={handleStateChange}
            className="w-full h-14 px-4 border border-neutral-200 bg-neutral-50 focus:outline-none"
          >
            <option value="">Select State</option>
            {nigerianStates.states().map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Local Government */}
        <div>
          <div className="text-sm font-bold mb-3 text-zinc-800">
            Local Government
          </div>
          <select
            value={lga}
            onChange={(e) => setLga(e.target.value)}
            className="w-full h-14 px-4 border border-neutral-200 bg-neutral-50 focus:outline-none"
            disabled={!lgas.length}
          >
            <option value="">Select Local Government</option>
            {lgas.map((lgaName) => (
              <option key={lgaName} value={lgaName}>
                {lgaName}
              </option>
            ))}
          </select>
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
          disabled={loading}
          className={`w-48 h-8 bg-primary px-4 rounded inline-flex justify-center items-center gap-2 overflow-hidden text-white text-sm font-medium font-nunito ${
            loading
              ? "cursor-not-allowed opacity-70"
              : " hover:opacity-90 cursor-pointer"
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
              Updating...
            </>
          ) : (
            "Update Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default DeliveryAddressUpdate;
