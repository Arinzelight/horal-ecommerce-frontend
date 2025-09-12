import { FaArrowLeft } from "react-icons/fa";
import StatusBadge from "../../../sellers-dashboard/pages/shop/shop-orders/StatusBadge";

const OrderHeader = ({ order, onBack, formatDate }) => {
  return (
    <div className="">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-2.5 border-b-[1.5px] border-gray-200">
        <div className="flex justify-between  gap-12 md:gap-2 sm:gap-4">
          <div className="flex  gap-2">
            <p className="uppercase text-neutral-900 text-sm lg:text-xl font-bold font-nunito">
              Order ID:{" "}
              <span className="text-neutral-900 text-sm font-bold font-nunito">
                #HOR{String(order.id).slice(0, 4)}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status={order.status} />
          </div>
        </div>

        <div className="md:text-right">
          <p className="text-sm">
            <span className="text-gray-600">Transaction Date: </span>
            <span className="text-gray-900">
              {formatDate(order.created_at)}
            </span>
          </p>
        </div>
      </div>
      <div className="py-4 flex items-center">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderHeader;
