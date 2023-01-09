import axios from "axios";
import { FETCH_IMAGES, FETCH_PUBLIC_IMAGES, UPLOAD_IMAGE } from "../constants/endpoints";
import { ImageTags } from "../store/types";
import { getHeaders } from "./helpers";


export const fetchUserImages = async (optUrl: string | null, limit: number) => {
    const url = optUrl ?? `${FETCH_IMAGES}?offset=0&limit=${limit}`;
    const response = await axios.get(url, { headers: getHeaders() })
        .then(res => res.data)
        .catch(err => err.response.data)

    return response;
}

export const fetchPublicImages = async (optUrl: string | null, limit: number) => {
    const url = optUrl ?? `${FETCH_PUBLIC_IMAGES}?offset=0&limit=${limit}`

    const response = await axios.get(url, { headers: getHeaders() })
        .then(res => res.data)
        .catch(err => err.response.data)

    return response;
}

export type ImageDetailsBody = {
    handle: string;
    tags: ImageTags;
}

export const uploadImageDetails = async (details: ImageDetailsBody) => {
    const body = JSON.stringify(details);
    const response = await axios.post(UPLOAD_IMAGE, body, { headers: {...getHeaders(), 'Content-Type': 'application/json'} })
        .then(res => res.data)
        .catch(err => err.response.data)
    
    return response;
}