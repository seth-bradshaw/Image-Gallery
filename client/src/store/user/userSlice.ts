import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types";
import requestUserLogin, { LoginResponse } from "./loginUser.thunk";

const initialState: UserState = {
    id: '',
    username: '',
    fname: '',
    lname: '',
    email: '',
    isLoggedIn: false,
    status: '',
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(requestUserLogin.pending, (state) => {
            state.status = "loading";
            state.error = null;
          });
      
          builder.addCase(requestUserLogin.fulfilled, (state, { payload: { user } }: PayloadAction<LoginResponse>) => {
            state.id = user.id;
            state.username = user.username;
            state.fname = user.fname;
            state.lname = user.lname;
            state.email = user.email;
            state.isLoggedIn = true;
            state.status = 'idle';
            state.error = null;
          });
      
          builder.addCase(requestUserLogin.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = "idle";
          });
    }
})

export const {} = userSlice.actions;

export default userSlice.reducer;