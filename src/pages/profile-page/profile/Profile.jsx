import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderTable from "../components/OrderTable";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
  const updatedUserData = useSelector((state) => state.user.currentUser?.user);
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
    <main className="">
      <div className="flex flex-col md:flex-row gap-5 items-center ">
        {/* Profile info */}
        <div className="h-[300px] w-full md:w-[580px] flex flex-col items-center md:items-center gap-2 justify-center py-10 pl-8 shadow rounded-lg">
          <img
            src={
              updatedUserData?.pictureUrl ||
              currentUser?.pictureUrl ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="user profile"
            className="rounded-full w-[150px] h-[150px] object-cover"
          />
          <h2 className="font-bold">{currentUser?.username || "Username"}</h2>
          <p className="text-gray-400">{currentUser?.role || "Role"}</p>
          <Link
            to="/profile-page/settings"
            className="text-primary font-semibold"
          >
            Edit Profile
          </Link>
        </div>

        {/* Billing Address */}
        <div className="h-[300px] w-full md:w-[310px] flex flex-col items-start gap-2 py-10 pl-8 border rounded-lg">
          <h2 className="text-gray-400">BILLING ADDRESS</h2>
          <h2 className="font-bold">{currentUser?.fullName || "Full Name"}</h2>
          <p>{currentUser?.address?.street || "Street"}</p>
          <p className="mt-10">{currentUser?.email || "Email"}</p>
          <p>{currentUser?.phone || "Phone"}</p>
          <Link
            to="/profile-page/settings"
            className="text-primary font-semibold"
          >
            Edit Address
          </Link>
        </div>
      </div>

      {/* Order history */}
      <div className="w-full h-[400px] border rounded-lg my-10 overflow-x-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl ml-10 my-6">
            Recent Order History
          </h2>
          <Link
            to="/orders"
            className="text-primary text-center mr-5 smmd:mr-14"
          >
            View all
          </Link>
        </div>
        <OrderTable
          orders={orders}
          loading={orderLoading || loading}
          pagination={false}
        />
      </div>
    </main>
  );
};

export default Profile;
