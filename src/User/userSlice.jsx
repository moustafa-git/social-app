import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  token: localStorage.getItem("userToken"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("userToken");
    },
  },
});

export default userSlice.reducer;

export const { updateToken, clearToken } = userSlice.actions;
