import { createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty, isNil } from "rambda";
import { fetchUserImages } from "../../services/images";
import { FetchImagesResponse, ImagesState } from "../types";


const fetchImages = createAsyncThunk<FetchImagesResponse, string | null, { rejectValue: { message: string } | string }>('images/fetchImages', async (fetchUrl, thunkApi) => {
    const { images } : { images: ImagesState } = thunkApi.getState() as { images: ImagesState };

    const response: FetchImagesResponse = await fetchUserImages(fetchUrl, images.limit);

    return response;
})

export default fetchImages;