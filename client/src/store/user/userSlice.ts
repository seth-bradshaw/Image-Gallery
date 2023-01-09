import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// @ts-ignore
import Cookies from 'js-cookie';
import { UserState } from "../types";
import requestUserLogin, { LoginResponse } from "./loginUser.thunk";
import registerNewUser from "./register.thunk";

const initialState: UserState = {
  id: "",
  username: "",
  fname: "",
  lname: "",
  email: "",
  isLoggedIn: false,
  status: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = initialState.id;
      state.username = initialState.username;
      state.fname = initialState.fname;
      state.lname = initialState.lname;
      state.email = initialState.email;
      state.isLoggedIn = initialState.isLoggedIn;
      state.status = initialState.status;
      state.error = initialState.error;
      Cookies.remove('auth_token');
    }
  },
  extraReducers: (builder) => {
    // * login
    builder.addCase(requestUserLogin.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(
      requestUserLogin.fulfilled,
      (state, { payload: { user } }: PayloadAction<LoginResponse>) => {
        state.id = user.id;
        state.username = user.username;
        state.fname = user.fname;
        state.lname = user.lname;
        state.email = user.email;
        state.isLoggedIn = true;
        state.status = "idle";
        state.error = null;
      }
    );

    builder.addCase(requestUserLogin.rejected, (state, { payload }) => {
      if (payload) state = { ...initialState, error: payload as Error };
      state.status = "idle";
    });

    // * register
    builder.addCase(registerNewUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(
      registerNewUser.fulfilled,
      (state, { payload: { user } }) => {
        state.id = user.id;
        state.username = user.username;
        state.fname = user.fname;
        state.lname = user.lname;
        state.email = user.email;
        state.isLoggedIn = true;
        state.status = "idle";
        state.error = null;
      }
    );

    builder.addCase(
      registerNewUser.rejected,
      (state, { payload }) => {
        if (payload) state = { ...initialState, error: payload as Error };
        state.status = "idle";
      }
    )
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
