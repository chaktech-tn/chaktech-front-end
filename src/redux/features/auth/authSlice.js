import { createSlice } from "@reduxjs/toolkit";
import { resetUser } from "@utils/posthog";

const initialState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      localStorage.removeItem("auth");
      // Reset user identification in PostHog on logout
      resetUser();
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
