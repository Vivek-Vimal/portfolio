import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: LoginState = {
  isLoggedIn: false,
  user: null,
};

const loginStateSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<{ isLoggedIn: boolean; user: User | null }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setLoginState, logout } = loginStateSlice.actions;
export default loginStateSlice.reducer;
