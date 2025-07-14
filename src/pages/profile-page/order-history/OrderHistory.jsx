import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderTable from "../components/OrderTable";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
  const orders = useSelector((state) => state.order.orders);
  const orderLoading = useSelector((state) => state.order.loading);

  // useEffect(() => {
  //   if (currentUser) {
  //     dispatch(fetchUserOrders())
  //       .then(() => setLoading(false))
  //       .catch(() => setLoading(false));
  //   }
  // }, [dispatch, currentUser]);

  return (
    <div className="h-fit mx-4 md:mx-10">
      <div className="border rounded-md py-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <h2 className="font-semibold text-2xl ml-10 mb-5">Order history</h2>
        <OrderTable
          orders={orders}
          loading={orderLoading || loading}
          pagination={true}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
