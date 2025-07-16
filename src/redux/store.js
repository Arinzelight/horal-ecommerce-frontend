import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer, { logout } from "./auth/authSlice/userSlice";
import registrationReducer from "./auth/authSlice/registrationSlice";
import modalReducer from "./modal/modalSlice";
import productSlice from "./product/slices/productSlice";
import cartSlice from "./cart/slice/cartSlice";
import categorySlice from "./category/slice/categorySlice";
import wishlistReducer from "./wishlist/wishlistSlice";
import orderReducer from "./order/orderSlice";
import profileReducer from "./profile/profileSlice";
import paymentReducer from "./payment/paymentSlice";
import reviewReducer from "./review/reviewSlice";

const appReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  products: productSlice,
  registration: registrationReducer,
  cart: cartSlice,
  categories: categorySlice,
  wishlist: wishlistReducer,
  order: orderReducer,
  profile: profileReducer,
  payment: paymentReducer,
  reviews: reviewReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
