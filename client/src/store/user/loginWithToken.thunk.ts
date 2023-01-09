import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginWithToken as requestLoginWithToken } from "../../services/user";
import { Error, User } from "../types";

export type LoginWithTokenResponse = {
    user: User;
    error?: Error 
}

const loginWithToken = createAsyncThunk<LoginWithTokenResponse, undefined, { rejectValue: Error}>('user/loginWithToken', async (_, thunkApi) => {

    const response: LoginWithTokenResponse = await requestLoginWithToken();

    if (response.error) {
        return thunkApi.rejectWithValue(response.error);
    }

    return response;
})

export default loginWithToken;