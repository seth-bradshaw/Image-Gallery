import { createAsyncThunk } from "@reduxjs/toolkit";
import { Account, register } from "../../services/user";
import { Error } from "../types";
import { LoginResponse as RegisterResponse } from "./loginUser.thunk";

const registerNewUser = createAsyncThunk<RegisterResponse, Account, { rejectValue: Error }>('user/register', async (account, thunkApi) => {
    const response: RegisterResponse = await register(account);

    if (response.error) {
        return thunkApi.rejectWithValue(response.error);
    }

    return response;
})

export default registerNewUser;