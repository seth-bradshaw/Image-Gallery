import axios from "axios";
// @ts-ignore
import Cookies from "js-cookie";
import { LOGIN } from "../constants/endpoints";
import { getHeaders } from "./helpers";

type LoginBody = {
    username: string;
    password: string;
}

export const loginUser = async (credentials: LoginBody) => {
    const response = await axios.post(LOGIN, credentials, { headers: getHeaders() })
        .then(res => {
            Cookies.set('auth_token', JSON.stringify(res.data))
            return res.data
        })
        .catch(err => err.response.data)

    return response;
}