import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.error = false;
      state.loading = false;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      console.log(" i received ", action.payload);
      state.loading = false;
      state.error = true;
    },
  },
});

export const { signInSuccess, signInStart, signInFailure } = userSlice.actions;

export default userSlice.reducer;
