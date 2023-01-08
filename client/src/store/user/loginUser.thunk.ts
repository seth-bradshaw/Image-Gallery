import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginBody, loginUser } from "../../services/user";
import { Error, User } from "../types";

export type LoginResponse = {
    access_token: string;
    user: User;
    error?: Error 
}

const requestUserLogin = createAsyncThunk<LoginResponse, LoginBody, { rejectValue: Error}>('user/login', async (body, thunkApi) => {

    const response: LoginResponse = await loginUser(body);

    if (response.error) {
        return thunkApi.rejectWithValue(response.error);
    }

    return response;
})

export default requestUserLogin;