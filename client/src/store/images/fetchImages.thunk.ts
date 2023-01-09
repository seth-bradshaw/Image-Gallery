import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPublicImages, fetchUserImages } from "../../services/images";
import { FetchImagesResponseWithError, ImagesState, State } from "../types";


const fetchImages = createAsyncThunk<FetchImagesResponseWithError, string | null, { rejectValue: { message: string } | string }>('images/fetchImages', async (fetchUrl, thunkApi) => {
    const { images, user }: State = thunkApi.getState() as State;

    const fetchWithScope = user.isLoggedIn ? fetchUserImages : fetchPublicImages;

    const response: FetchImagesResponseWithError = await fetchWithScope(fetchUrl, images.limit);
    
    if (response.error) {
        return thunkApi.rejectWithValue(response.error)
    }

    return response;
})

export default fetchImages;