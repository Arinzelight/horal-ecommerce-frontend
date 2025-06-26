import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mergeCarts, getCartItems } from "../redux/cart/thunk/cartThunk";
import { clearLocalCart, loadLocalCart } from "../redux/cart/slice/cartSlice";

export const useCartMerge = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const {
    items: cartItems,
    merging,
    mergeError,
  } = useSelector((state) => state.cart);

  const prevUserInfo = useRef(null);
  const hasMerged = useRef(false);
  const isMerging = useRef(false);

  useEffect(() => {
    console.log("User info changed:", {
      prev: prevUserInfo.current,
      current: userInfo,
    });

    const handleCartMerge = async () => {
      const userJustLoggedIn = !prevUserInfo.current && userInfo;
      const userJustLoggedOut = prevUserInfo.current && !userInfo;

      if (userJustLoggedIn && !hasMerged.current && !isMerging.current) {
        try {
          console.log("Starting cart merge process...");
          isMerging.current = true;

          // Load local cart from localStorage first
          dispatch(loadLocalCart());

          // Wait a bit for the state to update
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Check if there are local cart items to merge
          const localCartData = localStorage.getItem("localCart");
          console.log("Local cart data from storage:", localCartData);

          if (localCartData && JSON.parse(localCartData)?.items?.length > 0) {
            console.log("Attempting to merge carts...");
            await dispatch(mergeCarts()).unwrap();
            console.log("Merge successful, clearing local cart");
            dispatch(clearLocalCart());
          } else {
            console.log("No local cart items to merge, fetching server cart");
            await dispatch(getCartItems()).unwrap();
          }

          hasMerged.current = true;
        } catch (error) {
          console.error("Cart merge error:", error);
          // Even if merge fails, try to get server cart
          try {
            await dispatch(getCartItems()).unwrap();
          } catch (fetchError) {
            console.error("Error fetching cart items:", fetchError);
          }
        } finally {
          console.log("Cart merge process completed");
          isMerging.current = false;
        }
      }

      if (userJustLoggedOut) {
        console.log(
          "User logged out, loading local cart and resetting merge flag"
        );
        hasMerged.current = false;
        dispatch(loadLocalCart());
      }

      prevUserInfo.current = userInfo;
    };

    handleCartMerge();
  }, [userInfo, dispatch]);

  return {
    isMerging: merging || isMerging.current,
    mergeError,
    cartItems,
    isAuthenticated: !!userInfo,
  };
};
