import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";

export default function AddressUpdate() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { userInfo } = useSelector((state) => state.user);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressFormData, setAddressFormData] = useState({});

  const dispatch = useDispatch();

  console.log(currentUser);

  const handleAddressChange = (e) => {
    setAddressFormData({
      ...addressFormData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    //  dispatch address update here
    console.log("Address Form Data:", addressFormData);
  };

  return (
    <>
      <div className="border border-gray-300 rounded-md md:w-[870px] w-full mr-8">
        <h1 className="border-b border-gray-300 px-5 py-4 font-semibold text-[1rem]">
          Billing Address
        </h1>
        <div className="p-5">
          <form
            onSubmit={handleAddressSubmit}
            className=" w-full flex flex-col gap-3"
          >
            <div className="flex sm:flex-row flex-col  justify-between gap-2 ">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="text">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Jamie"
                  autoComplete="off"
                  // defaultValue={
                  //   currentUser?.firstName || userInfo?.firstName
                  // }
                  onChange={handleAddressChange}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="text">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Abdulfatai"
                  defaultValue={currentUser?.lastName || userInfo?.lastName}
                  autoComplete="off"
                  onChange={handleAddressChange}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="text">Company Name(optional)</label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="FarmHub"
                  autoComplete="off"
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <label htmlFor="text">Street Address</label>
            <input
              type="text"
              id="street"
              placeholder="4140 Par|"
              autoComplete="off"
              defaultValue={
                currentUser?.address?.street ||
                currentUser?.user?.address?.street
              }
              onChange={handleAddressChange}
            />
            <div className="flex sm:flex-row flex-col justify-between gap-2 ">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="text">Country / Region</label>
                <input
                  type="text"
                  id="country"
                  placeholder="Nigeria"
                  autoComplete="off"
                  defaultValue={
                    currentUser?.address?.country ||
                    currentUser?.user?.address?.country
                  }
                  onChange={handleAddressChange}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="text">State</label>
                <input
                  type="text"
                  id="state"
                  placeholder="Lagos"
                  autoComplete="off"
                  defaultValue={
                    currentUser?.address?.state ||
                    currentUser?.user?.address?.state
                  }
                  onChange={handleAddressChange}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="">Zip Code</label>
                <input
                  type="text"
                  id="postalCode"
                  placeholder="20033"
                  autoComplete="off"
                  defaultValue={
                    currentUser?.address?.postalCode ||
                    currentUser?.user?.address?.postalCode
                  }
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-between gap-2 ">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  defaultValue={currentUser?.email || userInfo?.email}
                  placeholder="JohnDoe@gmail.com"
                  autoComplete="off"
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="tel">Phone</label>
                <input
                  type="text"
                  defaultValue={currentUser?.phone || userInfo?.phone}
                  placeholder="(+234) 701-234-5678"
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              {" "}
              <button
                type="submit"
                className="bg-primary rounded-[1rem] hover:opacity-90  text-xs py-2 px-5 mt-4 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    Updating... <ClipLoader color="#fff" top={1} size={15} />
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
