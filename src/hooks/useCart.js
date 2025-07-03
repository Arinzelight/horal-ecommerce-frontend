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

  // Check if a product is in the cart
  const isInCart = useCallback(
    (productId) => cartItems.some((item) => item.product?.id === productId),
    [cartItems]
  );

  // Get cart item by product ID
  const getCartItem = useCallback(
    (productId) => cartItems.find((item) => item.product?.id === productId),
    [cartItems]
  );

  // Fetch cart data
  const loadCart = useCallback(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Add item to cart
  const addItemToCart = useCallback(
    (productId) => {
      return dispatch(addToCart({ product_id: productId }));
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
    (itemId) => {
      return dispatch(removeFromCart({ item_id: itemId }));
    },
    [dispatch]
  );

  // Update cart item quantity
  const updateItemQuantity = useCallback(
    (itemId, quantity) => {
      return dispatch(updateCartItem({ item_id: itemId, quantity }));
    },
    [dispatch]
  );

  // Clear entire cart
  const clearUserCart = useCallback(() => {
    if (cartState.id) {
      return dispatch(deleteCart({ cart_id: cartState.id }));
    }
    // If no cart ID exists (like after logout), just clear local state
    dispatch(clearCart());
    return Promise.resolve();
  }, [dispatch, cartState.id]);

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

    // Actions
    loadCart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart: clearUserCart,
    mergeCart: mergeUserCart,
  };
};
