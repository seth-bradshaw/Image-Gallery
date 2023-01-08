import axios from "axios";
// @ts-ignore
import { FETCH_IMAGES } from "../constants/endpoints";
import { getHeaders } from "./helpers";


export const fetchUserImages = async (optUrl: string | null, limit: number) => {
    const url = optUrl ?? `${FETCH_IMAGES}?offset=0&limit=${limit}`;
    const response = await axios.get(url, { headers: getHeaders() })
        .then(res => res.data)
        .catch(err => err.response.data)

    return response;
}