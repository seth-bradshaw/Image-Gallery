import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserImages } from "../../services/images";
import { FetchImagesResponseWithError, ImagesState } from "../types";


const fetchImages = createAsyncThunk<FetchImagesResponseWithError, string | null, { rejectValue: { message: string } | string }>('images/fetchImages', async (fetchUrl, thunkApi) => {
    const { images } : { images: ImagesState } = thunkApi.getState() as { images: ImagesState };

    const response: FetchImagesResponseWithError = await fetchUserImages(fetchUrl, images.limit);
    
    if (response.error) {
        return thunkApi.rejectWithValue(response.error)
    }

    return response;
})

export default fetchImages;