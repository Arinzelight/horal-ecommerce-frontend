import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../../redux/wishlist/wishlistThunk";
import { toast } from "../../../../components/toast";

export const useProductWishlist = (productId) => {
  const dispatch = useDispatch();
  const { data: wishlistData } = useSelector((state) => state.wishlist);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const isWishlisted = wishlistData?.items?.some(
    (item) => item.product?.id === productId
  );

  const handleWishlistAction = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsWishlistLoading(true);
      if (isWishlisted) {
        const wishlistItem = wishlistData.items.find(
          (item) => item.product?.id === productId
        );
        if (wishlistItem) {
          await dispatch(
            removeFromWishlist({ item_id: wishlistItem.id })
          ).unwrap();
          toast.success("Removed from wishlist");
        }
      } else {
        await dispatch(addToWishlist({ product_id: productId })).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error("Error updating wishlist");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return {
    isWishlisted,
    isWishlistLoading,
    handleWishlistAction,
  };
};
