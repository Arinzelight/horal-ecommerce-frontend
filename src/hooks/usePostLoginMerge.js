import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, mergeWishlist } from "../redux/wishlist/wishlistThunk";
import { clearWishlist } from "../redux/wishlist/wishlistSlice";
import { mergeCart, fetchCart } from "../redux/cart/thunk/cartThunk"; 
import {clearCart} from "../redux/cart/slice/cartSlice"

const usePostLoginMerge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { data: wishlistItems } = useSelector((state) => state.wishlist);
  const {data : cartItems} = useSelector((state) => state.cart)
  useEffect(() => {
    if (userInfo) {
      const mergeAndFetchAll = async () => {
        try {
          // Merge Wishlist
          if (wishlistItems?.id) {
            await dispatch(mergeWishlist({ product_id: wishlistItems.id }));
          }

          await dispatch(fetchWishlist());
          dispatch(clearWishlist());

          // Add Cart Merge Here
          if (cartItems?.id) {
            await dispatch(mergeCart({ product_id: cartItems.id }));
            console.log("Cart merge successful", cartItems);
            await dispatch(fetchCart());
            dispatch(clearCart());
          }

          navigate("/");
        } catch (err) {
          console.error("Post-login merge failed:", err);
          await dispatch(fetchWishlist());
          navigate("/");
        }
      };

      mergeAndFetchAll();
    }
  }, [userInfo, wishlistItems, cartItems, dispatch, navigate]);
};

export default usePostLoginMerge;
