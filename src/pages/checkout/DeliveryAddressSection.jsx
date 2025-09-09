import { useSelector } from "react-redux";

const DeliveryAddressSection = ({ handleEditAddress }) => {
  const { currentOrder } = useSelector((state) => state.order);
  const address = currentOrder?.address;

  return (
    <div className="gap-4 w-full flex flex-col bg-white px-3 py-3 rounded">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-300 p-2.5 w-full">
        <div className="flex items-center gap-2 w-96">
          <div className="w-7 h-7 px-2.5 py-1.5 rounded-2xl outline outline-1 outline-offset-[-1px] outline-zinc-500 flex items-center justify-center">
            <span className="text-xs font-bold text-neutral-600">1</span>
          </div>
          <span className="text-base font-bold text-neutral-900">
            Delivery Address
          </span>
        </div>
        <button
          onClick={handleEditAddress}
          className="text-xs font-bold text-primary cursor-pointer hover:opacity-90 hover:text-secondary transition-all duration-200 ease-in-out"
        >
          Edit
        </button>
      </div>

      {/* Address Info */}
      {address ? (
        <>
          <div className="text-sm font-bold text-zinc-800">Home Address</div>
          <div className="text-xs font-normal text-neutral-600 space-y-1">
            <p>
              {address.street}, {address.local_govt}, {address.state}
            </p>
            <p>
              <strong>Country</strong>
            </p>
            <p> {address.country}</p>
          </div>

          <div>
            <p className="text-sm font-bold text-zinc-800">Contact</p>
            <p className="text-neutral-600 text-xs font-normal">
              +234 {address.phone_number?.slice(-10)}
            </p>
          </div>
        </>
      ) : (
        <p className="text-xs text-red-500">No shipping address found.</p>
      )}
    </div>
  );
};

export default DeliveryAddressSection;
