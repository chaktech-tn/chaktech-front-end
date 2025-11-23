import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionToken: null,
  recoveryStatus: null,
};

const abandonedCheckoutSlice = createSlice({
  name: "abandonedCheckout",
  initialState,
  reducers: {
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
    setRecoveryStatus: (state, action) => {
      state.recoveryStatus = action.payload;
    },
    clearAbandonedCheckout: (state) => {
      state.sessionToken = null;
      state.recoveryStatus = null;
    },
  },
});

export const {
  setSessionToken,
  setRecoveryStatus,
  clearAbandonedCheckout,
} = abandonedCheckoutSlice.actions;

export default abandonedCheckoutSlice.reducer;

