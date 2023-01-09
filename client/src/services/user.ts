import axios from "axios";
// @ts-ignore
import Cookies from "js-cookie";
import { CREATE_USER, LOGIN, LOGIN_WITH_TOKEN } from "../constants/endpoints";
import { User } from "../store/types";
import { getHeaders } from "./helpers";

export type LoginBody = {
    username: string;
    password: string;
}


export const loginUser = async (credentials: LoginBody) => {
    const response = await axios.post(LOGIN, credentials, { headers: getHeaders() })
        .then(res => {
            Cookies.set('auth_token', JSON.stringify(res.data.auth_token));
            return res.data;
        })
        .catch(err => err.response.data)

    return response;
}

export type Account = {
    email: string;
    fname: string;
    lname: string;
    username: string;
    password: string;
}

export const register = async (account: Account) => {
    const response = await axios.post(CREATE_USER, account, { headers: getHeaders() })
        .then(res => {
            Cookies.set('auth_token', JSON.stringify(res.data.auth_token));
            return res.data;
        })
        .catch(err => err.response.data);
    
    return response;
}

export const loginWithToken = async () => {
    const response = await axios.get(LOGIN_WITH_TOKEN, { headers: getHeaders() })
        .then(res => res.data)
        .catch(err => err.response.data)
    
    return response;
}