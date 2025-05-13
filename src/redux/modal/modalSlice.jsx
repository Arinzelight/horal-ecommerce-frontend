import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogoutModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLogoutModal: (state) => {
      state.showLogoutModal = true;
    },
    closeLogoutModal: (state) => {
      state.showLogoutModal = false;
    },
  },
});

export const { openLogoutModal, closeLogoutModal } = modalSlice.actions;
export default modalSlice.reducer;
