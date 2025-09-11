// hooks/useCart.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  fetchCart,
  addToCart,
  mergeCart,
  removeFromCart,
  deleteCart,
  updateCartItem,
} from "../redux/cart/thunk/cartThunk";
import { clearCart } from "../redux/cart/slice/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  // Memoized selectors for derived state
  const cartItems = cartState.items;
  const cartTotal = cartState.total_price;
  const itemCount = cartState.total_item;
  const isLoading = cartState.loading;
  const error = cartState.error;

  // Check if a product is in the cart (enhanced with variant support)
  const isInCart = useCallback(
    (productId, color = null, size = null) => {
      const foundItem = cartItems.find((item) => {
        const productMatch = item.product?.id === productId;

        // If no color or size specified, just check product ID
        if (!color && !size) {
          return productMatch;
        }

        // Check for exact variant match using user_selected_variant
        const cartColor = item.user_selected_variant?.color || item.color;
        const cartSize =
          item.user_selected_variant?.custom_size_value ||
          item.user_selected_variant?.standard_size ||
          item.user_selected_variant?.size ||
          item.size ||
          item.custom_size_value ||
          item.standard_size;

        const colorMatch = !color || cartColor === color;
        const sizeMatch = !size || cartSize === size;

        return productMatch && colorMatch && sizeMatch;
      });

      return !!foundItem;
    },
    [cartItems]
  );

  // Get cart item by product ID and variant details
  const getCartItem = useCallback(
    (productId, color = null, size = null) => {
      const foundItem = cartItems.find((item) => {
        const productMatch = item.product?.id === productId;

        if (!color && !size) {
          return productMatch;
        }

        // Check for exact variant match using user_selected_variant
        const cartColor = item.user_selected_variant?.color || item.color;
        const cartSize =
          item.user_selected_variant?.custom_size_value ||
          item.user_selected_variant?.standard_size ||
          item.user_selected_variant?.size ||
          item.size ||
          item.custom_size_value ||
          item.standard_size;

        const colorMatch = !color || cartColor === color;
        const sizeMatch = !size || cartSize === size;

        return productMatch && colorMatch && sizeMatch;
      });
      return foundItem;
    },
    [cartItems]
  );

  // Get all cart items for a specific product (all variants)
  const getProductCartItems = useCallback(
    (productId) => {
      const foundItems = cartItems.filter(
        (item) => item.product?.id === productId
      );
      return foundItems;
    },
    [cartItems]
  );

  // Fetch cart data
  const loadCart = useCallback(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Add item to cart with variant support
  const addItemToCart = useCallback(
    async (productId, options = {}) => {
      const {
        color,
        standard_size,
        quantity = 1,
        custom_size_unit,
        custom_size_value,
        size,
      } = options;

      const result = await dispatch(
        addToCart({
          product_id: productId,
          color,
          standard_size,
          quantity,
          custom_size_unit,
          custom_size_value,
          size,
        })
      );

      // Check if the thunk was fulfilled
      if (addToCart.fulfilled.match(result)) {
        return result;
      } else {
        // Thunk was rejected
        throw new Error(result.payload || "Failed to add item to cart");
      }
    },
    [dispatch]
  );

  // Merge cart items (for guest to user cart merging)
  const mergeUserCart = useCallback(
    (productId) => {
      return dispatch(mergeCart({ product_id: productId }));
    },
    [dispatch]
  );

  // Remove item from cart
  const removeItemFromCart = useCallback(
    async (itemId) => {
      const result = await dispatch(removeFromCart({ item_id: itemId }));

      // Check if the thunk was fulfilled
      if (removeFromCart.fulfilled.match(result)) {
        return result;
      } else {
        // Thunk was rejected
        throw new Error(result.payload || "Failed to remove item from cart");
      }
    },
    [dispatch]
  );

  // Update cart item quantity and variants
const updateItemQuantity = useCallback(
  async (itemId, quantity, options = {}) => {
    const { color, standard_size, custom_size_unit, custom_size_value, size } =
      options;

    const result = await dispatch(
      updateCartItem({
        item_id: itemId,
        quantity,
        color,
        standard_size,
        custom_size_unit,
        custom_size_value,
        size,
      })
    );

    // Check if the thunk was fulfilled
    if (updateCartItem.fulfilled.match(result)) {
      return result;
    } else {
      // Thunk was rejected
      throw new Error(result.payload || "Failed to update cart item");
    }
  },
  [dispatch]
);

  // Clear entire cart
 const clearUserCart = useCallback(async () => {
   if (cartState.id) {
     const result = await dispatch(deleteCart({ cart_id: cartState.id }));

     // Check if the thunk was fulfilled
     if (deleteCart.fulfilled.match(result)) {
       return result;
     } else {
       // Thunk was rejected
       throw new Error(result.payload || "Failed to clear cart");
     }
   }
   // If no cart ID exists (like after logout), just clear local state
   dispatch(clearCart());
   return Promise.resolve();
 }, [dispatch, cartState.id]);

  // Toggle cart item (add if not in cart, remove if in cart)
  const toggleCartItem = useCallback(
    async (productId, options = {}) => {
      const {
        color,
        standard_size,
        quantity = 1,
        custom_size_unit,
        custom_size_value,
        size,
      } = options;

      const existingItem = getCartItem(productId, color, standard_size);

      let result;

      if (existingItem) {
        result = await dispatch(removeFromCart({ item_id: existingItem.id }));

        // Check if the thunk was fulfilled
        if (removeFromCart.fulfilled.match(result)) {
          return result; // Success
        } else {
          // Thunk was rejected
          throw new Error(result.payload || "Failed to remove item from cart");
        }
      } else {
        result = await dispatch(
          addToCart({
            product_id: productId,
            color,
            standard_size,
            quantity,
            custom_size_unit,
            custom_size_value,
            size,
          })
        );

        // Check if the thunk was fulfilled
        if (addToCart.fulfilled.match(result)) {
          return result; // Success
        } else {
          // Thunk was rejected
          throw new Error(result.payload || "Failed to add item to cart");
        }
      }
    },
    [getCartItem, dispatch]
  );

  return {
    // State
    cartItems,
    cartTotal,
    itemCount,
    isLoading,
    error,
    cartId: cartState.id,

    // Helpers
    isInCart,
    getCartItem,
    getProductCartItems,

    // Actions
    loadCart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart: clearUserCart,
    mergeCart: mergeUserCart,
    toggleCartItem,
  };
};
